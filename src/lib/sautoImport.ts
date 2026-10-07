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

// The visible HTML table only lists the first part of each category (the rest
// sits behind "Zobrazit více"), but the page embeds the complete list as JSON:
// "equipment_cb":[{"equipment_category":"safety","name":"ABS","value":1},…]
// Verified 2026-10 — category codes map 1:1 to Sauto's own labels.
const CATEGORY_CODES: Record<string, EquipmentGroup["category"]> = {
  safety: "Bezpečnostní systémy",
  assist: "Asistenční systémy",
  security: "Zabezpečení vozidla",
  interior: "Vnitřní výbava a komfort",
  systems: "Palubní systémy a konektivita",
  seats: "Sedadla",
  lights: "Světelná technika",
  exterior: "Vnější výbava",
  drive: "Pohon a podvozek",
  other: "Ostatní",
};

/** Extracts the JSON array that follows `"equipment_cb":` (bracket-aware). */
function extractEquipmentJson(html: string): unknown[] | null {
  const key = '"equipment_cb":';
  const start = html.indexOf(key);
  if (start === -1) return null;
  let i = start + key.length;
  if (html[i] !== "[") return null;
  let depth = 0;
  let inString = false;
  for (let j = i; j < html.length; j++) {
    const ch = html[j];
    if (inString) {
      if (ch === "\\") j++;
      else if (ch === '"') inString = false;
    } else if (ch === '"') inString = true;
    else if (ch === "[" || ch === "{") depth++;
    else if (ch === "]" || ch === "}") {
      depth--;
      if (depth === 0) {
        try {
          const parsed = JSON.parse(html.slice(i, j + 1));
          return Array.isArray(parsed) ? parsed : null;
        } catch {
          return null;
        }
      }
    }
  }
  return null;
}

function groupsFromJson(entries: unknown[]): EquipmentGroup[] {
  const groups: EquipmentGroup[] = [];
  for (const entry of entries) {
    if (!entry || typeof entry !== "object") continue;
    const { equipment_category, name } = entry as { equipment_category?: string; name?: string };
    const item = name?.trim();
    if (!item) continue;
    const category = CATEGORY_CODES[equipment_category ?? ""] ?? "Ostatní";
    const existing = groups.find((g) => g.category === category);
    if (existing) {
      if (!existing.items.includes(item)) existing.items.push(item);
    } else {
      groups.push({ category, items: [item] });
    }
  }
  // Keep Sauto's category order.
  const order = Object.values(CATEGORY_CODES);
  return groups.sort((a, b) => order.indexOf(a.category) - order.indexOf(b.category));
}

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

  const json = extractEquipmentJson(html);
  if (json && json.length > 0) return groupsFromJson(json);

  // Fallback: parse the visible table (may be incomplete, see above).

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
