import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { ShieldCheck, Truck, BadgeCheck } from "lucide-react";
import { getProduct, PRODUCTS } from "@/lib/products";
import ProductGallery from "@/components/ProductGallery";
import OrderForm from "@/components/OrderForm";
import ProductTabs from "@/components/ProductTabs";
import ProductCard from "@/components/ProductCard";
import SectionHeading from "@/components/SectionHeading";
import Stars from "@/components/Stars";
import ViewContentTracker from "@/components/ViewContentTracker";
import CountdownTimer from "@/components/CountdownTimer";
import StockBadge from "@/components/StockBadge";
import ProductCinematic from "@/components/sections/ProductCinematic";
import PriceJustification from "@/components/sections/PriceJustification";
import WhyBuyHere from "@/components/sections/WhyBuyHere";
import ReviewsWall from "@/components/sections/ReviewsWall";

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
      {/* صفحة الهبوط السينمائية */}
      {product.landing && <ProductCinematic product={product} />}

      {/* مسار التنقل */}
      <div className="container-elm pt-6 text-sm text-ink/50">
        <Link href="/" className="hover:text-gold">
          الرئيسية
        </Link>{" "}
        / <Link href="/shop" className="hover:text-gold">المتجر</Link> /{" "}
        <span className="text-forest">{product.shortName}</span>
      </div>

      {/* القسم الرئيسي — الشراء (نموذج الطلب مباشرة) */}
      <section
        id="buy"
        className="container-elm grid scroll-mt-20 gap-10 py-8 lg:grid-cols-2 lg:gap-14"
      >
        {/* الصورة + معلومات المنتج */}
        <div>
          <ProductGallery images={product.gallery} alt={product.name} />
          <h1 className="mt-6 font-heading text-3xl font-extrabold text-forest sm:text-4xl">
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

          <div className="mt-4">
            <StockBadge slug={product.slug} />
          </div>

          <div className="mt-4">
            <CountdownTimer />
          </div>

          {/* بنود الثقة */}
          <div className="mt-6 grid grid-cols-3 gap-3 border-t border-sand pt-6">
            <TrustItem icon={ShieldCheck} label="عضوي 100%" />
            <TrustItem icon={BadgeCheck} label="عضوي معتمد Bio" />
            <TrustItem icon={Truck} label="دفع عند الاستلام" />
          </div>
        </div>

        {/* نموذج الطلب المباشر */}
        <div className="lg:sticky lg:top-24 lg:self-start">
          <OrderForm product={product} />
        </div>
      </section>

      {/* التبويبات */}
      <section className="container-elm py-8">
        <div className="rounded-2xl bg-white p-6 shadow-soft sm:p-8">
          <ProductTabs product={product} />
        </div>
      </section>

      {/* لماذا الشراء من ELM (تحليل السوق الجزائري) */}
      <WhyBuyHere />

      {/* لماذا السعر؟ (للمنتجات المميّزة فقط) */}
      {product.price >= 4000 && (
        <PriceJustification realPrice={product.price} />
      )}

      {/* جدار آراء العملاء */}
      <ReviewsWall />

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
