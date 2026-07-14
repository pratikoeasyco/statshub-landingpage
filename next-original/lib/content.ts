import {
  Activity,
  BarChart3,
  Bell,
  Bot,
  BrainCircuit,
  CalendarDays,
  Filter,
  LayoutDashboard,
  LineChart,
  Radar,
  Send,
  Sparkles,
  Target,
  Ticket,
  TrendingUp,
  Zap,
} from "lucide-react";

/* -------------------------------------------------------------------------- */
/*  Navegação                                                                  */
/* -------------------------------------------------------------------------- */

export const NAV_LINKS = [
  { label: "Recursos", href: "#recursos" },
  { label: "Como Funciona", href: "#como-funciona" },
  { label: "Planos", href: "#planos" },
  { label: "FAQ", href: "#faq" },
] as const;

/** Âncora da seção de Planos. */
export const CTA_TARGET = "#planos";

/** App da plataforma: login e início do teste gratuito. */
export const LOGIN_URL = "https://app.statshub.com.br/login";

/** Suporte no Telegram (botão flutuante + rodapé). */
export const SUPPORT_URL = "https://t.me/supguizaum";

/* -------------------------------------------------------------------------- */
/*  Hero                                                                       */
/* -------------------------------------------------------------------------- */

export const HERO = {
  title: ["A Plataforma Definitiva para", "Análise de Futebol"],
  subtitle:
    "Estatísticas de times e jogadores completas, com scanner ao vivo com gráfico e índices de pressão, robôs que alertam no Telegram facilitando ainda mais para você.",
  /* Vai para o app (início do teste gratuito). */
  primaryCta: "Começar Agora",
  /* Rola até a seção de planos. */
  secondaryCta: "Conhecer os Planos",
  /* TODO: troque pela duração real do teste (ex.: "7 dias grátis"). */
  trialNote: "Período de teste gratuito",
  indicators: [
    { value: 10000, suffix: "+", label: "análises realizadas" },
    { label: "Estatísticas em tempo real" },
    { label: "Dados confiáveis" },
    { label: "Interface profissional" },
  ],
} as const;

/* -------------------------------------------------------------------------- */
/*  Faixa de credibilidade (marquee infinito)                                  */
/* -------------------------------------------------------------------------- */

export const MARQUEE_ITEMS = [
  { label: "Jogos do dia", icon: CalendarDays, color: "#FF6A00" },
  { label: "Scanner ao vivo", icon: Radar, color: "#EF4444" },
  { label: "Gráfico de pressão", icon: TrendingUp, color: "#22C55E" },
  { label: "Robôs personalizados", icon: Bot, color: "#8B5CF6" },
  { label: "Criador inteligente de bilhetes", icon: Ticket, color: "#F59E0B" },
  { label: "Alertas no Telegram", icon: Send, color: "#38BDF8" },
  { label: "Análise com IA", icon: BrainCircuit, color: "#06B6D4" },
  { label: "Estatísticas de times e jogadores", icon: BarChart3, color: "#3B82F6" },
  { label: "Entradas prontas", icon: Zap, color: "#EC4899" },
  { label: "Dados em tempo real", icon: Activity, color: "#14B8A6" },
] as const;

/* -------------------------------------------------------------------------- */
/*  Recursos (8 cards)                                                         */
/* -------------------------------------------------------------------------- */

export const FEATURES = [
  {
    icon: CalendarDays,
    title: "Jogos do Dia",
    description:
      "Todos os jogos organizados por campeonatos, com odds, horários e status atualizados em tempo real.",
  },
  {
    icon: Activity,
    title: "Scanner Live",
    description:
      "Detecta oportunidades ao vivo utilizando dezenas de métricas de pressão, ataques perigosos e finalizações.",
  },
  {
    icon: Bot,
    title: "Criação de Robôs",
    description:
      "Transforme sua estratégia em condições e receba o alerta no Telegram assim que um jogo bater os critérios, ao vivo ou no pré-live.",
  },
  {
    icon: Filter,
    title: "Filtros Inteligentes",
    description:
      "Encontre jogos específicos em segundos combinando liga, horário, odds e dezenas de critérios.",
  },
  {
    icon: BarChart3,
    title: "Estatísticas Avançadas",
    description:
      "Dados completos das equipes: forma, médias, escanteios, H2H, escalações e tendências recentes.",
  },
  {
    icon: LineChart,
    title: "Análise por Liga",
    description:
      "Visualização completa por campeonato, com tabelas, padrões e comportamento de cada competição.",
  },
  {
    icon: Target,
    title: "Indicadores de Valor",
    description:
      "Encontre odds interessantes comparando a probabilidade real com o preço oferecido pelo mercado.",
  },
  {
    icon: LayoutDashboard,
    title: "Painel Inteligente",
    description:
      "Jogos, estatísticas, scanner e bilhete na mesma tela, sem ficar trocando de aba.",
  },
] as const;

