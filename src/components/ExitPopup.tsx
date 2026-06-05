"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { X, Gift } from "lucide-react";

// نافذة "نية المغادرة" — تظهر مرة واحدة عندما يهمّ الزائر بمغادرة الصفحة،
// وتعرض كود خصم لاستعادته. تُحفظ في الجلسة حتى لا تتكرّر.
export default function ExitPopup() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem("elm_exit_shown")) return;

    let armed = false;
    const arm = setTimeout(() => (armed = true), 6000); // لا يظهر فورًا

    function onLeave(e: MouseEvent) {
      if (armed && e.clientY <= 0) trigger();
    }
    function onBack() {
      if (armed) trigger();
    }
    function trigger() {
      setOpen(true);
      sessionStorage.setItem("elm_exit_shown", "1");
      document.removeEventListener("mouseout", onLeave);
      window.removeEventListener("popstate", onBack);
    }

    document.addEventListener("mouseout", onLeave);
    window.addEventListener("popstate", onBack);
    return () => {
      clearTimeout(arm);
      document.removeEventListener("mouseout", onLeave);
      window.removeEventListener("popstate", onBack);
    };
  }, []);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] flex items-center justify-center bg-forest/70 p-4 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-md rounded-2xl bg-cream p-8 text-center shadow-2xl"
          >
            <button
              type="button"
              aria-label="إغلاق"
              onClick={() => setOpen(false)}
              className="absolute end-4 top-4 text-ink/40 transition-colors hover:text-ink"
            >
              <X className="h-5 w-5" />
            </button>

            <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gold/15">
              <Gift className="h-8 w-8 text-gold-dark" />
            </span>
            <h2 className="mt-4 font-heading text-2xl font-extrabold text-forest">
              انتظر! 🎁 هدية لك
            </h2>
            <p className="mt-2 text-ink/70">
              استعمل الكود التالي واحصل على خصم خاص على طلبك الأول:
            </p>
            <div className="mt-4 rounded-2xl border-2 border-dashed border-gold bg-white py-3 font-heading text-2xl font-extrabold tracking-widest text-gold-dark">
              ELM10
            </div>
            <p className="mt-2 text-sm text-ink/50">
              اذكر الكود عند التأكيد عبر واتساب للاستفادة من الخصم.
            </p>
            <Link
              href="/shop"
              onClick={() => setOpen(false)}
              className="btn-gold mt-6 w-full"
            >
              اطلب الآن واستفد من الخصم
            </Link>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
