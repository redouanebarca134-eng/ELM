"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { SHILAJIT } from "@/lib/products";
import GoldParticles from "@/components/GoldParticles";

const reassurance = ["عضوي 100% Bio", "توصيل لكل الولايات", "دفع عند الاستلام"];

export default function Hero() {
  return (
    <section className="relative flex min-h-[92vh] items-center overflow-hidden">
      {/* الخلفية المعدنية الداكنة */}
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1600&q=80"
          alt="جبال داكنة — مصدر الشيلاجيت الطبيعي"
          fill
          priority
          sizes="100vw"
          className="scale-105 object-cover"
        />
        {/* تراكب أخضر متدرّج متحرّك */}
        <div className="animate-gradient-pan absolute inset-0 bg-[linear-gradient(160deg,rgba(20,53,42,0.92),rgba(20,53,42,0.82),rgba(11,20,16,0.96))]" />

        {/* كرات ضوئية ذهبية متوهّجة */}
        <div className="animate-glow-pulse absolute -top-20 start-[15%] h-72 w-72 rounded-full bg-gold/25 blur-3xl" />
        <div
          className="animate-glow-pulse absolute bottom-10 end-[10%] h-80 w-80 rounded-full bg-forest-light/30 blur-3xl"
          style={{ animationDelay: "1.5s" }}
        />

        {/* غبار ذهبي يطفو */}
        <GoldParticles count={28} />
      </div>

      <div className="container-elm relative z-10 grid items-center gap-10 py-20 lg:grid-cols-[1.2fr_0.8fr]">
        {/* النص */}
        <div className="max-w-2xl">
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-block rounded-full border border-gold/40 bg-gold/10 px-4 py-1.5 font-heading text-sm font-bold text-gold backdrop-blur-sm"
          >
            🏔️ شيلاجيت أصلي 100% — ELM
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mt-5 font-heading text-4xl font-extrabold leading-[1.15] text-cream sm:text-5xl lg:text-6xl"
          >
            قوة الطبيعة في{" "}
            <span className="relative inline-block text-gold">
              أنقى صورها
              <span className="gold-shimmer absolute inset-0" />
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="mt-5 text-lg leading-relaxed text-cream/85 sm:text-xl"
          >
            {SHILAJIT.shortName} من ELM — راتنج طبيعي 100% مختار بعناية، غني
            بأكثر من 80 معدنًا وحمض الفولفيك
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
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
            transition={{ duration: 0.7, delay: 0.6 }}
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

        {/* صورة المنتج العائمة */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.35, ease: "easeOut" }}
          className="relative hidden justify-center lg:flex"
        >
          {/* هالة خلف المنتج */}
          <div className="animate-glow-pulse absolute inset-0 m-auto h-72 w-72 rounded-full bg-gold/30 blur-3xl" />
          <div className="animate-float-slow relative">
            <Image
              src={SHILAJIT.image}
              alt={SHILAJIT.name}
              width={380}
              height={500}
              className="relative z-10 rounded-3xl object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
            />
          </div>
        </motion.div>
      </div>

      {/* مؤشّر التمرير */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.6 }}
        className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2"
      >
        <div className="flex h-9 w-6 items-start justify-center rounded-full border-2 border-cream/40 p-1.5">
          <div className="animate-float-soft h-1.5 w-1.5 rounded-full bg-gold" />
        </div>
      </motion.div>
    </section>
  );
}
