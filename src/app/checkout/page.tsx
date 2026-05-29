"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { CheckCircle2, MessageCircle, Home, Building2 } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { WILAYAS } from "@/lib/wilayas";
import { SHIPPING, buildWhatsAppLink } from "@/lib/constants";
import { formatPrice, cn } from "@/lib/utils";

type DeliveryType = "home" | "stopdesk";

type FormState = {
  fullName: string;
  phone: string;
  wilaya: string;
  commune: string;
  address: string;
  delivery: DeliveryType;
  notes: string;
};

type Errors = Partial<Record<keyof FormState, string>>;

const initialForm: FormState = {
  fullName: "",
  phone: "",
  wilaya: "",
  commune: "",
  address: "",
  delivery: "home",
  notes: "",
};

// التحقق من رقم الهاتف الجزائري: يبدأ بـ 05/06/07 ويتبعه 8 أرقام
function isValidAlgerianPhone(phone: string): boolean {
  return /^0(5|6|7)[0-9]{8}$/.test(phone.replace(/\s/g, ""));
}

export default function CheckoutPage() {
  const { items, subtotal, clear } = useCart();
  const [form, setForm] = useState<FormState>(initialForm);
  const [errors, setErrors] = useState<Errors>({});
  const [confirmed, setConfirmed] = useState<{
    form: FormState;
    items: typeof items;
    shipping: number;
    total: number;
  } | null>(null);

  const shippingCost = useMemo(
    () => (form.delivery === "home" ? SHIPPING.home : SHIPPING.stopdesk),
    [form.delivery],
  );
  const total = subtotal + shippingCost;

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  }

  function validate(): boolean {
    const e: Errors = {};
    if (!form.fullName.trim()) e.fullName = "الرجاء إدخال الاسم الكامل";
    if (!isValidAlgerianPhone(form.phone))
      e.phone = "رقم هاتف غير صحيح (مثال: 0551234567)";
    if (!form.wilaya) e.wilaya = "الرجاء اختيار الولاية";
    if (!form.commune.trim()) e.commune = "الرجاء إدخال البلدية";
    if (!form.address.trim()) e.address = "الرجاء إدخال العنوان الكامل";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function handleSubmit(ev: React.FormEvent) {
    ev.preventDefault();
    if (!validate()) return;
    const snapshot = { form, items, shipping: shippingCost, total };
    setConfirmed(snapshot);
    clear();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // ===== صفحة التأكيد =====
  if (confirmed) {
    const orderLines = confirmed.items
      .map((i) => `• ${i.name} ×${i.quantity} = ${formatPrice(i.price * i.quantity)}`)
      .join("\n");
    const deliveryLabel =
      confirmed.form.delivery === "home" ? "توصيل للمنزل" : "التوصيل للمكتب";
    const waMessage = `🌿 طلب جديد من موقع ELM
الاسم: ${confirmed.form.fullName}
الهاتف: ${confirmed.form.phone}
الولاية: ${confirmed.form.wilaya}
البلدية: ${confirmed.form.commune}
العنوان: ${confirmed.form.address}
نوع التوصيل: ${deliveryLabel}

المنتجات:
${orderLines}

رسوم التوصيل: ${formatPrice(confirmed.shipping)}
المجموع الكلي: ${formatPrice(confirmed.total)}
${confirmed.form.notes ? `\nملاحظات: ${confirmed.form.notes}` : ""}`;

    return (
      <div className="container-elm flex flex-col items-center py-20 text-center">
        <span className="flex h-20 w-20 items-center justify-center rounded-full bg-forest-light/15">
          <CheckCircle2 className="h-11 w-11 text-forest-light" />
        </span>
        <h1 className="mt-6 font-heading text-3xl font-extrabold text-forest">
          تم استلام طلبك!
        </h1>
        <p className="mt-3 max-w-md text-lg text-ink/70">
          سنتصل بك قريبًا لتأكيد الطلب. الدفع عند الاستلام.
        </p>

        <div className="mt-8 w-full max-w-md rounded-2xl bg-white p-6 text-start shadow-soft">
          <h2 className="font-heading font-bold text-forest">ملخّص الطلب</h2>
          <div className="mt-3 space-y-2 text-sm text-ink/70">
            {confirmed.items.map((i) => (
              <div key={i.key} className="flex justify-between">
                <span>
                  {i.name} ×{i.quantity}
                </span>
                <span>{formatPrice(i.price * i.quantity)}</span>
              </div>
            ))}
            <div className="flex justify-between border-t border-sand pt-2">
              <span>رسوم التوصيل</span>
              <span>{formatPrice(confirmed.shipping)}</span>
            </div>
            <div className="flex justify-between font-heading text-base font-bold text-forest">
              <span>المجموع الكلي</span>
              <span>{formatPrice(confirmed.total)}</span>
            </div>
          </div>
        </div>

        <a
          href={buildWhatsAppLink(waMessage)}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-gold mt-6 w-full max-w-md"
        >
          <MessageCircle className="h-5 w-5" />
          أكّد عبر WhatsApp
        </a>
        <Link href="/shop" className="mt-4 text-sm font-bold text-forest hover:text-gold">
          مواصلة التسوّق
        </Link>
      </div>
    );
  }

  // ===== سلة فارغة =====
  if (items.length === 0) {
    return (
      <div className="container-elm flex flex-col items-center py-24 text-center">
        <h1 className="font-heading text-2xl font-extrabold text-forest">
          لا يوجد ما تطلبه
        </h1>
        <p className="mt-2 text-ink/60">أضِف منتجًا قبل إتمام الطلب.</p>
        <Link href="/shop" className="btn-gold mt-6">
          تصفّح المتجر
        </Link>
      </div>
    );
  }

  // ===== نموذج الطلب =====
  return (
    <div className="container-elm section-pad">
      <h1 className="font-heading text-3xl font-extrabold text-forest">
        إتمام الطلب
      </h1>
      <p className="mt-2 text-ink/60">الدفع عند الاستلام — املأ معلوماتك للتوصيل.</p>

      <form
        onSubmit={handleSubmit}
        className="mt-8 grid gap-8 lg:grid-cols-3"
        noValidate
      >
        {/* الحقول */}
        <div className="space-y-5 lg:col-span-2">
          <Field
            label="الاسم الكامل"
            error={errors.fullName}
            value={form.fullName}
            onChange={(v) => update("fullName", v)}
            placeholder="مثال: محمد أمين"
          />
          <Field
            label="رقم الهاتف"
            error={errors.phone}
            value={form.phone}
            onChange={(v) => update("phone", v)}
            placeholder="0551234567"
            inputMode="tel"
          />

          <div className="grid gap-5 sm:grid-cols-2">
            {/* الولاية */}
            <div>
              <label className="mb-1.5 block font-heading text-sm font-bold text-forest">
                الولاية
              </label>
              <select
                value={form.wilaya}
                onChange={(e) => update("wilaya", e.target.value)}
                className={cn(
                  "h-12 w-full rounded-2xl border-2 bg-white px-4 text-ink outline-none transition-colors focus:border-gold",
                  errors.wilaya ? "border-red-400" : "border-sand",
                )}
              >
                <option value="">اختر الولاية</option>
                {WILAYAS.map((w) => (
                  <option key={w.code} value={`${w.code} - ${w.name}`}>
                    {w.code} - {w.name}
                  </option>
                ))}
              </select>
              {errors.wilaya && (
                <p className="mt-1 text-sm text-red-500">{errors.wilaya}</p>
              )}
            </div>

            <Field
              label="البلدية"
              error={errors.commune}
              value={form.commune}
              onChange={(v) => update("commune", v)}
              placeholder="اسم البلدية"
            />
          </div>

          <Field
            label="العنوان الكامل"
            error={errors.address}
            value={form.address}
            onChange={(v) => update("address", v)}
            placeholder="الحي، الشارع، رقم المنزل..."
          />

          {/* نوع التوصيل */}
          <div>
            <label className="mb-2 block font-heading text-sm font-bold text-forest">
              نوع التوصيل
            </label>
            <div className="grid gap-3 sm:grid-cols-2">
              <DeliveryOption
                active={form.delivery === "home"}
                onClick={() => update("delivery", "home")}
                icon={Home}
                title="توصيل للمنزل"
                price={SHIPPING.home}
              />
              <DeliveryOption
                active={form.delivery === "stopdesk"}
                onClick={() => update("delivery", "stopdesk")}
                icon={Building2}
                title="التوصيل للمكتب"
                price={SHIPPING.stopdesk}
              />
            </div>
          </div>

          {/* ملاحظات */}
          <div>
            <label className="mb-1.5 block font-heading text-sm font-bold text-forest">
              ملاحظات (اختياري)
            </label>
            <textarea
              value={form.notes}
              onChange={(e) => update("notes", e.target.value)}
              rows={3}
              placeholder="أي تفاصيل إضافية..."
              className="w-full rounded-2xl border-2 border-sand bg-white px-4 py-3 text-ink outline-none transition-colors focus:border-gold"
            />
          </div>
        </div>

        {/* ملخّص الطلب */}
        <div className="h-fit rounded-2xl bg-white p-6 shadow-soft">
          <h2 className="font-heading text-xl font-bold text-forest">
            ملخّص الطلب
          </h2>
          <div className="mt-4 space-y-3">
            {items.map((i) => (
              <div key={i.key} className="flex justify-between gap-2 text-sm">
                <span className="text-ink/70">
                  {i.name} ×{i.quantity}
                </span>
                <span className="font-heading font-bold text-forest">
                  {formatPrice(i.price * i.quantity)}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-4 space-y-2 border-t border-sand pt-4 text-sm">
            <div className="flex justify-between text-ink/70">
              <span>المجموع الفرعي</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            <div className="flex justify-between text-ink/70">
              <span>رسوم التوصيل</span>
              <span>{formatPrice(shippingCost)}</span>
            </div>
            <div className="flex justify-between border-t border-sand pt-2 font-heading text-lg font-extrabold text-forest">
              <span>المجموع</span>
              <span className="text-gold-dark">{formatPrice(total)}</span>
            </div>
          </div>
          <button type="submit" className="btn-gold mt-6 w-full">
            تأكيد الطلب
          </button>
          <p className="mt-3 text-center text-xs text-ink/50">
            الدفع عند الاستلام • لا حاجة للدفع الآن
          </p>
        </div>
      </form>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  error,
  placeholder,
  inputMode,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  placeholder?: string;
  inputMode?: "tel" | "text";
}) {
  return (
    <div>
      <label className="mb-1.5 block font-heading text-sm font-bold text-forest">
        {label}
      </label>
      <input
        type="text"
        inputMode={inputMode}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={cn(
          "h-12 w-full rounded-2xl border-2 bg-white px-4 text-ink outline-none transition-colors focus:border-gold",
          error ? "border-red-400" : "border-sand",
        )}
      />
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
}

function DeliveryOption({
  active,
  onClick,
  icon: Icon,
  title,
  price,
}: {
  active: boolean;
  onClick: () => void;
  icon: typeof Home;
  title: string;
  price: number;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex items-center gap-3 rounded-2xl border-2 p-4 text-start transition-all",
        active ? "border-gold bg-gold/10" : "border-sand hover:border-gold/50",
      )}
    >
      <Icon className="h-6 w-6 text-forest-light" />
      <div>
        <div className="font-heading font-bold text-forest">{title}</div>
        <div className="text-sm text-ink/60">{formatPrice(price)}</div>
      </div>
    </button>
  );
}
