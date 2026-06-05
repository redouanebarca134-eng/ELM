// نوع الطلب المخزَّن في قاعدة البيانات
export type OrderStatus =
  | "pending" // قيد الانتظار (لم يُؤكَّد بعد)
  | "confirmed" // مؤكَّد (بعد مكالمة العميل)
  | "shipped" // أُرسل للتوصيل
  | "delivered" // سُلِّم
  | "cancelled" // أُلغي
  | "returned"; // رُجِّع

export const ORDER_STATUS_LABELS: Record<OrderStatus, string> = {
  pending: "قيد الانتظار",
  confirmed: "مؤكَّد",
  shipped: "قيد التوصيل",
  delivered: "تم التسليم",
  cancelled: "ملغى",
  returned: "مُرجَع",
};

export type OrderItem = {
  slug: string;
  name: string;
  price: number;
  quantity: number;
};

export type Order = {
  id: number;
  created_at: string;
  full_name: string;
  phone: string;
  wilaya: string;
  commune: string;
  address: string;
  delivery: "home" | "stopdesk";
  notes: string | null;
  items: OrderItem[];
  shipping: number;
  total: number;
  status: OrderStatus;
  tracking: string | null; // رقم تتبّع شركة التوصيل
};

// بيانات إنشاء طلب جديد (قبل التخزين)
export type NewOrder = Omit<
  Order,
  "id" | "created_at" | "status" | "tracking"
>;
