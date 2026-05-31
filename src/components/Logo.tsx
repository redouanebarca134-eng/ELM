import Link from "next/link";
import Image from "next/image";
import { BRAND } from "@/lib/constants";

// شعار ELM — يعرض الصورة الحقيقية من public/logo.png
// مع نص احتياطي (ELM + الشعار) في حال عدم رفع الصورة بعد.
export default function Logo({
  variant = "dark",
  showWordmark = false,
}: {
  variant?: "dark" | "light";
  showWordmark?: boolean;
}) {
  const textColor = variant === "light" ? "text-cream" : "text-forest";
  const taglineColor = variant === "light" ? "text-cream/70" : "text-forest/60";
  return (
    <Link
      href="/"
      className="flex items-center gap-2.5"
      aria-label="ELM — الصفحة الرئيسية"
    >
      <span className="relative flex h-12 w-12 items-center justify-center overflow-hidden rounded-full bg-white shadow-sm ring-1 ring-gold/30">
        <Image
          src="/logo.png"
          alt="شعار ELM"
          fill
          sizes="48px"
          className="object-cover"
          priority
        />
      </span>
      {showWordmark && (
        <span className="flex flex-col leading-none">
          <span
            className={`font-heading text-2xl font-extrabold tracking-tight ${textColor}`}
          >
            {BRAND.name}
          </span>
          <span className={`mt-0.5 text-[10px] font-medium ${taglineColor}`}>
            {BRAND.sloganFr}
          </span>
        </span>
      )}
    </Link>
  );
}
