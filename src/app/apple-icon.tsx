import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "#17181A",
        }}
      >
        <svg width="180" height="180" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="35" stroke="#FBFAF7" strokeWidth="6" fill="none" />
          <path d="M17 50 L83 50" stroke="#FBFAF7" strokeWidth="7" strokeLinecap="round" />
          <path d="M50 50 L50 82" stroke="#FBFAF7" strokeWidth="7" strokeLinecap="round" />
          <circle cx="50" cy="50" r="11" fill="#FBFAF7" />
        </svg>
      </div>
    ),
    { ...size }
  );
}
