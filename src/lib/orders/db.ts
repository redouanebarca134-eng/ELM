import { neon, type NeonQueryFunction } from "@neondatabase/serverless";
import type { NewOrder, Order, OrderStatus } from "./types";

// طبقة قاعدة البيانات للطلبات (Neon Postgres).
// تقرأ سلسلة الاتصال من DATABASE_URL (يضيفها تكامل Neon في Vercel تلقائيًا).
// تُنشئ الجدول تلقائيًا عند أول استخدام.

// إنشاء العميل بشكل كسول (عند الحاجة فقط) لتفادي فشل البناء بدون متغيّر بيئة.
let _sql: NeonQueryFunction<false, false> | null = null;
function getSql(): NeonQueryFunction<false, false> {
  if (_sql) return _sql;
  const connectionString =
    process.env.DATABASE_URL || process.env.POSTGRES_URL || "";
  if (!connectionString) {
    throw new Error(
      "قاعدة البيانات غير مضبوطة: أضِف تكامل Neon أو متغيّر DATABASE_URL في Vercel.",
    );
  }
  _sql = neon(connectionString);
  return _sql;
}

let ensured = false;

async function ensureTable() {
  if (ensured) return;
  const sql = getSql();
  await sql`
    CREATE TABLE IF NOT EXISTS orders (
      id          SERIAL PRIMARY KEY,
      created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
      full_name   TEXT NOT NULL,
      phone       TEXT NOT NULL,
      wilaya      TEXT NOT NULL,
      commune     TEXT NOT NULL,
      address     TEXT NOT NULL,
      delivery    TEXT NOT NULL,
      notes       TEXT,
      items       JSONB NOT NULL,
      shipping    INTEGER NOT NULL,
      total       INTEGER NOT NULL,
      status      TEXT NOT NULL DEFAULT 'pending',
      tracking    TEXT
    );
  `;
  ensured = true;
}

// إنشاء طلب جديد وإرجاع المعرّف
export async function createOrder(order: NewOrder): Promise<number> {
  await ensureTable();
  const sql = getSql();
  const rows = await sql`
    INSERT INTO orders
      (full_name, phone, wilaya, commune, address, delivery, notes, items, shipping, total)
    VALUES
      (${order.full_name}, ${order.phone}, ${order.wilaya}, ${order.commune},
       ${order.address}, ${order.delivery}, ${order.notes},
       ${JSON.stringify(order.items)}, ${order.shipping}, ${order.total})
    RETURNING id;
  `;
  return rows[0].id as number;
}

// جلب كل الطلبات (الأحدث أولًا)
export async function listOrders(): Promise<Order[]> {
  await ensureTable();
  const sql = getSql();
  const rows = await sql`SELECT * FROM orders ORDER BY created_at DESC;`;
  return rows as Order[];
}

// تحديث حالة الطلب
export async function updateOrderStatus(
  id: number,
  status: OrderStatus,
): Promise<void> {
  await ensureTable();
  const sql = getSql();
  await sql`UPDATE orders SET status = ${status} WHERE id = ${id};`;
}

// حفظ رقم تتبّع التوصيل
export async function setOrderTracking(
  id: number,
  tracking: string,
): Promise<void> {
  await ensureTable();
  const sql = getSql();
  await sql`UPDATE orders SET tracking = ${tracking}, status = 'shipped' WHERE id = ${id};`;
}

// إحصائيات سريعة للوحة التحكّم
export async function orderStats() {
  await ensureTable();
  const sql = getSql();
  const rows = await sql`
    SELECT
      COUNT(*)::int AS total_orders,
      COALESCE(SUM(CASE WHEN status = 'delivered' THEN total ELSE 0 END), 0)::int AS revenue,
      COUNT(*) FILTER (WHERE status = 'pending')::int AS pending
    FROM orders;
  `;
  return rows[0] as { total_orders: number; revenue: number; pending: number };
}

