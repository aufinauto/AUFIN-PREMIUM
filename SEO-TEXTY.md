# SEO texty webu iconcars.cz: přehled k úpravě

Stav k 7. 10. 2026, staženo z živého webu.
U každé stránky je **současný text** a **můj návrh**. Do sloupce „Rozhodnutí“ napiš ✅ (beru návrh), ❌ (nechat) nebo vlastní znění.

**Limity:** title max. ~60 znaků (zbytek Google ořízne), description ~150–160 znaků. K titlu se automaticky přidává „ | ICONcars“ (kromě úvodní stránky).

> **Stav 7. 10. 2026:** body 0–8 jsou odsouhlasené a zapracované (čeká na nasazení). Značky se normalizují automaticky (`formatBrand` v `src/lib/utils.ts`). Prodaný vůz zobrazí blok „Tento vůz byl prodán“ a podobné vozy. **Zbývá na majiteli:** psát ke každému vozu v adminu vlastní text „O vozu“ (80–150 slov) a sjednotit NAP (ICONcars, Rohanské nábřeží 693/10, Praha 8, +420 704 901 148) na Google Business Profile, Firmy.cz a sociálních sítích. FAQ výkupu má 8 otázek (včetně havarovaných aut, ty vykupujeme). Na Financování zůstává perex o vozech mimo nabídku i „do 24 hodin“, schváleno. Platí finální klíčová slova níže. Hlavní SEO téma webu je **výkup**, úvod posílá autoritu na `/vykup-vozidel` a výraz „autobazar“ nepoužíváme.
>
> | Stránka | Hlavní fráze | Vedlejší fráze |
> |---|---|---|
> | Úvod | prémiové vozy Praha | sportovní vozy Praha, prodej prémiových vozů, výkup prémiových vozů |
> | **Výkup** | **výkup aut Praha** | výkup vozidel Praha, výkup prémiových vozů, výkup sportovních vozů, výkup BMW, výkup Mercedes, výkup Audi |
> | Vozy | prémiové ojeté vozy Praha | ojeté BMW Praha, ojeté Mercedes Praha, ojeté Audi Praha, sportovní vozy Praha |
> | Financování | financování ojetých vozů | financování auta, úvěr na auto, financování prémiového vozu |
> | O nás | prodejce prémiových vozů Praha | autosalon prémiových vozů Praha |
> | Kontakt | autosalon Praha 8 | autosalon Karlín, prodejce aut Karlín |
> | Detail vozu | konkrétní model + prodej | BMW M340i prodej Praha apod. |

---

## 0. Klíčová slova, na která chceme cílit (původní návrh)

Teď se web ukazuje jen na „iconcars“. Návrh hlavních frází (potvrď nebo uprav):

| Stránka | Hlavní fráze | Vedlejší fráze |
|---|---|---|
| Úvod | prémiové ojeté vozy Praha | sportovní auta prodej, autobazar Praha 8 / Karlín |
| Výkup vozidel | výkup aut Praha | výkup vozidel, výkup prémiových vozů, výkup auta na leasing, výkup BMW/Mercedes/Audi |
| Vozy | ojeté prémiové vozy na prodej | ojeté BMW / Mercedes / Audi Praha, sportovní vozy skladem |
| Financování | financování ojetého auta | úvěr na auto, leasing ojetého vozu, splátky auta |
| O nás | (značka, důvěra) | prodejce prémiových vozů Praha |
| Kontakt | autosalon Praha 8 / Karlín | Rohanské nábřeží, SilverCars |
| Detail vozu | „značka model rok“ + „prodej“ / „Praha“ | např. „Audi S6 2024 prodej Praha“ |

**Rozhodnutí:**

---

## 1. Globální (celý web): `src/app/layout.tsx`

