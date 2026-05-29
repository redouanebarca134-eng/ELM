"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Check, Truck, ShieldCheck } from "lucide-react";
import { SHILAJIT } from "@/lib/products";
import { useCart } from "@/context/CartContext";
import { formatPrice, cn } from "@/lib/utils";

// بلوك العرض والسعر على صفحة الهبوط
export default function OfferBlock() {
  const router = useRouter();
  const { addItem } = useCart();
  const [packId, setPackId] = useState(SHILAJIT.packs[1]?.id ?? "single");
  const pack =
    SHILAJIT.packs.find((p) => p.id === packId) ?? SHILAJIT.packs[0];

  function order() {
    addItem(
      {
        key: `${SHILAJIT.slug}__${pack.id}`,
        slug: SHILAJIT.slug,
        name: `${SHILAJIT.name} — ${pack.label}`,
        packLabel: pack.label,
        price: pack.price,
        image: SHILAJIT.image,
      },
      1,
    );
    router.push("/checkout");
  }

  return (
    <div className="mx-auto grid max-w-4xl overflow-hidden rounded-2xl bg-white shadow-soft md:grid-cols-2">
      {/* الصورة */}
      <div className="relative min-h-[260px] bg-forest">
        <Image
          src={SHILAJIT.image}
          alt={SHILAJIT.name}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover"
        />
        <span className="absolute top-4 start-4 rounded-full bg-gold px-3 py-1 font-heading text-sm font-bold text-forest">
          عرض خاص
        </span>
      </div>

      {/* الخيارات */}
      <div className="p-6 sm:p-8">
        <h3 className="font-heading text-2xl font-extrabold text-forest">
          {SHILAJIT.name}
        </h3>

        <div className="mt-3 space-y-2">
          {SHILAJIT.packs.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => setPackId(p.id)}
              className={cn(
                "flex w-full items-center justify-between rounded-xl border-2 p-3 text-start transition-all",
                packId === p.id
                  ? "border-gold bg-gold/10"
                  : "border-sand hover:border-gold/50",
              )}
            >
              <span className="flex items-center gap-2">
                <span
                  className={cn(
                    "flex h-5 w-5 items-center justify-center rounded-full border-2",
                    packId === p.id
                      ? "border-gold bg-gold text-forest"
                      : "border-sand",
                  )}
                >
                  {packId === p.id && <Check className="h-3 w-3" />}
                </span>
                <span className="font-heading font-bold text-forest">
                  {p.label}
                </span>
                {p.badge && (
                  <span className="rounded-full bg-forest-light px-2 py-0.5 text-xs font-bold text-cream">
                    {p.badge}
                  </span>
                )}
              </span>
              <span className="font-heading font-extrabold text-gold-dark">
                {formatPrice(p.price)}
              </span>
            </button>
          ))}
        </div>

        <button type="button" onClick={order} className="btn-gold mt-5 w-full text-lg">
          اطلب الآن
        </button>

        <div className="mt-4 flex flex-col gap-2 text-sm text-ink/70">
          <span className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-forest-light" /> دفع عند
            الاستلام
          </span>
          <span className="flex items-center gap-2">
            <Truck className="h-4 w-4 text-forest-light" /> توصيل سريع لكل
            الولايات
          </span>
        </div>
      </div>
    </div>
  );
}
