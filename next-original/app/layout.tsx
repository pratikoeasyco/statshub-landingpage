import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { findFavicon } from "@/lib/assets";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

/* Se você salvar public/favicon.png, ele vira o ícone da aba.
   Sem ele, o site usa o ícone gerado em app/icon.tsx. */
const favicon = findFavicon();

const SITE_URL = "https://statshub.com.br";
const TITLE = "StatsHub - Plataforma de Análise de Futebol";
const DESCRIPTION =
  "Estatísticas avançadas, scanner ao vivo com gráfico de pressão, robôs de alerta e IA para análise. Tome decisões mais inteligentes e encontre oportunidades em segundos.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: "%s | StatsHub",
  },
  description: DESCRIPTION,
  applicationName: "StatsHub",
  keywords: [
    "análise de futebol",
    "estatísticas de futebol",
    "apostas esportivas",
    "scanner ao vivo",
    "gráfico de pressão",
    "trading esportivo",
    "odds",
    "StatsHub",
  ],
  authors: [{ name: "StatsHub" }],
  creator: "StatsHub",
  publisher: "StatsHub",
  alternates: {
    canonical: "/",
  },
  ...(favicon && { icons: { icon: favicon.src, apple: favicon.src } }),
  /* As imagens vêm de app/opengraph-image.tsx (geradas em build). */
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: SITE_URL,
    siteName: "StatsHub",
    title: TITLE,
    description: DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  category: "sports",
};

export const viewport: Viewport = {
  themeColor: "#111111",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

/* Schema.org, produto SaaS + ofertas + FAQ ficam na página (page.tsx). */
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "StatsHub",
  url: SITE_URL,
  logo: `${SITE_URL}/opengraph-image`,
  description: DESCRIPTION,
  sameAs: [],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // `suppressHydrationWarning`: o script logo abaixo adiciona a classe `js` no
    // <html> antes de o React hidratar, então o className do cliente nunca vai
    // bater com o do servidor. É esperado. Sem isto o React acusa mismatch e pode
    // descartar o HTML do servidor, re-renderizando a página inteira no navegador
    // (piscada na tela e todo o trabalho do SSR jogado fora).
    // A supressão vale só para este elemento, não para a árvore toda.
    <html lang="pt-BR" className={inter.variable} suppressHydrationWarning>
      <body className="bg-background font-sans text-white">
        {/*
          Marca o <html> assim que o parser chega aqui, antes de qualquer
          conteúdo ser pintado. É isso que liga as animações de entrada.

          A lógica é invertida de propósito: o CSS só esconde o conteúdo se esta
          classe existir. Assim, se o JavaScript falhar ou estiver bloqueado, a
          página aparece inteira (sem animação) em vez de ficar em branco.
        */}
        <script
          dangerouslySetInnerHTML={{
            __html: `document.documentElement.classList.add('js')`,
          }}
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
        {children}
      </body>
    </html>
  );
}
