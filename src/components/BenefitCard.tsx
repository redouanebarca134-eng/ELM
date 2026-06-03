"use client";

import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";

// بطاقة فائدة متحرّكة: ظهور تدريجي + إطار ذهبي يضيء + أيقونة تطفو عند المرور.
export default function BenefitCard({
  icon: Icon,
  title,
  text,
  index,
}: {
  icon: LucideIcon;
  title: string;
  text: string;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: "easeOut" }}
      whileHover={{ y: -8 }}
      className="group relative h-full overflow-hidden rounded-2xl border border-sand bg-white p-6 shadow-soft transition-shadow duration-300 hover:shadow-[0_20px_45px_-15px_rgba(201,162,75,0.5)]"
    >
      {/* توهّج ذهبي يظهر عند المرور */}
      <div className="absolute -inset-px -z-0 rounded-2xl bg-gradient-to-br from-gold/0 via-gold/0 to-gold/0 opacity-0 transition-opacity duration-500 group-hover:from-gold/10 group-hover:to-transparent group-hover:opacity-100" />

      <div className="relative z-10">
        <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-forest/10 transition-transform duration-500 group-hover:scale-110 group-hover:bg-gold/15">
          <Icon className="h-7 w-7 text-forest-light transition-colors duration-300 group-hover:text-gold-dark" />
        </span>
        <h3 className="mt-4 font-heading text-xl font-bold text-forest">
          {title}
        </h3>
        <p className="mt-2 text-ink/70">{text}</p>

        {/* خط ذهبي يتمدّد عند المرور */}
        <span className="mt-4 block h-0.5 w-10 rounded-full bg-gold transition-all duration-500 group-hover:w-20" />
      </div>
    </motion.div>
  );
}
