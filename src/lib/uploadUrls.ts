import "server-only";
import { supabaseAdmin } from "./supabaseClient";

export interface UploadTarget {
  fileName: string;
  signedUrl: string;
  token: string;
  publicUrl: string;
}

// Generates short-lived signed upload URLs so the browser can upload files
// straight to Supabase Storage — bypassing Vercel's serverless function
// entirely (which has a hard ~4.5MB request body limit, far too small for
// full-size phone photos).
export async function createSignedUploadUrls(
  bucket: string,
  folder: string,
  fileNames: string[]
): Promise<UploadTarget[]> {
  const safeFolder = folder.replace(/[^a-zA-Z0-9-]/g, "-") || "misc";
  const results: UploadTarget[] = [];
  for (const fileName of fileNames) {
    const safeName = fileName.replace(/[^a-zA-Z0-9.\-]/g, "_");
    const path = `${safeFolder}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}-${safeName}`;
    const { data, error } = await supabaseAdmin.storage.from(bucket).createSignedUploadUrl(path);
    if (error) {
      throw new Error(`Nepodařilo se připravit nahrání pro "${fileName}": ${error.message}`);
    }
    const { data: pub } = supabaseAdmin.storage.from(bucket).getPublicUrl(path);
    results.push({ fileName, signedUrl: data.signedUrl, token: data.token, publicUrl: pub.publicUrl });
  }
  return results;
}
