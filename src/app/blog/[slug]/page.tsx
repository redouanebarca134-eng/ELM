import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Clock, ArrowLeft } from "lucide-react";
import { ARTICLES, getArticle } from "@/lib/articles";
import { getProduct } from "@/lib/products";
import { formatPrice } from "@/lib/utils";

export function generateStaticParams() {
  return ARTICLES.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return { title: "المقال غير موجود" };
  return {
    title: article.title,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: "article",
      images: [{ url: article.cover }],
    },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  const product = article.related ? getProduct(article.related) : undefined;
  const more = ARTICLES.filter((a) => a.slug !== article.slug).slice(0, 2);

  return (
    <div className="bg-cream">
      {/* صورة الغلاف */}
      <div className="relative h-64 w-full overflow-hidden sm:h-80">
        <Image
          src={article.cover}
          alt={article.title}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-forest/80 to-transparent" />
      </div>

      <article className="container-elm -mt-20 max-w-3xl pb-16">
        <div className="rounded-2xl bg-white p-6 shadow-soft sm:p-10">
          {/* مسار التنقّل */}
          <div className="text-sm text-ink/50">
            <Link href="/" className="hover:text-gold">
              الرئيسية
            </Link>{" "}
            /{" "}
            <Link href="/blog" className="hover:text-gold">
              المدوّنة
            </Link>
          </div>

          <span className="mt-4 inline-block rounded-full bg-gold/15 px-3 py-1 font-heading text-xs font-bold text-gold-dark">
            {article.category}
          </span>
          <h1 className="mt-3 font-heading text-3xl font-extrabold leading-tight text-forest sm:text-4xl">
            {article.title}
          </h1>
          <div className="mt-3 flex items-center gap-1.5 text-sm text-ink/50">
            <Clock className="h-4 w-4" />
            {article.readMinutes} دقائق قراءة
          </div>

          {/* المحتوى */}
          <div className="mt-8 space-y-4 leading-loose text-ink/80">
            {article.blocks.map((b, i) => {
              if (b.type === "h2")
                return (
                  <h2
                    key={i}
                    className="pt-4 font-heading text-2xl font-bold text-forest"
                  >
                    {b.text}
                  </h2>
                );
              if (b.type === "li")
                return (
                  <li key={i} className="ms-6 list-disc">
                    {b.text}
                  </li>
                );
              return (
                <p key={i} className="text-lg">
                  {b.text}
                </p>
              );
            })}
          </div>

          {/* دعوة لمنتج مرتبط */}
          {product && (
            <div className="mt-10 flex flex-col items-center gap-4 rounded-2xl border border-gold/30 bg-gold/5 p-6 sm:flex-row">
              <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-xl bg-sand/40">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  sizes="96px"
                  className="object-cover"
                />
              </div>
              <div className="flex-1 text-center sm:text-start">
                <h3 className="font-heading text-lg font-bold text-forest">
                  {product.name}
                </h3>
                <p className="text-sm text-ink/60">{product.tagline}</p>
                <div className="mt-1 font-heading font-extrabold text-gold-dark">
                  {formatPrice(product.price)}
                </div>
              </div>
              <Link href={`/product/${product.slug}`} className="btn-gold">
                اطلب الآن
              </Link>
            </div>
          )}
        </div>

        {/* مقالات أخرى */}
        {more.length > 0 && (
          <div className="mt-12">
            <h2 className="font-heading text-2xl font-bold text-forest">
              اقرأ أيضًا
            </h2>
            <div className="mt-6 grid gap-6 sm:grid-cols-2">
              {more.map((a) => (
                <Link
                  key={a.slug}
                  href={`/blog/${a.slug}`}
                  className="group flex gap-4 rounded-2xl bg-white p-4 shadow-soft transition-shadow hover:shadow-lg"
                >
                  <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-xl bg-sand/40">
                    <Image
                      src={a.cover}
                      alt={a.title}
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-col justify-center">
                    <h3 className="font-heading text-sm font-bold text-forest group-hover:text-gold-dark">
                      {a.title}
                    </h3>
                    <span className="mt-1 flex items-center gap-1 text-xs font-bold text-gold-dark">
                      اقرأ <ArrowLeft className="h-3 w-3" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </article>
    </div>
  );
}
