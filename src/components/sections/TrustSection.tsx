"use client";

import { motion } from "framer-motion";
import { Check, X, ShieldCheck, BadgeCheck, FileSearch, Leaf } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";

// قسم "كيف تعرف الشيلاجيت الأصلي؟" — سلاح الثقة ومكافحة التقليد.
// مقارنة الأصلي مقابل المقلّد + ضمانات (عضوي معتمد، مُختبَر، قابل للتتبّع).

const REAL = [
  "يذوب بالكامل في الماء الدافئ بدون رواسب",
  "لون أسود لامع وقوام راتنجي كثيف",
  "رائحة ترابية طبيعية قوية",
  "مصدر موثوق وقابل للتتبّع",
  "عضوي معتمد 100% Bio ومُختبَر",
];

const FAKE = [
  "يترك رواسب أو لا يذوب جيدًا",
  "لون باهت أو قوام مطّاطي مشبوه",
  "رائحة كيميائية أو معدومة",
  "مصدر مجهول بدون أي ضمان",
  "بدون شهادة ولا اختبار",
];

const GUARANTEES = [
  {
    icon: Leaf,
    title: "عضوي معتمد 100% Bio",
    text: "شهادة عضوية من جهة مستقلة — وليست مجرّد ادّعاء.",
  },
  {
    icon: FileSearch,
    title: "مُختبَر ومراقَب",
    text: "كل دفعة تخضع لرقابة الجودة قبل أن تصل إليك.",
  },
  {
    icon: BadgeCheck,
    title: "أصلي ومضمون",
    text: "ما تستلمه هو تمامًا ما نعلن عنه. بلا غش.",
  },
];

export default function TrustSection() {
  return (
    <section className="relative overflow-hidden bg-cream section-pad">
      <div className="container-elm">
        <SectionHeading
          eyebrow="الثقة قبل كل شيء"
          title="كيف تعرف الشيلاجيت الأصلي؟"
          subtitle="السوق مليء بالمقلّد والمغشوش. إليك الفرق — وكيف نضمن لك الأصلي."
        />

        {/* مقارنة الأصلي مقابل المقلّد */}
        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {/* الأصلي */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5 }}
            className="rounded-2xl border-2 border-forest-light/40 bg-white p-7 shadow-soft"
          >
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-forest-light/15">
                <ShieldCheck className="h-6 w-6 text-forest-light" />
              </span>
              <h3 className="font-heading text-2xl font-extrabold text-forest">
                شيلاجيت ELM الأصلي
              </h3>
            </div>
            <ul className="mt-5 space-y-3">
              {REAL.map((item) => (
                <li key={item} className="flex items-start gap-3 text-ink/80">
                  <Check className="mt-0.5 h-5 w-5 flex-shrink-0 text-forest-light" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* المقلّد */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="rounded-2xl border-2 border-red-200 bg-red-50/40 p-7"
          >
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-red-100">
                <X className="h-6 w-6 text-red-500" />
              </span>
              <h3 className="font-heading text-2xl font-extrabold text-red-700/80">
                المنتج المقلّد
              </h3>
            </div>
            <ul className="mt-5 space-y-3">
              {FAKE.map((item) => (
                <li key={item} className="flex items-start gap-3 text-ink/60">
                  <X className="mt-0.5 h-5 w-5 flex-shrink-0 text-red-400" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* الضمانات */}
        <div className="mt-12 grid gap-5 sm:grid-cols-3">
          {GUARANTEES.map((g, i) => (
            <motion.div
              key={g.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="rounded-2xl border border-gold/30 bg-white p-6 text-center shadow-soft"
            >
              <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gold/15">
                <g.icon className="h-7 w-7 text-gold-dark" />
              </span>
              <h4 className="mt-4 font-heading text-lg font-bold text-forest">
                {g.title}
              </h4>
              <p className="mt-2 text-sm leading-relaxed text-ink/70">{g.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
