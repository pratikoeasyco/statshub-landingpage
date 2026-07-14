# Arquivos da marca

Salve aqui, **nesta pasta (`public/`)**:

| Arquivo        | O que é                                    |
| -------------- | ------------------------------------------ |
| `logo.png`     | Logo da StatsHub (navbar, rodapé, tabela)  |
| `favicon.png`  | Ícone da aba do navegador                  |

Aceita também `.svg`, `.jpg` e `.webp` — o nome é que importa.

## É só salvar

Não precisa editar código. O build lê a pasta (`lib/assets.ts`), descobre as
dimensões do arquivo e passa a usá-lo. Se o arquivo não existir, o site usa a
marca desenhada em código — nunca fica quebrado nem com imagem faltando.

Depois de salvar: em dev (`npm run dev`), recarregue a página. Em produção,
rode `npm run build` de novo.

## Dicas

- **`logo.png`** — use a logo **horizontal completa** (símbolo + "StatsHub"),
  com **fundo transparente**. O site exibe com altura de 36px na navbar e ajusta
  a largura sozinho, então exporte com uns 300–500px de largura para ficar nítida
  em telas retina.
- **`favicon.png`** — quadrado, **512×512**, fundo transparente ou sólido.

## Os prints da plataforma

Vão na subpasta [`screenshots/`](screenshots/) — veja o LEIA-ME de lá.
