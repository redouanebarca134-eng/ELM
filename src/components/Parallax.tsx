"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import type { ReactNode } from "react";

// غلاف لتأثير parallax: يتحرّك المحتوى بسرعة مختلفة عن التمرير.
export default function Parallax({
  children,
  speed = 60,
  className,
}: {
  children: ReactNode;
  speed?: number; // مقدار الإزاحة بالبكسل
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [speed, -speed]);

  return (
    <div ref={ref} className={className}>
      <motion.div style={{ y }}>{children}</motion.div>
    </div>
  );
}
