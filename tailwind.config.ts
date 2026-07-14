import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: "1.25rem", lg: "2rem" },
      screens: { "2xl": "1280px" },
    },
    extend: {
      colors: {
        /* Paleta StatsHub.
           Atenção: NÃO nomeie uma cor de `base` — o Tailwind já tem o utilitário
           de tamanho `text-base`, e as duas regras colidem (o texto sairia
           pintado com a cor de fundo). Por isso o fundo se chama `background`. */
        background: "#111111",
        section: "#181818",
        card: "#202020",
        line: "#2A2A2A",
        muted: "#B8B8B8",
        brand: {
          DEFAULT: "#FF6A00",
          hover: "#FF7E26",
          soft: "#FF9A57",
          dim: "rgba(255,106,0,0.12)",
        },
        ok: "#22C55E",
        danger: "#EF4444",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        xl: "16px",
        "2xl": "20px",
        "3xl": "24px",
        "4xl": "32px",
      },
      boxShadow: {
        soft: "0 1px 2px rgba(0,0,0,.4), 0 8px 24px -12px rgba(0,0,0,.6)",
        card: "0 1px 0 0 rgba(255,255,255,.03) inset, 0 20px 50px -30px rgba(0,0,0,.9)",
        glow: "0 0 0 1px rgba(255,106,0,.25), 0 20px 60px -20px rgba(255,106,0,.35)",
        "glow-lg":
          "0 0 0 1px rgba(255,106,0,.20), 0 40px 120px -30px rgba(255,106,0,.45)",
        btn: "0 8px 24px -10px rgba(255,106,0,.65)",
        "btn-hover": "0 12px 40px -8px rgba(255,106,0,.85)",
      },
      backgroundImage: {
        "grid-fade":
          "linear-gradient(to bottom, rgba(255,255,255,.035) 1px, transparent 1px), linear-gradient(to right, rgba(255,255,255,.035) 1px, transparent 1px)",
        "brand-gradient":
          "linear-gradient(135deg, #FF6A00 0%, #FF7E26 45%, #FFA45C 100%)",
        "radial-fade":
          "radial-gradient(60% 60% at 50% 0%, rgba(255,106,0,.16) 0%, transparent 70%)",
      },
      keyframes: {
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
        float: {
          "0%,100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-14px)" },
        },
        pulseDot: {
          "0%,100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: ".35", transform: "scale(.85)" },
        },
        shimmer: {
          "100%": { transform: "translateX(100%)" },
        },
        breathe: {
          "0%,100%": { opacity: ".45" },
          "50%": { opacity: ".85" },
        },
      },
      animation: {
        marquee: "marquee 38s linear infinite",
        "marquee-slow": "marquee 60s linear infinite",
        float: "float 7s ease-in-out infinite",
        "pulse-dot": "pulseDot 1.6s ease-in-out infinite",
        shimmer: "shimmer 2.4s ease-in-out infinite",
        breathe: "breathe 6s ease-in-out infinite",
      },
      transitionTimingFunction: {
        smooth: "cubic-bezier(.22,1,.36,1)",
      },
    },
  },
  plugins: [],
};

export default config;
