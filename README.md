# StatsHub — Landing Page

Landing page premium de alta conversão para a StatsHub, plataforma profissional
de análise de futebol.

**Stack:** Next.js 15 (App Router) · React 19 · TypeScript · Tailwind CSS ·
Framer Motion · Lucide Icons.

## Rodando

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # build de produção (100% estático)
npm start
```

## Estrutura

```
app/
  layout.tsx            SEO, Open Graph, Schema.org (Organization), fontes
  page.tsx              Composição das seções + Schema.org (SoftwareApplication, FAQ)
  opengraph-image.tsx   Imagem de compartilhamento 1200×630 (gerada em build)
  icon.tsx              Favicon (gerado em build)
  globals.css           Tokens, utilitários e reset

components/
  sections/             Uma seção da página por arquivo
  mockups/              As 5 telas da plataforma, recriadas em código
  ui/                   Botão, heading, reveal, count-up, moldura, logo

lib/
  content.ts            TODO o texto da página fica aqui
  motion.ts             Variantes de animação (fade, slide, stagger)
  useMediaQuery.ts      Media query SSR-safe
```

## Logo e favicon

Ficam em `public/`, e a troca é automática — não precisa editar código:

| Arquivo              | O que é                                   |
| -------------------- | ----------------------------------------- |
| `public/logo.png`    | Logo (navbar, rodapé, tabela comparativa) |
| `public/favicon.png` | Ícone da aba do navegador                 |

Aceita `.png`, `.svg`, `.jpg` e `.webp`. Se o arquivo não existir, o site usa a
marca desenhada em código — nunca fica com imagem quebrada. Veja
[`public/LEIA-ME.md`](public/LEIA-ME.md).

Os arquivos que estão lá hoje foram gerados a partir da marca que desenhei.
**Sobrescreva com os seus, mantendo os mesmos nomes.**

## Editando o conteúdo

Praticamente tudo — títulos, textos, recursos, planos, preços, FAQ, depoimentos —
está em [`lib/content.ts`](lib/content.ts). Não é preciso abrir os componentes
para trocar uma copy ou um preço.

Todos os CTAs da página apontam para `CTA_TARGET` (`#planos`) e rolam suavemente
até a seção de Planos.

## As telas da plataforma

As 5 telas (Jogos do Dia, Scanner Ao Vivo, Robôs, James e Zeus) foram
**recriadas em código**, em `components/mockups/`. A vantagem: ficam nítidas em
qualquer resolução, animam (as barras de pressão do scanner sobem conforme você
rola), se adaptam ao mobile e não pesam no carregamento.

### Usar os prints reais no lugar dos mockups

Salve os arquivos em **`public/screenshots/`** com estes nomes — e pronto, não
precisa editar código nenhum:

| Arquivo               | Tela                          |
| --------------------- | ----------------------------- |
| `jogos-do-dia.png`    | Jogos do Dia                  |
| `scanner-ao-vivo.png` | Scanner Ao Vivo               |
| `robos.png`           | Meus Robôs                    |
| `james.png`           | James — montador de bilhetes   |
| `zeus.png`            | Zeus — entradas prontas       |

Aceita `.png`, `.jpg`, `.jpeg` e `.webp`. O [`lib/assets.ts`](lib/assets.ts)
lê a pasta durante o build, descobre as dimensões direto do cabeçalho do arquivo
e o `PlatformShot` troca o mockup pela imagem real — com `next/image`, ou seja,
lazy loading, conversão para WebP/AVIF, `srcset` responsivo e bordas
arredondadas.

Dá para misturar: se você colocar só 2 dos 5 prints, os outros três seguem com
os mockups em código.

Depois de copiar os arquivos: em dev, recarregue a página; em produção, rode
`npm run build` de novo.

## Cuidado com os tokens de cor

O fundo se chama `background` (`bg-background`), **não** `base`. O Tailwind já
tem o utilitário de tamanho `text-base`, e uma cor chamada `base` geraria um
segundo `.text-base` definindo `color` — o texto sairia pintado com a cor do
fundo. Vale a mesma regra para qualquer nome que colida com utilitário nativo.

## Antes de publicar

- Trocar `SITE_URL` em `app/layout.tsx`, `app/sitemap.ts` e `app/robots.ts`.
- Apontar os botões "Assinar Agora" para o checkout real (hoje eles rolam para
  `#planos`) e os links de redes sociais no rodapé (`components/sections/Footer.tsx`).
- Revisar preços e o `aggregateRating` do Schema.org em `app/page.tsx`.
