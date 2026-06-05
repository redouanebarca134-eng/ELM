import { redirect } from "next/navigation";
import { isAdmin } from "@/lib/admin-auth";
import { listOrders, orderStats } from "@/lib/orders/db";
import { ORDER_STATUS_LABELS, type OrderStatus } from "@/lib/orders/types";
import { formatPrice } from "@/lib/utils";
import { changeStatus, ship, logout } from "./actions";

export const dynamic = "force-dynamic";

const STATUS_FLOW: OrderStatus[] = [
  "pending",
  "confirmed",
  "shipped",
  "delivered",
  "cancelled",
  "returned",
];

const STATUS_COLOR: Record<OrderStatus, string> = {
  pending: "bg-amber-100 text-amber-700",
  confirmed: "bg-blue-100 text-blue-700",
  shipped: "bg-indigo-100 text-indigo-700",
  delivered: "bg-green-100 text-green-700",
  cancelled: "bg-red-100 text-red-700",
  returned: "bg-gray-200 text-gray-700",
};

export default async function AdminDashboard() {
  if (!(await isAdmin())) redirect("/admin/login");

  const [orders, stats] = await Promise.all([listOrders(), orderStats()]);

  return (
    <div className="min-h-screen bg-cream">
      <div className="container-elm py-8">
        {/* الرأس */}
        <div className="flex items-center justify-between">
          <h1 className="font-heading text-2xl font-extrabold text-forest sm:text-3xl">
            إدارة الطلبات
          </h1>
          <form action={logout}>
            <button className="rounded-xl border border-sand px-4 py-2 text-sm font-bold text-forest hover:bg-sand/50">
              خروج
            </button>
          </form>
        </div>

        {/* الإحصائيات */}
        <div className="mt-6 grid grid-cols-3 gap-4">
          <Stat label="إجمالي الطلبات" value={String(stats.total_orders)} />
          <Stat label="قيد الانتظار" value={String(stats.pending)} />
          <Stat label="إيرادات مُسلّمة" value={formatPrice(stats.revenue)} />
        </div>

        {/* الطلبات */}
        <div className="mt-8 space-y-4">
          {orders.length === 0 && (
            <p className="rounded-2xl bg-white p-8 text-center text-ink/50 shadow-soft">
              لا توجد طلبات بعد.
            </p>
          )}

          {orders.map((o) => (
            <div key={o.id} className="rounded-2xl bg-white p-5 shadow-soft">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-heading font-bold text-forest">
                      #{o.id} — {o.full_name}
                    </span>
                    <span
                      className={`rounded-full px-2 py-0.5 text-xs font-bold ${STATUS_COLOR[o.status]}`}
                    >
                      {ORDER_STATUS_LABELS[o.status]}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-ink/60" dir="ltr">
                    {o.phone}
                  </p>
                  <p className="text-sm text-ink/60">
                    {o.wilaya} — {o.commune} — {o.address}
                  </p>
                  <p className="text-sm text-ink/60">
                    {o.delivery === "home" ? "توصيل للمنزل" : "توصيل للمكتب"}
                    {o.notes ? ` • ${o.notes}` : ""}
                  </p>
                </div>
                <div className="text-end">
                  <div className="font-heading text-lg font-extrabold text-gold-dark">
                    {formatPrice(o.total)}
                  </div>
                  <div className="text-xs text-ink/40">
                    {new Date(o.created_at).toLocaleString("fr-DZ")}
                  </div>
                  {o.tracking && (
                    <div className="mt-1 text-xs font-bold text-indigo-600">
                      تتبّع: {o.tracking}
                    </div>
                  )}
                </div>
              </div>

              {/* المنتجات */}
              <ul className="mt-3 border-t border-sand pt-3 text-sm text-ink/70">
                {o.items.map((it, i) => (
                  <li key={i} className="flex justify-between">
                    <span>
                      {it.name} ×{it.quantity}
                    </span>
                    <span>{formatPrice(it.price * it.quantity)}</span>
                  </li>
                ))}
              </ul>

              {/* الإجراءات */}
              <div className="mt-4 flex flex-wrap items-center gap-2">
                {/* تغيير الحالة */}
                {STATUS_FLOW.map((s) => (
                  <form key={s} action={changeStatus.bind(null, o.id, s)}>
                    <button
                      disabled={o.status === s}
                      className={`rounded-lg px-3 py-1.5 text-xs font-bold transition-colors ${
                        o.status === s
                          ? "cursor-default bg-forest text-cream"
                          : "border border-sand text-forest hover:bg-sand/50"
                      }`}
                    >
                      {ORDER_STATUS_LABELS[s]}
                    </button>
                  </form>
                ))}

                {/* إنشاء شحنة */}
                {!o.tracking && (
                  <form action={ship.bind(null, o.id)} className="ms-auto">
                    <button className="rounded-lg bg-gold px-4 py-1.5 text-xs font-bold text-forest hover:bg-gold-dark">
                      🚚 إنشاء التوصيل
                    </button>
                  </form>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-white p-5 text-center shadow-soft">
      <div className="font-heading text-2xl font-extrabold text-forest">
        {value}
      </div>
      <div className="mt-1 text-xs text-ink/60">{label}</div>
    </div>
  );
}
