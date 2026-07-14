import {
  Star,
  Trophy,
  Flag as FlagIcon,
  Goal,
  CornerDownRight,
  CheckCircle2,
} from "lucide-react";
import { Crest, SectionCard } from "./atoms";

/* Barras de pressão, valores fixos (nada de random: quebraria a hidratação). */
const PRESSURE: { up: number; down: number }[] = [
  { up: 18, down: 0 }, { up: 26, down: 0 }, { up: 12, down: 6 }, { up: 34, down: 0 },
  { up: 44, down: 0 }, { up: 22, down: 0 }, { up: 58, down: 0 }, { up: 30, down: 0 },
  { up: 16, down: 10 }, { up: 48, down: 0 }, { up: 62, down: 0 }, { up: 38, down: 0 },
  { up: 74, down: 0 }, { up: 28, down: 0 }, { up: 52, down: 0 }, { up: 90, down: 0 },
  { up: 40, down: 0 }, { up: 20, down: 14 }, { up: 12, down: 18 }, { up: 30, down: 0 },
  { up: 10, down: 8 }, { up: 14, down: 12 }, { up: 24, down: 0 }, { up: 8, down: 16 },
  { up: 18, down: 0 }, { up: 36, down: 0 }, { up: 46, down: 0 }, { up: 22, down: 0 },
  { up: 56, down: 0 }, { up: 34, down: 0 }, { up: 68, down: 0 }, { up: 44, down: 0 },
  { up: 86, down: 0 }, { up: 96, down: 0 }, { up: 60, down: 0 }, { up: 72, down: 0 },
  { up: 50, down: 0 }, { up: 38, down: 0 }, { up: 44, down: 0 }, { up: 30, down: 0 },
];

const EVENTS = [
  { at: 2, icon: "shot" },
  { at: 6, icon: "corner" },
  { at: 7, icon: "corner" },
  { at: 8, icon: "corner" },
  { at: 12, icon: "corner" },
  { at: 13, icon: "goal" },
  { at: 21, icon: "shot" },
  { at: 31, icon: "goal" },
  { at: 33, icon: "corner" },
] as const;

function Donut({
  home,
  away,
  size = 46,
}: {
  home: number;
  away: number;
  size?: number;
}) {
  const total = home + away || 1;
  const pct = home / total;
  const r = (size - 6) / 2;
  const c = 2 * Math.PI * r;

  return (
    <svg width={size} height={size} className="-rotate-90">
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke="#FF6A00"
        strokeWidth="4"
        opacity="0.85"
      />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke="#22C55E"
        strokeWidth="4"
        strokeLinecap="round"
        strokeDasharray={c}
        strokeDashoffset={c * (1 - pct)}
      />
    </svg>
  );
}

function StatDonut({
  label,
  home,
  away,
}: {
  label: string;
  home: number;
  away: number;
}) {
  return (
    <div className="flex flex-1 flex-col items-center gap-2 rounded-xl border border-line bg-[#1A1A1A] px-2 py-3">
      <span className="text-[9px] font-semibold uppercase tracking-wide text-[#8C8C8C]">
        {label}
      </span>
      <div className="flex items-center gap-2">
        <span className="text-[13px] font-bold tabular-nums text-ok">{home}</span>
        <Donut home={home} away={away} />
        <span className="text-[13px] font-bold tabular-nums text-brand">{away}</span>
      </div>
    </div>
  );
}

function ShotRow({
  label,
  home,
  away,
}: {
  label: string;
  home: number;
  away: number;
}) {
  const total = home + away || 1;
  const pct = (home / total) * 100;

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between text-[11px]">
        <b className="font-bold tabular-nums">{home}</b>
        <span className="text-[9px] font-semibold uppercase tracking-wide text-[#8C8C8C]">
          {label}
        </span>
        <b className="font-bold tabular-nums">{away}</b>
      </div>
      <div className="flex h-[3px] overflow-hidden rounded-full bg-[#2A2A2A]">
        <i className="block h-full rounded-full bg-ok" style={{ width: `${pct}%` }} />
        <i className="block h-full flex-1 rounded-full bg-brand" />
      </div>
    </div>
  );
}

function EventIcon({ type }: { type: (typeof EVENTS)[number]["icon"] }) {
  if (type === "goal")
    return <CheckCircle2 size={9} className="text-ok" strokeWidth={2.5} />;
  if (type === "corner")
    return <CornerDownRight size={9} className="text-ok/70" strokeWidth={2.5} />;
  return <Goal size={9} className="text-[#8C8C8C]" strokeWidth={2.5} />;
}

/* -------------------------------------------------------------------------- */

