import Link from "next/link";
import { logoutAction } from "@/app/admin/actions";

export default function AdminTopBar({ title }: { title: string }) {
  return (
    <div className="border-b border-stone-200 bg-white">
      <div className="mx-auto flex max-w-[1200px] items-center justify-between px-6 py-5">
        <div className="flex items-baseline gap-3">
          <Link href="/admin" className="font-sans text-xl tracking-tight text-graphite">
            <span className="font-extrabold">ICON</span>
            <span className="font-light">cars</span>
          </Link>
          <span className="font-sans text-xs uppercase tracking-[0.14em] text-graphite-faint">
            {title}
          </span>
        </div>
        <div className="flex items-center gap-6">
          <Link
            href="/"
            target="_blank"
            className="font-sans text-xs uppercase tracking-[0.1em] text-graphite-soft hover:text-graphite"
          >
            Zpět na web
          </Link>
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
    </div>
  );
}
