import { NextResponse } from "next/server";
import { escapeHtml, sendTelegramMessage, sendTelegramPhotos } from "@/lib/telegram";

function line(label: string, value: unknown): string {
  const str = value == null ? "" : String(value).trim();
  if (!str) return "";
  return `<b>${escapeHtml(label)}:</b> ${escapeHtml(str)}\n`;
}

function formatMessage(body: Record<string, unknown>): string | null {
  switch (body.type) {
    case "interest":
      return (
        `🚗 <b>Zájem o vůz</b>\n\n` +
        line("Vůz", body.car) +
        line("Jméno", body.name) +
        line("Telefon", body.phone) +
        line("E-mail", body.email) +
        line("Preferovaný kontakt", body.preferredContact) +
        line("Poznámka", body.note)
      );
    case "finance":
      return (
        `💰 <b>Poptávka financování</b>\n\n` +
        line("Jméno", body.name) +
        line("Telefon", body.phone) +
        line("E-mail", body.email) +
        line("Vůz", body.car) +
        line("Cena vozu", body.price) +
        line("Akontace", body.downPayment) +
        line("Doba financování", body.term ? `${body.term} měsíců` : undefined) +
        line("Typ žadatele", body.applicantType) +
        line("IČO", body.ico) +
        line("Poznámka", body.note)
      );
    case "contact":
      return (
        `✉️ <b>Zpráva z kontaktního formuláře</b>\n\n` +
        line("Jméno", body.name) +
        line("Telefon", body.phone) +
        line("E-mail", body.email) +
        line("Typ dotazu", body.inquiryType) +
        line("Zpráva", body.message)
      );
    case "sell-car":
      return (
        `🔑 <b>Nabídka k výkupu vozu</b>\n\n` +
        line("Značka", body.brand) +
        line("Model", body.model) +
        line("Rok výroby", body.year) +
        line("Nájezd", body.mileage ? `${body.mileage} km` : undefined) +
        line("Motorizace", body.engine) +
        line("VIN", body.vin) +
        line("Očekávaná cena", body.expectedPrice) +
        line("Jméno", body.name) +
        line("Telefon", body.phone) +
        line("E-mail", body.email) +
        line("Poznámka", body.note)
      );
    default:
      return null;
  }
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);

  if (!body || typeof body !== "object" || !("type" in body)) {
    return NextResponse.json({ ok: false, error: "invalid_payload" }, { status: 400 });
  }

  const leadBody = body as Record<string, unknown>;
  const message = formatMessage(leadBody);
  if (!message) {
    return NextResponse.json({ ok: false, error: "unknown_type" }, { status: 400 });
  }

  const photos = Array.isArray(leadBody.photos)
    ? (leadBody.photos as unknown[]).filter(
        (p): p is string => typeof p === "string" && p.length > 0
      )
    : [];

  try {
    if (leadBody.type === "sell-car" && photos.length > 0) {
      await sendTelegramPhotos(photos, message);
    } else {
      await sendTelegramMessage(message);
    }
  } catch (e) {
    console.error("Failed to send Telegram notification:", e);
    return NextResponse.json({ ok: false, error: "notify_failed" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
