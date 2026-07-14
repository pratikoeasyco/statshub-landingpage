import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Clock,
  MapPin,
  Pin,
  RefreshCw,
  Search,
  SlidersHorizontal,
  Star,
  Sun,
  Trophy,
  User,
  CalendarDays,
} from "lucide-react";
import {
  Crest,
  Flag,
  FormBadge,
  InsightRow,
  OddBox,
  SectionCard,
  Tab,
} from "./atoms";
import { Logo } from "../ui/Logo";

const DAYS = [
  { d: "DOMINGO", n: "12/07" },
  { d: "SEGUNDA", n: "13/07" },
  { d: "TERÇA", n: "14/07" },
  { d: "QUARTA", n: "15/07" },
  { d: "QUINTA", n: "16/07" },
];

const UCL = [
  { t: "12:00", h: "Kuopion Palloseura", a: "FK Vardar Skopje", o: ["1.64", "3.99", "4.46"], hc: ["#1E5EFF", "#0B2E8A"], ac: ["#C0392B", "#7B241C"] },
  { t: "13:00", h: "Inter Club d'Escaldes", a: "Lincoln Red Imps", o: ["1.65", "4.04", "4.37"], hc: ["#2C3E50", "#1B2631"], ac: ["#E74C3C", "#922B21"] },
  { t: "13:00", h: "FC Iberia 1999", a: "Flora Tallinn", o: ["1.63", "4.07", "4.45"], hc: ["#C0392B", "#7B241C"], ac: ["#16A085", "#0E6655"] },
  { t: "14:00", h: "ETO FC Győr", a: "Víkingur Reykjavík", o: ["1.72", "4.00", "3.95"], hc: ["#27AE60", "#145A32"], ac: ["#2980B9", "#1A5276"] },
  { t: "14:00", h: "Riga FC", a: "FC Ararat-Armenia", o: ["1.72", "3.58", "4.52"], hc: ["#8E44AD", "#4A235A"], ac: ["#D35400", "#873600"] },
  { t: "14:30", h: "Levski Sofia", a: "FK Borac Banja Luka", o: ["1.37", "4.32", "8.41"], hc: ["#2980B9", "#1A5276"], ac: ["#C0392B", "#641E16"] },
];

/* -------------------------------------------------------------------------- */

