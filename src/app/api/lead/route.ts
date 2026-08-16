import { NextResponse } from "next/server";

// Stub endpoint — wire up to a real CRM/e-mail provider before production launch.
export async function POST(request: Request) {
  const body = await request.json().catch(() => null);

  if (!body || typeof body !== "object" || !("type" in body)) {
    return NextResponse.json({ ok: false, error: "invalid_payload" }, { status: 400 });
  }

  return NextResponse.json({ ok: true });
}
