"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { SHILAJIT } from "@/lib/products";

const reassurance = ["عضوي 100%", "توصيل لكل الولايات", "دفع عند الاستلام"];

export default function Hero() {
  return (
    <section className="relative flex min-h-[88vh] items-center overflow-hidden">
      {/* الخلفية المعدنية الداكنة */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero.png"
          alt="جبال داكنة — مصدر الشيلاجيت الطبيعي"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        {/* تراكب أخضر عميق */}
        <div className="absolute inset-0 bg-gradient-to-b from-forest/90 via-forest/85 to-forest/95" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(201,162,75,0.18),transparent_55%)]" />
      </div>

      <div className="container-elm relative z-10 py-20">
        <div className="max-w-2xl">
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-block rounded-full border border-gold/40 bg-gold/10 px-4 py-1.5 font-heading text-sm font-bold text-gold"
          >
            🏔️ شيلاجيت أصلي من مختبر ELM
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-5 font-heading text-4xl font-extrabold leading-[1.15] text-cream sm:text-5xl lg:text-6xl"
          >
            قوة الطبيعة في أنقى صورها
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-5 text-lg leading-relaxed text-cream/85 sm:text-xl"
          >
            {SHILAJIT.shortName} الأصلي — مكمّل طبيعي 100% من مختبرنا، غني بأكثر
            من 80 معدنًا وحمض الفولفيك
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-8 flex flex-col gap-3 sm:flex-row"
          >
            <Link href="/product/shilajit" className="btn-gold">
              اطلب الآن — الدفع عند الاستلام
            </Link>
            <Link href="#benefits" className="btn-outline text-cream">
              اكتشف الفوائد
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="mt-7 flex flex-wrap gap-x-6 gap-y-2"
          >
            {reassurance.map((r) => (
              <span
                key={r}
                className="flex items-center gap-1.5 text-sm font-medium text-cream/90"
              >
                <Check className="h-4 w-4 text-gold" /> {r}
              </span>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
