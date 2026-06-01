"use client";

import { Flame } from "lucide-react";
import { PROMO } from "@/lib/promo";

// شارة ندرة المخزون — رقم ثابت لكل منتج (لا يتغيّر عشوائيًا أمام الزائر)
// مشتقّ من الـ slug ليبقى صادقًا ومتسقًا.
function stockFor(slug: string) {
  let hash = 0;
  for (let i = 0; i < slug.length; i++) hash = (hash * 31 + slug.charCodeAt(i)) >>> 0;
  const range = PROMO.stockMax - PROMO.stockMin + 1;
  return PROMO.stockMin + (hash % range);
}

export default function StockBadge({ slug }: { slug: string }) {
  const count = stockFor(slug);
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-red-50 px-3 py-1 text-sm font-bold text-red-600">
      <Flame className="h-4 w-4" />
      بقي {count} قطع فقط — اطلب قبل نفاد الكمية
    </span>
  );
}
