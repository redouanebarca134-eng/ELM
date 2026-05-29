import Link from "next/link";
import { BRAND } from "@/lib/constants";

// شعار ELM — شجرة الحياة + اسم العلامة + الشعار النصي
export default function Logo({
  variant = "dark",
  showTagline = true,
}: {
  variant?: "dark" | "light";
  showTagline?: boolean;
}) {
  const textColor = variant === "light" ? "text-cream" : "text-forest";
  const taglineColor = variant === "light" ? "text-cream/70" : "text-forest/60";
  return (
    <Link
      href="/"
      className="flex items-center gap-2.5"
      aria-label="ELM — الصفحة الرئيسية"
    >
      <span className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-gold/60 bg-gold/10">
        <svg
          viewBox="0 0 48 48"
          className="h-7 w-7"
          fill="none"
          aria-hidden="true"
        >
          {/* أوراق الشجرة */}
          <g className="text-forest-light" fill="currentColor">
            <circle cx="24" cy="13" r="5" />
            <circle cx="16" cy="18" r="4.5" />
            <circle cx="32" cy="18" r="4.5" />
            <circle cx="20" cy="10" r="3.5" />
            <circle cx="29" cy="10" r="3.5" />
          </g>
          {/* ثمرة ذهبية */}
          <circle cx="30" cy="20" r="2.6" className="text-gold" fill="currentColor" />
          {/* الجذع والجذور */}
          <path
            d="M24 17v14M24 31c-3 2-5 3-8 3.5M24 31c3 2 5 3 8 3.5M24 31c-1.5 2.5-2 4-2 6M24 31c1.5 2.5 2 4 2 6"
            className="text-forest"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </svg>
      </span>
      <span className="flex flex-col leading-none">
        <span
          className={`font-heading text-2xl font-extrabold tracking-tight ${textColor}`}
        >
          ELM
        </span>
        {showTagline && (
          <span className={`mt-0.5 text-[10px] font-medium ${taglineColor}`}>
            {BRAND.sloganFr}
          </span>
        )}
      </span>
    </Link>
  );
}
