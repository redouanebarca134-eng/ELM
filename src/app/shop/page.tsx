import type { Metadata } from "next";
import ProductCard from "@/components/ProductCard";
import { PRODUCTS } from "@/lib/products";

export const metadata: Metadata = {
  title: "المتجر",
  description: "تسوّق منتجات ELM الطبيعية — شيلاجيت أصلي ومكمّلات صحية 100% طبيعية.",
};

export default function ShopPage() {
  return (
    <div className="bg-cream">
      {/* رأس الصفحة */}
      <section className="bg-forest py-16 text-center">
        <div className="container-elm">
          <h1 className="font-heading text-4xl font-extrabold text-cream">
            متجر ELM
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-cream/80">
            مكمّلات طبيعية 100% من مختبرنا — جودة مضمونة ودفع عند الاستلام.
          </p>
        </div>
      </section>

      {/* شبكة المنتجات */}
      <section className="container-elm section-pad">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {PRODUCTS.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}
