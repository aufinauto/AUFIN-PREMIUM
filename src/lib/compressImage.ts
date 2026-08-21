// Resizes + re-encodes an image client-side before upload — keeps phone
// photos well under any receiving service's size limits (e.g. Telegram's
// URL-fetch limit) and makes uploads much faster on mobile networks.
// Falls back to the original file if the browser can't do the conversion.
export async function compressImage(
  file: File,
  maxDimension = 1600,
  quality = 0.82
): Promise<Blob> {
  try {
    const bitmap = await createImageBitmap(file);
    let { width, height } = bitmap;
    if (width > maxDimension || height > maxDimension) {
      const ratio = Math.min(maxDimension / width, maxDimension / height);
      width = Math.round(width * ratio);
      height = Math.round(height * ratio);
    }

    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");
    if (!ctx) return file;

    ctx.drawImage(bitmap, 0, 0, width, height);
    bitmap.close?.();

    const blob = await new Promise<Blob | null>((resolve) =>
      canvas.toBlob(resolve, "image/jpeg", quality)
    );
    return blob ?? file;
  } catch {
    return file;
  }
}
