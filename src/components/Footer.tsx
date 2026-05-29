import Link from "next/link";
import { Instagram, Facebook, MessageCircle, Music2 } from "lucide-react";
import { BRAND, NAV_LINKS, buildWhatsAppLink } from "@/lib/constants";
import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="bg-forest text-cream">
      <div className="container-elm grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        {/* الشعار والشعار النصي */}
        <div className="space-y-4">
          <Logo variant="light" />
          <p className="max-w-xs text-sm leading-relaxed text-cream/80">
            {BRAND.slogan} — مكمّلات طبيعية 100% من مختبر ELM في الجزائر.
          </p>
        </div>

        {/* روابط سريعة */}
        <div>
          <h3 className="mb-4 font-heading text-lg font-bold text-gold">
            روابط سريعة
          </h3>
          <ul className="space-y-2 text-sm text-cream/80">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="transition-colors hover:text-gold">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* معلومات */}
        <div>
          <h3 className="mb-4 font-heading text-lg font-bold text-gold">
            معلومات
          </h3>
          <ul className="space-y-2 text-sm text-cream/80">
            <li>الدفع عند الاستلام</li>
            <li>توصيل لكل الولايات 58</li>
            <li>{BRAND.madeIn}</li>
          </ul>
        </div>

        {/* تابعونا */}
        <div>
          <h3 className="mb-4 font-heading text-lg font-bold text-gold">
            تابعونا
          </h3>
          <div className="flex gap-3">
            <SocialLink href={BRAND.socials.tiktok} label="تيك توك">
              <Music2 className="h-5 w-5" />
            </SocialLink>
            <SocialLink href={BRAND.socials.instagram} label="إنستغرام">
              <Instagram className="h-5 w-5" />
            </SocialLink>
            <SocialLink href={BRAND.socials.facebook} label="فيسبوك">
              <Facebook className="h-5 w-5" />
            </SocialLink>
            <SocialLink
              href={buildWhatsAppLink("السلام عليكم، أريد الاستفسار عن منتجات ELM")}
              label="واتساب"
            >
              <MessageCircle className="h-5 w-5" />
            </SocialLink>
          </div>
        </div>
      </div>

      <div className="border-t border-cream/10">
        <div className="container-elm flex flex-col items-center justify-between gap-2 py-5 text-sm text-cream/60 sm:flex-row">
          <p>© {new Date().getFullYear()} ELM. جميع الحقوق محفوظة.</p>
          <p>{BRAND.madeIn}</p>
        </div>
      </div>
    </footer>
  );
}

function SocialLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="flex h-10 w-10 items-center justify-center rounded-2xl bg-cream/10 text-cream transition-colors hover:bg-gold hover:text-forest"
    >
      {children}
    </a>
  );
}
