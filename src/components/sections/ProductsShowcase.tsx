"use client";

import { motion } from "framer-motion";
import ProductCard from "@/components/ProductCard";
import SectionHeading from "@/components/SectionHeading";
import { PRODUCTS } from "@/lib/products";

// عرض كل منتجات ELM على الصفحة الرئيسية.
export default function ProductsShowcase() {
  return (
    <section id="products" className="section-pad bg-cream">
      <div className="container-elm">
        <SectionHeading
          eyebrow="منتجاتنا"
          title="اكتشف تشكيلة ELM"
          subtitle="منتجات طبيعية 100% مختارة بعناية — لكل احتياج منتجه."
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {PRODUCTS.map((product, i) => (
            <motion.div
              key={product.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
