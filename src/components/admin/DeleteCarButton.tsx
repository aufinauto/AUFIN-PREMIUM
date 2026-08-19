"use client";

import { useTransition } from "react";
import { deleteCarAction } from "@/app/admin/actions";

export default function DeleteCarButton({ id, label }: { id: string; label: string }) {
  const [pending, startTransition] = useTransition();

  function handleClick() {
    if (!window.confirm(`Opravdu smazat vůz „${label}“? Tuto akci nelze vrátit zpět.`)) return;
    startTransition(() => {
      deleteCarAction(id);
    });
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={pending}
      className="font-sans text-xs uppercase tracking-[0.08em] text-graphite-faint transition-colors hover:text-status-reserved disabled:opacity-50"
    >
      {pending ? "Mažu…" : "Smazat"}
    </button>
  );
}
