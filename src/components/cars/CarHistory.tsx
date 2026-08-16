import type { CarHistory as CarHistoryType } from "@/lib/types";
import { StaggerGroup, StaggerItem } from "@/components/ui/StaggerReveal";

export default function CarHistory({ history }: { history: CarHistoryType }) {
  const items: string[] = [];
  if (history.verifiedOrigin) items.push("Prověřený původ");
  if (history.serviceHistory) items.push("Servisní historie");
  if (history.vinChecked) items.push("Kontrola VIN");
  if (history.noLegalDefects) items.push("Bez právních vad");
  if (history.independentInspection) items.push("Možnost nezávislé prohlídky");
  if (history.originCountry) items.push(`Původ: ${history.originCountry}`);
  if (history.owners != null)
    items.push(`${history.owners}. majitel v pořadí`);

  if (items.length === 0) return null;

  return (
    <StaggerGroup className="grid grid-cols-1 gap-x-8 gap-y-3 sm:grid-cols-2">
      {items.map((item) => (
        <StaggerItem key={item} className="flex items-center gap-3 border border-stone-200 px-4 py-3.5">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            className="shrink-0 text-accent"
          >
            <path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z" />
            <path d="M9 12l2 2 4-4" />
          </svg>
          <span className="font-sans text-[14px] text-graphite-soft">{item}</span>
        </StaggerItem>
      ))}
    </StaggerGroup>
  );
}
