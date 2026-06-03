"use client";

import BenefitCard from "@/components/BenefitCard";
import { BENEFITS } from "@/lib/content";

// شبكة الفوائد (Client) — تتعامل مع أيقونات lucide داخليًا لتفادي
// تمرير دوال من مكوّن خادمي إلى مكوّن عميل.
export default function BenefitsGrid() {
  return (
    <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {BENEFITS.map((b, i) => (
        <BenefitCard
          key={b.title}
          icon={b.icon}
          title={b.title}
          text={b.text}
          index={i}
        />
      ))}
    </div>
  );
}
