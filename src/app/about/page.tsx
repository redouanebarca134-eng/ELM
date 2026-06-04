import type { Metadata } from "next";
import Link from "next/link";
import { Leaf, ShieldCheck, HeartHandshake } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import AboutHero from "@/components/sections/AboutHero";
import Journey from "@/components/sections/Journey";
import { BRAND } from "@/lib/constants";

export const metadata: Metadata = {
  title: "عن ELM",
  description:
    "قصة ELM — علامة جزائرية للصحة الطبيعية، نختار لك منتجات طبيعية بعناية ونرافقك بنصائح شخصية.",
};

const VALUES = [
  { icon: Leaf, title: "الطبيعة", text: "منتجات طبيعية 100% من مصادر موثوقة." },
  {
    icon: ShieldCheck,
    title: "الجودة",
    text: "منتجات مختارة بعناية لنقائها وجودتها.",
  },
  {
    icon: HeartHandshake,
    title: "المرافقة",
    text: "نصائح ومرافقة شخصية لكل عميل.",
  },
];

export default function AboutPage() {
  return (
    <div className="bg-cream">
      {/* البطل السينمائي */}
      <AboutHero />

      {/* رسالتنا */}
      <section className="section-pad">
        <div className="container-elm mx-auto max-w-3xl text-center">
          <Reveal>
            <span className="font-heading text-sm font-bold text-gold">
              رسالتنا
            </span>
            <h2 className="mt-2 font-heading text-3xl font-extrabold text-forest sm:text-4xl">
              نريد أن نجعل «الطبيعي» جديرًا بالثقة
            </h2>
            <div className="mt-5 space-y-4 text-lg leading-relaxed text-ink/75">
              <p>
                في السوق، يُباع الكثير من المنتجات «الطبيعية» التي ليست كذلك.
                صمغ مغشوش، خلطات مشبوهة، ووعود في الهواء. نحن في ELM اخترنا
                طريقًا آخر.
              </p>
              <p>
                نختار مكوّنات طبيعية بعناية، نتأكّد من جودتها، ونعتمدها عضويًا
                قبل أن تصل إليك. ونرافقك بنصائح شخصية في كل خطوة. هدفنا: صحة
                طبيعية، شفّافة، وفي متناول الجميع.
              </p>
            </div>
            <p className="mt-6 font-heading font-bold text-forest">
              {BRAND.madeIn}
            </p>
          </Reveal>
        </div>
      </section>

      {/* رحلة المنتج */}
      <Journey />

      {/* القيم */}
      <section className="bg-sand/40 section-pad">
        <div className="container-elm">
          <SectionHeading eyebrow="قيمنا" title="ما نؤمن به" />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {VALUES.map((v, i) => (
              <Reveal key={v.title} delay={i * 0.08}>
                <div className="h-full rounded-2xl bg-white p-8 text-center shadow-soft transition-transform duration-300 hover:-translate-y-1.5">
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
      <section className="relative overflow-hidden bg-forest py-20 text-center">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(201,162,75,0.2),transparent_55%)]" />
        <div className="container-elm relative">
          <Reveal>
            <h2 className="mx-auto max-w-xl font-heading text-3xl font-extrabold text-cream sm:text-4xl">
              انضم إلى عائلة ELM
            </h2>
            <Link href="/shop" className="btn-gold mx-auto mt-8 text-lg">
              اكتشف منتجاتنا
            </Link>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
