import { ImageResponse } from "next/og";

export const alt = "StatsHub - Plataforma de Análise de Futebol";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          background: "#111111",
          padding: "72px",
          position: "relative",
        }}
      >
        {/* Aura laranja */}
        <div
          style={{
            position: "absolute",
            top: -220,
            left: 300,
            width: 700,
            height: 500,
            borderRadius: "50%",
            background: "rgba(255,106,0,0.30)",
            filter: "blur(120px)",
            display: "flex",
          }}
        />

        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              width: 60,
              height: 60,
              borderRadius: 18,
              background: "linear-gradient(135deg,#FF6A00,#FFA45C)",
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "center",
              gap: 5,
              paddingBottom: 16,
            }}
          >
            <div style={{ width: 8, height: 14, borderRadius: 3, background: "#fff" }} />
            <div style={{ width: 8, height: 22, borderRadius: 3, background: "#fff" }} />
            <div style={{ width: 8, height: 30, borderRadius: 3, background: "#fff" }} />
          </div>
          <div style={{ display: "flex", fontSize: 40, fontWeight: 700, color: "#fff" }}>
            Stats
            <span style={{ color: "#FF6A00" }}>Hub</span>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            marginTop: 44,
            fontSize: 68,
            fontWeight: 700,
            lineHeight: 1.1,
            letterSpacing: "-0.03em",
            color: "#fff",
            maxWidth: 900,
          }}
        >
          A Plataforma Definitiva para Análise de Futebol
        </div>

        <div
          style={{
            display: "flex",
            marginTop: 28,
            fontSize: 27,
            lineHeight: 1.45,
            color: "#B8B8B8",
            maxWidth: 880,
          }}
        >
          Estatísticas avançadas, scanner ao vivo, robôs de alerta e IA para
          quem leva apostas esportivas a sério.
        </div>

        <div style={{ display: "flex", gap: 14, marginTop: 44 }}>
          {["Tempo real", "Scanner de oportunidades", "IA para análise"].map((t) => (
            <div
              key={t}
              style={{
                display: "flex",
                padding: "12px 22px",
                borderRadius: 999,
                border: "1px solid #2A2A2A",
                background: "#202020",
                color: "#fff",
                fontSize: 21,
              }}
            >
              {t}
            </div>
          ))}
        </div>
      </div>
    ),
    size,
  );
}
