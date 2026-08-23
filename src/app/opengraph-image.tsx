import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  const fontsDir = join(process.cwd(), "src/assets/fonts");
  const [extraBold, light, medium] = await Promise.all([
    readFile(join(fontsDir, "Poppins-ExtraBold.ttf")),
    readFile(join(fontsDir, "Poppins-Light.ttf")),
    readFile(join(fontsDir, "Poppins-Medium.ttf")),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#fbfaf7",
        }}
      >
        <div style={{ display: "flex", alignItems: "baseline" }}>
          <div
            style={{
              fontFamily: "Poppins ExtraBold",
              fontSize: 128,
              letterSpacing: -2,
              color: "#17181A",
            }}
          >
            ICON
          </div>
          <div
            style={{
              fontFamily: "Poppins Light",
              fontSize: 128,
              letterSpacing: -2,
              color: "#8a8680",
            }}
          >
            cars
          </div>
        </div>
        <div
          style={{
            marginTop: 20,
            fontFamily: "Poppins Medium",
            fontSize: 22,
            letterSpacing: 6,
            textTransform: "uppercase",
            color: "#96703f",
          }}
        >
          Ikonická auta
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Poppins ExtraBold", data: extraBold, weight: 800, style: "normal" },
        { name: "Poppins Light", data: light, weight: 300, style: "normal" },
        { name: "Poppins Medium", data: medium, weight: 500, style: "normal" },
      ],
    }
  );
}
