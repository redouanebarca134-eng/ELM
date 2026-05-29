// إعدادات عامة لعلامة ELM
export const BRAND = {
  name: "ELM",
  slogan: "الصحة الطبيعية",
  sloganFr: "la santé naturelle",
  // رقم واتساب بالصيغة الدولية بدون + أو 00
  whatsapp: "213697856027",
  email: "redouanebarca134@gmail.com",
  city: "الجزائر العاصمة",
  madeIn: "منتجات طبيعية مختارة بعناية — الجزائر 🇩🇿",
  socials: {
    tiktok: "https://www.tiktok.com/@elm3692",
    instagram: "https://www.instagram.com/elm.l.s.n/",
    facebook: "https://www.facebook.com/profile.php?id=61586129843361",
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
