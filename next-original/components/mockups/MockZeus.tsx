import {
  ArrowRight,
  Rocket,
  Scale,
  Shield,
  Trophy,
  Zap,
  Hand,
} from "lucide-react";

const OPTIONS = [
  {
    icon: Shield,
    title: "Entrada Mais Segura",
    desc: "Recomendações consistentes na faixa de odd que vale a pena.",
    cta: "Ver agora",
    highlight: false,
  },
  {
    icon: Rocket,
    title: "Buscar Alavancagem",
    desc: "Para quem busca maior potencial de retorno.",
    cta: "Ver agora",
    highlight: false,
  },
  {
    icon: Zap,
    title: "Resolva por Mim",
    desc: "Mostre apenas a melhor recomendação disponível agora.",
    cta: "Decidir por mim",
    highlight: false,
  },
  {
    icon: Trophy,
    title: "Bingão",
    desc: "Odds altas a partir de 10x, para sonhar grande hoje.",
    cta: "Buscar bingão",
    highlight: true,
  },
] as const;

function OptionCard({
  opt,
  compact = false,
}: {
  opt: (typeof OPTIONS)[number];
  compact?: boolean;
}) {
  const Icon = opt.icon;

  return (
    <div
      className={`flex flex-col rounded-2xl border bg-card ${
        opt.highlight ? "border-brand/60" : "border-line"
      } ${compact ? "p-3" : "p-5"}`}
    >
      <Icon size={compact ? 16 : 22} className="text-brand" />

      <p
        className={`font-bold tracking-tight ${
          compact ? "mt-2 text-[11.5px]" : "mt-4 text-[15px]"
        }`}
      >
        {opt.title}
      </p>

      <p
        className={`mt-1 flex-1 text-[#8C8C8C] ${
          compact ? "text-[9px] leading-snug" : "text-[11px] leading-relaxed"
        }`}
      >
        {opt.desc}
      </p>

      <span
        className={`inline-flex items-center gap-1 font-bold uppercase tracking-wide text-brand ${
          compact ? "mt-2 text-[8.5px]" : "mt-4 text-[10px]"
        }`}
      >
        {opt.cta}
        <ArrowRight size={compact ? 9 : 11} />
      </span>
    </div>
  );
}

/* -------------------------------------------------------------------------- */

export function MockZeus() {
  return (
    <div className="flex h-full w-full flex-col bg-background px-8 py-6 text-white">
      <p className="flex items-center gap-1.5 text-[12px] text-[#B8B8B8]">
        Boa noite, <b className="font-bold text-white">Admin</b>
        <Hand size={12} className="text-brand" />
      </p>

      <div className="mt-2 flex w-fit items-center gap-2 rounded-full border border-line bg-card px-3 py-1.5 text-[10px] text-[#B8B8B8]">
        <Scale size={11} className="text-brand" />
        Equilibrado
        <i className="h-0.5 w-0.5 rounded-full bg-[#5A5A5A]" />
        R$ 20,00 médio
        <i className="h-0.5 w-0.5 rounded-full bg-[#5A5A5A]" />
        Meta R$ 1.000,00
      </div>

      <h3 className="mt-6 text-[30px] font-bold tracking-tight">
        Como você quer apostar hoje?
      </h3>
      <p className="mt-1.5 text-[12px] text-[#8C8C8C]">
        Escolha uma opção e o Zeus encontra o melhor caminho para você.
      </p>

      <div className="mt-6 grid flex-1 grid-cols-2 gap-4">
        {OPTIONS.map((o) => (
          <OptionCard key={o.title} opt={o} />
        ))}
      </div>

      <div className="mt-5 flex items-center justify-between">
        <span className="flex items-center gap-1.5 text-[11px] font-medium text-[#B8B8B8]">
          Sua Evolução
          <ArrowRight size={11} />
        </span>
        <p className="text-[9.5px] text-[#6E6E6E]">
          O Zeus traz sugestões de praticidade. Não há garantia de resultados.
        </p>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */

export function MockZeusCompact() {
  return (
    <div className="w-full bg-background p-3.5 text-white">
      <p className="flex items-center gap-1 text-[10.5px] text-[#B8B8B8]">
        Boa noite, <b className="font-bold text-white">Admin</b>
        <Hand size={10} className="text-brand" />
      </p>
      <h3 className="mt-2 text-[17px] font-bold leading-tight tracking-tight">
        Como você quer apostar hoje?
      </h3>
      <p className="mt-1 text-[9.5px] text-[#8C8C8C]">
        Escolha uma opção e o Zeus encontra o melhor caminho.
      </p>

      <div className="mt-3 grid grid-cols-2 gap-2">
        {OPTIONS.map((o) => (
          <OptionCard key={o.title} opt={o} compact />
        ))}
      </div>
    </div>
  );
}