export function MockScanner({ className = "" }: { className?: string }) {
  return (
    <SectionCard className={`w-full overflow-hidden ${className}`}>
      {/* Cabeçalho */}
      <div className="relative px-4 pb-3 pt-3.5 text-center">
        <span className="absolute right-3 top-3 grid h-7 w-7 place-items-center rounded-full bg-brand">
          <Star size={12} className="text-white" fill="currentColor" />
        </span>
        <p className="text-[10px] text-[#8C8C8C]">América do Sul</p>
        <p className="mt-0.5 flex items-center justify-center gap-1.5 text-[10.5px] text-[#B8B8B8]">
          <Trophy size={10} className="text-[#FFC400]" />
          <b className="font-semibold text-white">Copa Sudamericana</b> · Rodada 6
        </p>

        <div className="mt-3 flex items-center justify-between px-1">
          <div className="flex w-[92px] flex-col items-center gap-1.5">
            <Crest label="R" from="#E11D2E" to="#7F0F1B" size={38} />
            <span className="text-[11.5px] font-bold text-white">River Plate</span>
            <span className="text-[12px] font-bold text-ok">1.04</span>
            <span className="text-[9px] text-[#8C8C8C]">1º lugar</span>
          </div>

          <div className="flex flex-col items-center gap-1">
            <span className="text-[9.5px] font-semibold text-[#8C8C8C]">HT</span>
            <span className="text-[26px] font-bold leading-none tracking-tight">
              0<i className="mx-1.5 not-italic text-[#5A5A5A]">–</i>0
            </span>
            <span className="text-[9px] text-[#8C8C8C]">HT 0–0</span>
          </div>

          <div className="flex w-[92px] flex-col items-center gap-1.5">
            <Crest label="B" from="#1E5EFF" to="#0B2E8A" size={38} />
            <span className="text-[11.5px] font-bold text-white">Blooming</span>
            <span className="text-[12px] font-bold text-brand">11.29</span>
            <span className="text-[9px] text-[#8C8C8C]">4º lugar</span>
          </div>
        </div>
      </div>

      {/* Gráfico de pressão */}
      <div className="border-t border-line px-3 pb-2 pt-3">
        <div className="relative h-[132px]">
          {/* eventos */}
          <div className="absolute inset-x-0 top-0 h-4">
            {EVENTS.map((e, i) => (
              <span
                key={i}
                className="absolute -translate-x-1/2"
                style={{ left: `${(e.at / PRESSURE.length) * 100 + 1.2}%` }}
              >
                <EventIcon type={e.icon} />
              </span>
            ))}
          </div>

          {/* linha do intervalo */}
          <i className="absolute bottom-[26px] top-4 left-[72%] w-px border-l border-dashed border-brand/45" />

          {/* barras */}
          <div className="absolute inset-x-0 bottom-[26px] top-5 flex items-center gap-[2px]">
            {PRESSURE.map((p, i) => (
              <div key={i} className="flex flex-1 flex-col items-center">
                <div className="flex h-[52px] w-full items-end">
                  <i
                    className="block w-full rounded-t-[2px] bg-ok"
                    style={{ height: (p.up / 100) * 52 }}
                  />
                </div>
                <i className="h-px w-full bg-[#2A2A2A]" />
                <div className="flex h-[16px] w-full items-start">
                  {p.down > 0 && (
                    <i
                      className="block w-full rounded-b-[2px] bg-brand"
                      style={{ height: (p.down / 100) * 40 }}
                    />
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* eixo */}
          <div className="absolute inset-x-0 bottom-0 flex justify-between px-1 text-[8.5px] font-medium text-[#6E6E6E]">
            {["0'", "15'", "30'", "45'+2'", "60'", "75'", "90'"].map((t) => (
              <span key={t}>{t}</span>
            ))}
          </div>
        </div>

        {/* Domínio atual */}
        <div className="mt-2 space-y-1.5">
          <div className="flex items-center justify-between text-[9.5px]">
            <b className="font-bold text-ok">90.3 (100%)</b>
            <span className="font-semibold uppercase tracking-wide text-[#8C8C8C]">
              Domínio atual
            </span>
            <b className="font-bold text-brand">(0%) 0</b>
          </div>
          <div className="h-[3px] overflow-hidden rounded-full bg-[#2A2A2A]">
            <i className="block h-full w-[97%] rounded-full bg-gradient-to-r from-ok to-ok/70" />
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-y border-line">
        {["Stats", "Pressão 5M", "Pressão 10M"].map((t, i) => (
          <span
            key={t}
            className={`relative flex-1 py-2 text-center text-[10px] ${
              i === 0 ? "font-semibold text-brand" : "text-[#8C8C8C]"
            }`}
          >
            {t}
            {i === 0 && (
              <i className="absolute inset-x-4 bottom-0 h-[2px] rounded-full bg-brand" />
            )}
          </span>
        ))}
      </div>

      {/* Stats */}
      <div className="space-y-2.5 p-3">
        <div className="flex gap-2">
          <StatDonut label="Ataques" home={88} away={9} />
          <StatDonut label="At. Perigosos" home={47} away={5} />
          <StatDonut label="% de Posse" home={84} away={16} />
        </div>

        <div className="flex items-stretch gap-2">
          <div className="flex flex-col justify-center gap-1.5 rounded-xl border border-line bg-[#1A1A1A] px-2.5 py-2">
            {[
              { i: <FlagIcon size={9} className="text-ok" />, v: 5 },
              { i: <i className="block h-2.5 w-[7px] rounded-[1px] bg-[#FFC400]" />, v: 0 },
              { i: <i className="block h-2.5 w-[7px] rounded-[1px] bg-danger" />, v: 0 },
            ].map((r, i) => (
              <span key={i} className="flex items-center gap-1.5 text-[10px] font-bold">
                {r.i}
                {r.v}
              </span>
            ))}
          </div>

          <div className="flex flex-1 flex-col justify-center gap-3 rounded-xl border border-line bg-[#1A1A1A] px-3 py-2.5">
            <ShotRow label="Chutes totais" home={10} away={1} />
            <ShotRow label="Chutes no gol" home={2} away={1} />
          </div>

          <div className="flex flex-col justify-center gap-1.5 rounded-xl border border-line bg-[#1A1A1A] px-2.5 py-2">
            {[
              { i: <FlagIcon size={9} className="text-brand" />, v: 0 },
              { i: <i className="block h-2.5 w-[7px] rounded-[1px] bg-[#FFC400]" />, v: 0 },
              { i: <i className="block h-2.5 w-[7px] rounded-[1px] bg-danger" />, v: 0 },
            ].map((r, i) => (
              <span key={i} className="flex items-center gap-1.5 text-[10px] font-bold">
                {r.i}
                {r.v}
              </span>
            ))}
          </div>
        </div>
      </div>
    </SectionCard>
  );
}
