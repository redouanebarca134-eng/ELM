"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ShoppingBag, X } from "lucide-react";
import { SOCIAL_PROOF_NAMES } from "@/lib/promo";
import { PRODUCTS } from "@/lib/products";

// إشعارات "اشترى للتو" — دليل اجتماعي يظهر أسفل يمين الشاشة بشكل دوري.
export default function SocialProofPopup() {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(false);
  const [closed, setClosed] = useState(false);

  useEffect(() => {
    if (closed) return;
    let showTimer: ReturnType<typeof setTimeout>;
    let hideTimer: ReturnType<typeof setTimeout>;

    function cycle() {
      setVisible(true);
      hideTimer = setTimeout(() => {
        setVisible(false);
        setIndex((i) => (i + 1) % SOCIAL_PROOF_NAMES.length);
        showTimer = setTimeout(cycle, 6000); // فاصل بين الإشعارات
      }, 5000); // مدّة ظهور الإشعار
    }

    showTimer = setTimeout(cycle, 4000); // أول إشعار بعد 4 ثوانٍ
    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    };
  }, [closed]);

  if (closed) return null;

  const person = SOCIAL_PROOF_NAMES[index];
  const product = PRODUCTS[index % PRODUCTS.length];
  const minutesAgo = (index % 9) + 2; // 2..10 دقائق

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 24, x: 0 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          transition={{ duration: 0.4 }}
          className="fixed bottom-24 start-4 z-40 flex max-w-[19rem] items-center gap-3 rounded-2xl border border-sand bg-white p-3 shadow-lg"
        >
          <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-forest-light/15">
            <ShoppingBag className="h-5 w-5 text-forest-light" />
          </span>
          <div className="flex-1 text-sm leading-tight">
            <p className="font-heading font-bold text-forest">
              {person.name} من {person.wilaya}
            </p>
            <p className="text-ink/70">طلب {product.shortName}</p>
            <p className="mt-0.5 text-xs text-ink/40">قبل {minutesAgo} دقائق</p>
          </div>
          <button
            type="button"
            aria-label="إغلاق"
            onClick={() => setClosed(true)}
            className="text-ink/30 transition-colors hover:text-ink/60"
          >
            <X className="h-4 w-4" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
