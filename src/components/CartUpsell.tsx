"use client";

import Image from "next/image";
import { Plus, Sparkles } from "lucide-react";
import { PRODUCTS } from "@/lib/products";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/utils";

// اقتراح بيع إضافي في السلة — يعرض منتجًا ليس في السلة بخصم تشجيعي.
export default function CartUpsell() {
  const { items, addItem } = useCart();

  // المنتجات غير الموجودة حاليًا في السلة
  const inCart = new Set(items.map((i) => i.slug));
  const suggestions = PRODUCTS.filter((p) => !inCart.has(p.slug)).slice(0, 2);

  if (suggestions.length === 0) return null;

  return (
    <div className="rounded-2xl border border-gold/30 bg-white p-5 shadow-soft">
      <h3 className="flex items-center gap-2 font-heading font-bold text-forest">
        <Sparkles className="h-5 w-5 text-gold" />
        أضِفها إلى طلبك
      </h3>
      <p className="mt-1 text-sm text-ink/60">
        عملاؤنا يحبّون أن يجمعوا هذه المنتجات معًا.
      </p>

      <div className="mt-4 space-y-3">
        {suggestions.map((p) => {
          const pack = p.packs[0];
          return (
            <div
              key={p.slug}
              className="flex items-center gap-3 rounded-xl border border-sand p-3"
            >
              <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg bg-sand/40">
                <Image
                  src={p.image}
                  alt={p.name}
                  fill
                  sizes="64px"
                  className="object-cover"
                />
              </div>
              <div className="min-w-0 flex-1">
                <h4 className="truncate font-heading text-sm font-bold text-forest">
                  {p.shortName}
                </h4>
                <div className="mt-0.5 flex items-center gap-2">
                  <span className="font-heading font-bold text-gold-dark">
                    {formatPrice(pack.price)}
                  </span>
                  {pack.oldPrice && (
                    <span className="text-xs text-ink/40 line-through">
                      {formatPrice(pack.oldPrice)}
                    </span>
                  )}
                </div>
              </div>
              <button
                type="button"
                aria-label={`أضف ${p.shortName}`}
                onClick={() =>
                  addItem(
                    {
                      key: `${p.slug}__${pack.id}`,
                      slug: p.slug,
                      name: `${p.name} — ${pack.label}`,
                      packLabel: pack.label,
                      price: pack.price,
                      image: p.image,
                    },
                    1,
                  )
                }
                className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-gold text-forest transition-transform hover:scale-110"
              >
                <Plus className="h-5 w-5" />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
