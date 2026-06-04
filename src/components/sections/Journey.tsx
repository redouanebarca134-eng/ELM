"use client";

import { motion } from "framer-motion";
import { Search, FlaskConical, ShieldCheck, Truck } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";

// رحلة المنتج — من المصدر إلى بابك (يبني الثقة بالشفافية).
const STEPS = [
  {
    icon: Search,
    title: "اختيار المصدر",
    text: "نختار مكوّنات طبيعية من مصادر موثوقة وقابلة للتتبّع.",
  },
  {
    icon: FlaskConical,
    title: "التنقية والتحضير",
    text: "تُنقّى وتُحضّر بعناية للحفاظ على نقائها وفعاليّتها.",
  },
  {
    icon: ShieldCheck,
    title: "الاختبار والاعتماد",
    text: "مُختبَرة ومعتمدة عضويًا 100% Bio قبل التعبئة.",
  },
  {
    icon: Truck,
    title: "التوصيل إليك",
    text: "تصل إلى بابك أصلية ومضمونة — مع الدفع عند الاستلام.",
  },
];

export default function Journey() {
  return (
    <section className="mesh-cream section-pad">
      <div className="container-elm">
        <SectionHeading
          eyebrow="الشفافية"
          title="رحلة منتجك — من المصدر إلى بابك"
          subtitle="كل خطوة واضحة، لأن ثقتك تُبنى على المعرفة لا على الوعود."
        />

        <div className="relative mt-14">
          {/* خط الرحلة (سطح المكتب) */}
          <div className="absolute inset-x-[12%] top-8 hidden h-0.5 bg-gradient-to-l from-gold/0 via-gold/50 to-gold/0 lg:block" />
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                className="relative text-center"
              >
                <span className="relative z-10 mx-auto flex h-16 w-16 items-center justify-center rounded-full border-2 border-gold bg-cream shadow-soft">
                  <s.icon className="h-7 w-7 text-gold-dark" />
                  <span className="absolute -top-1 -end-1 flex h-6 w-6 items-center justify-center rounded-full bg-forest font-heading text-xs font-bold text-cream">
                    {i + 1}
                  </span>
                </span>
                <h3 className="mt-4 font-heading text-lg font-bold text-forest">
                  {s.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink/70">
                  {s.text}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
