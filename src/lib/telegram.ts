import "server-only";

export async function sendTelegramMessage(text: string): Promise<void> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) {
    throw new Error("Missing TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID env var");
  }

  const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      text,
      parse_mode: "HTML",
    }),
  });

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`Telegram API error (${res.status}): ${body}`);
  }
}

// Sends up to 10 photos as one album, with the caption shown under the
// first photo. Telegram fetches the (public) URLs itself — no need to
// upload raw bytes through our own server.
export async function sendTelegramPhotos(urls: string[], caption?: string): Promise<void> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) {
    throw new Error("Missing TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID env var");
  }
  if (urls.length === 0) return;

  // sendMediaGroup requires at least 2 items — a single photo goes through
  // sendPhoto instead.
  if (urls.length === 1) {
    const res = await fetch(`https://api.telegram.org/bot${token}/sendPhoto`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        photo: urls[0],
        ...(caption ? { caption, parse_mode: "HTML" } : {}),
      }),
    });
    if (!res.ok) {
      const body = await res.text().catch(() => "");
      throw new Error(`Telegram API error (${res.status}): ${body}`);
    }
    return;
  }

  const batch = urls.slice(0, 10);
  const media = batch.map((url, i) => ({
    type: "photo",
    media: url,
    ...(i === 0 && caption ? { caption, parse_mode: "HTML" } : {}),
  }));

  const res = await fetch(`https://api.telegram.org/bot${token}/sendMediaGroup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: chatId, media }),
  });

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`Telegram API error (${res.status}): ${body}`);
  }
}

export function escapeHtml(value: unknown): string {
  const str = value == null ? "" : String(value);
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}
