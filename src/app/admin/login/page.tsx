import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import type { Metadata } from "next";
import {
  ADMIN_SESSION_COOKIE,
  ADMIN_SESSION_TTL_MS,
  checkAdminPassword,
  createSessionToken,
} from "@/lib/adminAuth";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

async function login(formData: FormData) {
  "use server";
  const password = formData.get("password");
  if (typeof password !== "string" || !checkAdminPassword(password)) {
    redirect("/admin/login?error=1");
  }

  const token = await createSessionToken();
  const store = await cookies();
  store.set(ADMIN_SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: ADMIN_SESSION_TTL_MS / 1000,
  });
  redirect("/admin");
}

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;

  return (
    <div className="flex min-h-screen items-center justify-center bg-graphite px-6">
      <form action={login} className="w-full max-w-sm bg-white p-8">
        <h1 className="font-sans text-2xl tracking-tight text-graphite">
          <span className="font-extrabold">ICON</span>
          <span className="font-light">cars</span>
        </h1>
        <p className="mt-1 font-sans text-xs uppercase tracking-[0.14em] text-graphite-faint">
          Administrace
        </p>

        <div className="mt-8">
          <label
            htmlFor="password"
            className="font-sans text-xs uppercase tracking-[0.1em] text-graphite-faint"
          >
            Heslo
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            autoFocus
            className="mt-2 w-full border border-stone-200 px-4 py-3 font-sans text-sm text-graphite focus:border-graphite focus:outline-none"
          />
        </div>

        {error ? (
          <p className="mt-4 font-sans text-sm text-status-reserved">Nesprávné heslo.</p>
        ) : null}

        <button
          type="submit"
          className="mt-6 w-full bg-graphite px-6 py-3.5 font-sans text-sm uppercase tracking-[0.08em] text-white transition-colors hover:bg-accent"
        >
          Přihlásit se
        </button>
      </form>
    </div>
  );
}
