import type { Metadata } from "next";
import ShopGrid from "@/components/sections/ShopGrid";

export const metadata: Metadata = {
  title: "المتجر",
  description:
    "تسوّق منتجات ELM الطبيعية — شيلاجيت أصلي ومكمّلات صحية 100% طبيعية، مصنّفة حسب احتياجك.",
};

export default function ShopPage() {
  return (
    <div className="bg-cream">
      {/* رأس الصفحة */}
      <section className="relative overflow-hidden bg-forest py-16 text-center">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(201,162,75,0.18),transparent_55%)]" />
        <div className="container-elm relative">
          <h1 className="font-heading text-4xl font-extrabold text-cream">
            متجر ELM
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-cream/80">
            منتجات طبيعية 100% مختارة بعناية — جودة مضمونة ودفع عند الاستلام.
          </p>
        </div>
      </section>

      {/* شبكة المنتجات مع التصفية */}
      <section className="container-elm section-pad">
        <ShopGrid />
      </section>
    </div>
  );
}
