import {
  Bot,
  ChevronDown,
  Copy,
  Eye,
  GripVertical,
  Pencil,
  Plus,
  Search,
  Send,
  Settings,
  Trash2,
  Camera,
  Radio,
} from "lucide-react";

const ROBOTS = [
  { name: "FAV FORA PERDENDO", type: "live", conds: 2 },
  { name: "CANTOS 1 TEMPO", type: "live", conds: 2 },
  { name: "[PRÉ-LIVE] DUPLA CHANCE CASA + OVER 1.5 CASA", type: "pre", conds: 2 },
  { name: "[PRÉ-LIVE] DUPLA CHANCE FORA + OVER 1.5 FORA", type: "pre", conds: 2 },
  { name: "OVER 0.5 GOLS HT (1º TEMPO)", type: "live", conds: 3 },
  { name: "OVER LIMITE +1 GOL (2º TEMPO)", type: "live", conds: 2 },
] as const;

function TypeBadge({ type }: { type: "live" | "pre" }) {
  if (type === "live") {
    return (
      <span className="inline-flex items-center gap-1 rounded-full border border-danger/50 bg-danger/10 px-2 py-[3px] text-[9px] font-bold text-danger">
        <Radio size={8} />
        Ao Vivo
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 rounded-full border border-[#3B82F6]/50 bg-[#3B82F6]/10 px-2 py-[3px] text-[9px] font-bold text-[#60A5FA]">
      <Camera size={8} />
      Pré-Live
    </span>
  );
}

function Toggle() {
  return (
    <span className="flex h-[18px] w-8 items-center rounded-full bg-brand px-[2px]">
      <i className="ml-auto block h-[14px] w-[14px] rounded-full bg-white" />
    </span>
  );
}

function RobotRow({ r }: { r: (typeof ROBOTS)[number] }) {
  return (
    <div className="flex items-start gap-3 border-b border-line/70 px-3 py-3 last:border-0">
      <GripVertical size={12} className="mt-1 shrink-0 text-[#5A5A5A]" />

      <div className="min-w-0 flex-1">
        <p className="truncate text-[12px] font-bold tracking-tight">{r.name}</p>
        <span className="mt-1.5 inline-flex items-center gap-1.5 rounded-lg border border-line bg-[#1A1A1A] px-2 py-1 text-[9.5px] text-[#B8B8B8]">
          <Eye size={9} />
          Ver condições · {r.conds}
        </span>
      </div>

      <div className="flex shrink-0 flex-col items-end gap-2.5">
        <div className="flex items-center gap-1.5">
          <TypeBadge type={r.type} />
          <span className="rounded-full bg-ok px-2 py-[3px] text-[9px] font-bold text-white">
            Ativo
          </span>
          <Toggle />
        </div>
        <div className="flex items-center gap-2.5 text-[#6E6E6E]">
          <Send size={11} />
          <Pencil size={11} />
          <Copy size={11} />
          <Trash2 size={11} />
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */

export function MockRobos() {
  return (
    <div className="flex h-full w-full flex-col bg-background px-6 py-5 text-white">
      <div className="flex items-center gap-2.5">
        <span className="grid h-8 w-8 place-items-center rounded-xl border border-brand/40 bg-brand/10">
          <Bot size={16} className="text-brand" />
        </span>
        <h3 className="text-[22px] font-bold tracking-tight">Meus robôs</h3>
      </div>
      <p className="mt-1.5 text-[11px] text-[#8C8C8C]">
        Monte estratégias e receba alertas no Telegram quando os jogos baterem
        suas condições.
      </p>

      <div className="mt-4 flex w-fit items-center gap-1 rounded-xl border border-line bg-card p-1">
        <span className="flex items-center gap-1.5 rounded-lg bg-brand/10 px-3 py-1.5 text-[11px] font-semibold text-brand">
          <Bot size={11} />
          Robôs
        </span>
        <span className="flex items-center gap-1.5 px-3 py-1.5 text-[11px] text-[#8C8C8C]">
          <Settings size={11} />
          Configurações
        </span>
      </div>

      <div className="mt-4 flex items-center gap-2.5">
        <div className="flex h-9 flex-1 items-center gap-2 rounded-xl border border-line bg-card px-3">
          <Search size={12} className="text-[#6E6E6E]" />
          <span className="text-[11px] text-[#6E6E6E]">
            Buscar robô pelo nome...
          </span>
        </div>
        {[
          { k: "Status", v: "Todos" },
          { k: "Tipo", v: "Todos" },
        ].map((f) => (
          <div
            key={f.k}
            className="flex h-9 w-[150px] items-center gap-1.5 rounded-xl border border-line bg-card px-3"
          >
            <span className="text-[11px] text-[#8C8C8C]">{f.k}</span>
            <span className="text-[11px] font-semibold">{f.v}</span>
            <span className="text-[10px] text-[#6E6E6E]">6</span>
            <ChevronDown size={11} className="ml-auto text-[#6E6E6E]" />
          </div>
        ))}
        <span className="flex h-9 items-center gap-1.5 rounded-xl bg-brand px-4 text-[11.5px] font-bold shadow-[0_8px_20px_-10px_rgba(255,106,0,.9)]">
          <Plus size={13} />
          Criar robô
        </span>
      </div>

      <div className="mt-3.5 flex-1 overflow-hidden rounded-2xl border border-line bg-card">
        {ROBOTS.map((r) => (
          <RobotRow key={r.name} r={r} />
        ))}
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */

export function MockRobosCompact() {
  return (
    <div className="w-full bg-background p-3.5 text-white">
      <div className="flex items-center gap-2">
        <span className="grid h-7 w-7 place-items-center rounded-lg border border-brand/40 bg-brand/10">
          <Bot size={13} className="text-brand" />
        </span>
        <h3 className="text-[15px] font-bold tracking-tight">Meus robôs</h3>
        <span className="ml-auto flex h-7 items-center gap-1 rounded-lg bg-brand px-2.5 text-[10px] font-bold">
          <Plus size={11} />
          Criar
        </span>
      </div>

      <div className="mt-3 overflow-hidden rounded-xl border border-line bg-card">
        {ROBOTS.slice(0, 4).map((r) => (
          <div
            key={r.name}
            className="flex items-center gap-2 border-b border-line/70 px-2.5 py-2.5 last:border-0"
          >
            <div className="min-w-0 flex-1">
              <p className="truncate text-[10.5px] font-bold">{r.name}</p>
              <span className="mt-1 inline-flex items-center gap-1 rounded-md border border-line bg-[#1A1A1A] px-1.5 py-0.5 text-[8.5px] text-[#B8B8B8]">
                <Eye size={8} />
                {r.conds} condições
              </span>
            </div>
            <div className="flex shrink-0 flex-col items-end gap-1.5">
              <TypeBadge type={r.type} />
              <Toggle />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
