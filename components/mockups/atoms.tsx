import type { ReactNode } from "react";

/* Bandeiras desenhadas em CSS, emoji de bandeira não renderiza no Windows. */
export function Flag({
  country,
  size = 28,
}: {
  country: "fr" | "es" | "cn" | "ar" | "bo";
  size?: number;
}) {
  const style = { width: size, height: size };

  if (country === "fr") {
    return (
      <span className="flex overflow-hidden rounded-full" style={style}>
        <i className="h-full w-1/3 bg-[#0B57C4]" />
        <i className="h-full w-1/3 bg-white" />
        <i className="h-full w-1/3 bg-[#E0242E]" />
      </span>
    );
  }
  if (country === "es") {
    return (
      <span className="flex flex-col overflow-hidden rounded-full" style={style}>
        <i className="h-1/4 w-full bg-[#C60B1E]" />
        <i className="h-2/4 w-full bg-[#FFC400]" />
        <i className="h-1/4 w-full bg-[#C60B1E]" />
      </span>
    );
  }
  if (country === "cn") {
    return (
      <span
        className="grid place-items-center overflow-hidden rounded-full bg-[#DE2910]"
        style={style}
      >
        <i className="text-[8px] leading-none text-[#FFDE00]">★</i>
      </span>
    );
  }
  if (country === "ar") {
    return (
      <span className="flex flex-col overflow-hidden rounded-full" style={style}>
        <i className="h-1/3 w-full bg-[#75AADB]" />
        <i className="h-1/3 w-full bg-white" />
        <i className="h-1/3 w-full bg-[#75AADB]" />
      </span>
    );
  }
  return (
    <span className="flex flex-col overflow-hidden rounded-full" style={style}>
      <i className="h-1/3 w-full bg-[#D52B1E]" />
      <i className="h-1/3 w-full bg-[#F9E300]" />
      <i className="h-1/3 w-full bg-[#007934]" />
    </span>
  );
}

/** Escudo genérico de clube: círculo com iniciais. */
export function Crest({
  label,
  from,
  to,
  size = 18,
}: {
  label: string;
  from: string;
  to: string;
  size?: number;
}) {
  return (
    <span
      className="grid shrink-0 place-items-center rounded-full font-bold text-white/90"
      style={{
        width: size,
        height: size,
        fontSize: size * 0.42,
        background: `linear-gradient(140deg, ${from}, ${to})`,
      }}
    >
      {label}
    </span>
  );
}

export function OddBox({
  value,
  active = false,
}: {
  value: string;
  active?: boolean;
}) {
  return (
    <span
      className={`grid h-[26px] w-[46px] place-items-center rounded-lg border text-[11px] font-semibold tabular-nums ${
        active
          ? "border-brand/40 bg-brand/10 text-brand"
          : "border-line bg-[#1A1A1A] text-white/85"
      }`}
    >
      {value}
    </span>
  );
}

export function Tab({
  children,
  active = false,
}: {
  children: ReactNode;
  active?: boolean;
}) {
  return (
    <span
      className={`whitespace-nowrap rounded-lg px-3 py-1.5 text-[11px] font-medium ${
        active ? "bg-[#242424] text-white" : "text-[#8C8C8C]"
      }`}
    >
      {children}
    </span>
  );
}

export function LiveDot({ label = "AO VIVO" }: { label?: string }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-md border border-danger/40 bg-danger/10 px-1.5 py-0.5 text-[8px] font-bold uppercase tracking-wide text-danger">
      <i className="h-1 w-1 animate-pulse-dot rounded-full bg-danger" />
      {label}
    </span>
  );
}

/** Bloco de resultado recente (V/E/D). */
export function FormBadge({ r }: { r: "W" | "D" | "L" }) {
  const map = {
    W: "bg-ok/85 text-white",
    D: "bg-[#3A3A3A] text-white/70",
    L: "bg-danger/80 text-white",
  } as const;
  return (
    <span
      className={`grid h-[18px] w-[18px] place-items-center rounded-[5px] text-[9px] font-bold ${map[r]}`}
    >
      {r}
    </span>
  );
}

/** Linha de insight ("Marcou 1 ou mais gols nos últimos 10"). */
export function InsightRow({
  children,
  tone = "green",
}: {
  children: ReactNode;
  tone?: "green" | "purple";
}) {
  return (
    <div className="flex items-center rounded-lg bg-[#1A1A1A] py-[7px] pl-2.5 pr-2">
      <i
        className={`mr-2 h-3.5 w-[2px] shrink-0 rounded-full ${
          tone === "green" ? "bg-ok" : "bg-[#8B5CF6]"
        }`}
      />
      <span className="truncate text-[10.5px] text-white/80">{children}</span>
    </div>
  );
}

export function SectionCard({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`rounded-xl border border-line bg-card ${className}`}>
      {children}
    </div>
  );
}
