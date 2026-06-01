"use client";

import { useEffect, useState } from "react";
import { Clock } from "lucide-react";
import { PROMO } from "@/lib/promo";

// عدّاد تنازلي صادق: يعدّ حتى منتصف الليل (نهاية اليوم) ثم يبدأ يوم جديد.
function getTimeToMidnight() {
  const now = new Date();
  const midnight = new Date(now);
  midnight.setHours(24, 0, 0, 0);
  const diff = Math.max(0, midnight.getTime() - now.getTime());
  const h = Math.floor(diff / 3_600_000);
  const m = Math.floor((diff % 3_600_000) / 60_000);
  const s = Math.floor((diff % 60_000) / 1000);
  return { h, m, s };
}

function pad(n: number) {
  return n.toString().padStart(2, "0");
}

export default function CountdownTimer() {
  const [time, setTime] = useState<{ h: number; m: number; s: number } | null>(
    null,
  );

  useEffect(() => {
    setTime(getTimeToMidnight());
    const id = setInterval(() => setTime(getTimeToMidnight()), 1000);
    return () => clearInterval(id);
  }, []);

  // تفادي اختلاف الخادم/المتصفّح
  if (!time) return null;

  return (
    <div className="flex items-center justify-center gap-3 rounded-2xl border border-gold/30 bg-gold/10 px-4 py-3">
      <span className="flex items-center gap-1.5 font-heading text-sm font-bold text-forest">
        <Clock className="h-4 w-4 text-gold-dark" />
        {PROMO.countdownLabel}
      </span>
      <div className="flex items-center gap-1" dir="ltr">
        <TimeBox value={pad(time.h)} />
        <span className="font-heading font-extrabold text-gold-dark">:</span>
        <TimeBox value={pad(time.m)} />
        <span className="font-heading font-extrabold text-gold-dark">:</span>
        <TimeBox value={pad(time.s)} />
      </div>
    </div>
  );
}

function TimeBox({ value }: { value: string }) {
  return (
    <span className="min-w-[2.2rem] rounded-lg bg-forest px-2 py-1 text-center font-heading text-lg font-extrabold text-cream tabular-nums">
      {value}
    </span>
  );
}
