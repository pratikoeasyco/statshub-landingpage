import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "center",
          gap: 3,
          paddingBottom: 8,
          borderRadius: 8,
          background: "linear-gradient(135deg,#FF6A00,#FFA45C)",
        }}
      >
        <div style={{ width: 5, height: 8, borderRadius: 2, background: "#fff" }} />
        <div style={{ width: 5, height: 13, borderRadius: 2, background: "#fff" }} />
        <div style={{ width: 5, height: 18, borderRadius: 2, background: "#fff" }} />
      </div>
    ),
    size,
  );
}
