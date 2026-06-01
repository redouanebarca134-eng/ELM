import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { ShieldCheck, Truck, BadgeCheck } from "lucide-react";
import { getProduct, PRODUCTS } from "@/lib/products";
import { TESTIMONIALS } from "@/lib/content";
import ProductGallery from "@/components/ProductGallery";
import AddToCartForm from "@/components/AddToCartForm";
import ProductTabs from "@/components/ProductTabs";
import ProductCard from "@/components/ProductCard";
import SectionHeading from "@/components/SectionHeading";
import Stars from "@/components/Stars";
import ViewContentTracker from "@/components/ViewContentTracker";

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return { title: "المنتج غير موجود" };
  return {
    title: product.name,
    description: product.tagline,
    openGraph: {
      title: product.name,
      description: product.tagline,
      images: [{ url: product.image }],
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const related = PRODUCTS.filter((p) => p.slug !== product.slug);

  return (
    <div className="bg-cream">
      <ViewContentTracker
        slug={product.slug}
        name={product.name}
        price={product.price}
      />
      {/* مسار التنقل */}
      <div className="container-elm pt-6 text-sm text-ink/50">
        <Link href="/" className="hover:text-gold">
          الرئيسية
        </Link>{" "}
        / <Link href="/shop" className="hover:text-gold">المتجر</Link> /{" "}
        <span className="text-forest">{product.shortName}</span>
      </div>

      {/* القسم الرئيسي */}
      <section className="container-elm grid gap-10 py-8 lg:grid-cols-2 lg:gap-14">
        {/* المعرض على اليمين (RTL) */}
        <ProductGallery images={product.gallery} alt={product.name} />

        {/* المعلومات على اليسار */}
        <div>
          <h1 className="font-heading text-3xl font-extrabold text-forest sm:text-4xl">
            {product.name}
          </h1>
          <div className="mt-3 flex items-center gap-3">
            <Stars rating={product.rating} />
            <span className="text-sm text-ink/60">
              {product.rating} ({product.reviewsCount} تقييم)
            </span>
          </div>
          <p className="mt-4 text-lg leading-relaxed text-ink/70">
            {product.tagline}
          </p>

          <div className="mt-6">
            <AddToCartForm product={product} />
          </div>

          {/* بنود الثقة */}
          <div className="mt-8 grid grid-cols-3 gap-3 border-t border-sand pt-6">
            <TrustItem icon={ShieldCheck} label="عضوي 100%" />
            <TrustItem icon={BadgeCheck} label="عضوي معتمد Bio" />
            <TrustItem icon={Truck} label="دفع عند الاستلام" />
          </div>
        </div>
      </section>

      {/* التبويبات */}
      <section className="container-elm py-8">
        <div className="rounded-2xl bg-white p-6 shadow-soft sm:p-8">
          <ProductTabs product={product} />
        </div>
      </section>

      {/* آراء العملاء */}
      <section className="container-elm py-8">
        <SectionHeading eyebrow="آراء العملاء" title="تقييمات حقيقية" />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {TESTIMONIALS.map((t) => (
            <figure
              key={t.name}
              className="flex h-full flex-col rounded-2xl bg-white p-6 shadow-soft"
            >
              <Stars rating={5} />
              <blockquote className="mt-3 flex-1 leading-relaxed text-ink/80">
                “{t.text}”
              </blockquote>
              <figcaption className="mt-4 font-heading font-bold text-forest">
                {t.name}
                <span className="font-body text-sm font-normal text-ink/50">
                  {" "}
                  — {t.wilaya}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* منتجات ذات صلة */}
      {related.length > 0 && (
        <section className="container-elm py-12">
          <SectionHeading eyebrow="قد يعجبك أيضًا" title="منتجات ذات صلة" />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

function TrustItem({
  icon: Icon,
  label,
}: {
  icon: typeof ShieldCheck;
  label: string;
}) {
  return (
    <div className="flex flex-col items-center gap-1.5 text-center">
      <Icon className="h-6 w-6 text-forest-light" />
      <span className="text-xs font-medium text-ink/70">{label}</span>
    </div>
  );
}
