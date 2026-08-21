"use server";

import { SELL_CAR_PHOTOS_BUCKET } from "@/lib/supabaseClient";
import { createSignedUploadUrls, type UploadTarget } from "@/lib/uploadUrls";

export async function createSellCarUploadUrls(fileNames: string[]): Promise<UploadTarget[]> {
  const folder = crypto.randomUUID();
  return createSignedUploadUrls(SELL_CAR_PHOTOS_BUCKET, folder, fileNames);
}
