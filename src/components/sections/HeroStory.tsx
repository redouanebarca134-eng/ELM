"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import {
  Check,
  Sprout,
  ShieldCheck,
  HeartHandshake,
} from "lucide-react";
import { PRODUCTS } from "@/lib/products";
import { formatPrice } from "@/lib/utils";
import GoldParticles from "@/components/GoldParticles";
import Starfield from "@/components/Starfield";

const reassurance = ["عضوي 100% Bio", "توصيل لكل الولايات", "دفع عند الاستلام"];

const VALUES = [
  { icon: Sprout, title: "النقاء", text: "مكوّنات طبيعية مختارة بعناية." },
  {
    icon: ShieldCheck,
    title: "الإثبات",
    text: "مُختبَر ومعتمد عضويًا — لا وعود فارغة.",
  },
  { icon: HeartHandshake, title: "الاحترام", text: "احترام لجسمك ولثقتك." },
];

// قسم واحد متواصل: البطل (عرض كل المنتجات بالتناوب) ثم القصة.
export default function HeroStory() {
  // كاروسيل تلقائي يعرض كل المنتجات
  const [index, setIndex] = useState(0);
  const product = PRODUCTS[index];

  useEffect(() => {
    const id = setInterval(
      () => setIndex((i) => (i + 1) % PRODUCTS.length),
      4500,
    );
    return () => clearInterval(id);
  }, []);

  return (
    <section className="relative overflow-hidden">
      {/* ═══ خلفية واحدة لكامل المشهد ═══ */}
      <div className="pointer-events-none absolute inset-0">
        {/* تدرّج ليلي أساسي */}
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,#0a1713_0%,#10231b_45%,#16382c_100%)]" />
        {/* جبال ليلية تذوب في المشهد (أسفل) */}
        <div className="absolute inset-x-0 bottom-0 top-0">
          <Image
            src="https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1600&q=80"
            alt="جبال ليلية مرصّعة بالنجوم"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center opacity-20"
          />
          <div className="absolute inset-0 bg-[linear-gradient(to_bottom,#0a1713cc_0%,#10231b99_50%,#16382ccc_100%)]" />
        </div>
        {/* سماء نجوم تمتدّ عبر كل المشهد */}
        <Starfield count={90} />
        {/* كرات ضوئية ذهبية / فيروزية (مخفية على الجوال لتحسين الأداء) */}
        <div className="animate-glow-pulse absolute -top-16 start-[12%] hidden h-72 w-72 rounded-full bg-gold/25 blur-3xl sm:block" />
        <div
          className="animate-glow-pulse absolute top-[55%] end-[8%] hidden h-80 w-80 rounded-full bg-teal/20 blur-3xl sm:block"
          style={{ animationDelay: "1.5s" }}
        />
        <GoldParticles count={30} />
      </div>

      {/* ═══ الجزء 1: البطل ═══ */}
      <div className="container-elm relative z-10 grid min-h-[92vh] items-center gap-10 py-20 lg:grid-cols-[1.2fr_0.8fr]">
        {/* النص */}
        <div className="max-w-2xl">
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-block rounded-full border border-gold/40 bg-gold/10 px-4 py-1.5 font-heading text-sm font-bold text-gold backdrop-blur-sm"
          >
            🌿 ELM — منتجات طبيعية 100% مختارة بعناية
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

          {/* اسم ووصف المنتج الحالي (يتبدّل) */}
          <div className="mt-5 min-h-[6rem]">
            <AnimatePresence mode="wait">
              <motion.div
                key={product.slug}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.4 }}
              >
                <h2 className="font-heading text-2xl font-extrabold text-gold sm:text-3xl">
                  {product.shortName}
                  <span className="ms-3 align-middle text-lg font-bold text-cream/90">
                    {formatPrice(product.price)}
                  </span>
                </h2>
                <p className="mt-2 text-lg leading-relaxed text-cream/85">
                  {product.tagline}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* نقاط التنقّل بين المنتجات */}
          <div className="mt-4 flex gap-2">
            {PRODUCTS.map((p, i) => (
              <button
                key={p.slug}
                type="button"
                aria-label={p.shortName}
                onClick={() => setIndex(i)}
                className={`h-2 rounded-full transition-all ${
                  i === index ? "w-8 bg-gold" : "w-2 bg-cream/40"
                }`}
              />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mt-7 flex flex-col gap-3 sm:flex-row"
          >
            <Link href="/shop" className="btn-gold">
              اطلب الآن — الدفع عند الاستلام
            </Link>
            <Link href="/shop" className="btn-outline text-cream">
              كل المنتجات
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

        {/* صورة المنتج العائمة — تتبدّل بين كل المنتجات */}
        <div className="relative flex justify-center">
          <div className="animate-glow-pulse absolute inset-0 m-auto h-72 w-72 rounded-full bg-gold/35 blur-3xl sm:h-96 sm:w-96" />
          <div
            className="absolute inset-0 m-auto h-80 w-80 rounded-full opacity-60 blur-md sm:h-[26rem] sm:w-[26rem]"
            style={{
              background:
                "conic-gradient(from 0deg, transparent, rgba(201,162,75,0.5), transparent 60%)",
              animation: "spin 14s linear infinite",
            }}
          />
          <AnimatePresence mode="wait">
            <motion.div
              key={product.slug}
              initial={{ opacity: 0, scale: 0.85, rotateY: 25 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              exit={{ opacity: 0, scale: 0.85, rotateY: -25 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="animate-float-slow relative"
            >
              <Link href="/shop">
                <Image
                  src={product.image}
                  alt={product.name}
                  width={440}
                  height={580}
                  priority={index === 0}
                  quality={75}
                  sizes="(max-width: 640px) 224px, (max-width: 1024px) 288px, 416px"
                  className="relative z-10 w-56 rounded-3xl object-contain drop-shadow-[0_25px_60px_rgba(0,0,0,0.6)] sm:w-72 lg:w-[26rem]"
                />
              </Link>
              <div
                className="absolute inset-x-6 top-full -z-0 h-24 scale-y-[-1] rounded-3xl opacity-25 blur-md"
                style={{
                  backgroundImage: `url(${product.image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "top",
                  maskImage: "linear-gradient(to bottom, black, transparent)",
                  WebkitMaskImage:
                    "linear-gradient(to bottom, black, transparent)",
                }}
              />
            </motion.div>
          </AnimatePresence>
          <div className="glass absolute -bottom-2 start-0 z-20 flex items-center gap-2 rounded-2xl px-3 py-2 shadow-lg sm:start-4">
            <span className="text-lg">⭐</span>
            <div className="text-start leading-tight">
              <div className="font-heading text-sm font-extrabold text-forest">
                {product.rating}/5
              </div>
              <div className="text-[10px] text-forest/60">
                {product.reviewsCount}+ تقييم
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* فاصل ناعم بصري (نفس الخلفية، مجرّد مسافة) */}
      <div className="relative z-10 h-px bg-gradient-to-l from-transparent via-gold/30 to-transparent" />

      {/* ═══ الجزء 2: القصة — نفس المشهد ═══ */}
      <div className="container-elm relative z-10 grid items-center gap-12 py-20 lg:grid-cols-2">
        {/* الشعار */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8 }}
          className="relative order-1 mx-auto flex max-w-md justify-center lg:order-2"
        >
          <div className="animate-glow-pulse absolute inset-0 m-auto h-72 w-72 rounded-full bg-gold/25 blur-3xl" />
          <div className="animate-float-slow relative">
            <Image
              src="/logo.png"
              alt="شعار ELM — la santé naturelle"
              width={420}
              height={420}
              className="relative z-10 rounded-full object-contain drop-shadow-[0_25px_60px_rgba(0,0,0,0.55)]"
            />
          </div>
        </motion.div>

        {/* النص السردي */}
        <div className="order-2 lg:order-1">
          <motion.span
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="font-heading text-sm font-bold text-gold"
          >
            قصتنا
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6 }}
            className="mt-2 font-heading text-3xl font-extrabold leading-tight text-cream sm:text-4xl"
          >
            وُلدت ELM من رفضٍ بسيط: أن نبيع ما لا يمكن إثباته
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mt-5 space-y-4 text-lg leading-relaxed text-cream/80"
          >
            <p>
              في السوق، يُباع الكثير من المنتجات «الطبيعية» التي ليست كذلك. صمغ
              مغشوش، خلطات مشبوهة، ووعود في الهواء.
            </p>
            <p>
              نحن في ELM اخترنا طريقًا آخر: نختار مكوّنات طبيعية بعناية، نتأكّد من
              جودتها، ونعتمدها عضويًا قبل أن تصل إليك. منتج يمكنك أن تثق به.
            </p>
            <p className="font-heading font-bold text-gold">
              صحة طبيعية، شفّافة، وفي متناول الجميع. هذه رسالتنا.
            </p>
          </motion.div>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {VALUES.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="glass-dark rounded-2xl p-4 text-center"
              >
                <v.icon className="mx-auto h-7 w-7 text-gold" />
                <h3 className="mt-2 font-heading font-bold text-cream">
                  {v.title}
                </h3>
                <p className="mt-1 text-xs text-cream/60">{v.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