export function MockJogos() {
  return (
    <div className="flex h-full w-full flex-col bg-background text-white">
      {/* Topbar */}
      <div className="flex h-11 shrink-0 items-center justify-between px-4">
        <span className="grid h-6 w-6 place-items-center rounded-lg border border-line bg-card">
          <ChevronLeft size={12} className="text-[#8C8C8C]" />
        </span>
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1.5 rounded-full bg-[#25D366] px-2.5 py-1 text-[10px] font-bold text-white">
            <i className="h-2 w-2 rounded-full bg-white/90" />
            Grupo StatsHub
          </span>
          <Sun size={13} className="text-[#8C8C8C]" />
          <span className="grid h-6 w-6 place-items-center rounded-full border border-brand/50">
            <User size={11} className="text-brand" />
          </span>
        </div>
      </div>

      {/* Header */}
      <div className="flex shrink-0 items-center justify-between px-4 pb-3 pt-1">
        <div className="flex items-center gap-2.5">
          <h3 className="text-[17px] font-bold tracking-tight">Jogos do Dia</h3>
          <span className="rounded-md bg-[#242424] px-2 py-0.5 text-[10px] font-medium text-[#B8B8B8]">
            12 partidas
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <ChevronLeft size={12} className="text-[#6E6E6E]" />
          {DAYS.map((day) => {
            const active = day.n === "14/07";
            return (
              <span
                key={day.n}
                className={`grid h-9 w-[62px] place-items-center rounded-lg px-1 leading-none ${
                  active ? "bg-brand text-white" : "text-[#9A9A9A]"
                }`}
              >
                <i className="text-[8px] font-bold not-italic tracking-wide">
                  {day.d}
                </i>
                <i className="mt-0.5 text-[11px] font-bold not-italic">{day.n}</i>
              </span>
            );
          })}
          <ChevronRight size={12} className="text-[#6E6E6E]" />
          <span className="ml-1 grid h-7 w-7 place-items-center rounded-lg border border-line bg-card">
            <RefreshCw size={11} className="text-[#8C8C8C]" />
          </span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex shrink-0 items-center gap-1 px-4 pb-3">
        <Tab active>Todos</Tab>
        <Tab>
          <Star size={9} className="mr-1 inline" />
          Favoritos
        </Tab>
        <Tab>Ao Vivo</Tab>
        <Tab>Próximos</Tab>
        <Tab>Encerrados</Tab>
        <span className="ml-2 flex items-center gap-1.5 rounded-lg border border-brand/60 bg-brand/10 px-2.5 py-1.5 text-[11px] font-medium text-brand">
          <SlidersHorizontal size={10} />
          Filtros
          <i className="grid h-3.5 w-3.5 place-items-center rounded-full bg-brand text-[8px] font-bold not-italic text-white">
            1
          </i>
        </span>
      </div>

      {/* Corpo */}
      <div className="flex min-h-0 flex-1 gap-3 px-4 pb-4">
        {/* Lista */}
        <div className="flex w-[330px] shrink-0 flex-col gap-2.5">
          <div className="flex gap-2">
            <div className="flex h-8 flex-1 items-center gap-2 rounded-lg border border-line bg-card px-2.5">
              <Search size={11} className="text-[#6E6E6E]" />
              <span className="text-[10px] text-[#6E6E6E]">
                Buscar por time, liga ou país...
              </span>
            </div>
            <div className="flex h-8 items-center rounded-lg border border-line bg-card p-0.5">
              <span className="rounded-md bg-[#2A2A2A] px-2 py-1 text-[9.5px] font-medium text-white">
                Por Liga
              </span>
              <span className="px-2 py-1 text-[9.5px] text-[#8C8C8C]">
                Por Horário
              </span>
            </div>
          </div>

          <p className="flex items-center gap-1.5 text-[9.5px] font-medium text-[#8C8C8C]">
            <i className="h-3 w-4 rounded-[3px] bg-gradient-to-br from-[#8B5CF6] to-[#5B21B6]" />
            Internacional
            <i className="h-px w-3 bg-line" /> 1 jogo
          </p>

          <SectionCard className="overflow-hidden">
            <div className="flex items-center justify-between border-b border-line px-2.5 py-2">
              <span className="flex items-center gap-1.5 text-[11px] font-semibold">
                <Trophy size={11} className="text-[#FFC400]" />
                World Cup 2026
              </span>
              <span className="flex items-center gap-1.5 text-[#6E6E6E]">
                <Pin size={10} />
                <ChevronDown size={10} />
              </span>
            </div>
            <div className="flex items-center gap-2 bg-brand/[0.06] px-2.5 py-2">
              <span className="w-8 text-[10px] font-semibold text-[#B8B8B8]">
                16:00
              </span>
              <div className="flex-1 space-y-1">
                <span className="flex items-center gap-1.5 text-[10.5px] font-medium">
                  <Flag country="fr" size={13} />
                  France <i className="text-[8px] not-italic text-[#8C8C8C]">1º</i>
                </span>
                <span className="flex items-center gap-1.5 text-[10.5px] font-medium">
                  <Flag country="es" size={13} />
                  Spain <i className="text-[8px] not-italic text-[#8C8C8C]">1º</i>
                </span>
              </div>
              <div className="flex flex-col gap-1 text-[10px] text-[#6E6E6E]">
                <i className="not-italic">–</i>
                <i className="not-italic">–</i>
              </div>
              <div className="flex gap-1">
                <OddBox value="2.34" active />
                <OddBox value="3.24" />
                <OddBox value="3.16" />
              </div>
              <Star size={11} className="text-brand" fill="currentColor" />
            </div>
          </SectionCard>

          <p className="flex items-center gap-1.5 text-[9.5px] font-medium text-[#8C8C8C]">
            <i className="h-3 w-4 rounded-[3px] bg-gradient-to-br from-[#2563EB] to-[#1E3A8A]" />
            Europa
            <i className="h-px w-3 bg-line" /> 10 jogos
          </p>

          <SectionCard className="flex min-h-0 flex-1 flex-col overflow-hidden">
            <div className="flex items-center justify-between border-b border-line px-2.5 py-2">
              <span className="flex items-center gap-1.5 text-[11px] font-semibold">
                <i className="grid h-3.5 w-3.5 place-items-center rounded-full bg-gradient-to-br from-[#1E5EFF] to-[#0B2E8A] text-[7px] not-italic">
                  ★
                </i>
                Champions League
              </span>
              <span className="flex items-center gap-1.5 text-[#6E6E6E]">
                <Pin size={10} />
                <ChevronDown size={10} />
              </span>
            </div>
            <div className="divide-y divide-line/70">
              {UCL.map((m) => (
                <div key={m.h} className="flex items-center gap-2 px-2.5 py-[7px]">
                  <span className="w-8 text-[10px] font-semibold text-[#B8B8B8]">
                    {m.t}
                  </span>
                  <div className="w-[104px] space-y-1">
                    <span className="flex items-center gap-1.5 truncate text-[10px]">
                      <Crest label={m.h[0]} from={m.hc[0]} to={m.hc[1]} size={13} />
                      <i className="truncate not-italic">{m.h}</i>
                    </span>
                    <span className="flex items-center gap-1.5 truncate text-[10px]">
                      <Crest label={m.a[0]} from={m.ac[0]} to={m.ac[1]} size={13} />
                      <i className="truncate not-italic">{m.a}</i>
                    </span>
                  </div>
                  <div className="flex flex-col gap-1 text-[10px] text-[#6E6E6E]">
                    <i className="not-italic">–</i>
                    <i className="not-italic">–</i>
                  </div>
                  <div className="ml-auto flex gap-1">
                    {m.o.map((o, i) => (
                      <OddBox key={o + i} value={o} />
                    ))}
                  </div>
                  <Star size={11} className="text-[#5A5A5A]" />
                </div>
              ))}
            </div>
          </SectionCard>
        </div>

        {/* Painel de análise */}
        <SectionCard className="flex min-h-0 flex-1 flex-col overflow-hidden">
          <div className="flex items-center justify-center gap-1.5 border-b border-line py-2 text-[10.5px] text-[#B8B8B8]">
            <Trophy size={10} className="text-[#FFC400]" />
            <b className="font-semibold text-white">World Cup 2026</b> · Semi-Final
          </div>

          <div className="flex items-center justify-center gap-10 py-4">
            <div className="flex items-center gap-2.5">
              <Flag country="fr" size={42} />
              <span className="leading-tight">
                <i className="block text-[9px] not-italic text-[#8C8C8C]">1º</i>
                <i className="block text-[13px] font-bold not-italic text-brand">
                  2.34
                </i>
              </span>
            </div>

            <div className="flex flex-col items-center">
              <Logo className="h-5" />
              <span className="mt-1 text-[30px] font-bold leading-none tracking-tight">
                16:00
              </span>
              <span className="mt-1 text-[10px] text-[#8C8C8C]">14 de julho</span>
            </div>

            <div className="flex items-center gap-2.5">
              <span className="text-right leading-tight">
                <i className="block text-[9px] not-italic text-[#8C8C8C]">1º</i>
                <i className="block text-[13px] font-bold not-italic text-brand">
                  3.16
                </i>
              </span>
              <Flag country="es" size={42} />
            </div>
          </div>

          <div className="flex items-center justify-between border-b border-line px-4">
            {[
              "Visão Geral",
              "Análise IA",
              "Estatísticas",
              "Probabilidades",
              "Escalações",
              "H2H",
              "Tabela",
              "Jogadores",
            ].map((t, i) => (
              <span
                key={t}
                className={`relative pb-2 text-[10.5px] ${
                  i === 0 ? "font-semibold text-brand" : "text-[#8C8C8C]"
                }`}
              >
                {t}
                {i === 0 && (
                  <i className="absolute inset-x-0 -bottom-px h-[2px] rounded-full bg-brand" />
                )}
              </span>
            ))}
          </div>

          <div className="flex-1 space-y-2.5 p-3">
            <div className="grid grid-cols-3 gap-2.5">
              {[
                { i: CalendarDays, k: "DATA", v: "14 de julho de 2026" },
                { i: Clock, k: "HORÁRIO", v: "16:00 (horário local)" },
                { i: MapPin, k: "ESTÁDIO", v: "AT&T Stadium" },
              ].map(({ i: Icon, k, v }) => (
                <div
                  key={k}
                  className="flex items-center gap-2 rounded-lg border border-line bg-[#1A1A1A] px-2.5 py-2"
                >
                  <span className="grid h-6 w-6 place-items-center rounded-md border border-line bg-card">
                    <Icon size={11} className="text-[#8C8C8C]" />
                  </span>
                  <span className="leading-tight">
                    <i className="block text-[8px] font-semibold not-italic tracking-wide text-[#8C8C8C]">
                      {k}
                    </i>
                    <i className="block text-[10px] font-medium not-italic">{v}</i>
                  </span>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              {[
                {
                  flag: "fr" as const,
                  name: "France",
                  rows: [
                    ["Marcou 1 ou mais gols", "nos últimos 10"],
                    ["Venceu", "em 9"],
                    ["Não perdeu", "em 9"],
                    ["Mais de 1.5 gols na partida", "em 9"],
                  ],
                  purple: ["5 ou mais escanteios a favor", "em 8"],
                },
                {
                  flag: "es" as const,
                  name: "Spain",
                  rows: [
                    ["Não perdeu", "nos últimos 10"],
                    ["Marcou 1 ou mais gols", "em 8"],
                    ["Venceu", "em 7"],
                    ["Mais de 1.5 gols na partida", "em 7"],
                  ],
                  purple: ["5 ou mais escanteios a favor", "nos últimos 10"],
                },
              ].map((team) => (
                <div
                  key={team.name}
                  className="rounded-lg border border-line bg-[#1A1A1A] p-2.5"
                >
                  <div className="mb-2 flex items-center gap-2">
                    <Flag country={team.flag} size={16} />
                    <span className="leading-tight">
                      <i className="block text-[11px] font-semibold not-italic">
                        {team.name}
                      </i>
                      <i className="block text-[8.5px] not-italic text-[#8C8C8C]">
                        Nos últimos 10 jogos
                      </i>
                    </span>
                    <span className="ml-auto flex gap-1">
                      {(["W", "W", "W", "W", "W"] as const).map((r, i) => (
                        <FormBadge key={i} r={r} />
                      ))}
                    </span>
                  </div>
                  <div className="space-y-1.5">
                    {team.rows.map(([a, b]) => (
                      <InsightRow key={a}>
                        {a} <b className="font-semibold text-ok">{b}</b>
                      </InsightRow>
                    ))}
                    <InsightRow tone="purple">
                      {team.purple[0]}{" "}
                      <b className="font-semibold text-[#A78BFA]">
                        {team.purple[1]}
                      </b>
                    </InsightRow>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </SectionCard>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Variante mobile, foca no painel de análise                                */
/* -------------------------------------------------------------------------- */

export function MockJogosCompact() {
  return (
    <div className="w-full bg-background p-3 text-white">
      <div className="mb-2.5 flex items-center justify-between">
        <span className="text-[13px] font-bold">Jogos do Dia</span>
        <span className="rounded-md bg-brand px-2 py-1 text-[9px] font-bold">
          TERÇA 14/07
        </span>
      </div>

      <SectionCard className="overflow-hidden">
        <div className="flex items-center justify-center gap-1.5 border-b border-line py-1.5 text-[9px] text-[#B8B8B8]">
          <Trophy size={9} className="text-[#FFC400]" />
          <b className="font-semibold text-white">World Cup 2026</b> · Semi-Final
        </div>

        <div className="flex items-center justify-around px-3 py-3.5">
          <div className="flex flex-col items-center gap-1.5">
            <Flag country="fr" size={34} />
            <i className="text-[10px] font-semibold not-italic">France</i>
            <i className="text-[11px] font-bold not-italic text-brand">2.34</i>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-[24px] font-bold leading-none tracking-tight">
              16:00
            </span>
            <span className="mt-1 text-[9px] text-[#8C8C8C]">14 de julho</span>
          </div>
          <div className="flex flex-col items-center gap-1.5">
            <Flag country="es" size={34} />
            <i className="text-[10px] font-semibold not-italic">Spain</i>
            <i className="text-[11px] font-bold not-italic text-brand">3.16</i>
          </div>
        </div>

        <div className="flex gap-3 border-y border-line px-3 py-1.5">
          {["Visão Geral", "Estatísticas", "H2H"].map((t, i) => (
            <span
              key={t}
              className={`relative pb-1 text-[9.5px] ${
                i === 0 ? "font-semibold text-brand" : "text-[#8C8C8C]"
              }`}
            >
              {t}
              {i === 0 && (
                <i className="absolute inset-x-0 -bottom-[7px] h-[2px] rounded-full bg-brand" />
              )}
            </span>
          ))}
        </div>

        <div className="space-y-1.5 p-2.5">
          <div className="mb-1 flex items-center gap-2">
            <Flag country="fr" size={14} />
            <i className="text-[10px] font-semibold not-italic">France</i>
            <span className="ml-auto flex gap-1">
              {(["W", "W", "W", "W", "W"] as const).map((r, i) => (
                <FormBadge key={i} r={r} />
              ))}
            </span>
          </div>
          <InsightRow>
            Marcou 1 ou mais gols{" "}
            <b className="font-semibold text-ok">nos últimos 10</b>
          </InsightRow>
          <InsightRow>
            Venceu <b className="font-semibold text-ok">em 9</b>
          </InsightRow>
          <InsightRow tone="purple">
            5 ou mais escanteios{" "}
            <b className="font-semibold text-[#A78BFA]">em 8</b>
          </InsightRow>
        </div>
      </SectionCard>

      <div className="mt-2.5 space-y-1.5">
        {UCL.slice(0, 3).map((m) => (
          <div
            key={m.h}
            className="flex items-center gap-2 rounded-lg border border-line bg-card px-2.5 py-2"
          >
            <span className="text-[9.5px] font-semibold text-[#B8B8B8]">
              {m.t}
            </span>
            <div className="min-w-0 flex-1 space-y-1">
              <span className="flex items-center gap-1.5 truncate text-[9.5px]">
                <Crest label={m.h[0]} from={m.hc[0]} to={m.hc[1]} size={12} />
                <i className="truncate not-italic">{m.h}</i>
              </span>
              <span className="flex items-center gap-1.5 truncate text-[9.5px]">
                <Crest label={m.a[0]} from={m.ac[0]} to={m.ac[1]} size={12} />
                <i className="truncate not-italic">{m.a}</i>
              </span>
            </div>
            <OddBox value={m.o[0]} />
          </div>
        ))}
      </div>
    </div>
  );
}