| Prvek | Současný text | Návrh | Rozhodnutí |
|---|---|---|---|
| Název značky | střídá se „ICON“ / „ICONcars“ / „ICON cars“ | sjednotit všude na **ICONcars** | |
| Popis firmy (description + strukturovaná data) | ICON je pražská značka specializovaná na prémiové a sportovní automobily — prodej vybraných vozů a výkup vozidel po celé ČR. Financování, protiúčet i kompletní administrativa na jednom místě. | ICONcars – prodej prémiových a sportovních ojetých vozů v Praze a výkup aut po celé ČR. Financování, protiúčet i kompletní administrativa na jednom místě. | |

---

## 2. Úvodní stránka `/`: `src/app/page.tsx` + `src/components/home/*`

| Prvek | Současný text | Návrh | Rozhodnutí |
|---|---|---|---|
| Title | ICONcars — Prémiové a sportovní vozy, výkup vozidel | Prémiové ojeté vozy Praha a výkup aut \| ICONcars | |
| Description | (globální, viz výše) | Prodej prověřených prémiových a sportovních vozů v Praze 8 – BMW, Mercedes, Audi. Výkup aut po celé ČR, financování i protiúčet. | |
| Nadtitulek | Prémiové a sportovní automobily | Prémiové a sportovní vozy · Praha | |
| **H1** | Auta, která stojí za pozornost | *varianta A:* Prémiové a sportovní vozy, které stojí za pozornost<br>*varianta B:* nechat a klíčová slova dát do nadtitulku a perexu | |
| Perex pod H1 | Sportovní a prémiové automobily pro klienty, kteří hledají víc než jen způsob dopravy. | Prověřené prémiové a sportovní ojeté vozy v Praze pro klienty, kteří hledají víc než jen způsob dopravy. | |
| H2 nabídka | Vybrané vozy | Vybrané vozy skladem | |
| H2 výkup | Chcete prodat svůj vůz? | Výkup aut – chcete prodat svůj vůz? | |
| Text výkup | Nabídněte nám své auto. Po základním prověření Vám připravíme individuální nabídku výkupu nebo protiúčtu. | (doplnit „…výkupu nebo protiúčtu, obvykle do 24 hodin.“ – **jen pokud to platí**) | |
| H2 důvěra | Záruka spolehlivosti a férovosti. | nechat | |
| H3 + texty | Kvalitní vozidla / Partnerský showroom / Osobní přístup | nechat | |
| H2 financování | Financování bez zbytečných komplikací | Financování auta bez zbytečných komplikací | |
| H2 kontakt | Ozvěte se nám | nechat | |
| Text kontakt | Vozy si můžete prohlédnout v showroomu našeho partnera SilverCars v pražském Karlíně. | nechat (je v něm lokalita, to je dobře) | |

**Chybí:** krátký odstavec textu (asi 100–150 slov) o tom, co ICONcars dělá, s klíčovými slovy. Úvod má teď jen 352 slov, většinou karty vozů.

---

## 3. Výkup vozidel `/vykup-vozidel`: `src/app/vykup-vozidel/page.tsx`
Nejdůležitější stránka pro poptávky.

