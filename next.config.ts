import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // ضغط Gzip/Brotli للردود
  compress: true,
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
    // جودة افتراضية متوازنة (أخف على الجوال، فرق غير محسوس)
    qualities: [70, 75, 90],
    // مقاسات مناسبة للجوال أولًا (تقلّل أحجام الصور المُولّدة)
    deviceSizes: [360, 480, 640, 768, 1024, 1280],
    // الاحتفاظ بالصور المُحسّنة في الكاش 30 يومًا
    minimumCacheTTL: 2592000,
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
  // كاش طويل للأصول الثابتة (صور /public) لتسريع الزيارات المتكرّرة
  async headers() {
    return [
      {
        source: "/images/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=2592000, stale-while-revalidate=86400" },
        ],
      },
    ];
  },
};

export default nextConfig;
