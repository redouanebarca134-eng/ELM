"use client";

import { motion } from "framer-motion";
import { BadgeCheck } from "lucide-react";
import Stars from "@/components/Stars";
import SectionHeading from "@/components/SectionHeading";
import { TESTIMONIALS } from "@/lib/content";

// جدار آراء العملاء — أحرف أولى ملوّنة + شارة "موثّق" + توزيع masonry خفيف.
// دليل اجتماعي قوي (أساسي للدفع عند الاستلام).
const AVATAR_COLORS = [
  "bg-forest-light",
  "bg-gold-dark",
  "bg-teal",
  "bg-clay",
  "bg-forest",
];

export default function ReviewsWall() {
  return (
    <section className="mesh-cream section-pad">
      <div className="container-elm">
        <SectionHeading
          eyebrow="آراء حقيقية"
          title="آلاف العملاء يثقون بـ ELM"
          subtitle="تقييمات من عملاء حقيقيين عبر كل الولايات."
        />

        {/* ملخّص التقييم */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto mt-8 flex w-fit items-center gap-4 rounded-2xl border border-gold/30 bg-white px-6 py-4 shadow-soft"
        >
          <span className="font-heading text-4xl font-extrabold text-gold-dark">
            4.9
          </span>
          <div className="text-start">
            <Stars rating={5} />
            <p className="mt-1 text-sm text-ink/60">من أكثر من 500 تقييم</p>
          </div>
        </motion.div>

        {/* الشبكة */}
        <div className="mt-12 columns-1 gap-5 sm:columns-2 lg:columns-3 [&>*]:mb-5 [&>*]:break-inside-avoid">
          {TESTIMONIALS.map((t, i) => (
            <motion.figure
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
              className="rounded-2xl bg-white p-6 shadow-soft transition-shadow duration-300 hover:shadow-lg"
            >
              <div className="flex items-center gap-3">
                <span
                  className={`flex h-11 w-11 items-center justify-center rounded-full font-heading text-lg font-bold text-cream ${
                    AVATAR_COLORS[i % AVATAR_COLORS.length]
                  }`}
                >
                  {t.name.charAt(0)}
                </span>
                <div>
                  <figcaption className="flex items-center gap-1 font-heading font-bold text-forest">
                    {t.name}
                    <BadgeCheck className="h-4 w-4 text-teal" />
                  </figcaption>
                  <span className="text-xs text-ink/50">{t.wilaya}</span>
                </div>
              </div>
              <div className="mt-3">
                <Stars rating={5} size={14} />
              </div>
              <blockquote className="mt-3 leading-relaxed text-ink/80">
                “{t.text}”
              </blockquote>
              <p className="mt-3 text-xs font-medium text-teal">✓ عملية شراء موثّقة</p>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
