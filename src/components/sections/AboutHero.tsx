"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import GoldParticles from "@/components/GoldParticles";
import Starfield from "@/components/Starfield";

// بطل صفحة "عن ELM" — مشهد ليلي سينمائي مع الشعار.
export default function AboutHero() {
  return (
    <section className="relative flex min-h-[70vh] items-center overflow-hidden">
      {/* خلفية ليلية */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,#0a1713_0%,#10231b_55%,#16382c_100%)]" />
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1600&q=80"
            alt="جبال ليلية"
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-[linear-gradient(to_bottom,#0a1713cc,#16382ccc)]" />
        </div>
        <Starfield count={70} />
        <div className="animate-glow-pulse absolute -top-16 start-[20%] h-72 w-72 rounded-full bg-gold/25 blur-3xl" />
        <GoldParticles count={24} />
      </div>

      <div className="container-elm relative z-10 py-20 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="relative mx-auto mb-6 w-32"
        >
          <div className="animate-glow-pulse absolute inset-0 m-auto h-40 w-40 rounded-full bg-gold/30 blur-2xl" />
          <Image
            src="/logo.png"
            alt="شعار ELM"
            width={160}
            height={160}
            className="animate-float-slow relative z-10 mx-auto rounded-full"
          />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="font-heading text-4xl font-extrabold text-cream sm:text-5xl lg:text-6xl"
        >
          قصة ELM
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-cream/85"
        >
          علامة جزائرية للصحة الطبيعية — وُلدت من رفضٍ بسيط: أن نبيع ما لا يمكن
          إثباته.
        </motion.p>
      </div>
    </section>
  );
}
