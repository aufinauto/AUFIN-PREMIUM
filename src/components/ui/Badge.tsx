import type { CarStatus } from "@/lib/types";
import { statusLabels } from "@/lib/utils";

export function TagBadge({ children }: { children: string }) {
  return (
    <span className="inline-flex items-center border border-graphite/15 bg-white/80 px-2.5 py-1 font-sans text-[11px] uppercase tracking-[0.12em] text-graphite-soft backdrop-blur-sm">
      {children}
    </span>
  );
}

const statusColor: Record<CarStatus, string> = {
  available: "bg-status-available",
  reserved: "bg-status-reserved",
  sold: "bg-status-sold",
  preparing: "bg-status-preparing",
};

export function StatusBadge({ status }: { status: CarStatus }) {
  return (
    <span className="inline-flex items-center gap-1.5 font-sans text-[11px] uppercase tracking-[0.12em] text-graphite-soft">
      <span className={`h-1.5 w-1.5 rounded-full ${statusColor[status]}`} />
      {statusLabels[status]}
    </span>
  );
}