/* -------------------------------------------------------------------------- */
/*  Demonstração                                                               */
/* -------------------------------------------------------------------------- */

export const SHOWCASE = {
  title: "Interface moderna feita para velocidade",
  subtitle:
    "Cada detalhe da StatsHub foi desenhado para reduzir cliques e entregar a informação certa no momento exato da decisão.",
  benefits: [
    "Navegação rápida",
    "Visual limpo",
    "Todas as ligas",
    "Atualização em tempo real",
    "Filtros profissionais",
    "Interface intuitiva",
  ],
} as const;

/* -------------------------------------------------------------------------- */
/*  Módulos: showcase com scroll fixo (usa os prints da plataforma)           */
/* -------------------------------------------------------------------------- */

export type ModuleId = "jogos" | "scanner" | "robos" | "james" | "zeus";

export type PlatformModule = {
  id: ModuleId;
  tag: string;
  icon: typeof Zap;
  title: string;
  description: string;
  bullets: string[];
};

/**
 * As telas da plataforma são renderizadas em código (`components/mockups/`).
 * Para usar os prints reais, basta salvar os arquivos em `public/screenshots/`
 * com os nomes definidos em `lib/assets.ts`. A troca é automática.
 */

export const MODULES: PlatformModule[] = [
  {
    id: "jogos",
    tag: "Jogos do Dia",
    icon: CalendarDays,
    title: "Analise os jogos do dia em um só lugar",
    description:
      "Todas as partidas organizadas por país e campeonato, com odds, favoritos e um painel de análise completo ao lado, sem abrir dez abas.",
    bullets: [
      "Visão geral, estatísticas, probabilidades e H2H",
      "Escalações, tabela e desempenho dos jogadores",
      "Leitura rápida da forma recente das duas equipes",
    ],
  },
  {
    id: "scanner",
    tag: "Scanner Ao Vivo",
    icon: Activity,
    title: "Scanner Ao Vivo com gráfico de pressão",
    description:
      "Enxergue quem realmente está dominando a partida. Gráfico de pressão, índices de pressão de cada equipe, podendo medir os últimos 5 ou 10 minutos.",
    bullets: [
      "Pressão em janelas de 5 e 10 minutos",
      "Ataques perigosos, chutes e domínio atual",
      "Atualização contínua durante o jogo",
    ],
  },
  {
    id: "robos",
    tag: "Robôs",
    icon: Bot,
    title: "Monte robôs e receba alertas automáticos",
    description:
      "Transforme sua estratégia em condições. Quando um jogo bater os critérios, o robô te avisa no Telegram, ao vivo ou no pré-live.",
    bullets: [
      "Condições combináveis por estratégia",
      "Modos Ao Vivo e Pré-Live",
      "Alertas instantâneos no Telegram",
    ],
  },
  {
    id: "james",
    tag: "James",
    icon: Ticket,
    title: "James, o montador inteligente de bilhetes",
    description:
      "Escolha o tipo de bilhete, a faixa de odd e os mercados. O James lê os cenários do dia e monta a combinação com o melhor equilíbrio.",
    bullets: [
      "Probabilidade e edge calculados por seleção",
      "Justificativa em texto para cada escolha",
      "Regenere o bilhete quantas vezes quiser",
    ],
  },
  {
    id: "zeus",
    tag: "Zeus",
    icon: Sparkles,
    title: "Zeus encontra entradas prontas para você",
    description:
      "Da entrada mais segura à alavancagem, o Zeus recomenda o caminho de acordo com o seu perfil, o seu stake médio e a sua meta.",
    bullets: [
      "Entrada mais segura, alavancagem ou bingão",
      "Modo “resolva por mim” com a melhor opção do momento",
      "Acompanhamento da sua evolução",
    ],
  },
];

/* -------------------------------------------------------------------------- */
/*  Como Funciona (timeline)                                                   */
/* -------------------------------------------------------------------------- */

export const STEPS = [
  {
    number: "01",
    title: "Escolha seu plano",
    description:
      "Pro ou Elite, no mensal ou no trimestral. Sem burocracia e sem fidelidade.",
    icon: Ticket,
  },
  {
    number: "02",
    title: "Acesse imediatamente",
    description:
      "O acesso é liberado na hora, direto no navegador. Sem instalação, sem configuração.",
    icon: Zap,
  },
  {
    number: "03",
    title: "Analise os jogos",
    description:
      "Use scanner, filtros e estatísticas avançadas para ler cada partida em segundos.",
    icon: BarChart3,
  },
  {
    number: "04",
    title: "Encontre oportunidades",
    description:
      "Identifique valor com dados reais e entre com confiança, não com achismo.",
    icon: Target,
  },
] as const;

