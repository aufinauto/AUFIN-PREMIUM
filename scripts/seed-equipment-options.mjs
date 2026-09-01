// One-off seed: populates the `equipment_options` catalog with Sauto.cz's
// full standard equipment taxonomy, so future cars can be checked off this
// list instead of retyping everything by hand. Categories are mapped onto
// our own fixed EquipmentGroup categories (see src/lib/types.ts).
//
// Usage: node scripts/seed-equipment-options.mjs

import { readFileSync } from "node:fs";
import { createClient } from "@supabase/supabase-js";

function loadEnvLocal() {
  const text = readFileSync(new URL("../.env.local", import.meta.url), "utf-8");
  const env = {};
  for (const line of text.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    env[trimmed.slice(0, eq).trim()] = trimmed.slice(eq + 1).trim();
  }
  return env;
}

const env = loadEnvLocal();
const supabase = createClient(env.SUPABASE_URL, env.SUPABASE_SECRET_KEY, {
  auth: { persistSession: false },
});

// category -> items, transcribed from Sauto.cz's own listing-creation form.
const CATALOG = {
  Bezpečnost: [
    "ABS",
    "Aktivní kapota",
    "Asistent stability přívěsu (TSA)",
    "Elektronická uzávěrka diferenciálu (EDS)",
    "ESP",
    "Hlídání mrtvého úhlu",
    "Nouzové brždění",
    "Protiprokluzový systém kol (ASR)",
    "Sledování jízdního pruhu",
    "Sledování únavy řidiče",
    "Systém nouzového zastavení",
    "Upozornění na přijíždějící vozidla při couvání (RCTA)",
    "Alarm",
    "Bezpečnostní pískování oken",
    "Centrální zamykání",
    "Dálkové centrální zamykání",
    "Imobilizér",
    "Zaslepení zámků",
    "Zámek řadící páky",
  ],
  Asistenti: [
    "360° monitorovací systém (AVM)",
    "Adaptivní tempomat",
    "Aktivní asistent řízení",
    "Asistent pro jízdu v koloně",
    "Asistent pro vedení vozu v jízdních pruzích",
    "Asistent při jízdě ze svahu",
    "Asistent rozjezdu do kopce",
    "Asistent změny jízdního pruhu",
    "Front Assist",
    "Lane Assist",
    "Parkovací asistent",
    "Parkovací kamera",
    "Parkovací senzory",
    "Parkovací senzory přední",
    "Parkovací senzory zadní",
    "Rozpoznávání dopravních značek",
    "Tempomat",
  ],
  Komfort: [
    "Akustická skla",
    "Ambientní LED osvětlení interiéru",
    "Bezklíčkové ovládání",
    "Deaktivace airbagu spolujezdce",
    "Dřevěné obložení",
    "El. ovládaný kufr",
    "El. ovládání oken",
    "El. ovládání zrcátek",
    "El. parkovací brzda",
    "El. sklopná zrcátka",
    "El. startér",
    "Elektrochromatické vnitřní zpětné zrcátko",
    "Chladnička",
    "Klimatizovaná přihrádka",
    "Kožené čalounění",
    "Malý kožený paket",
    "Multifunkční volant",
    "Nastavitelný volant",
    "Nezávislé topení",
    "Nezávislé topení s čas. předehřívačem",
    "Otáčkoměr",
    "Pádla řazení na volantu",
    "Posilovač řízení",
    "Příplatkový audiosystém",
    "Roletky na zadní okna",
    "Senzor opotřebení brzd. destiček",
    "Senzor stěračů",
    "Senzor tlaku v pneumatikách",
    "Sítka mezistěny zavazadlového prostoru",
    "Střešní okno",
    "Venkovní teploměr",
    "Vnitřní teploměr",
    "Vyhřívaná zrcátka",
    "Vyhřívané čelní sklo",
    "Vyhřívané trysky ostřikovačů skla",
    "Vyhřívaný volant",
    "Zadní loketní opěrka",
    "Zásuvka na 220 V",
  ],
  Technologie: [
    "2 monitory",
    "Android Auto",
    "Apple Car Play",
    "AUX",
    "Autorádio",
    "Bezdrátová nabíječka mobilních telefonů (Qi)",
    "Bluetooth",
    "CD měnič",
    "CD přehrávač",
    "Digitální příjem rádia (DAB)",
    "Digitální přístrojová deska",
    "Digitální přístrojový štít",
    "Dotykové ovládání palubního počítače",
    "DVD přehrávač",
    "Head-up display",
    "Hlasové ovládání palubního počítače",
    "Mobilní připojení",
    "Multimediální systém bez navigace",
    "Originální autorádio",
    "Ovládání vybraných funkcí vozu gesty",
    "Palubní počítač",
    "Prémiový audiosystém",
    "Příprava pro telefon",
    "Přístrojová deska s barevným displejem",
    "Satelitní navigace",
    "Telefon",
    "Televize",
    "USB",
    "Vstup paměťové karty",
    "Wifi hotspot",
  ],
  Interiér: [
    "Dělená zadní sedadla",
    "El. nastavitelná zadní sedadla",
    "El. seřiditelná sedadla",
    "El. seřiditelné sedadlo řidiče",
    "Isofix",
    "Kožená sedadla",
    "Masážní sedadla",
    "Nastavitelná sedadla",
    "Odvětrávání sedadel",
    "Paměť nastavení sedadla řidiče",
    "Podélný posuv sedadel",
    "Příprava pro isofix",
    "Sedadla Alcantara",
    "Sportovní sedadla",
    "Třetí řada sedadel",
    "Ventilovaná zadní sedadla",
    "Vyhřívaná sedadla",
    "Vyhřívaná zadní sedadla",
    "Vyjímatelná zadní sedadla",
    "Výsuvné opěrky hlav",
    "Výškově nastavitelná sedadla",
    "Výškově nastavitelné sedadlo řidiče",
  ],
  Exteriér: [
    "Automatické přepínání dálkových světel",
    "Automatické svícení",
    "Bi-xenony",
    "Denní svícení",
    "Laserová světla",
    "LED adaptivní světlomety",
    "LED denní svícení",
    "LED matrixové světlomety",
    "LED světlomety plnohodnotné",
    "Mlhovky",
    "Natáčecí světlomety",
    "Ostřikovače světlometů",
    "Přídavná světla",
    "Xenony",
    "Boční nášlapy",
    "Dojezdové rezervní kolo",
    "Elektrické dovírání dveří",
    "Elektrické dovírání zavazadlového prostoru",
    "Elektrické tažné zařízení",
    "Funkce plynulého dovírání dveří",
    "Laděný výfuk",
    "Litá kola",
    "Naviják",
    "Ochranné rámy",
    "Otevíratelná střecha",
    "Panoramatická střecha",
    "Plnohodnotné rezervní kolo",
    "Rezervní kolo",
    "Střešní nosič",
    "Střešní spoiler",
    "Šnorchl",
    "Tažné zařízení",
    "Tónovaná skla",
    "Zadní stěrač",
    "Zatmavená zadní skla",
    "Závěsné zařízení v TP",
  ],
  Sport: [
    "Adaptivní regulace podvozku",
    "Automatická uzávěrka diferenciálu",
    "LPG v TP",
    "Regulace tuhosti podvozku",
    "Regulace výšky podvozku",
    "Sportovní podvozek",
    "Start/Stop systém",
    "Uzávěrka mezinápravového diferenciálu",
    "Uzávěrka předního diferenciálu",
    "Uzávěrka zadního diferenciálu",
    "Vzduchové odpružení",
    "Volba jízdního režimu",
  ],
  Ostatní: ["Sportovní paket", "Tepelné čerpadlo", "Záruka"],
};

const rows = Object.entries(CATALOG).flatMap(([category, items]) =>
  items.map((item) => ({ category, item }))
);

console.log(`Upserting ${rows.length} equipment options…`);

const { error } = await supabase
  .from("equipment_options")
  .upsert(rows, { onConflict: "category,item", ignoreDuplicates: true });

if (error) {
  console.error("Failed:", error.message);
  process.exit(1);
}

console.log("Done.");
