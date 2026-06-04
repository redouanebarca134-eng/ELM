"use client";

import { useMemo } from "react";

// سماء نجوم خفيفة (CSS فقط) — تمتدّ في الخلفية الداكنة لتعطي إحساس
// ليل جبلي متواصل بين الأقسام. ثابتة (مبنية على الفهرس) لتفادي الوميض.
export default function Starfield({ count = 60 }: { count?: number }) {
  const stars = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => {
        const r1 = ((i * 9301 + 49297) % 233280) / 233280;
        const r2 = ((i * 49297 + 9301) % 233280) / 233280;
        const r3 = ((i * 12345 + 6789) % 233280) / 233280;
        return {
          left: `${(r1 * 100).toFixed(2)}%`,
          top: `${(r2 * 100).toFixed(2)}%`,
          size: r3 < 0.85 ? 1.5 : 2.5,
          opacity: 0.3 + r3 * 0.6,
          delay: `${(r1 * 4).toFixed(2)}s`,
          duration: `${(2.5 + r2 * 3).toFixed(2)}s`,
        };
      }),
    [count],
  );

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      {stars.map((s, i) => (
        <span
          key={i}
          className="absolute rounded-full bg-white"
          style={{
            left: s.left,
            top: s.top,
            width: s.size,
            height: s.size,
            opacity: s.opacity,
            boxShadow: `0 0 ${s.size * 2}px rgba(255,255,255,0.7)`,
            animation: `twinkle ${s.duration} ease-in-out ${s.delay} infinite`,
          }}
        />
      ))}
    </div>
  );
}
