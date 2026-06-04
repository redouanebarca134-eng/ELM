"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingCart, Menu, X } from "lucide-react";
import { NAV_LINKS } from "@/lib/constants";
import { useCart } from "@/context/CartContext";
import Logo from "./Logo";
import { cn } from "@/lib/utils";

export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const { count } = useCart();

  return (
    <header className="sticky top-0 z-50 border-b border-white/40 bg-cream/70 backdrop-blur-xl">
      <div className="container-elm flex h-16 items-center justify-between gap-4">
        {/* الشعار على اليمين (RTL) */}
        <Logo />

        {/* القائمة في الوسط — سطح المكتب */}
        <nav className="hidden items-center gap-7 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "font-heading text-sm font-bold transition-colors hover:text-gold",
                pathname === link.href ? "text-gold" : "text-forest",
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* السلة + زر الطلب على اليسار (RTL) */}
        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            href="/cart"
            aria-label="سلة المشتريات"
            className="relative flex h-11 w-11 items-center justify-center rounded-2xl text-forest transition-colors hover:bg-sand/60"
          >
            <ShoppingCart className="h-5 w-5" />
            {count > 0 && (
              <span className="absolute -top-1 -start-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-gold px-1 text-xs font-bold text-forest">
                {count}
              </span>
            )}
          </Link>

          <Link href="/product/shilajit" className="btn-gold hidden sm:inline-flex !min-h-[44px] !px-5 !py-2">
            اطلب الآن
          </Link>

          {/* زر القائمة — الجوال */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label="القائمة"
            aria-expanded={open}
            className="flex h-11 w-11 items-center justify-center rounded-2xl text-forest transition-colors hover:bg-sand/60 md:hidden"
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* قائمة الجوال المنسدلة */}
      {open && (
        <nav className="border-t border-sand/60 bg-cream md:hidden">
          <div className="container-elm flex flex-col py-3">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "rounded-xl px-3 py-3 font-heading text-base font-bold transition-colors hover:bg-sand/60",
                  pathname === link.href ? "text-gold" : "text-forest",
                )}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/product/shilajit"
              onClick={() => setOpen(false)}
              className="btn-gold mt-2"
            >
              اطلب الآن — الدفع عند الاستلام
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
