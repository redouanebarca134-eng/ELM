import type { Metadata } from "next";
import Link from "next/link";
import Accordion from "@/components/Accordion";
import SectionHeading from "@/components/SectionHeading";
import { FAQS } from "@/lib/content";
import { BRAND, buildWhatsAppLink } from "@/lib/constants";

export const metadata: Metadata = {
  title: "الأسئلة الشائعة",
  description: "إجابات على أكثر الأسئلة شيوعًا حول شيلاجيت ELM والتوصيل والدفع.",
};

export default function FaqPage() {
  return (
    <div className="bg-cream">
      <section className="section-pad">
        <div className="container-elm">
          <SectionHeading
            eyebrow="مركز المساعدة"
            title="الأسئلة الشائعة"
            subtitle="كل ما تحتاج معرفته عن منتجاتنا والتوصيل والدفع."
          />
          <div className="mt-12">
            <Accordion items={FAQS} />
          </div>

          <div className="mx-auto mt-12 max-w-3xl rounded-2xl border border-sand bg-white p-6 text-center shadow-soft">
            <p className="text-ink/70">لم تجد إجابتك؟ تواصل معنا مباشرة.</p>
            <a
              href={buildWhatsAppLink("السلام عليكم، عندي سؤال عن منتجات ELM")}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-forest mt-4"
            >
              تواصل عبر WhatsApp
            </a>
            <p className="mt-3 text-sm text-ink/50">
              أو راسلنا على {BRAND.email}
            </p>
            <Link
              href="/contact"
              className="mt-2 block text-sm font-bold text-forest hover:text-gold"
            >
              صفحة الاتصال
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
