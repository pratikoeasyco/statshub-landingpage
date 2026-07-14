import { Check, X } from "lucide-react";
import { COMPARISON } from "@/lib/content";
import { Logo } from "../ui/Logo";
import { Reveal } from "../ui/Reveal";
import { SectionHeading } from "../ui/SectionHeading";

export function Comparison() {
  return (
    <section
      id="diferenciais"
      className="relative overflow-hidden border-y border-line bg-section py-24 sm:py-32"
    >
      <div className="pointer-events-none absolute right-0 top-1/4 -z-10 h-[400px] w-[400px] bg-[radial-gradient(closest-side,rgba(255,106,0,0.10),transparent)]" />

      <div className="container-x">
        <SectionHeading
          title="StatsHub vs. métodos tradicionais"
          subtitle="A diferença não está em ter os dados. Está em quanto tempo você leva para transformá-los em decisão."
        />

        <Reveal className="mt-16 overflow-hidden rounded-3xl border border-line bg-card shadow-card">
          {/* Cabeçalho */}
          <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2 border-b border-line bg-[#1A1A1A] p-5 sm:grid-cols-[1.2fr_1fr_1fr] sm:gap-6 sm:p-6">
            <span className="hidden text-[11px] font-semibold uppercase tracking-[0.14em] text-[#6E6E6E] sm:block">
              Critério
            </span>

            <div className="flex items-center justify-center rounded-2xl border border-brand/35 bg-brand/[0.08] px-3 py-3 shadow-[0_0_40px_-16px_rgba(255,106,0,.8)]">
              <Logo className="h-7" />
            </div>

            <span className="grid h-9 w-9 shrink-0 place-items-center justify-self-center rounded-full border border-line bg-card text-[10px] font-bold text-[#6E6E6E] sm:hidden">
              VS
            </span>

            <div className="flex items-center justify-center rounded-2xl border border-line bg-card px-3 py-3">
              <span className="text-[14px] font-semibold tracking-tight text-muted sm:text-[15px]">
                Método tradicional
              </span>
            </div>
          </div>

          {/* Linhas */}
          <ul className="divide-y divide-line">
            {COMPARISON.rows.map((row) => {
              const Icon = row.icon;

              return (
                <li
                  key={row.criterion}
                  className="group grid grid-cols-2 gap-3 p-5 transition-colors duration-300 hover:bg-white/[0.02] sm:grid-cols-[1.2fr_1fr_1fr] sm:items-center sm:gap-6 sm:p-6"
                >
                  <div className="col-span-2 flex items-center gap-3 sm:col-span-1">
                    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg border border-line bg-[#1A1A1A] text-[#8C8C8C] transition-colors duration-300 group-hover:text-brand">
                      <Icon size={15} />
                    </span>
                    <span className="text-[15px] font-medium text-white">
                      {row.criterion}
                    </span>
                  </div>

                  <div className="flex items-center gap-2.5 rounded-xl border border-brand/25 bg-brand/[0.06] px-3.5 py-2.5">
                    <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-brand">
                      <Check size={11} className="text-white" strokeWidth={3.5} />
                    </span>
                    <span className="text-[13.5px] font-semibold text-white sm:text-[14px]">
                      {row.statshub}
                    </span>
                  </div>

                  <div className="flex items-center gap-2.5 rounded-xl border border-line bg-[#1A1A1A] px-3.5 py-2.5">
                    <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full border border-line bg-card">
                      <X size={11} className="text-[#6E6E6E]" strokeWidth={3} />
                    </span>
                    <span className="text-[13.5px] text-muted sm:text-[14px]">
                      {row.traditional}
                    </span>
                  </div>
                </li>
              );
            })}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
