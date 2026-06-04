"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Sprout, ShieldCheck, HeartHandshake } from "lucide-react";
import Parallax from "@/components/Parallax";

// قصة العلامة ELM — تقديم المنشأ والرسالة والقيم بأسلوب سردي متحرّك.
const VALUES = [
  { icon: Sprout, title: "النقاء", text: "مكوّنات طبيعية مختارة بعناية." },
  { icon: ShieldCheck, title: "الإثبات", text: "مُختبَر ومعتمد عضويًا — لا وعود فارغة." },
  { icon: HeartHandshake, title: "الاحترام", text: "احترام لجسمك، لثقتك، وللطبيعة." },
];

export default function BrandStory() {
  return (
    <section className="relative overflow-hidden bg-cream section-pad">
      <div className="container-elm">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* الصورة مع parallax */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7 }}
          >
            <Parallax speed={40}>
              <div className="relative aspect-[4/5] overflow-hidden rounded-3xl shadow-soft">
                <Image
                  src="https://images.unsplash.com/photo-1556228578-8c89e6adf883?auto=format&fit=crop&w=900&q=80"
                  alt="ELM — الطبيعة الأصيلة"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="scale-110 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-forest/60 via-transparent to-transparent" />
                {/* شعار عائم */}
                <div className="absolute bottom-5 start-5 rounded-2xl bg-cream/90 px-4 py-2 font-heading text-xl font-extrabold text-forest backdrop-blur-sm">
                  ELM
                  <span className="ms-2 text-xs font-medium text-forest/60">
                    la santé naturelle
                  </span>
                </div>
              </div>
            </Parallax>
          </motion.div>

          {/* النص السردي */}
          <div>
            <motion.span
              initial={{ opacity: 0, x: -20 }}
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
              className="mt-2 font-heading text-3xl font-extrabold leading-tight text-forest sm:text-4xl"
            >
              وُلدت ELM من رفضٍ بسيط: أن نبيع ما لا يمكن إثباته
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="mt-5 space-y-4 text-lg leading-relaxed text-ink/75"
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
              <p className="font-heading font-bold text-forest">
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
                  className="rounded-2xl border border-sand bg-white p-4 text-center shadow-soft"
                >
                  <v.icon className="mx-auto h-7 w-7 text-gold-dark" />
                  <h3 className="mt-2 font-heading font-bold text-forest">
                    {v.title}
                  </h3>
                  <p className="mt-1 text-xs text-ink/60">{v.text}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
