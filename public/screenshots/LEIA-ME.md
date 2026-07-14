# Prints reais da plataforma

Salve os arquivos **nesta pasta**, com **exatamente estes nomes**:

| Arquivo                 | Tela da plataforma                          |
| ----------------------- | ------------------------------------------- |
| `jogos-do-dia.png`      | Jogos do Dia (lista + painel de análise)    |
| `scanner-ao-vivo.png`   | Scanner Ao Vivo (card com gráfico de pressão) |
| `robos.png`             | Meus Robôs                                  |
| `james.png`             | James — montador de bilhetes                |
| `zeus.png`              | Zeus — "Como você quer apostar hoje?"       |

Aceita `.png`, `.jpg`, `.jpeg` ou `.webp` — pode trocar a extensão, o nome é que
importa.

## É só isso

Não precisa editar nenhum arquivo de código. O site detecta os prints sozinho
(`lib/assets.ts` lê a pasta durante o build) e usa a imagem real no lugar
do mockup, já com `next/image`: lazy loading, conversão para WebP/AVIF, versões
responsivas e bordas arredondadas.

Depois de copiar os arquivos:

- **em desenvolvimento** (`npm run dev`) — basta recarregar a página;
- **em produção** — rode `npm run build` de novo.

## Dá para misturar

Se você só tiver 2 dos 5 prints, coloque os 2. Os outros três continuam usando
os mockups em código — ninguém percebe a diferença.

## Dica de qualidade

Tire os prints com a janela larga (1600px ou mais) e sem a barra do navegador.
Quanto maior a resolução do arquivo, melhor: o `next/image` reduz e otimiza
sozinho, mas não consegue inventar pixels que não existem.