| Prvek | Současný text | Návrh | Rozhodnutí |
|---|---|---|---|
| Title | Výkup vozidel Praha | Výkup aut Praha – rychle, férově, celá ČR | |
| Description | Vykoupíme váš vůz rychle, férově a diskrétně — včetně prémiových a sportovních automobilů i vozidel na úvěr nebo leasing. Nezávazné posouzení, Praha i celá ČR. | Výkup aut v Praze i po celé ČR. Nezávazné ocenění z fotek, výkup i vozů na leasing nebo úvěr, platba převodem, přepis vyřídíme za vás. | |
| Nadtitulek | Výkup vozidel | Výkup aut Praha | |
| **H1** | Vykoupíme váš vůz rychle, férově a bez starostí | Výkup aut v Praze – rychle, férově a bez starostí | |
| Perex | Individuální ocenění prémiových, sportovních i běžných vozů. Výkup vyřešíme rychle, bezpečně a včetně veškeré administrativy. | nechat | |
| H2 | Jak výkup probíhá | Jak probíhá výkup auta | |
| Kroky 01–04 | Pošlete nám vůz / Posoudíme stav vozu / Připravíme nabídku / Domluvíme předání | nechat | |
| H2 | Vykupujeme vozidla všech značek a kategorií | nechat | |
| Seznam | Osobní automobily napříč značkami… / Prémiové a sportovní vozy… / Doplacené i financované vozy… / Vozy k okamžitému výkupu i jako protiúčet… | doplnit konkrétní značky: „BMW, Mercedes-Benz, Audi, Porsche, Volkswagen, Škoda a další“ | |
| H2 | Co ovlivňuje výkupní cenu | nechat | |
| H2 | Časté otázky k výkupu | nechat | |
| FAQ (10 otázek) | Vykupujete i prémiová…? / Jak rychle…? / Musím přijet osobně? / Jaké dokumenty…? / Financovaná/leasingová? / Platba? / Přepis? / Zavazuje mě poptávka? / Mimo Prahu? / Co ovlivňuje cenu? | **přidat:** „Kolik dostanu za své auto?“, „Vykupujete auta s vadou nebo po havárii?“ (jen pokud ano), „Vykupujete i firemní vozy s DPH?“ | |
| H2 formulář | Nechte si vůz nacenit | Nechte si auto nacenit zdarma | |

**Do budoucna:** podstránky „Výkup BMW“, „Výkup Mercedes“, „Výkup Audi“, „Výkup Porsche“, aby se web dal najít i na hledání podle značky.

---

## 4. Vozy `/vozy`: `src/app/vozy/page.tsx`

| Prvek | Současný text | Návrh | Rozhodnutí |
|---|---|---|---|
| Title | Vozy | Prémiové ojeté vozy na prodej – Praha | |
| Description | Pečlivě vybrané automobily, které máme aktuálně v nabídce. Prohlédněte si prémiové a sportovní vozy ICONcars. | Aktuální nabídka prověřených prémiových a sportovních ojetých vozů – BMW, Mercedes, Audi. Financování, protiúčet, prohlídka v Praze 8. | |
| Nadtitulek | Nabídka | nechat | |
| **H1** | Vozy | Prémiové a sportovní vozy skladem | |
| Perex | Pečlivě vybrané automobily, které máme aktuálně v nabídce. | Pečlivě vybrané prémiové a sportovní ojeté vozy s prověřenou historií. Prohlédnout si je můžete v showroomu v Praze 8. | |

**Chybí:** krátký text pod výpisem (asi 100 slov), aby stránka nebyla jen seznam 4 karet (teď 226 slov).

---

## 5. Financování `/financovani`: `src/app/financovani/page.tsx`

| Prvek | Současný text | Návrh | Rozhodnutí |
|---|---|---|---|
| Title | Financování | Financování ojetého auta – úvěr i leasing | |
| Description | Financování vozu podle vašich možností. Spolupracujeme s bankovními a finančními partnery a připravíme individuální nabídku. | Úvěr nebo leasing na ojeté auto podle vašich možností. Spočítejte si splátku v kalkulačce, nabídku připravíme do 24 hodin. Financujeme i vozy mimo naši nabídku. | |
| **H1** | Vaše auto. Financování podle vás | Financování auta podle vás | |
| Perex | Vyberte si vůz a my vám pomůžeme najít vhodný způsob financování… Rádi zajistíme financování i pro vůz, který není z naší nabídky. | nechat (silná věta o vozech mimo nabídku) | |
| H2 | Spočítejte si orientační splátku | Kalkulačka splátek auta | |
| H2 | Nezávazně nás kontaktujte | nechat | |

**Chybí:** FAQ (např. „Jaká je minimální akontace?“, „Financujete i firmy / OSVČ?“, „Lze auto splatit předčasně?“). Odpovědi musí dodat ty, nebudu je vymýšlet.

---

## 6. O nás `/o-nas`: `src/app/o-nas/page.tsx`

