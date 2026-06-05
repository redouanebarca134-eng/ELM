import { cookies } from "next/headers";

// مصادقة بسيطة للوحة التحكّم عبر كلمة مرور (متغيّر بيئة) + كوكي.
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD ?? "";
const COOKIE_NAME = "elm_admin";

// قيمة الكوكي = نفس كلمة المرور (تُخزَّن HttpOnly). بسيطة وكافية لمتجر صغير.
export async function isAdmin(): Promise<boolean> {
  if (!ADMIN_PASSWORD) return false;
  const store = await cookies();
  return store.get(COOKIE_NAME)?.value === ADMIN_PASSWORD;
}

export async function signIn(password: string): Promise<boolean> {
  if (!ADMIN_PASSWORD || password !== ADMIN_PASSWORD) return false;
  const store = await cookies();
  store.set(COOKIE_NAME, password, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30, // 30 يومًا
  });
  return true;
}

export async function signOut(): Promise<void> {
  const store = await cookies();
  store.delete(COOKIE_NAME);
}
