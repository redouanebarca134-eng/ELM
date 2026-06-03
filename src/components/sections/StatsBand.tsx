"use client";

import { motion } from "framer-motion";
import { Users, Star, Truck, Leaf } from "lucide-react";
import CountUp from "@/components/CountUp";
import GoldParticles from "@/components/GoldParticles";

// شريط إحصائيات بأرقام متصاعدة — يبني الثقة والمصداقية.
const STATS = [
  { icon: Users, end: 5000, suffix: "+", decimals: 0, label: "عميل سعيد" },
  { icon: Star, end: 4.9, suffix: "/5", decimals: 1, label: "متوسط التقييم" },
  { icon: Truck, end: 58, suffix: "", decimals: 0, label: "ولاية نوصّل إليها" },
  { icon: Leaf, end: 100, suffix: "%", decimals: 0, label: "طبيعي وعضوي" },
];

export default function StatsBand() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-forest to-forest-light py-16">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(201,162,75,0.18),transparent_60%)]" />
      <GoldParticles count={18} />
      <div className="container-elm relative">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="flex flex-col items-center text-center"
            >
              <span className="mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-gold/15 ring-1 ring-gold/30">
                <s.icon className="h-7 w-7 text-gold" />
              </span>
              <div className="font-heading text-4xl font-extrabold text-cream sm:text-5xl">
                <CountUp end={s.end} suffix={s.suffix} decimals={s.decimals} />
              </div>
              <p className="mt-2 text-sm font-medium text-cream/75">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
