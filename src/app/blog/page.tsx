import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Clock, ArrowLeft } from "lucide-react";
import { ARTICLES } from "@/lib/articles";

export const metadata: Metadata = {
  title: "نصائح وصحة طبيعية",
  description:
    "مدوّنة ELM — نصائح عملية حول الصحة الطبيعية، الطاقة، والعافية اليومية. محتوى موثوق من مصدر تثق به.",
};

export default function BlogPage() {
  const articles = [...ARTICLES].sort((a, b) => b.date.localeCompare(a.date));

  return (
    <div className="bg-cream">
      {/* رأس الصفحة */}
      <section className="relative overflow-hidden bg-forest py-16 text-center">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(201,162,75,0.18),transparent_55%)]" />
        <div className="container-elm relative">
          <h1 className="font-heading text-4xl font-extrabold text-cream">
            نصائح وصحة طبيعية
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-cream/80">
            معلومات عملية حول العافية والطاقة والعادات الطبيعية — من ELM.
          </p>
        </div>
      </section>

      {/* قائمة المقالات */}
      <section className="container-elm section-pad">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {articles.map((a) => (
            <Link
              key={a.slug}
              href={`/blog/${a.slug}`}
              className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-soft transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-sand/40">
                <Image
                  src={a.cover}
                  alt={a.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span className="absolute top-3 start-3 rounded-full bg-gold px-3 py-1 font-heading text-xs font-bold text-forest">
                  {a.category}
                </span>
              </div>
              <div className="flex flex-1 flex-col p-5">
                <div className="flex items-center gap-1.5 text-xs text-ink/50">
                  <Clock className="h-3.5 w-3.5" />
                  {a.readMinutes} دقائق قراءة
                </div>
                <h2 className="mt-2 font-heading text-lg font-bold text-forest transition-colors group-hover:text-gold-dark">
                  {a.title}
                </h2>
                <p className="mt-2 line-clamp-3 flex-1 text-sm text-ink/60">
                  {a.excerpt}
                </p>
                <span className="mt-4 flex items-center gap-1 text-sm font-bold text-gold-dark">
                  اقرأ المقال
                  <ArrowLeft className="h-4 w-4" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
