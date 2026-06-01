"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingCart } from "lucide-react";

// زر دعوة ثابت أسفل الشاشة على الجوال — دائم الظهور لتسهيل الطلب.
// يظهر فقط على صفحات البيع (الرئيسية والمنتج)، ويُخفى في السلة/الطلب.
export default function StickyMobileCTA() {
  const pathname = usePathname();
  const hidden =
    pathname.startsWith("/checkout") ||
    pathname.startsWith("/cart") ||
    pathname.startsWith("/contact");

  if (hidden) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-sand bg-cream/95 p-3 backdrop-blur-md md:hidden">
      <Link
        href="/product/shilajit"
        className="btn-gold w-full text-base"
      >
        <ShoppingCart className="h-5 w-5" />
        اطلب الآن — الدفع عند الاستلام
      </Link>
    </div>
  );
}
