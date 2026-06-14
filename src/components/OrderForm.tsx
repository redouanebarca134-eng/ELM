"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { CheckCircle2, MessageCircle, Home, Building2, Check } from "lucide-react";
import type { Product } from "@/lib/products";
import { WILAYAS } from "@/lib/wilayas";
import { SHIPPING, buildWhatsAppLink } from "@/lib/constants";
import { formatPrice, cn } from "@/lib/utils";
import { trackEvent } from "@/lib/pixel";

type DeliveryType = "home" | "stopdesk";

function isValidAlgerianPhone(phone: string): boolean {
  return /^0(5|6|7)[0-9]{8}$/.test(phone.replace(/\s/g, ""));
}

// نموذج طلب مدمج في صفحة المنتج (دفع عند الاستلام) — لتحويل أقصى.
export default function OrderForm({ product }: { product: Product }) {
  const [packId, setPackId] = useState(product.packs[0]?.id ?? "single");
  const [qty, setQty] = useState(1);
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [wilaya, setWilaya] = useState("");
  const [commune, setCommune] = useState("");
  const [address, setAddress] = useState("");
  const [delivery, setDelivery] = useState<DeliveryType>("home");
  const [notes, setNotes] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [confirmed, setConfirmed] = useState<null | {
    total: number;
    shipping: number;
  }>(null);

  const pack = product.packs.find((p) => p.id === packId) ?? product.packs[0];
  const shipping = useMemo(
    () =>
      product.freeShipping
        ? 0
        : delivery === "home"
          ? SHIPPING.home
          : SHIPPING.stopdesk,
    [delivery, product.freeShipping],
  );
  const subtotal = pack.price * qty;
  const total = subtotal + shipping;

  function validate() {
    const e: Record<string, string> = {};
    if (!fullName.trim()) e.fullName = "الرجاء إدخال الاسم الكامل";
    if (!isValidAlgerianPhone(phone))
      e.phone = "رقم هاتف غير صحيح (مثال: 0551234567)";
    if (!wilaya) e.wilaya = "اختر الولاية";
    if (!commune.trim()) e.commune = "أدخل البلدية";
    if (!address.trim()) e.address = "أدخل العنوان";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function submit(ev: React.FormEvent) {
    ev.preventDefault();
    if (!validate()) return;

    trackEvent("Purchase", {
      value: total,
      currency: "DZD",
      content_ids: [product.slug],
      content_type: "product",
      num_items: qty,
    });

    void fetch("/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        full_name: fullName,
        phone,
        wilaya,
        commune,
        address,
        delivery,
        notes: notes || null,
        items: [
          {
            slug: product.slug,
            name: `${product.name} — ${pack.label}`,
            price: pack.price,
            quantity: qty,
          },
        ],
        shipping,
        total,
      }),
    }).catch(() => {});

    setConfirmed({ total, shipping });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // ===== شاشة التأكيد =====
  if (confirmed) {
    const waMessage = `🌿 طلب جديد من موقع ELM
المنتج: ${product.name} — ${pack.label} ×${qty}
الاسم: ${fullName}
الهاتف: ${phone}
الولاية: ${wilaya}
البلدية: ${commune}
العنوان: ${address}
نوع التوصيل: ${delivery === "home" ? "توصيل للمنزل" : "التوصيل للمكتب"}
رسوم التوصيل: ${formatPrice(confirmed.shipping)}
المجموع الكلي: ${formatPrice(confirmed.total)}${notes ? `\nملاحظات: ${notes}` : ""}`;

    return (
      <div className="rounded-2xl bg-white p-8 text-center shadow-soft">
        <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-forest-light/15">
          <CheckCircle2 className="h-9 w-9 text-forest-light" />
        </span>
        <h3 className="mt-4 font-heading text-2xl font-extrabold text-forest">
          تم استلام طلبك!
        </h3>
        <p className="mt-2 text-ink/70">
          سنتصل بك قريبًا لتأكيد الطلب. الدفع عند الاستلام.
        </p>
        <a
          href={buildWhatsAppLink(waMessage)}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-gold mx-auto mt-6"
        >
          <MessageCircle className="h-5 w-5" />
          أكّد عبر WhatsApp
        </a>
      </div>
    );
  }

  // ===== النموذج =====
  return (
    <form
      onSubmit={submit}
      noValidate
      className="rounded-2xl border-2 border-gold/30 bg-white p-5 shadow-soft sm:p-6"
    >
      <h3 className="text-center font-heading text-xl font-extrabold text-forest">
        اطلب الآن — الدفع عند الاستلام
      </h3>

      {/* ملخّص المنتج */}
      <div className="mt-4 flex items-center gap-3 rounded-xl bg-sand/30 p-3">
        <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg bg-sand/40">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="64px"
            className="object-cover"
          />
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate font-heading font-bold text-forest">
            {product.shortName}
          </p>
          <p className="text-sm text-gold-dark">{formatPrice(pack.price)}</p>
        </div>
      </div>

      {/* اختيار الباقة */}
      <div className="mt-4 grid gap-2">
        {product.packs.map((p) => {
          const active = packId === p.id;
          return (
            <button
              key={p.id}
              type="button"
              onClick={() => setPackId(p.id)}
              className={cn(
                "flex items-center justify-between rounded-xl border-2 p-3 text-start text-sm transition-all",
                active ? "border-gold bg-gold/10" : "border-sand",
              )}
            >
              <span className="flex items-center gap-2">
                <span
                  className={cn(
                    "flex h-4 w-4 items-center justify-center rounded-full border-2",
                    active ? "border-gold bg-gold" : "border-sand",
                  )}
                >
                  {active && <Check className="h-2.5 w-2.5 text-forest" />}
                </span>
                <span className="font-bold text-forest">{p.label}</span>
                {p.badge && (
                  <span className="rounded-full bg-gold px-2 py-0.5 text-[10px] font-bold text-forest">
                    {p.badge}
                  </span>
                )}
              </span>
              <span className="font-heading font-extrabold text-gold-dark">
                {formatPrice(p.price)}
              </span>
            </button>
          );
        })}
      </div>

      {/* الحقول */}
      <div className="mt-4 space-y-3">
        <Field
          label="الاسم الكامل"
          value={fullName}
          onChange={setFullName}
          error={errors.fullName}
          placeholder="مثال: محمد أمين"
        />
        <Field
          label="رقم الهاتف"
          value={phone}
          onChange={setPhone}
          error={errors.phone}
          placeholder="0551234567"
          inputMode="tel"
        />
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="mb-1 block text-sm font-bold text-forest">
              الولاية
            </label>
            <select
              value={wilaya}
              onChange={(e) => setWilaya(e.target.value)}
              className={cn(
                "h-11 w-full rounded-xl border-2 bg-white px-3 text-sm outline-none focus:border-gold",
                errors.wilaya ? "border-red-400" : "border-sand",
              )}
            >
              <option value="">اختر</option>
              {WILAYAS.map((w) => (
                <option key={w.code} value={`${w.code} - ${w.name}`}>
                  {w.code} - {w.name}
                </option>
              ))}
            </select>
            {errors.wilaya && (
              <p className="mt-1 text-xs text-red-500">{errors.wilaya}</p>
            )}
          </div>
          <Field
            label="البلدية"
            value={commune}
            onChange={setCommune}
            error={errors.commune}
            placeholder="البلدية"
          />
        </div>
        <Field
          label="العنوان الكامل"
          value={address}
          onChange={setAddress}
          error={errors.address}
          placeholder="الحي، الشارع، رقم المنزل"
        />

        {/* ملاحظات (اختياري) */}
        <div>
          <label className="mb-1 block text-sm font-bold text-forest">
            ملاحظات (اختياري)
          </label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={2}
            placeholder="أي تفاصيل إضافية..."
            className="w-full rounded-xl border-2 border-sand bg-white px-3 py-2 text-sm outline-none focus:border-gold"
          />
        </div>

        {/* نوع التوصيل */}
        <div>
          <label className="mb-1 block text-sm font-bold text-forest">
            نوع التوصيل
          </label>
          <div className="grid grid-cols-2 gap-2">
            <DeliveryBtn
              active={delivery === "home"}
              onClick={() => setDelivery("home")}
              icon={Home}
              title="للمنزل"
              price={product.freeShipping ? 0 : SHIPPING.home}
            />
            <DeliveryBtn
              active={delivery === "stopdesk"}
              onClick={() => setDelivery("stopdesk")}
              icon={Building2}
              title="للمكتب"
              price={product.freeShipping ? 0 : SHIPPING.stopdesk}
            />
          </div>
        </div>

        {/* الكمية */}
        <div className="flex items-center justify-between">
          <span className="text-sm font-bold text-forest">الكمية</span>
          <div className="flex items-center rounded-xl border-2 border-sand">
            <button
              type="button"
              onClick={() => setQty((q) => Math.max(1, q - 1))}
              className="h-9 w-9 text-forest"
            >
              −
            </button>
            <span className="w-8 text-center font-bold">{qty}</span>
            <button
              type="button"
              onClick={() => setQty((q) => q + 1)}
              className="h-9 w-9 text-forest"
            >
              +
            </button>
          </div>
        </div>
      </div>

      {/* المجموع */}
      <div className="mt-4 space-y-1 border-t border-sand pt-3 text-sm">
        <Row label="المجموع الفرعي" value={formatPrice(subtotal)} />
        <Row
          label="رسوم التوصيل"
          value={shipping === 0 ? "مجاني 🎉" : formatPrice(shipping)}
        />
        <div className="flex justify-between border-t border-sand pt-2 font-heading text-lg font-extrabold text-forest">
          <span>المجموع</span>
          <span className="text-gold-dark">{formatPrice(total)}</span>
        </div>
      </div>

      <button type="submit" className="btn-gold mt-4 w-full text-lg">
        تأكيد الطلب — {formatPrice(total)}
      </button>
      <p className="mt-2 text-center text-xs text-ink/50">
        الدفع عند الاستلام • لا حاجة للدفع الآن
      </p>
    </form>
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
      <label className="mb-1 block text-sm font-bold text-forest">{label}</label>
      <input
        type="text"
        inputMode={inputMode}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={cn(
          "h-11 w-full rounded-xl border-2 bg-white px-3 text-sm outline-none focus:border-gold",
          error ? "border-red-400" : "border-sand",
        )}
      />
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
}

function DeliveryBtn({
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
        "flex items-center gap-2 rounded-xl border-2 p-3 text-start transition-all",
        active ? "border-gold bg-gold/10" : "border-sand",
      )}
    >
      <Icon className="h-5 w-5 text-forest-light" />
      <span className="text-sm">
        <span className="block font-bold text-forest">{title}</span>
        <span className="text-ink/60">
          {price === 0 ? "مجاني" : formatPrice(price)}
        </span>
      </span>
    </button>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between text-ink/70">
      <span>{label}</span>
      <span>{value}</span>
    </div>
  );
}
