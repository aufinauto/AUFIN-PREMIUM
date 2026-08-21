import "server-only";
import { createClient } from "@supabase/supabase-js";

function getEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required env var: ${name}`);
  }
  return value;
}

export const supabaseAdmin = createClient(
  getEnv("SUPABASE_URL"),
  getEnv("SUPABASE_SECRET_KEY"),
  { auth: { persistSession: false } }
);

export const CAR_PHOTOS_BUCKET = "car-photos";
export const SELL_CAR_PHOTOS_BUCKET = "sell-car-photos";