/* -------------------------------------------------------------------------- */
/*  Diferenciais (comparativo)                                                 */
/* -------------------------------------------------------------------------- */

export const COMPARISON = {
  rows: [
    {
      criterion: "Jogos do dia",
      icon: CalendarDays,
      statshub: "Organizados por liga, com odds",
      traditional: "Abrindo site por site",
    },
    {
      criterion: "Estatísticas",
      icon: BarChart3,
      statshub: "Times e jogadores, completas",
      traditional: "Espalhadas em várias fontes",
    },
    {
      criterion: "Leitura do jogo ao vivo",
      icon: Activity,
      statshub: "Gráfico e índices de pressão",
      traditional: "Só o placar e o palpite",
    },
    {
      criterion: "Alerta de oportunidade",
      icon: Bell,
      statshub: "Robôs avisam no Telegram",
      traditional: "Você precisa ficar na tela",
    },
    {
      criterion: "Montagem do bilhete",
      icon: Ticket,
      statshub: "O James monta e explica cada escolha",
      traditional: "Feita no achismo",
    },
    {
      criterion: "Entradas prontas",
      icon: Zap,
      statshub: "O Zeus sugere conforme o seu perfil",
      traditional: "Você garimpa sozinho",
    },
    {
      criterion: "Análise com IA",
      icon: BrainCircuit,
      statshub: "Incluída no plano Elite",
      traditional: "Não existe",
    },
  ],
} as const;

/* -------------------------------------------------------------------------- */
/*  Depoimentos                                                                */
/* -------------------------------------------------------------------------- */

export const TESTIMONIALS = [
  {
    name: "Rafael Andrade",
    initials: "RA",
    rating: 5,
    text: "Antes eu levava muito tempo para analisar um jogo só. Com o scanner e as estatísticas na mesma tela, faço a leitura em poucos minutos e com bem mais segurança.",
  },
  {
    name: "Diego Martins",
    initials: "DM",
    rating: 5,
    text: "Os robôs mudaram a minha rotina. Configuro as condições da minha estratégia e recebo o alerta no Telegram, sem precisar acompanhar a tela o dia inteiro.",
  },
  {
    name: "Bruno Carvalho",
    initials: "BC",
    rating: 5,
    text: "O gráfico de pressão mostra o domínio da partida antes de o placar mudar. É exatamente a informação que eu não conseguia enxergar sozinho.",
  },
  {
    name: "Lucas Ferreira",
    initials: "LF",
    rating: 5,
    text: "Ter os jogos, as odds e o histórico dos times organizados em um lugar só deixou minha análise muito mais consistente. Uso a plataforma todos os dias.",
  },
  {
    name: "André Nogueira",
    initials: "AN",
    rating: 5,
    text: "O James me ajuda quando o tempo está curto. Ele lê os cenários do dia e monta o bilhete mostrando o motivo de cada escolha, o que me dá confiança na entrada.",
  },
  {
    name: "Thiago Ramos",
    initials: "TR",
    rating: 5,
    text: "O que mais me ajudou foi parar de decidir no achismo. Hoje eu olho os números da partida antes de entrar e sei exatamente por que estou entrando.",
  },
] as const;

/* -------------------------------------------------------------------------- */
/*  Planos                                                                     */
/* -------------------------------------------------------------------------- */

export type BillingPeriod = "mensal" | "trimestral";

export const BILLING = {
  label: "Escolha o período do plano",
  periods: [
    { id: "mensal" as const, label: "Mensal", discount: null },
    { id: "trimestral" as const, label: "Trimestral", discount: "Economize" },
  ],
} as const;

/**
 * A mesma lista de recursos nos dois planos, na mesma ordem: assim o visitante
 * compara linha a linha e enxerga na hora o que só o Elite entrega.
 */
const FEATURE_LIST = [
  "Estatísticas completas dos times",
  "Estatísticas completas dos jogadores",
  "Scanner ao vivo com dados de pressão",
  "Seleção de ligas",
  "Análise com I.A",
  "James, criador de bilhetes inteligentes",
  "Zeus, entradas prontas com sua personalização",
  "Criação de robôs personalizados",
] as const;