| Prvek | Současný text | Návrh | Rozhodnutí |
|---|---|---|---|
| Title | O nás | O nás – prodejce prémiových vozů Praha | |
| Description | Specializujeme se na sportovní, prémiové a zajímavé automobily. Nabídku nestavíme na množství, ale na pečlivém výběru. | nechat + doplnit „…v Praze.“ | |
| **H1** | Auta vybíráme stejně, jako bychom je kupovali sami | nechat (silné, důvěryhodné) | |
| H3 hodnoty | Výběr / Transparentnost / Osobní přístup / Kompletní servis | nechat | |
| H2 | Méně vozů. Vyšší standard. | nechat | |
| Text | …musí splňovat naše přísné kritéria. | **oprava gramatiky:** „…naše přísná kritéria.“ | |
| H2 | Hledáte konkrétní vůz? | nechat | |

**Chybí:** kdo za firmou stojí (jména, fotka, příběh). Google i zákazníci to u prodejce aut hodnotí jako důvěryhodnost.

---

## 7. Kontakt `/kontakt`: `src/app/kontakt/page.tsx`

| Prvek | Současný text | Návrh | Rozhodnutí |
|---|---|---|---|
| Title | Kontakt | Kontakt – showroom Praha 8, Karlín | |
| Description | Kontaktujte nás. Vozy si můžete prohlédnout v partnerském showroomu SilverCars v pražském Karlíně. Telefon, e-mail, otevírací doba a formulář. | nechat | |
| **H1** | Rádi vás uvidíme v showroomu | Rádi vás uvidíme v showroomu v Praze 8 | |
| Text | Zadejte do map „SilverCars" a ono vás to nasměruje na správné místo. | Do navigace zadejte „SilverCars Rohanské nábřeží“. | |

---

## 8. Detail vozu `/vozy/[slug]`: šablona `src/app/vozy/[slug]/page.tsx`
Platí pro všechny vozy, generuje se automaticky z adminu.

| Prvek | Současný vzor | Návrh | Rozhodnutí |
|---|---|---|---|
| Title | AUDI S6 2024 | Audi S6 2024, 30 000 km – prodej Praha | |
| Description | AUDI S6, 2024, 30 000 km, 344 k, Diesel. Cena 1 990 000 Kč. | Audi S6 2024, 30 000 km, 344 k, diesel, bílá metalíza. Cena 1 990 000 Kč, odpočet DPH, financování i protiúčet. Prohlídka v Praze 8. | |
| **H1** | AUDI S6 | Audi S6 2024 (rok přímo v H1) | |
| Velká písmena značky | AUDI, MERCEDES, BMW | Audi, Mercedes-Benz, BMW (správný zápis značek) | |
| Text „O vozu“ | 2 automaticky generované věty | v adminu psát ke každému vozu 3–5 vět vlastního popisu (stav, historie, servis, proč je zajímavý) | |

**Pozor:** vůz označený v adminu jako „prodáno“ má stránku dál dostupnou (to je dobře), ale **smazaný vůz vrací 404**. Doporučení: prodané vozy nemazat, jen je označit jako prodané. Stránky tak vydrží a sbírají sílu.

---

## 9. Technické věci (kontroloval jsem, jsou v pořádku)
- robots.txt, sitemap.xml, canonical, přesměrování na www, HTTPS ✅
- Strukturovaná data: AutoDealer, WebSite, Vehicle + Offer, FAQPage (výkup), BreadcrumbList ✅
- Stránky se generují na serveru a Google vidí celý text ✅
- **Drobnost:** podstránky nemají vlastní obrázek pro sdílení (og:image), jen úvodní stránka. Opravím při úpravách.

## 10. Měření (hotovo 7. 10. 2026, čeká na nasazení)
Události v GA4:
- `click_phone`: klik na telefon (všude na webu, s parametrem `page_path`)
- `click_email`: klik na e-mail
- `click_whatsapp`: klik na WhatsApp
- `generate_lead` + `form_name`: `vykup_vozidel` (už existovalo), `zajem_o_vuz` (+ název vozu), `kontakt`, `financovani`

Po nasazení v GA4: **Admin → Events → u `click_phone`, `click_whatsapp` a `generate_lead` zapnout „Mark as key event“.**
