import Link from "next/link";
import { logoutAction } from "@/app/admin/actions";

export default function AdminTopBar({ title }: { title: string }) {
  return (
    <div className="border-b border-stone-200 bg-white">
      <div className="mx-auto flex max-w-[1200px] items-center justify-between px-6 py-5">
        <div className="flex items-baseline gap-3">
          <Link href="/admin" className="font-display text-xl italic text-graphite">
            Aufin
          </Link>
          <span className="font-sans text-xs uppercase tracking-[0.14em] text-graphite-faint">
            {title}
          </span>
        </div>
        <form action={logoutAction}>
          <button
            type="submit"
            className="font-sans text-xs uppercase tracking-[0.1em] text-graphite-soft hover:text-graphite"
          >
            Odhlásit se
          </button>
        </form>
      </div>
    </div>
  );
}
