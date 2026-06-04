"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Minus, Plus, ShoppingCart, Check } from "lucide-react";
import type { Product } from "@/lib/products";
import { useCart } from "@/context/CartContext";
import { formatPrice, cn } from "@/lib/utils";
import { trackEvent } from "@/lib/pixel";

export default function AddToCartForm({ product }: { product: Product }) {
  const router = useRouter();
  const { addItem } = useCart();
  const [selectedPackId, setSelectedPackId] = useState(
    product.packs[0]?.id ?? "single",
  );
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const pack =
    product.packs.find((p) => p.id === selectedPackId) ?? product.packs[0];

  function buildItem() {
    return {
      key: `${product.slug}__${pack.id}`,
      slug: product.slug,
      name: `${product.name} — ${pack.label}`,
      packLabel: pack.label,
      price: pack.price,
      image: product.image,
    };
  }

  function handleAdd() {
    addItem(buildItem(), quantity);
    trackEvent("AddToCart", {
      content_name: product.name,
      content_ids: [product.slug],
      content_type: "product",
      value: pack.price * quantity,
      currency: "DZD",
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  }

  function handleBuyNow() {
    addItem(buildItem(), quantity);
    trackEvent("InitiateCheckout", {
      content_name: product.name,
      content_ids: [product.slug],
      content_type: "product",
      value: pack.price * quantity,
      currency: "DZD",
    });
    router.push("/checkout");
  }

  return (
    <div className="space-y-6">
      {/* السعر */}
      <div className="flex items-center gap-3">
        <span className="font-heading text-3xl font-extrabold text-gold-dark">
          {formatPrice(pack.price)}
        </span>
        {pack.oldPrice && (
          <span className="text-lg text-ink/40 line-through">
            {formatPrice(pack.oldPrice)}
          </span>
        )}
      </div>

      {/* اختيار الباقة */}
      <div>
        <h3 className="mb-3 font-heading text-sm font-bold text-forest">
          اختر الباقة المناسبة لك
        </h3>
        <div className="grid gap-3">
          {product.packs.map((p) => {
            const saving =
              p.oldPrice && p.oldPrice > p.price
                ? Math.round(((p.oldPrice - p.price) / p.oldPrice) * 100)
                : 0;
            const isActive = selectedPackId === p.id;
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => setSelectedPackId(p.id)}
                className={cn(
                  "relative flex items-center justify-between rounded-2xl border-2 p-4 text-start transition-all",
                  isActive
                    ? "border-gold bg-gold/10 shadow-[0_8px_24px_-10px_rgba(201,162,75,0.6)]"
                    : "border-sand bg-white hover:border-gold/50",
                )}
              >
                <div className="flex items-start gap-3">
                  {/* دائرة الاختيار */}
                  <span
                    className={cn(
                      "mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full border-2",
                      isActive ? "border-gold bg-gold" : "border-sand",
                    )}
                  >
                    {isActive && <Check className="h-3 w-3 text-forest" />}
                  </span>
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-heading font-bold text-forest">
                        {p.label}
                      </span>
                      {p.badge && (
                        <span className="rounded-full bg-gold px-2 py-0.5 text-xs font-bold text-forest">
                          {p.badge}
                        </span>
                      )}
                    </div>
                    <p className="mt-0.5 text-sm text-ink/60">{p.description}</p>
                  </div>
                </div>
                <div className="flex-shrink-0 text-end">
                  <div className="font-heading font-extrabold text-gold-dark">
                    {formatPrice(p.price)}
                  </div>
                  {p.oldPrice && (
                    <div className="text-xs text-ink/40 line-through">
                      {formatPrice(p.oldPrice)}
                    </div>
                  )}
                  {saving > 0 && (
                    <div className="mt-1 inline-block rounded-full bg-forest-light/15 px-2 py-0.5 text-xs font-bold text-forest-light">
                      وفّر {saving}%
                    </div>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* الكمية */}
      <div className="flex items-center gap-4">
        <span className="font-heading text-sm font-bold text-forest">
          الكمية
        </span>
        <div className="flex items-center rounded-2xl border-2 border-sand">
          <button
            type="button"
            aria-label="إنقاص"
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            className="flex h-11 w-11 items-center justify-center text-forest hover:bg-sand/50"
          >
            <Minus className="h-4 w-4" />
          </button>
          <span className="w-12 text-center font-heading text-lg font-bold">
            {quantity}
          </span>
          <button
            type="button"
            aria-label="زيادة"
            onClick={() => setQuantity((q) => q + 1)}
            className="flex h-11 w-11 items-center justify-center text-forest hover:bg-sand/50"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* الأزرار */}
      <div className="flex flex-col gap-3 sm:flex-row">
        <button type="button" onClick={handleBuyNow} className="btn-gold flex-1">
          اطلب الآن — الدفع عند الاستلام
        </button>
        <button
          type="button"
          onClick={handleAdd}
          className="btn-outline flex-1 text-forest"
        >
          {added ? (
            <>
              <Check className="h-5 w-5" /> أُضيف
            </>
          ) : (
            <>
              <ShoppingCart className="h-5 w-5" /> أضف إلى السلة
            </>
          )}
        </button>
      </div>

      <p className="text-center text-sm text-ink/60">
        {product.stockNote} • توصيل سريع لكل الولايات
      </p>
    </div>
  );
}
