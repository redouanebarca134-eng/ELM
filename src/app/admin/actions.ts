"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { isAdmin, signOut } from "@/lib/admin-auth";
import {
  listOrders,
  updateOrderStatus,
  setOrderTracking,
} from "@/lib/orders/db";
import { createParcel } from "@/lib/shipping/carrier";
import type { OrderStatus } from "@/lib/orders/types";

// تغيير حالة الطلب
export async function changeStatus(id: number, status: OrderStatus) {
  if (!(await isAdmin())) return;
  await updateOrderStatus(id, status);
  revalidatePath("/admin");
}

// إنشاء شحنة لدى الناقل لطلب معيّن
export async function ship(id: number) {
  if (!(await isAdmin())) return;
  const orders = await listOrders();
  const order = orders.find((o) => o.id === id);
  if (!order) return;

  const result = await createParcel(order);
  if (result.ok && result.tracking) {
    await setOrderTracking(id, result.tracking);
  }
  revalidatePath("/admin");
}

export async function logout() {
  await signOut();
  redirect("/admin/login");
}
