import Image from "next/image";
import Link from "next/link";
import { Check } from "lucide-react";
import Hero from "@/components/sections/Hero";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import Accordion from "@/components/Accordion";
import OfferBlock from "@/components/OfferBlock";
import Stars from "@/components/Stars";
import {
  BENEFITS,
  TESTIMONIALS,
  FAQS,
  USAGE_STEPS,
  TRUST_BADGES,
} from "@/lib/content";
import { SHILAJIT } from "@/lib/products";

export default function HomePage() {
  return (
    <>
      <Hero />

      {/* بندج الثقة */}
      <section className="bg-forest py-8">
        <div className="container-elm grid grid-cols-2 gap-6 md:grid-cols-4">
          {TRUST_BADGES.map((b) => (
            <div
              key={b.label}
              className="flex flex-col items-center gap-2 text-center"
            >
              <b.icon className="h-7 w-7 text-gold" />
              <span className="font-heading text-sm font-bold text-cream">
                {b.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* المشكلة / لماذا */}
      <section className="section-pad bg-cream">
        <div className="container-elm">
          <SectionHeading
            title="هل تشعر بالتعب الدائم ونقص الطاقة؟"
            subtitle="ضغط الحياة اليومية، قلة التركيز، ضعف المناعة... جسمك يحتاج إلى دعم طبيعي حقيقي، لا إلى منشّطات صناعية."
          />
        </div>
      </section>

      {/* ما هو الشيلاجيت */}
      <section className="bg-sand/40 section-pad">
        <div className="container-elm grid items-center gap-10 lg:grid-cols-2">
          <Reveal>
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-soft">
              <Image
                src={SHILAJIT.gallery[1] ?? SHILAJIT.image}
                alt="راتنج الشيلاجيت الطبيعي"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <span className="font-heading text-sm font-bold text-gold">
              من قلب الجبال
            </span>
            <h2 className="mt-2 font-heading text-3xl font-extrabold text-forest sm:text-4xl">
              ما هو الشيلاجيت؟
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-ink/70">
              {SHILAJIT.description}
            </p>
            <Link href="/product/shilajit" className="btn-forest mt-6">
              اكتشف المنتج
            </Link>
          </Reveal>
        </div>
      </section>

      {/* الفوائد */}
      <section id="benefits" className="section-pad bg-cream">
        <div className="container-elm">
          <SectionHeading
            eyebrow="الفوائد"
            title="ماذا يقدّم لك شيلاجيت ELM؟"
            subtitle="دعم طبيعي شامل لعافيتك اليومية، من مصدر نقي وموثوق."
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {BENEFITS.map((b, i) => (
              <Reveal key={b.title} delay={i * 0.06}>
                <div className="h-full rounded-2xl border border-sand bg-white p-6 shadow-soft transition-shadow hover:shadow-lg">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-forest/10">
                    <b.icon className="h-6 w-6 text-forest-light" />
                  </span>
                  <h3 className="mt-4 font-heading text-xl font-bold text-forest">
                    {b.title}
                  </h3>
                  <p className="mt-2 text-ink/70">{b.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* لماذا ELM */}
      <section className="section-pad bg-forest">
        <div className="container-elm">
          <SectionHeading light title="لماذا شيلاجيت ELM؟" />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              "مختبرنا الخاص يضمن النقاء والجودة",
              "100% طبيعي بدون إضافات",
              "علامة جزائرية تفهم احتياجاتك",
            ].map((point, i) => (
              <Reveal key={point} delay={i * 0.08}>
                <div className="flex h-full items-start gap-3 rounded-2xl border border-cream/10 bg-cream/5 p-6">
                  <span className="mt-0.5 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-gold text-forest">
                    <Check className="h-4 w-4" />
                  </span>
                  <p className="text-lg font-medium leading-relaxed text-cream">
                    {point}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* طريقة الاستعمال */}
      <section className="section-pad bg-cream">
        <div className="container-elm">
          <SectionHeading eyebrow="سهل وبسيط" title="طريقة الاستعمال" />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {USAGE_STEPS.map((s, i) => (
              <Reveal key={s.step} delay={i * 0.1}>
                <div className="relative h-full rounded-2xl border border-sand bg-white p-8 text-center shadow-soft">
                  <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gold font-heading text-2xl font-extrabold text-forest">
                    {s.step}
                  </span>
                  <p className="mt-4 text-lg font-medium text-forest">
                    {s.text}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* آراء العملاء */}
      <section className="bg-sand/40 section-pad">
        <div className="container-elm">
          <SectionHeading
            eyebrow="آراء العملاء"
            title="ماذا يقول عملاؤنا؟"
            subtitle="آلاف الجزائريين يثقون بـ ELM."
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {TESTIMONIALS.map((t, i) => (
              <Reveal key={t.name} delay={i * 0.06}>
                <figure className="flex h-full flex-col rounded-2xl bg-white p-6 shadow-soft">
                  <Stars rating={5} />
                  <blockquote className="mt-3 flex-1 leading-relaxed text-ink/80">
                    “{t.text}”
                  </blockquote>
                  <figcaption className="mt-4 font-heading font-bold text-forest">
                    {t.name}
                    <span className="font-body text-sm font-normal text-ink/50">
                      {" "}
                      — {t.wilaya}
                    </span>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* العرض والسعر */}
      <section id="offer" className="section-pad bg-cream">
        <div className="container-elm">
          <SectionHeading
            eyebrow="عرض خاص"
            title="اطلب شيلاجيت ELM اليوم"
            subtitle="اختر الباقة المناسبة لك — كلما زادت الكمية، زاد التوفير."
          />
          <div className="mt-12">
            <OfferBlock />
          </div>
        </div>
      </section>

      {/* ضمان الرضا */}
      <section className="bg-sand/40 py-16">
        <div className="container-elm">
          <Reveal className="mx-auto max-w-2xl rounded-2xl border-2 border-gold/30 bg-white p-8 text-center shadow-soft">
            <h2 className="font-heading text-2xl font-extrabold text-forest sm:text-3xl">
              ضمان الرضا
            </h2>
            <p className="mt-3 text-lg leading-relaxed text-ink/70">
              إذا لم تكن راضيًا، تواصل معنا. رضاك هو أولويتنا.
            </p>
          </Reveal>
        </div>
      </section>

      {/* الأسئلة الشائعة */}
      <section className="section-pad bg-cream">
        <div className="container-elm">
          <SectionHeading eyebrow="الأسئلة الشائعة" title="عندك سؤال؟ لدينا الجواب" />
          <div className="mt-12">
            <Accordion items={FAQS} />
          </div>
        </div>
      </section>

      {/* دعوة نهائية */}
      <section className="relative overflow-hidden bg-forest py-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(201,162,75,0.2),transparent_55%)]" />
        <div className="container-elm relative text-center">
          <Reveal>
            <h2 className="mx-auto max-w-2xl font-heading text-3xl font-extrabold leading-tight text-cream sm:text-4xl">
              ابدأ رحلتك نحو صحة طبيعية اليوم
            </h2>
            <Link
              href="/product/shilajit"
              className="btn-gold mx-auto mt-8 text-lg"
            >
              اطلب شيلاجيت ELM الآن
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
