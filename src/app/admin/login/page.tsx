import { redirect } from "next/navigation";
import { isAdmin, signIn } from "@/lib/admin-auth";

// صفحة دخول لوحة التحكّم.
export default async function AdminLogin({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  if (await isAdmin()) redirect("/admin");
  const { error } = await searchParams;

  async function login(formData: FormData) {
    "use server";
    const password = String(formData.get("password") ?? "");
    const ok = await signIn(password);
    if (ok) redirect("/admin");
    redirect("/admin/login?error=1");
  }

  return (
    <div className="flex min-h-[70vh] items-center justify-center bg-cream px-4">
      <form
        action={login}
        className="w-full max-w-sm rounded-2xl bg-white p-8 shadow-soft"
      >
        <h1 className="text-center font-heading text-2xl font-extrabold text-forest">
          لوحة تحكّم ELM
        </h1>
        <p className="mt-2 text-center text-sm text-ink/60">
          أدخل كلمة المرور للدخول إلى إدارة الطلبات.
        </p>
        <input
          type="password"
          name="password"
          required
          placeholder="كلمة المرور"
          className="mt-6 h-12 w-full rounded-2xl border-2 border-sand bg-white px-4 outline-none focus:border-gold"
        />
        {error && (
          <p className="mt-2 text-center text-sm text-red-500">
            كلمة مرور غير صحيحة
          </p>
        )}
        <button type="submit" className="btn-gold mt-4 w-full">
          دخول
        </button>
      </form>
    </div>
  );
}
