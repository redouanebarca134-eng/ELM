import { PROMO } from "@/lib/promo";

// شريط إعلاني أعلى الموقع (دليل على القيمة + طمأنة)
export default function AnnouncementBar() {
  return (
    <div className="bg-forest text-cream">
      <div className="container-elm overflow-hidden py-2">
        <p className="text-center text-xs font-medium sm:text-sm">
          {PROMO.announcement}
        </p>
      </div>
    </div>
  );
}
