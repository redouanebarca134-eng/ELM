"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import type { FeelingBlock } from "@/lib/products";

// بلوكات عاطفية بصورة + نص متبادلة — تثير الرغبة وتدفع للطلب.
export default function FeelingBlocks({
  blocks,
}: {
  blocks: FeelingBlock[];
}) {
  return (
    <section className="bg-cream">
      {blocks.map((b, i) => {
        const reversed = i % 2 === 1;

        // صورة تحتوي نصّها — تُعرض كاملة بعرض كامل (بلا نص جانبي)
        if (b.banner) {
          return (
            <div
              key={i}
              className={i % 2 === 1 ? "bg-sand/30" : "bg-cream"}
            >
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6 }}
                className="container-elm py-12"
              >
                <a href="#buy" className="block">
                  <div className="relative w-full overflow-hidden rounded-3xl shadow-soft">
                    <Image
                      src={b.image}
                      alt={b.title}
                      width={0}
                      height={0}
                      sizes="(max-width: 1024px) 100vw, 1100px"
                      quality={80}
                      className="h-auto w-full object-contain"
                    />
                  </div>
                </a>
              </motion.div>
            </div>
          );
        }

        return (
          <div
            key={i}
            className={`relative overflow-hidden ${
              i % 2 === 1 ? "bg-sand/30" : "bg-cream"
            }`}
          >
            <div className="container-elm grid items-center gap-8 py-16 lg:grid-cols-2 lg:gap-14">
              {/* الصورة */}
              <motion.div
                initial={{ opacity: 0, scale: 0.92 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7 }}
                className={reversed ? "lg:order-2" : ""}
              >
                <div className="relative aspect-[4/5] overflow-hidden rounded-3xl shadow-soft">
                  <Image
                    src={b.image}
                    alt={b.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    quality={75}
                    className="object-cover"
                  />
                  {/* تدرّج خفيف لإبراز النص لو لزم */}
                  <div className="absolute inset-0 bg-gradient-to-t from-forest/30 to-transparent" />
                </div>
              </motion.div>

              {/* النص العاطفي */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className={reversed ? "lg:order-1" : ""}
              >
                <span className="font-heading text-sm font-bold uppercase tracking-wide text-gold">
                  {b.eyebrow}
                </span>
                <h2 className="mt-2 font-heading text-3xl font-extrabold leading-tight text-forest sm:text-4xl">
                  {b.title}
                </h2>
                <p className="mt-4 text-lg leading-loose text-ink/75">
                  {b.text}
                </p>
                <a
                  href="#buy"
                  className="btn-gold mt-6 inline-flex"
                >
                  اطلب الآن
                  <ArrowDown className="h-4 w-4" />
                </a>
              </motion.div>
            </div>
          </div>
        );
      })}
    </section>
  );
}
