import type { Metadata } from "next";
import { Tajawal, Almarai } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import FacebookPixel from "@/components/FacebookPixel";

const tajawal = Tajawal({
  subsets: ["arabic"],
  weight: ["400", "700", "800"],
  variable: "--font-tajawal",
  display: "swap",
});

const almarai = Almarai({
  subsets: ["arabic"],
  weight: ["400", "700"],
  variable: "--font-almarai",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://elm-dz.com"),
  title: {
    default: "ELM — الصحة الطبيعية | شيلاجيت نقي وشاي أعشاب طبيعي",
    template: "%s | ELM",
  },
  description:
    "شيلاجيت ELM الأصلي — راتنج طبيعي 100% مختار بعناية، غني بأكثر من 80 معدنًا وحمض الفولفيك. دفع عند الاستلام وتوصيل لكل الولايات.",
  keywords: [
    "شيلاجيت",
    "ELM",
    "مكمل طبيعي",
    "حمض الفولفيك",
    "صحة طبيعية",
    "الجزائر",
    "شاي التنحيف",
    "Slim Tea",
  ],
  openGraph: {
    title: "ELM — شيلاجيت أصلي 100% طبيعي",
    description:
      "راتنج طبيعي 100% مختار بعناية من ELM، غني بأكثر من 80 معدنًا وحمض الفولفيك. دفع عند الاستلام • توصيل لكل الولايات.",
    type: "website",
    locale: "ar_DZ",
    siteName: "ELM",
    images: [
      { url: "/og-image.svg", width: 1200, height: 630, alt: "ELM شيلاجيت" },
    ],
  },
  icons: { icon: "/favicon.svg" },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ar" dir="rtl">
      <body className={`${tajawal.variable} ${almarai.variable}`}>
        <FacebookPixel />
        <CartProvider>
          <Header />
          <main className="min-h-screen">{children}</main>
          <Footer />
          <WhatsAppFloat />
        </CartProvider>
      </body>
    </html>
  );
}
