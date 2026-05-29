"use client";

import { useState } from "react";
import { Mail, MapPin, MessageCircle, Send } from "lucide-react";
import { BRAND, buildWhatsAppLink } from "@/lib/constants";
import { cn } from "@/lib/utils";

export default function ContactPage() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", message: "" });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // يفتح واتساب برسالة معبأة مسبقًا
    const msg = `الاسم: ${form.name}\nالهاتف: ${form.phone}\nالرسالة: ${form.message}`;
    window.open(buildWhatsAppLink(msg), "_blank");
    setSent(true);
  }

  return (
    <div className="bg-cream">
      <section className="bg-forest py-16 text-center">
        <div className="container-elm">
          <h1 className="font-heading text-4xl font-extrabold text-cream">
            اتصل بنا
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-cream/80">
            نحن هنا لمساعدتك — تواصل معنا بأي طريقة تناسبك.
          </p>
        </div>
      </section>

      <section className="container-elm section-pad">
        <div className="grid gap-10 lg:grid-cols-2">
          {/* معلومات التواصل */}
          <div className="space-y-5">
            <ContactItem
              icon={MessageCircle}
              title="واتساب"
              value="تواصل فوري معنا"
              href={buildWhatsAppLink("السلام عليكم، أريد التواصل مع ELM")}
            />
            <ContactItem
              icon={Mail}
              title="البريد الإلكتروني"
              value={BRAND.email}
              href={`mailto:${BRAND.email}`}
            />
            <ContactItem
              icon={MapPin}
              title="الموقع"
              value="الجزائر — توصيل لكل الولايات الـ58"
            />
          </div>

          {/* النموذج */}
          <form
            onSubmit={handleSubmit}
            className="rounded-2xl bg-white p-6 shadow-soft sm:p-8"
          >
            <h2 className="font-heading text-xl font-bold text-forest">
              أرسل لنا رسالة
            </h2>
            <div className="mt-4 space-y-4">
              <input
                required
                type="text"
                placeholder="الاسم الكامل"
                value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                className="h-12 w-full rounded-2xl border-2 border-sand bg-white px-4 outline-none focus:border-gold"
              />
              <input
                required
                type="text"
                inputMode="tel"
                placeholder="رقم الهاتف"
                value={form.phone}
                onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                className="h-12 w-full rounded-2xl border-2 border-sand bg-white px-4 outline-none focus:border-gold"
              />
              <textarea
                required
                rows={4}
                placeholder="رسالتك..."
                value={form.message}
                onChange={(e) =>
                  setForm((f) => ({ ...f, message: e.target.value }))
                }
                className="w-full rounded-2xl border-2 border-sand bg-white px-4 py-3 outline-none focus:border-gold"
              />
              <button type="submit" className="btn-gold w-full">
                <Send className="h-5 w-5" />
                إرسال عبر WhatsApp
              </button>
              {sent && (
                <p className={cn("text-center text-sm text-forest-light")}>
                  تم فتح واتساب — أكمل إرسال رسالتك هناك.
                </p>
              )}
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}

function ContactItem({
  icon: Icon,
  title,
  value,
  href,
}: {
  icon: typeof Mail;
  title: string;
  value: string;
  href?: string;
}) {
  const content = (
    <div className="flex items-start gap-4 rounded-2xl bg-white p-5 shadow-soft transition-shadow hover:shadow-lg">
      <span className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-forest/10">
        <Icon className="h-6 w-6 text-forest-light" />
      </span>
      <div>
        <h3 className="font-heading font-bold text-forest">{title}</h3>
        <p className="text-ink/70">{value}</p>
      </div>
    </div>
  );
  return href ? (
    <a href={href} target="_blank" rel="noopener noreferrer">
      {content}
    </a>
  ) : (
    content
  );
}
