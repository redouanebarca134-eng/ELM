import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container-elm flex flex-col items-center justify-center py-28 text-center">
      <span className="font-heading text-7xl font-extrabold text-gold">404</span>
      <h1 className="mt-4 font-heading text-2xl font-extrabold text-forest">
        الصفحة غير موجودة
      </h1>
      <p className="mt-2 text-ink/60">
        عذرًا، الصفحة التي تبحث عنها غير متوفّرة.
      </p>
      <Link href="/" className="btn-gold mt-6">
        العودة للرئيسية
      </Link>
    </div>
  );
}
