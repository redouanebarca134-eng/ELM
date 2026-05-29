import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Leaf, ShieldCheck, HeartHandshake, FlaskConical } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import { BRAND } from "@/lib/constants";

export const metadata: Metadata = {
  title: "عن ELM",
  description:
    "قصة ELM — علامة جزائرية للصحة الطبيعية، من مختبرنا نقدّم أنقى المكمّلات الطبيعية التي تثق بها عائلتك.",
};

const VALUES = [
  { icon: Leaf, title: "الطبيعة", text: "نختار أنقى المكوّنات من مصادر طبيعية." },
  { icon: ShieldCheck, title: "الجودة", text: "كل منتج مُنقّى ومُختبَر في مختبرنا." },
  { icon: HeartHandshake, title: "الثقة", text: "شفافية كاملة مع عملائنا." },
];

export default function AboutPage() {
  return (
    <div className="bg-cream">
      {/* البطل */}
      <section className="relative overflow-hidden bg-forest py-20 text-center">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(201,162,75,0.18),transparent_55%)]" />
        <div className="container-elm relative">
          <h1 className="font-heading text-4xl font-extrabold text-cream sm:text-5xl">
            قصة ELM
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-cream/85">
            وُلدت ELM من قناعة بسيطة — أن الطبيعة تملك ما يحتاجه جسمنا حقًا.
          </p>
        </div>
      </section>

      {/* القصة */}
      <section className="section-pad">
        <div className="container-elm grid items-center gap-10 lg:grid-cols-2">
          <Reveal>
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-soft">
              <Image
                src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1000&q=80"
                alt="مختبر ELM"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <span className="flex items-center gap-2 font-heading text-sm font-bold text-gold">
              <FlaskConical className="h-4 w-4" /> من مختبرنا في الجزائر
            </span>
            <h2 className="mt-2 font-heading text-3xl font-extrabold text-forest">
              رسالتنا
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-ink/70">
              من مختبرنا في الجزائر، نختار أنقى المكوّنات الطبيعية ونحوّلها إلى
              مكمّلات تثق بها عائلتك. رسالتنا: صحة طبيعية، شفافة، وفي متناول
              الجميع.
            </p>
            <p className="mt-4 font-heading font-bold text-forest">
              {BRAND.madeIn}
            </p>
          </Reveal>
        </div>
      </section>

      {/* القيم */}
      <section className="bg-sand/40 section-pad">
        <div className="container-elm">
          <SectionHeading eyebrow="قيمنا" title="ما نؤمن به" />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {VALUES.map((v, i) => (
              <Reveal key={v.title} delay={i * 0.08}>
                <div className="h-full rounded-2xl bg-white p-8 text-center shadow-soft">
                  <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-forest/10">
                    <v.icon className="h-7 w-7 text-forest-light" />
                  </span>
                  <h3 className="mt-4 font-heading text-xl font-bold text-forest">
                    {v.title}
                  </h3>
                  <p className="mt-2 text-ink/70">{v.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* دعوة */}
      <section className="section-pad text-center">
        <div className="container-elm">
          <Link href="/shop" className="btn-gold text-lg">
            اكتشف منتجاتنا
          </Link>
        </div>
      </section>
    </div>
  );
}
