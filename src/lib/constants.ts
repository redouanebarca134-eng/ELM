// إعدادات عامة لعلامة ELM
export const BRAND = {
  name: "ELM",
  slogan: "الصحة الطبيعية",
  // رقم واتساب بالصيغة الدولية بدون + أو 00 (مثال للجزائر)
  whatsapp: "213555000000",
  email: "contact@elm-dz.com",
  madeIn: "صُنع في الجزائر 🇩🇿 — مختبر ELM",
  socials: {
    tiktok: "https://www.tiktok.com/@elm",
    instagram: "https://www.instagram.com/elm",
    facebook: "https://www.facebook.com/elm",
  },
} as const;

// روابط القائمة الرئيسية (RTL: من اليمين إلى اليسار)
export const NAV_LINKS = [
  { href: "/", label: "الرئيسية" },
  { href: "/shop", label: "المتجر" },
  { href: "/about", label: "عن ELM" },
  { href: "/faq", label: "الأسئلة" },
  { href: "/contact", label: "اتصل بنا" },
] as const;

// أسعار التوصيل (دج)
export const SHIPPING = {
  home: 600, // توصيل للمنزل
  stopdesk: 350, // التوصيل للمكتب
} as const;

// بناء رابط واتساب مع رسالة معبأة مسبقًا
export function buildWhatsAppLink(message: string): string {
  return `https://wa.me/${BRAND.whatsapp}?text=${encodeURIComponent(message)}`;
}
