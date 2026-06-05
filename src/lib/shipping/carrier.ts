import type { Order } from "@/lib/orders/types";

// تكامل مع Ecotrack (الجزائر).
// Ecotrack منصّة white-label: لكل بائع نطاقه الخاص (مثل rocket.ecotrack.dz).
// لذلك نقرأ نطاقك من CARRIER_API_URL والتوكن من CARRIER_TOKEN.

export type ShipmentResult = {
  ok: boolean;
  tracking?: string;
  error?: string;
};

// مثال: https://votre-compte.ecotrack.dz  (بدون / في النهاية)
const BASE = (process.env.CARRIER_API_URL ?? "").replace(/\/$/, "");
const TOKEN = process.env.CARRIER_TOKEN ?? "";

// استخراج رقم الولاية (1-58) من نص مثل "16 - الجزائر العاصمة"
function wilayaCode(wilaya: string): number {
  const m = wilaya.match(/\d+/);
  return m ? parseInt(m[0], 10) : 0;
}

// تنظيف رقم الهاتف ليصبح 9-10 أرقام كما يطلب Ecotrack
function cleanPhone(phone: string): string {
  return phone.replace(/\D/g, "").replace(/^0/, "0").slice(0, 10);
}

export async function createParcel(order: Order): Promise<ShipmentResult> {
  if (!BASE || !TOKEN) {
    return {
      ok: false,
      error:
        "إعدادات Ecotrack غير مضبوطة (CARRIER_API_URL / CARRIER_TOKEN في Vercel).",
    };
  }

  // حقول Ecotrack الرسمية (api/v1/create/order)
  const payload = {
    reference: `ELM-${order.id}`,
    nom_client: order.full_name,
    telephone: cleanPhone(order.phone),
    adresse: order.address,
    commune: order.commune,
    code_wilaya: wilayaCode(order.wilaya),
    montant: order.total, // مبلغ الدفع عند الاستلام
    remarque: order.notes ?? "",
    produit: order.items.map((i) => `${i.name} x${i.quantity}`).join(", "),
    type: 1, // 1 = توصيل
    stop_desk: order.delivery === "stopdesk" ? 1 : 0,
  };

  try {
    const res = await fetch(`${BASE}/api/v1/create/order`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = (await res.json().catch(() => ({}))) as Record<
      string,
      unknown
    >;

    if (!res.ok || data.success === false) {
      return {
        ok: false,
        error:
          (data.message as string) || `استجابة Ecotrack: ${res.status}`,
      };
    }

    // Ecotrack يُعيد رقم التتبّع — نتحقّق من الأسماء المحتملة
    const tracking =
      (data.tracking as string) ||
      (data.tracking_id as string) ||
      ((data.data as Record<string, unknown>)?.tracking as string) ||
      "";

    return { ok: true, tracking };
  } catch (e) {
    return {
      ok: false,
      error: e instanceof Error ? e.message : "خطأ غير متوقّع",
    };
  }
}
