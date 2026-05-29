"use client";

import { useState } from "react";
import type { Product } from "@/lib/products";
import { FAQS } from "@/lib/content";
import { cn } from "@/lib/utils";
import Accordion from "./Accordion";

const TABS = [
  { id: "desc", label: "الوصف" },
  { id: "usage", label: "طريقة الاستعمال" },
  { id: "ingredients", label: "المكوّنات" },
  { id: "faq", label: "الأسئلة" },
] as const;

export default function ProductTabs({ product }: { product: Product }) {
  const [tab, setTab] = useState<(typeof TABS)[number]["id"]>("desc");

  return (
    <div>
      <div className="flex flex-wrap gap-2 border-b border-sand">
        {TABS.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setTab(t.id)}
            className={cn(
              "-mb-px border-b-2 px-4 py-3 font-heading text-sm font-bold transition-colors",
              tab === t.id
                ? "border-gold text-gold-dark"
                : "border-transparent text-ink/50 hover:text-forest",
            )}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="py-6 leading-relaxed text-ink/80">
        {tab === "desc" && <p className="text-lg">{product.description}</p>}

        {tab === "usage" && (
          <div className="space-y-5">
            <ol className="space-y-3">
              {product.usage.map((step, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-gold font-heading text-sm font-bold text-forest">
                    {i + 1}
                  </span>
                  <span className="pt-0.5">{step}</span>
                </li>
              ))}
            </ol>
            {product.warning && (
              <p className="rounded-2xl bg-sand/50 p-4 text-sm text-ink/70">
                ⚠️ {product.warning}
              </p>
            )}
          </div>
        )}

        {tab === "ingredients" && <p className="text-lg">{product.ingredients}</p>}

        {tab === "faq" && <Accordion items={FAQS} />}
      </div>
    </div>
  );
}
