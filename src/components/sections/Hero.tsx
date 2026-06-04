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
      {/* الخلفية مشتركة على مستوى الصفحة — هنا فقط لمسات الإضاءة */}
      <div className="absolute inset-0">
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

        {/* صورة المنتج العائمة — مشهد سينمائي */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.35, ease: "easeOut" }}
          className="relative flex justify-center"
        >
          {/* هالات متعدّدة الطبقات */}
          <div className="animate-glow-pulse absolute inset-0 m-auto h-72 w-72 rounded-full bg-gold/35 blur-3xl sm:h-96 sm:w-96" />
          <div
            className="animate-glow-pulse absolute inset-0 m-auto h-60 w-60 rounded-full bg-teal/20 blur-3xl"
            style={{ animationDelay: "1.2s" }}
          />
          {/* حلقة ضوئية دوّارة خلف المنتج */}
          <div
            className="absolute inset-0 m-auto h-80 w-80 rounded-full opacity-60 blur-md sm:h-[26rem] sm:w-[26rem]"
            style={{
              background:
                "conic-gradient(from 0deg, transparent, rgba(201,162,75,0.5), transparent 60%)",
              animation: "spin 14s linear infinite",
            }}
          />

          <div className="animate-float-slow relative">
            <Image
              src={SHILAJIT.image}
              alt={SHILAJIT.name}
              width={440}
              height={580}
              priority
              className="relative z-10 w-56 rounded-3xl object-contain drop-shadow-[0_25px_60px_rgba(0,0,0,0.6)] sm:w-72 lg:w-[26rem]"
            />
            {/* انعكاس ناعم أسفل المنتج */}
            <div
              className="absolute inset-x-6 top-full -z-0 h-24 scale-y-[-1] rounded-3xl opacity-25 blur-md"
              style={{
                backgroundImage: `url(${SHILAJIT.image})`,
                backgroundSize: "cover",
                backgroundPosition: "top",
                maskImage: "linear-gradient(to bottom, black, transparent)",
                WebkitMaskImage: "linear-gradient(to bottom, black, transparent)",
              }}
            />
          </div>

          {/* شارة عائمة: تقييم */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.9, duration: 0.5 }}
            className="glass absolute -bottom-2 start-0 z-20 flex items-center gap-2 rounded-2xl px-3 py-2 shadow-lg sm:start-4"
          >
            <span className="text-lg">⭐</span>
            <div className="text-start leading-tight">
              <div className="font-heading text-sm font-extrabold text-forest">
                {SHILAJIT.rating}/5
              </div>
              <div className="text-[10px] text-forest/60">
                {SHILAJIT.reviewsCount}+ تقييم
              </div>
            </div>
          </motion.div>
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
