import Link from "next/link";

// شعار ELM — رمز جبلي + اسم العلامة
export default function Logo({
  variant = "dark",
}: {
  variant?: "dark" | "light";
}) {
  const textColor = variant === "light" ? "text-cream" : "text-forest";
  return (
    <Link
      href="/"
      className="flex items-center gap-2"
      aria-label="ELM — الصفحة الرئيسية"
    >
      <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gold/15">
        <svg
          viewBox="0 0 24 24"
          className="h-6 w-6 text-gold"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M2 20L8 8l4 6 3-5 5 11H2z"
            fill="currentColor"
            opacity="0.9"
          />
          <path d="M8 8l-2 4" stroke="#FAF6EC" strokeWidth="1" />
        </svg>
      </span>
      <span className={`font-heading text-2xl font-extrabold tracking-tight ${textColor}`}>
        ELM
      </span>
    </Link>
  );
}
