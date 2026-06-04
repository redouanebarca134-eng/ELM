"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Sprout, ShieldCheck, HeartHandshake } from "lucide-react";
import GoldParticles from "@/components/GoldParticles";

// قصة العلامة ELM — مشهد سينمائي داكن (مثل صفحة الشيلاجيت) مع شعار العلامة.
const VALUES = [
  { icon: Sprout, title: "النقاء", text: "مكوّنات طبيعية مختارة بعناية." },
  {
    icon: ShieldCheck,
    title: "الإثبات",
    text: "مُختبَر ومعتمد عضويًا — لا وعود فارغة.",
  },
  { icon: HeartHandshake, title: "الاحترام", text: "احترام لجسمك، لثقتك، وللطبيعة." },
];

export default function BrandStory() {
  return (
    <section className="relative flex items-center overflow-hidden bg-[linear-gradient(to_bottom,#14352A_0%,#10231b_55%,#0b140f_100%)] section-pad">
      {/* توهّجات سينمائية + غبار ذهبي */}
      <div className="animate-glow-pulse absolute -top-24 start-[12%] h-80 w-80 rounded-full bg-gold/20 blur-3xl" />
      <div
        className="animate-glow-pulse absolute bottom-0 end-[8%] h-96 w-96 rounded-full bg-teal/20 blur-3xl"
        style={{ animationDelay: "1.5s" }}
      />
      <GoldParticles count={26} />

      <div className="container-elm relative z-10">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* الشعار في مشهد سينمائي */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8 }}
            className="relative order-1 mx-auto flex max-w-md justify-center lg:order-2"
          >
            {/* هالة خلف الشعار */}
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
                في السوق، يُباع الكثير من المنتجات «الطبيعية» التي ليست كذلك.
                صمغ مغشوش، خلطات مشبوهة، ووعود في الهواء.
              </p>
              <p>
                نحن في ELM اخترنا طريقًا آخر: نختار مكوّنات طبيعية بعناية،
                نتأكّد من جودتها، ونعتمدها عضويًا قبل أن تصل إليك. منتج يمكنك أن
                تثق به وتنظر إليه بثقة.
              </p>
              <p className="font-heading font-bold text-gold">
                صحة طبيعية، شفّافة، وفي متناول الجميع. هذه رسالتنا.
              </p>
            </motion.div>

            {/* القيم */}
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
      </div>
    </section>
  );
}