export const PLANS = [
  {
    id: "pro",
    name: "PRO",
    description: "Acesso à plataforma com estatísticas completas e scanner ao vivo.",
    highlight: false,
    badge: null,
    prices: {
      mensal: {
        price: "49,00",
        note: "cobrança mensal",
        url: "https://checkout.neonpay.com.br/checkout/cmq45rmx818cu01q0yq1g7wrc?offer=066E13A",
      },
      trimestral: {
        price: "45,67",
        note: "R$ 137,00 a cada 3 meses. Economize R$ 10.",
        url: "https://checkout.neonpay.com.br/checkout/cmq45rmx818cu01q0yq1g7wrc?offer=1ZMZ5JO",
      },
    },
    /* Os 4 primeiros recursos entram; os 4 últimos são exclusivos do Elite. */
    features: FEATURE_LIST.map((label, i) => ({ label, included: i < 4 })),
  },
  {
    id: "elite",
    name: "ELITE",
    description: "Tudo do Pro, mais IA, James, Zeus e criação de robôs.",
    highlight: true,
    badge: "Mais Popular",
    prices: {
      mensal: {
        price: "79,00",
        note: "cobrança mensal",
        url: "https://checkout.neonpay.com.br/checkout/cmq45rmx818cu01q0yq1g7wrc?offer=ZOR9Y1P",
      },
      trimestral: {
        price: "72,33",
        note: "R$ 217,00 a cada 3 meses. Economize R$ 20.",
        url: "https://checkout.neonpay.com.br/checkout/cmq45rmx818cu01q0yq1g7wrc?offer=JIUG42D",
      },
    },
    features: FEATURE_LIST.map((label) => ({ label, included: true })),
  },
] as const;

export const PLANS_CTA = "Assinar agora";

/* -------------------------------------------------------------------------- */
/*  FAQ                                                                        */
/* -------------------------------------------------------------------------- */

export const FAQS = [
  {
    question: "Como funciona a StatsHub?",
    answer:
      "Você entra pelo navegador e já vê os jogos do dia, com as estatísticas completas de cada time e de cada jogador. A partir daí, usa o que precisar: o scanner ao vivo para acompanhar a pressão da partida, os robôs para ser avisado no Telegram quando um jogo bater a sua estratégia, e o James para montar o bilhete. Tudo na mesma tela.",
  },
  {
    question: "Qual é a diferença entre o Pro e o Elite?",
    answer:
      "O Pro dá acesso às estatísticas completas de times e jogadores, ao scanner ao vivo com dados de pressão e à seleção de ligas. O Elite tem tudo isso e ainda libera a análise com IA, o James, o Zeus e a criação de robôs personalizados. Se você quer automatizar a sua estratégia, o Elite é o plano.",
  },
  {
    question: "Tem período de teste gratuito?",
    answer:
      "Tem. Você consegue conhecer a plataforma antes de assinar, para ver na prática como funcionam o scanner, as estatísticas e os alertas.",
  },
  {
    question: "Quando eu recebo o acesso?",
    answer:
      "Assim que o pagamento é confirmado, normalmente em menos de um minuto. Você recebe os dados de acesso por e-mail e já pode entrar.",
  },
  {
    question: "Posso cancelar quando quiser?",
    answer:
      "Pode. Não existe fidelidade nem multa. Você cancela a renovação pelo próprio painel e continua usando a plataforma até o fim do período que já pagou.",
  },
  {
    question: "Preciso instalar alguma coisa? Funciona no celular?",
    answer:
      "Não precisa instalar nada. A StatsHub roda direto no navegador, no computador ou no celular. Basta entrar com o seu login. Os alertas dos robôs chegam no Telegram.",
  },
  {
    question: "As atualizações são cobradas à parte?",
    answer:
      "Não. Todo recurso novo entra automaticamente na sua conta, sem custo adicional, enquanto a assinatura estiver ativa.",
  },
  {
    question: "Tem suporte?",
    answer:
      "Tem. Os dois planos contam com suporte, e o Elite tem atendimento prioritário. Você também entra no grupo da comunidade StatsHub, onde tiramos dúvidas e trocamos leituras de jogos.",
  },
] as const;

/* -------------------------------------------------------------------------- */
/*  Footer                                                                     */
/* -------------------------------------------------------------------------- */

export const FOOTER = {
  description:
    "Plataforma de análise de futebol. Estatísticas completas de times e jogadores, scanner ao vivo com dados de pressão e robôs que avisam no Telegram.",
  columns: [
    {
      title: "Plataforma",
      links: [
        { label: "Recursos", href: "#recursos" },
        { label: "Como Funciona", href: "#como-funciona" },
        { label: "Planos", href: "#planos" },
        { label: "Entrar", href: LOGIN_URL },
      ],
    },
    {
      title: "Suporte",
      links: [
        { label: "Perguntas frequentes", href: "#faq" },
        { label: "Falar com o suporte", href: SUPPORT_URL },
      ],
    },
    {
      title: "Legal",
      links: [
        /* TODO: apontar para as páginas reais quando existirem. */
        { label: "Termos de Uso", href: "#planos" },
        { label: "Política de Privacidade", href: "#planos" },
        { label: "Jogo Responsável", href: "#planos" },
      ],
    },
  ],
  disclaimer:
    "A StatsHub é uma ferramenta de análise estatística e não garante resultados. Aposte com responsabilidade. Proibido para menores de 18 anos.",
} as const;
