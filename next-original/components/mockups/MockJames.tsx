import { Check, RefreshCw, Ticket, ArrowUpRight } from "lucide-react";
import { Crest, Flag } from "./atoms";

const STEPS = ["Bilhete", "Odds", "Mercados", "Resultado"];

const CHIPS = ["Dupla", "Hoje", "mín. 1.50", "6 mercados"];

/* -------------------------------------------------------------------------- */

export function MockJames() {
  return (
    <div className="flex h-full w-full flex-col bg-background px-7 py-5 text-white">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-[26px] font-bold tracking-tight">James</h3>
          <p className="mt-0.5 text-[11px] text-[#8C8C8C]">
            Montador inteligente de bilhetes
          </p>
        </div>
        <span className="flex h-8 items-center gap-1.5 rounded-xl border border-line bg-card px-3 text-[11px] font-semibold">
          <RefreshCw size={11} />
          Regerar
        </span>
      </div>

      {/* Stepper */}
      <div className="mt-5 flex items-center">
        {STEPS.map((s, i) => {
          const done = i < 3;
          return (
            <div key={s} className="flex flex-1 items-center last:flex-none">
              <div className="relative flex flex-col items-center">
                <span
                  className={`grid h-6 w-6 place-items-center rounded-full text-[10px] font-bold ${
                    done ? "bg-ok text-white" : "bg-brand text-white"
                  }`}
                >
                  {done ? <Check size={12} strokeWidth={3} /> : "4"}
                </span>
                <span
                  className={`absolute top-8 whitespace-nowrap text-[10px] font-semibold ${
                    done ? "text-ok" : "text-brand"
                  }`}
                >
                  {s}
                </span>
              </div>
              {i < STEPS.length - 1 && (
                <i className="mx-2 h-[2px] flex-1 rounded-full bg-ok" />
              )}
            </div>
          );
        })}
      </div>

      {/* Chips */}
      <div className="mt-12 flex items-center gap-2">
        {CHIPS.map((c) => (
          <span
            key={c}
            className="rounded-full border border-line bg-card px-3 py-1.5 text-[10.5px] text-[#B8B8B8]"
          >
            {c}
          </span>
        ))}
        <span className="flex items-center gap-1 rounded-full border border-line bg-card px-3 py-1.5 text-[10.5px] text-[#B8B8B8]">
          Ajustar
          <ArrowUpRight size={10} />
        </span>
      </div>

      {/* Resumo do bilhete */}
      <div className="mt-3 overflow-hidden rounded-2xl border border-brand/35 bg-gradient-to-br from-brand/[0.14] via-brand/[0.06] to-transparent">
        <div className="flex items-start justify-between p-4">
          <div>
            <span className="flex items-center gap-1.5 text-[14px] font-bold">
              <Ticket size={14} className="text-brand" />
              Bilhete Dupla
            </span>
            <div className="mt-2 flex gap-1.5">
              <span className="rounded-md bg-white/[0.06] px-2 py-1 text-[9.5px] text-[#B8B8B8]">
                2/2 jogos
              </span>
              <span className="rounded-md bg-white/[0.06] px-2 py-1 text-[9.5px] text-[#B8B8B8]">
                6 cenários lidos
              </span>
            </div>
          </div>
          <div className="text-right">
            <p className="text-[8.5px] font-semibold uppercase tracking-wider text-[#B8B8B8]">
              Odd total aproximada
            </p>
            <p className="text-[36px] font-bold leading-none tracking-tight text-white">
              4.48
            </p>
            <p className="mt-1 text-[10px] text-[#8C8C8C]">1.95 × 2.30</p>
          </div>
        </div>

        <div className="grid grid-cols-3 border-t border-brand/20 bg-black/25">
          {[
            { k: "Confiança média", v: "45%", c: "text-ok" },
            { k: "Prob. combinada", v: "20%", c: "text-ok" },
            { k: "Jogos disponíveis", v: "2", c: "text-brand" },
          ].map((s) => (
            <div key={s.k} className="py-3 text-center">
              <p className="text-[8.5px] font-semibold uppercase tracking-wider text-[#8C8C8C]">
                {s.k}
              </p>
              <p className={`mt-1 text-[19px] font-bold ${s.c}`}>{s.v}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Seleção */}
      <div className="mt-3 flex-1 rounded-2xl border border-line bg-card p-4">
        <div className="flex items-start justify-between">
          <span className="flex items-center gap-2">
            <i className="grid h-5 w-5 place-items-center rounded-full bg-brand text-[10px] font-bold not-italic">
              1
            </i>
            <span className="leading-tight">
              <i className="block text-[12.5px] font-bold not-italic">
                Shanghai Port <b className="font-normal text-[#8C8C8C]">vs</b>{" "}
                Dalian Yingbo FC
              </i>
              <i className="mt-0.5 flex items-center gap-1.5 text-[9.5px] not-italic text-[#8C8C8C]">
                08:35
                <Flag country="cn" size={10} />
                Chinese Super League
              </i>
            </span>
          </span>
          <span className="rounded-md border border-brand/40 bg-brand/10 px-2 py-1 text-[9.5px] font-semibold text-brand">
            Moderada
          </span>
        </div>

        <div className="mt-3.5 flex items-center justify-center gap-6">
          <span className="flex flex-col items-center gap-1.5">
            <Crest label="S" from="#E11D2E" to="#7F0F1B" size={26} />
            <i className="text-[10px] font-semibold not-italic">Shanghai Port</i>
          </span>
          <span className="rounded-md bg-[#1A1A1A] px-2 py-1 text-[9px] font-semibold text-[#8C8C8C]">
            VS
          </span>
          <span className="flex flex-col items-center gap-1.5">
            <Crest label="D" from="#1E5EFF" to="#0B2E8A" size={26} />
            <i className="text-[10px] font-semibold not-italic">Dalian Yingbo FC</i>
          </span>
        </div>

        <span className="mt-3 inline-block rounded-lg border border-brand/40 bg-brand/10 px-2.5 py-1.5 text-[10px] font-bold text-brand">
          Vitória casa
        </span>

        <div className="mt-2 grid grid-cols-4 gap-2">
          {[
            { k: "Odd", v: "1.95", big: true },
            { k: "Prob. James", v: "49%", c: "text-ok" },
            { k: "Gols proj.", v: "3.3" },
            { k: "Edge", v: "-2.6%", c: "text-brand" },
          ].map((s) => (
            <div
              key={s.k}
              className={`rounded-xl border px-3 py-2.5 ${
                s.big
                  ? "border-brand/35 bg-brand/[0.08]"
                  : "border-line bg-[#1A1A1A]"
              }`}
            >
              <p className="text-[8px] font-semibold uppercase tracking-wider text-[#8C8C8C]">
                {s.k}
              </p>
              <p
                className={`mt-0.5 font-bold tracking-tight ${
                  s.big ? "text-[22px]" : "text-[15px]"
                } ${s.c ?? ""}`}
              >
                {s.v}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-2.5 space-y-1">
          {["Casa vence 38% em casa.", "Fora perde 63% fora."].map((t) => (
            <p
              key={t}
              className="flex items-center gap-1.5 text-[10px] text-[#B8B8B8]"
            >
              <i className="h-1 w-1 rounded-full bg-brand" />
              {t}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */

export function MockJamesCompact() {
  return (
    <div className="w-full bg-background p-3.5 text-white">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-[16px] font-bold tracking-tight">James</h3>
          <p className="text-[9.5px] text-[#8C8C8C]">Montador de bilhetes</p>
        </div>
        <span className="flex h-7 items-center gap-1 rounded-lg border border-line bg-card px-2.5 text-[10px] font-semibold">
          <RefreshCw size={10} />
          Regerar
        </span>
      </div>

      <div className="mt-3 overflow-hidden rounded-xl border border-brand/35 bg-gradient-to-br from-brand/[0.14] to-transparent">
        <div className="flex items-end justify-between p-3">
          <span className="flex items-center gap-1.5 text-[12px] font-bold">
            <Ticket size={12} className="text-brand" />
            Bilhete Dupla
          </span>
          <div className="text-right">
            <p className="text-[7.5px] font-semibold uppercase tracking-wider text-[#B8B8B8]">
              Odd total
            </p>
            <p className="text-[26px] font-bold leading-none tracking-tight">
              4.48
            </p>
          </div>
        </div>
        <div className="grid grid-cols-3 border-t border-brand/20 bg-black/25">
          {[
            { k: "Confiança", v: "45%", c: "text-ok" },
            { k: "Prob.", v: "20%", c: "text-ok" },
            { k: "Jogos", v: "2", c: "text-brand" },
          ].map((s) => (
            <div key={s.k} className="py-2 text-center">
              <p className="text-[7.5px] font-semibold uppercase tracking-wider text-[#8C8C8C]">
                {s.k}
              </p>
              <p className={`text-[14px] font-bold ${s.c}`}>{s.v}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-2.5 rounded-xl border border-line bg-card p-3">
        <p className="text-[10.5px] font-bold">
          Shanghai Port <b className="font-normal text-[#8C8C8C]">vs</b> Dalian
          Yingbo
        </p>
        <span className="mt-2 inline-block rounded-md border border-brand/40 bg-brand/10 px-2 py-1 text-[9px] font-bold text-brand">
          Vitória casa
        </span>
        <div className="mt-2 grid grid-cols-3 gap-1.5">
          {[
            { k: "Odd", v: "1.95" },
            { k: "Prob.", v: "49%", c: "text-ok" },
            { k: "Gols", v: "3.3" },
          ].map((s) => (
            <div
              key={s.k}
              className="rounded-lg border border-line bg-[#1A1A1A] px-2 py-1.5"
            >
              <p className="text-[7.5px] font-semibold uppercase tracking-wider text-[#8C8C8C]">
                {s.k}
              </p>
              <p className={`text-[13px] font-bold ${s.c ?? ""}`}>{s.v}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
