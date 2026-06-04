"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { Product } from "@/lib/products";
import GoldParticles from "@/components/GoldParticles";

// صفحة هبوط سينمائية لكل منتج — مشهد بطولي متحرّك + قصة + مزايا.
export default function ProductCinematic({ product }: { product: Product }) {
  const l = product.landing;
  if (!l) return null;

  const isRose = product.accent === "rose";

  return (
    <>
      {/* ═══ المشهد البطولي السينمائي ═══ */}
      <section
        className={`relative flex min-h-[88vh] items-center overflow-hidden ${
          isRose
            ? "bg-gradient-to-br from-[#2a2230] via-[#1a1622] to-[#0f0d14]"
            : "bg-gradient-to-br from-forest via-[#10231b] to-[#0b140f]"
        }`}
      >
        {/* توهّجات سينمائية */}
        <div className="animate-glow-pulse absolute -top-20 start-[10%] h-80 w-80 rounded-full bg-gold/20 blur-3xl" />
        <div
          className="animate-glow-pulse absolute bottom-0 end-[5%] h-96 w-96 rounded-full bg-gold/15 blur-3xl"
          style={{ animationDelay: "1.5s" }}
        />
        <GoldParticles count={30} />

        <div className="container-elm relative z-10 grid items-center gap-8 py-16 lg:grid-cols-2">
          {/* النص */}
          <div className="order-2 lg:order-1">
            <motion.span
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-block rounded-full border border-gold/40 bg-gold/10 px-4 py-1.5 font-heading text-sm font-bold text-gold backdrop-blur-sm"
            >
              ✨ {product.shortName} — ELM
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="mt-5 font-heading text-4xl font-extrabold leading-[1.12] text-cream sm:text-5xl lg:text-6xl"
            >
              {l.heroLine}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="mt-5 max-w-lg text-lg leading-relaxed text-cream/85"
            >
              {l.heroSub}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.45 }}
              className="mt-8 flex flex-wrap items-center gap-4"
            >
              <a href="#buy" className="btn-gold text-lg">
                اطلب الآن 👇
              </a>
              <span className="font-heading text-cream/70">
                دفع عند الاستلام • توصيل لكل الولايات
              </span>
            </motion.div>
          </div>

          {/* صورة المنتج العائمة مع هالة */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.25, ease: "easeOut" }}
            className="relative order-1 mx-auto flex max-w-sm justify-center lg:order-2"
          >
            <div className="animate-glow-pulse absolute inset-0 m-auto h-72 w-72 rounded-full bg-gold/30 blur-3xl" />
            <div className="animate-float-slow relative">
              <Image
                src={product.image}
                alt={product.name}
                width={420}
                height={560}
                priority
                className="relative z-10 rounded-3xl object-contain drop-shadow-[0_25px_60px_rgba(0,0,0,0.55)]"
              />
            </div>
          </motion.div>
        </div>

        {/* مؤشّر التمرير */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2">
          <div className="flex h-9 w-6 items-start justify-center rounded-full border-2 border-cream/40 p-1.5">
            <div className="animate-float-soft h-1.5 w-1.5 rounded-full bg-gold" />
          </div>
        </div>
      </section>

      {/* ═══ المزايا السريعة ═══ */}
      <section className="bg-cream py-14">
        <div className="container-elm grid grid-cols-2 gap-5 lg:grid-cols-4">
          {l.highlights.map((h, i) => (
            <motion.div
              key={h.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="rounded-2xl border border-sand bg-white p-6 text-center shadow-soft transition-transform duration-300 hover:-translate-y-1.5"
            >
              <div className="text-4xl">{h.icon}</div>
              <h3 className="mt-3 font-heading text-lg font-bold text-forest">
                {h.title}
              </h3>
              <p className="mt-1 text-sm text-ink/60">{h.text}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ═══ المشكلة ثم الحل (سرد سينمائي) ═══ */}
      <section className="relative overflow-hidden bg-forest py-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(201,162,75,0.15),transparent_55%)]" />
        <div className="container-elm relative grid gap-8 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6 }}
            className="rounded-2xl border border-cream/10 bg-cream/5 p-8"
          >
            <span className="font-heading text-sm font-bold text-red-300">
              المشكلة
            </span>
            <p className="mt-3 text-xl leading-relaxed text-cream/85">
              {l.problem}
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="rounded-2xl border-2 border-gold/40 bg-gold/10 p-8"
          >
            <span className="font-heading text-sm font-bold text-gold">
              الحل مع ELM
            </span>
            <p className="mt-3 text-xl leading-relaxed text-cream">
              {l.solution}
            </p>
          </motion.div>
        </div>
      </section>

      {/* ═══ القصة ═══ */}
      <section className="bg-sand/40 section-pad">
        <div className="container-elm max-w-3xl text-center">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="font-heading text-sm font-bold text-gold"
          >
            القصة
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6 }}
            className="mt-2 font-heading text-3xl font-extrabold text-forest sm:text-4xl"
          >
            {l.storyTitle}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mt-5 text-lg leading-loose text-ink/75"
          >
            {l.story}
          </motion.p>
        </div>
      </section>
    </>
  );
}
