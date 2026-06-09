"use client";

import { motion } from "framer-motion";
import {
  ShieldCheck,
  Truck,
  PhoneCall,
  BadgeCheck,
  RefreshCw,
  Wallet,
} from "lucide-react";
import SectionHeading from "@/components/SectionHeading";

// قسم مبني على تحليل السوق الجزائري (COD + الثقة + الخوف من التقليد).
// يعالج أهمّ اعتراضات الشراء لتحقيق أقصى تحويل.
const REASONS = [
  {
    icon: Wallet,
    title: "الدفع عند الاستلام",
    text: "لا تدفع أي دينار قبل أن يصل المنتج إلى يدك. تتفقّده ثم تدفع.",
  },
  {
    icon: ShieldCheck,
    title: "أصلي ومضمون",
    text: "منتج عضوي معتمد 100% Bio — لا غش ولا تقليد. ما تراه هو ما تستلمه.",
  },
  {
    icon: Truck,
    title: "توصيل لكل الولايات الـ58",
    text: "نوصّل إلى المنزل أو إلى مكتب التوصيل، بسرعة وأمان.",
  },
  {
    icon: PhoneCall,
    title: "تأكيد ومتابعة",
    text: "نتصل بك لتأكيد الطلب، ونرافقك عبر واتساب خطوة بخطوة.",
  },
  {
    icon: BadgeCheck,
    title: "جودة مختبَرة",
    text: "كل دفعة تُختار وتُراقَب بعناية قبل أن تصل إليك.",
  },
  {
    icon: RefreshCw,
    title: "رضاك أولًا",
    text: "إذا لم تكن راضيًا، تواصل معنا — رضاك هو أولويتنا.",
  },
];

export default function WhyBuyHere() {
  return (
    <section className="mesh-cream section-pad">
      <div className="container-elm">
        <SectionHeading
          eyebrow="لماذا تطلب من ELM؟"
          title="شراء آمن ومريح — كما تحبّه"
          subtitle="نفهم السوق الجزائري: لا ثقة قبل أن تمسك المنتج بيدك. لذلك جعلنا الشراء بلا مخاطرة."
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {REASONS.map((r, i) => (
            <motion.div
              key={r.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
              className="flex gap-4 rounded-2xl border border-sand bg-white p-5 shadow-soft"
            >
              <span className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-forest/10">
                <r.icon className="h-6 w-6 text-forest-light" />
              </span>
              <div>
                <h3 className="font-heading font-bold text-forest">{r.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-ink/70">
                  {r.text}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
