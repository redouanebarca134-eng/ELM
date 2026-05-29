"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/utils";

export default function CartPage() {
  const { items, subtotal, setQuantity, removeItem } = useCart();

  if (items.length === 0) {
    return (
      <div className="container-elm flex flex-col items-center justify-center py-24 text-center">
        <span className="flex h-20 w-20 items-center justify-center rounded-full bg-sand/60">
          <ShoppingBag className="h-9 w-9 text-forest-light" />
        </span>
        <h1 className="mt-6 font-heading text-2xl font-extrabold text-forest">
          سلتك فارغة
        </h1>
        <p className="mt-2 text-ink/60">لم تُضِف أي منتج بعد.</p>
        <Link href="/shop" className="btn-gold mt-6">
          تصفّح المتجر
        </Link>
      </div>
    );
  }

  return (
    <div className="container-elm section-pad">
      <h1 className="font-heading text-3xl font-extrabold text-forest">
        سلة المشتريات
      </h1>

      <div className="mt-8 grid gap-8 lg:grid-cols-3">
        {/* قائمة المنتجات */}
        <div className="space-y-4 lg:col-span-2">
          {items.map((item) => (
            <div
              key={item.key}
              className="flex gap-4 rounded-2xl bg-white p-4 shadow-soft"
            >
              <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-xl bg-sand/40">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  sizes="96px"
                  className="object-cover"
                />
              </div>
              <div className="flex flex-1 flex-col">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-heading font-bold text-forest">
                    {item.name}
                  </h3>
                  <button
                    type="button"
                    onClick={() => removeItem(item.key)}
                    aria-label="حذف"
                    className="text-ink/40 transition-colors hover:text-red-500"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
                <span className="mt-1 font-heading font-extrabold text-gold-dark">
                  {formatPrice(item.price)}
                </span>
                <div className="mt-auto flex items-center justify-between pt-2">
                  <div className="flex items-center rounded-xl border-2 border-sand">
                    <button
                      type="button"
                      aria-label="إنقاص"
                      onClick={() => setQuantity(item.key, item.quantity - 1)}
                      className="flex h-9 w-9 items-center justify-center text-forest hover:bg-sand/50"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="w-10 text-center font-heading font-bold">
                      {item.quantity}
                    </span>
                    <button
                      type="button"
                      aria-label="زيادة"
                      onClick={() => setQuantity(item.key, item.quantity + 1)}
                      className="flex h-9 w-9 items-center justify-center text-forest hover:bg-sand/50"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                  <span className="font-heading font-bold text-forest">
                    {formatPrice(item.price * item.quantity)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* الملخّص */}
        <div className="h-fit rounded-2xl bg-white p-6 shadow-soft">
          <h2 className="font-heading text-xl font-bold text-forest">
            ملخّص الطلب
          </h2>
          <div className="mt-4 flex items-center justify-between text-ink/70">
            <span>المجموع الفرعي</span>
            <span className="font-heading font-bold text-forest">
              {formatPrice(subtotal)}
            </span>
          </div>
          <p className="mt-1 text-sm text-ink/50">
            تُحتسب رسوم التوصيل عند إتمام الطلب.
          </p>
          <Link href="/checkout" className="btn-gold mt-6 w-full">
            متابعة الطلب
          </Link>
          <Link
            href="/shop"
            className="mt-3 flex items-center justify-center gap-1 text-sm font-bold text-forest hover:text-gold"
          >
            <ArrowLeft className="h-4 w-4" />
            مواصلة التسوّق
          </Link>
        </div>
      </div>
    </div>
  );
}
