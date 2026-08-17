import type { EquipmentGroup } from "@/lib/types";
import { StaggerGroup, StaggerItem } from "@/components/ui/StaggerReveal";

export default function CarEquipment({ equipment }: { equipment: EquipmentGroup[] }) {
  return (
    <StaggerGroup className="grid grid-cols-1 gap-x-10 gap-y-10 sm:grid-cols-2">
      {equipment.map((group) => (
        <StaggerItem key={group.category}>
          <p className="mb-4 font-sans text-xs uppercase tracking-[0.16em] text-graphite-faint">
            {group.category}
          </p>
          <ul className="space-y-2.5">
            {group.items.map((item) => (
              <li key={item} className="flex items-start gap-3 font-sans text-[14.5px] text-graphite-soft">
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
              </li>
            ))}
          </ul>
        </StaggerItem>
      ))}
    </StaggerGroup>
  );
}
