import { NextResponse } from "next/server";
import { createOrder } from "@/lib/orders/db";
import type { NewOrder } from "@/lib/orders/types";

export const dynamic = "force-dynamic";

// POST /api/orders — إنشاء طلب جديد من صفحة الدفع.
export async function POST(req: Request) {
  try {
    const body = (await req.json()) as Partial<NewOrder>;

    // تحقّق أساسي من الحقول المطلوبة
    if (
      !body.full_name ||
      !body.phone ||
      !body.wilaya ||
      !body.commune ||
      !body.address ||
      !body.items ||
      !Array.isArray(body.items) ||
      body.items.length === 0
    ) {
      return NextResponse.json(
        { ok: false, error: "بيانات ناقصة" },
        { status: 400 },
      );
    }

    const id = await createOrder({
      full_name: body.full_name,
      phone: body.phone,
      wilaya: body.wilaya,
      commune: body.commune,
      address: body.address,
      delivery: body.delivery === "stopdesk" ? "stopdesk" : "home",
      notes: body.notes ?? null,
      items: body.items,
      shipping: body.shipping ?? 0,
      total: body.total ?? 0,
    });

    return NextResponse.json({ ok: true, id });
  } catch (e) {
    // لا نُفشل تجربة العميل إن تعذّر التخزين — نُعيد خطأً ناعمًا
    return NextResponse.json(
      { ok: false, error: e instanceof Error ? e.message : "خطأ" },
      { status: 500 },
    );
  }
}
