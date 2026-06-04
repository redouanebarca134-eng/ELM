import Image from "next/image";
import Link from "next/link";
import { Check } from "lucide-react";
import HeroStory from "@/components/sections/HeroStory";
import StatsBand from "@/components/sections/StatsBand";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import Accordion from "@/components/Accordion";
import OfferBlock from "@/components/OfferBlock";
import BenefitsGrid from "@/components/sections/BenefitsGrid";
import TrustSection from "@/components/sections/TrustSection";
import ReviewsWall from "@/components/sections/ReviewsWall";
import Parallax from "@/components/Parallax";
import WaveDivider from "@/components/WaveDivider";
import GoldParticles from "@/components/GoldParticles";
import { FAQS, USAGE_STEPS, TRUST_BADGES } from "@/lib/content";
import { SHILAJIT } from "@/lib/products";

// ألوان الأقسام لفواصل الموجة
const CREAM = "#FAF6EC";
const FOREST = "#14352A";

export default function HomePage() {
  return (
    <>
      {/* قسم واحد متواصل: البطل + القصة تحت سماء ليلية واحدة */}
      <HeroStory />

      {/* بندج الثقة */}
      <section className="bg-forest py-8">
        <div className="container-elm grid grid-cols-2 gap-6 md:grid-cols-4">
          {TRUST_BADGES.map((b, i) => (
            <Reveal key={b.label} delay={i * 0.08}>
              <div className="flex flex-col items-center gap-2 text-center">
                <b.icon className="h-7 w-7 text-gold" />
                <span className="font-heading text-sm font-bold text-cream">
                  {b.label}
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* شريط الإحصائيات بأرقام متصاعدة */}
      <StatsBand />

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
            <Parallax speed={40}>
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-soft">
                <Image
                  src={SHILAJIT.gallery[1] ?? SHILAJIT.image}
                  alt="راتنج الشيلاجيت الطبيعي"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="scale-110 object-cover"
                />
                {/* توهّج ذهبي */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(201,162,75,0.18),transparent_60%)]" />
              </div>
            </Parallax>
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

      {/* قسم الثقة ومكافحة التقليد */}
      <TrustSection />

      {/* الفوائد */}
      <section id="benefits" className="section-pad mesh-cream">
        <div className="container-elm">
          <SectionHeading
            eyebrow="الفوائد"
            title="ماذا يقدّم لك شيلاجيت ELM؟"
            subtitle="دعم طبيعي شامل لعافيتك اليومية، من مصدر نقي وموثوق."
          />
          <BenefitsGrid />
        </div>
      </section>

      {/* فاصل موجة نحو القسم الأخضر */}
      <WaveDivider color={FOREST} />

      {/* لماذا ELM */}
      <section className="section-pad bg-forest">
        <div className="container-elm">
          <SectionHeading light title="لماذا شيلاجيت ELM؟" />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              "منتجات مختارة بعناية لنقائها وجودتها",
              "100% طبيعي بدون إضافات صناعية",
              "نصائح ومرافقة شخصية لكل عميل",
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

      {/* فاصل موجة نحو الخلفية الفاتحة */}
      <WaveDivider color={CREAM} flip />

      {/* طريقة الاستعمال */}
      <section className="section-pad bg-cream">
        <div className="container-elm">
          <SectionHeading eyebrow="سهل وبسيط" title="طريقة الاستعمال" />
          <div className="relative mt-12 grid gap-6 md:grid-cols-3">
            {/* خط ذهبي يربط الخطوات (سطح المكتب) */}
            <div className="absolute inset-x-[16%] top-7 hidden h-0.5 bg-gradient-to-r from-gold/0 via-gold/50 to-gold/0 md:block" />
            {USAGE_STEPS.map((s, i) => (
              <Reveal key={s.step} delay={i * 0.12}>
                <div className="relative h-full rounded-2xl border border-sand bg-white p-8 text-center shadow-soft transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_18px_40px_-14px_rgba(201,162,75,0.45)]">
                  <span className="animate-float-soft mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gold font-heading text-2xl font-extrabold text-forest shadow-gold">
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

      {/* جدار آراء العملاء */}
      <ReviewsWall />

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
      <section className="relative overflow-hidden bg-gradient-to-br from-forest to-forest-light py-24">
        <div className="animate-gradient-pan absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(201,162,75,0.22),transparent_55%)]" />
        <GoldParticles count={22} />
        <div className="container-elm relative text-center">
          <Reveal>
            <h2 className="mx-auto max-w-2xl font-heading text-3xl font-extrabold leading-tight text-cream sm:text-5xl">
              ابدأ رحلتك نحو صحة طبيعية اليوم
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-cream/80">
              انضم إلى آلاف العملاء الراضين — جودة مضمونة ودفع عند الاستلام.
            </p>
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
