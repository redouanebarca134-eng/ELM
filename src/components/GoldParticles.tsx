"use client";

import { useMemo } from "react";

// خلفية جزيئات ذهبية متحرّكة (غبار ذهبي يطفو للأعلى).
// خفيفة على الأداء — CSS فقط. تعرض عددًا أقل على الجوال لتحسين السرعة.
export default function GoldParticles({ count = 26 }: { count?: number }) {
  const particles = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => {
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

  // عتبة: نُظهر أول ~40% فقط على الجوال
  const mobileCutoff = Math.ceil(count * 0.4);

  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden motion-reduce:hidden"
      aria-hidden="true"
    >
      {particles.map((p, i) => (
        <span
          key={i}
          className={`absolute bottom-0 rounded-full bg-gold ${
            i >= mobileCutoff ? "hidden sm:block" : ""
          }`}
          style={{
            left: p.left,
            width: p.size,
            height: p.size,
            opacity: p.opacity,
            // الظل مكلف على الجوال — نتركه للشاشات الأكبر عبر CSS
            boxShadow: `0 0 ${p.size * 2}px rgba(201,162,75,0.55)`,
            animation: `rise ${p.duration} linear ${p.delay} infinite`,
            willChange: "transform",
          }}
        />
      ))}
    </div>
  );
}
