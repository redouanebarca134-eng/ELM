"use client";

import { motion } from "framer-motion";
import { X, Check } from "lucide-react";
import { formatPrice } from "@/lib/utils";

// بلوك "لماذا السعر؟" — يحوّل اعتراض السعر إلى دليل على الجودة (مكافحة الغش).
// يظهر فقط للمنتجات ذات السعر المرتفع (مثل الشيلاجيت).
export default function PriceJustification({
  cheapPrice = 1500,
  realPrice,
}: {
  cheapPrice?: number;
  realPrice: number;
}) {
  return (
    <section className="bg-forest py-16">
      <div className="container-elm">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-3xl text-center"
        >
          <span className="font-heading text-sm font-bold text-gold">
            الشفافية
          </span>
          <h2 className="mt-2 font-heading text-3xl font-extrabold text-cream sm:text-4xl">
            لماذا سعرنا {formatPrice(realPrice)} وليس {formatPrice(cheapPrice)}؟
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-cream/80">
            لأن الفرق ليس في السعر — بل في ما تحصل عليه فعلاً.
          </p>
        </motion.div>

        <div className="mx-auto mt-10 grid max-w-3xl gap-5 md:grid-cols-2">
          {/* الرخيص */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5 }}
            className="rounded-2xl border border-cream/10 bg-cream/5 p-7"
          >
            <h3 className="font-heading text-xl font-bold text-cream/70">
              المنتج الرخيص ({formatPrice(cheapPrice)})
            </h3>
            <ul className="mt-4 space-y-3 text-cream/60">
              {[
                "غالبًا مغشوش أو مخفّف",
                "مصدر مجهول بدون ضمان",
                "بدون اختبار ولا شهادة",
                "نتائج ضعيفة أو معدومة",
              ].map((t) => (
                <li key={t} className="flex items-start gap-2">
                  <X className="mt-0.5 h-5 w-5 flex-shrink-0 text-red-400" />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* ELM */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="rounded-2xl border-2 border-gold/50 bg-gold/10 p-7"
          >
            <h3 className="font-heading text-xl font-bold text-gold">
              شيلاجيت ELM ({formatPrice(realPrice)})
            </h3>
            <ul className="mt-4 space-y-3 text-cream">
              {[
                "أصلي ونقي 100% بلا غش",
                "مصدر موثوق وقابل للتتبّع",
                "مُختبَر ومعتمد عضويًا Bio",
                "جودة حقيقية تستحقّ ثقتك",
              ].map((t) => (
                <li key={t} className="flex items-start gap-2">
                  <Check className="mt-0.5 h-5 w-5 flex-shrink-0 text-gold" />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mx-auto mt-8 max-w-2xl text-center font-heading text-lg font-bold text-cream"
        >
          ادفع مرّة واحدة لمنتج حقيقي — بدل أن تدفع مرّات لمنتج بلا نتيجة.
        </motion.p>
      </div>
    </section>
  );
}
