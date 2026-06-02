"use client";

import { useMemo } from "react";

// خلفية جزيئات ذهبية متحرّكة (غبار ذهبي يطفو للأعلى).
// خفيفة على الأداء — CSS فقط، بدون JavaScript في كل إطار.
export default function GoldParticles({ count = 26 }: { count?: number }) {
  // قيم ثابتة لتفادي إعادة الحساب عند كل رسم
  const particles = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => {
        // توزيع شبه عشوائي لكنه ثابت (مبني على الفهرس)
        const seed = (i * 9301 + 49297) % 233280;
        const rnd = seed / 233280;
        const rnd2 = ((i * 49297 + 9301) % 233280) / 233280;
        return {
          left: `${Math.round(rnd * 100)}%`,
          size: 3 + Math.round(rnd2 * 6),
          delay: `${(rnd * 8).toFixed(2)}s`,
          duration: `${(7 + rnd2 * 8).toFixed(2)}s`,
          opacity: 0.25 + rnd2 * 0.4,
        };
      }),
    [count],
  );

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {particles.map((p, i) => (
        <span
          key={i}
          className="absolute bottom-0 rounded-full bg-gold"
          style={{
            left: p.left,
            width: p.size,
            height: p.size,
            opacity: p.opacity,
            boxShadow: `0 0 ${p.size * 2}px rgba(201,162,75,0.8)`,
            animation: `rise ${p.duration} linear ${p.delay} infinite`,
          }}
        />
      ))}
    </div>
  );
}
