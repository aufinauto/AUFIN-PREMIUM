import "server-only";
import type { EquipmentGroup } from "./types";

// Sauto.cz renders equipment as plain server-side HTML — no headless
// browser needed. Verified markup (2026-08):
// <th class="...__equipment-label">Kategorie:</th><td class="...__equipment-value">Item, Item, …</td>
const ROW_REGEX =
  /<th[^>]*class="[^"]*__equipment-label[^"]*"[^>]*>([\s\S]*?)<\/th>\s*<td[^>]*class="[^"]*__equipment-value[^"]*"[^>]*>([\s\S]*?)<\/td>/g;

// Our EquipmentGroup categories were deliberately named to match Sauto's own
// labels verbatim (see src/lib/types.ts) — so a recognized label is used
// as-is; anything unexpected (a new Sauto category we don't know about)
// falls back to "Ostatní" instead of being dropped.
const KNOWN_CATEGORIES: EquipmentGroup["category"][] = [
  "Bezpečnostní systémy",
  "Asistenční systémy",
  "Zabezpečení vozidla",
  "Vnitřní výbava a komfort",
  "Palubní systémy a konektivita",
  "Sedadla",
  "Světelná technika",
  "Vnější výbava",
  "Pohon a podvozek",
  "Ostatní",
];

function stripTags(html: string): string {
  return html
    .replace(/<[^>]+>/g, "")
    .replace(/&amp;/g, "&")
    .trim();
}

export async function fetchSautoEquipment(url: string): Promise<EquipmentGroup[]> {
  let parsed: URL;
  try {
    parsed = new URL(url);
  } catch {
    throw new Error("Neplatná URL adresa.");
  }
  if (!parsed.hostname.endsWith("sauto.cz")) {
    throw new Error("Podporované jsou pouze odkazy na sauto.cz.");
  }

  const res = await fetch(parsed.toString(), {
    headers: { "User-Agent": "Mozilla/5.0 (compatible; ICONcarsBot/1.0)" },
  });
  if (!res.ok) {
    throw new Error(`Stránku se nepodařilo načíst (HTTP ${res.status}).`);
  }
  const html = await res.text();

  const sectionMatch = html.match(
    /<h3 class="c-car-details-section__heading">Výbava vozu<\/h3>([\s\S]*?)<\/table>/
  );
  if (!sectionMatch) return [];

  const groups: EquipmentGroup[] = [];
  let match: RegExpExecArray | null;
  ROW_REGEX.lastIndex = 0;
  while ((match = ROW_REGEX.exec(sectionMatch[1]))) {
    const rawLabel = stripTags(match[1]).replace(/:\s*$/, "");
    const items = stripTags(match[2])
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
    if (items.length === 0) continue;

    const category = (KNOWN_CATEGORIES as string[]).includes(rawLabel)
      ? (rawLabel as EquipmentGroup["category"])
      : "Ostatní";
    const existing = groups.find((g) => g.category === category);
    if (existing) {
      existing.items = Array.from(new Set([...existing.items, ...items]));
    } else {
      groups.push({ category, items });
    }
  }
  return groups;
}
