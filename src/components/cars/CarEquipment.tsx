import type { EquipmentGroup } from "@/lib/types";
import { StaggerGroup, StaggerItem } from "@/components/ui/StaggerReveal";

export default function CarEquipment({ equipment }: { equipment: EquipmentGroup[] }) {
  const items = Array.from(new Set(equipment.flatMap((g) => g.items))).sort((a, b) =>
    a.localeCompare(b, "cs")
  );

  return (
    <StaggerGroup className="grid grid-cols-1 gap-x-10 gap-y-2.5 sm:grid-cols-2">
      {items.map((item) => (
        <StaggerItem key={item}>
          <p className="flex items-start gap-3 font-sans text-[14.5px] text-graphite-soft">
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="mt-0.5 shrink-0 text-accent"
            >
              <path d="M4 12l6 6L20 6" />
            </svg>
            {item}
          </p>
        </StaggerItem>
      ))}
    </StaggerGroup>
  );
}
