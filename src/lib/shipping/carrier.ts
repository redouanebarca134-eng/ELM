import type { Order } from "@/lib/orders/types";

// واجهة عامة لشركة التوصيل — قابلة للاستبدال بأي ناقل (ZR/Maystro/Yalidine...).
// عند معرفة الناقل، نملأ createParcel بنداء API الخاص به والتوكن.

export type ShipmentResult = {
  ok: boolean;
  tracking?: string; // رقم التتبّع المُعاد من الناقل
  error?: string;
};

// التوكن وإعدادات الناقل تُقرأ من متغيّرات البيئة (أسرار) — ليست في الكود.
const CARRIER_TOKEN = process.env.CARRIER_TOKEN ?? "";
const CARRIER_API_URL = process.env.CARRIER_API_URL ?? "";

// إنشاء شحنة لدى الناقل. الحالي: هيكل جاهز ينتظر تفاصيل API الناقل.
export async function createParcel(order: Order): Promise<ShipmentResult> {
  if (!CARRIER_TOKEN || !CARRIER_API_URL) {
    return {
      ok: false,
      error:
        "إعدادات الناقل غير مضبوطة (CARRIER_TOKEN / CARRIER_API_URL). أضِفها في Vercel.",
    };
  }

  try {
    // ── نموذج عام: عدّله حسب توثيق الناقل الذي ستختاره ──
    const payload = {
      recipient: order.full_name,
      phone: order.phone,
      wilaya: order.wilaya,
      commune: order.commune,
      address: order.address,
      delivery_type: order.delivery, // home | stopdesk
      amount: order.total, // مبلغ الدفع عند الاستلام (COD)
      products: order.items
        .map((i) => `${i.name} x${i.quantity}`)
        .join(", "),
    };

    const res = await fetch(CARRIER_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // معظم النواقل تستخدم Bearer token؛ بعضها يستخدم رؤوسًا أخرى
        Authorization: `Bearer ${CARRIER_TOKEN}`,
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      return { ok: false, error: `استجابة الناقل: ${res.status}` };
    }

    const data = (await res.json()) as Record<string, unknown>;
    // اسم حقل التتبّع يختلف بين النواقل — عدّله حسب الناقل
    const tracking =
      (data.tracking as string) ||
      (data.tracking_number as string) ||
      (data.id as string) ||
      "";

    return { ok: true, tracking };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : "خطأ غير متوقّع" };
  }
}
