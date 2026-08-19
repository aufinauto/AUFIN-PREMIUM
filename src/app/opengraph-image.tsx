import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  const fontData = await readFile(
    join(process.cwd(), "src/assets/fonts/PT_Serif-Italic.ttf")
  );

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#fbfaf7",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 36 }}>
          <svg width="130" height="130" viewBox="0 0 64 64" fill="none">
            <circle cx="32" cy="32" r="28.5" stroke="#17181A" strokeWidth="1.3" opacity="0.85" />
            <path d="M32 17 L16 47" stroke="#17181A" strokeWidth="3" strokeLinecap="round" />
            <path d="M32 17 L48 47" stroke="#17181A" strokeWidth="5.2" strokeLinecap="round" />
            <path d="M21.3 37 L40.5 33" stroke="#96703f" strokeWidth="3" strokeLinecap="round" />
            <circle cx="32" cy="17" r="2.4" fill="#96703f" />
          </svg>
          <div
            style={{
              fontFamily: "PT Serif Italic",
              fontStyle: "italic",
              fontSize: 128,
              color: "#17181A",
            }}
          >
            Aufin
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: "PT Serif Italic",
          data: fontData,
          style: "italic",
        },
      ],
    }
  );
}
