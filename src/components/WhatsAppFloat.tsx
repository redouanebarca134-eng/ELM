"use client";

import { MessageCircle } from "lucide-react";
import { buildWhatsAppLink } from "@/lib/constants";

// زر واتساب عائم — أسفل اليسار في RTL، على كل الصفحات
export default function WhatsAppFloat() {
  const href = buildWhatsAppLink(
    "السلام عليكم، أريد الاستفسار عن شيلاجيت ELM 🌿",
  );
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="تواصل عبر واتساب"
      className="fixed bottom-5 start-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-110"
    >
      <MessageCircle className="h-7 w-7" />
      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#25D366] opacity-30" />
    </a>
  );
}
