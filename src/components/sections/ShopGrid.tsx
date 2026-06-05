"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ProductCard from "@/components/ProductCard";
import { PRODUCTS, activeCategories, type CategoryId } from "@/lib/products";
import { cn } from "@/lib/utils";

// متجر بتصفية حسب الفئة — يسهّل توسيع الجمعة لاحقًا.
export default function ShopGrid() {
  const [active, setActive] = useState<CategoryId | "all">("all");
  const cats = activeCategories();

  const filtered =
    active === "all"
      ? PRODUCTS
      : PRODUCTS.filter((p) => p.category === active);

  return (
    <div>
      {/* أزرار الفئات */}
      <div className="flex flex-wrap justify-center gap-3">
        <CatButton
          active={active === "all"}
          onClick={() => setActive("all")}
          label="🛍️ الكل"
        />
        {cats.map((c) => (
          <CatButton
            key={c.id}
            active={active === c.id}
            onClick={() => setActive(c.id)}
            label={`${c.emoji} ${c.label}`}
          />
        ))}
      </div>

      {/* الشبكة */}
      <motion.div
        layout
        className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        <AnimatePresence mode="popLayout">
          {filtered.map((product) => (
            <motion.div
              key={product.slug}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.35 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {filtered.length === 0 && (
        <p className="mt-12 text-center text-ink/50">
          لا توجد منتجات في هذه الفئة بعد — قريبًا!
        </p>
      )}
    </div>
  );
}

function CatButton({
  active,
  onClick,
  label,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-full px-5 py-2.5 font-heading text-sm font-bold transition-all",
        active
          ? "bg-gold text-forest shadow-gold"
          : "border border-sand bg-white text-forest hover:border-gold",
      )}
    >
      {label}
    </button>
  );
}
