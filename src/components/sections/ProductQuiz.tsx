"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Sparkles, RotateCcw, ArrowLeft } from "lucide-react";
import { QUIZ_QUESTIONS } from "@/lib/quiz";
import { getProduct } from "@/lib/products";
import SectionHeading from "@/components/SectionHeading";
import { formatPrice } from "@/lib/utils";

// اختبار تفاعلي: "أي منتج ELM يناسبك؟" — يزيد التفاعل ويقود نحو الشراء.
export default function ProductQuiz() {
  const [step, setStep] = useState(0);
  const [scores, setScores] = useState<Record<string, number>>({});
  const [done, setDone] = useState(false);

  const total = QUIZ_QUESTIONS.length;

  function choose(answerScores: Record<string, number>) {
    setScores((prev) => {
      const next = { ...prev };
      for (const [slug, pts] of Object.entries(answerScores)) {
        next[slug] = (next[slug] ?? 0) + pts;
      }
      return next;
    });
    if (step + 1 < total) {
      setStep((s) => s + 1);
    } else {
      setDone(true);
    }
  }

  function reset() {
    setStep(0);
    setScores({});
    setDone(false);
  }

  // المنتج الفائز
  const winnerSlug =
    Object.entries(scores).sort((a, b) => b[1] - a[1])[0]?.[0] ?? "shilajit";
  const winner = getProduct(winnerSlug);

  return (
    <section className="section-pad bg-sand/40">
      <div className="container-elm">
        <SectionHeading
          eyebrow="اختبار سريع"
          title="أي منتج ELM يناسبك؟"
          subtitle="3 أسئلة قصيرة، ونقترح لك المنتج الأنسب."
        />

        <div className="mx-auto mt-10 max-w-xl">
          <div className="rounded-2xl bg-white p-6 shadow-soft sm:p-8">
            <AnimatePresence mode="wait">
              {!done ? (
                <motion.div
                  key={`q-${step}`}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.35 }}
                >
                  {/* شريط التقدّم */}
                  <div className="mb-5 flex items-center gap-2">
                    {QUIZ_QUESTIONS.map((_, i) => (
                      <span
                        key={i}
                        className={`h-1.5 flex-1 rounded-full transition-colors ${
                          i <= step ? "bg-gold" : "bg-sand"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm font-bold text-ink/40">
                    سؤال {step + 1} من {total}
                  </span>
                  <h3 className="mt-2 font-heading text-2xl font-extrabold text-forest">
                    {QUIZ_QUESTIONS[step].question}
                  </h3>
                  <div className="mt-5 grid gap-3">
                    {QUIZ_QUESTIONS[step].answers.map((a) => (
                      <button
                        key={a.label}
                        type="button"
                        onClick={() => choose(a.scores)}
                        className="rounded-2xl border-2 border-sand bg-white p-4 text-start font-medium text-forest transition-all hover:-translate-y-0.5 hover:border-gold hover:bg-gold/10"
                      >
                        {a.label}
                      </button>
                    ))}
                  </div>
                </motion.div>
              ) : (
                winner && (
                  <motion.div
                    key="result"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4 }}
                    className="text-center"
                  >
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-gold/15 px-3 py-1 text-sm font-bold text-gold-dark">
                      <Sparkles className="h-4 w-4" /> النتيجة
                    </span>
                    <h3 className="mt-3 font-heading text-2xl font-extrabold text-forest">
                      نقترح لك: {winner.shortName}
                    </h3>

                    <div className="relative mx-auto mt-5 h-44 w-44 overflow-hidden rounded-2xl bg-sand/40">
                      <Image
                        src={winner.image}
                        alt={winner.name}
                        fill
                        sizes="176px"
                        className="object-cover"
                      />
                    </div>

                    <p className="mx-auto mt-4 max-w-sm text-ink/70">
                      {winner.tagline}
                    </p>
                    <div className="mt-3 font-heading text-2xl font-extrabold text-gold-dark">
                      {formatPrice(winner.price)}
                    </div>

                    <Link
                      href={`/product/${winner.slug}`}
                      className="btn-gold mx-auto mt-5"
                    >
                      اكتشف المنتج
                      <ArrowLeft className="h-4 w-4" />
                    </Link>
                    <button
                      type="button"
                      onClick={reset}
                      className="mx-auto mt-3 flex items-center gap-1.5 text-sm font-bold text-forest hover:text-gold"
                    >
                      <RotateCcw className="h-4 w-4" />
                      أعد الاختبار
                    </button>
                  </motion.div>
                )
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
