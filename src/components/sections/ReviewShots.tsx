"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Star, X, Quote } from "lucide-react";

// قسم آراء العميلات — لقطات حقيقية من فيسبوك وماسنجر (إثبات اجتماعي قوي)
export default function ReviewShots({ images }: { images: string[] }) {
  const [active, setActive] = useState<string | null>(null);

  if (!images?.length) return null;

  return (
    <section className="bg-cream py-16">
      <div className="container-elm">
        {/* العنوان */}
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <span className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-rose/10 px-4 py-1.5 text-sm font-semibold text-rose">
            <Quote className="h-4 w-4" />
            شهادات حقيقية
          </span>
          <h2 className="text-3xl font-bold text-ink sm:text-4xl">
            ماذا قالت عميلاتنا؟
          </h2>
          <div className="mt-3 flex items-center justify-center gap-1.5 text-amber-500">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="h-5 w-5 fill-amber-400 text-amber-400" />
            ))}
            <span className="ms-2 text-sm font-medium text-ink/60">
              نتائج حقيقية من نساء مثلك
            </span>
          </div>
        </div>

        {/* شبكة اللقطات (masonry) */}
        <div className="[column-fill:_balance] columns-2 gap-4 sm:columns-3 lg:columns-4">
          {images.map((src, i) => (
            <motion.button
              key={src}
              type="button"
              onClick={() => setActive(src)}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: (i % 4) * 0.05 }}
              className="mb-4 block w-full break-inside-avoid overflow-hidden rounded-2xl border border-sand bg-white shadow-soft transition hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-rose/40"
            >
              <Image
                src={src}
                alt={`رأي عميلة رقم ${i + 1}`}
                width={400}
                height={0}
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                quality={75}
                className="h-auto w-full object-contain"
              />
            </motion.button>
          ))}
        </div>

        <p className="mt-8 text-center text-sm text-ink/50">
          لقطات حقيقية من رسائل وتعليقات عميلاتنا — انضمّي إليهنّ اليوم 💚
        </p>
      </div>

      {/* النافذة المكبّرة */}
      {active && (
        <div
          onClick={() => setActive(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
        >
          <button
            type="button"
            aria-label="إغلاق"
            onClick={() => setActive(null)}
            className="absolute end-4 top-4 rounded-full bg-white/90 p-2 text-ink shadow-lg transition hover:bg-white"
          >
            <X className="h-6 w-6" />
          </button>
          <Image
            src={active}
            alt="رأي عميلة"
            width={800}
            height={0}
            sizes="100vw"
            quality={85}
            onClick={(e) => e.stopPropagation()}
            className="max-h-[90vh] w-auto rounded-2xl object-contain shadow-2xl"
          />
        </div>
      )}
    </section>
  );
}
