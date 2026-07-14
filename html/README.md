# StatsHub — landing page (HTML puro)

Esta pasta é o site inteiro. Três arquivos e uma pasta de assets. Sem build, sem
Node, sem npm install. É só jogar o conteúdo no servidor.

```
html/
  index.html      página inteira (69 KB), sprite de ícones embutido
  styles.css      todo o CSS, escrito à mão
  main.js         todo o JavaScript (~90 linhas)
  assets/
    fonts/        Inter variável, um arquivo, pesos 400-700
    shots/        prints em WebP (3 larguras) + JPG de reserva
    logo.png/.webp, favicon.png
```

## Como publicar

Aponte a raiz do site (document root) para **esta pasta**, não para a raiz do
repositório. A raiz do repositório ainda tem o projeto Next.js original, que é
de onde este HTML foi derivado; ele não é mais o que vai pro ar.

Na Hostinger / Easy Painel: envie o **conteúdo** de `html/` para `public_html/`.

## Como editar

Edite os arquivos direto. Não existe etapa de geração: o que está aqui é o que
vai pro ar. O texto todo mora no `index.html`.

## Por que HTML puro

A versão em React/Next engasgava ao rolar no Safari do iPhone. Medido nos dois,
mesmo aparelho (iPhone 13), mesma rolagem:

|                  | Next/React | HTML puro |
| ---------------- | ---------- | --------- |
| fps na rolagem   | 29         | **37**    |
| frames perdidos  | 82%        | **72%**   |
| JavaScript       | 121 KB     | **8 KB**  |
| nós no DOM       | 1333       | **1155**  |
| tempo de load    | 156 ms     | **83 ms** |

Lighthouse (mobile): **99** de performance, LCP 2,0 s, TBT 0 ms, CLS 0.

## Regras de ouro (não quebre sem medir no aparelho)

O que fazia o iPhone engasgar era **custo de pintura no CSS**, não JavaScript.
Estas cinco regras são o motivo de o site rolar liso. Estão repetidas no topo do
`styles.css`, onde importam:

1. **Nada de `overflow` em `<html>` ou `<body>`.** No iOS isso desliga a rolagem
   acelerada. Quem contém os brilhos que vazam é cada `<section>`.
2. **Nada de `backdrop-filter` em elemento fixo.** O Safari re-desfoca tudo que
   passa atrás dele, quadro a quadro, a rolagem inteira. O vidro fosco da navbar
   só existe no desktop (`@media (min-width: 1024px)`).
3. **`box-shadow` com raio curto** (máximo 16 px aqui). O custo de rasterizar
   cresce com o raio, e o Safari refaz isso a cada frame.
4. **Nada de `mask-image` nem `mix-blend-mode`.** Viram camadas de composição
   extras. Onde precisa apagar bordas, é gradiente sobreposto.
5. **Animar só `opacity` e `transform`.** São as únicas que não forçam layout.

Duas pegadinhas que já custaram caro aqui:

- `overflow: hidden` num ancestral **mata** o `position: sticky` do filho. Em
  `#modulos` usamos `overflow: clip`, que corta igual mas não cria container de
  rolagem.
- `content-visibility: auto` **quebra as animações de entrada**: a seção pulada
  não tem caixa de layout, então o IntersectionObserver nunca dispara e o bloco
  fica invisível para sempre. Economizava 13 ms. Não vale.

## Se o JavaScript falhar

A página aparece inteira, sem animação, em vez de ficar em branco. O `main.js`
marca `<html class="js">` na primeira linha, e o CSS só esconde os blocos para
animá-los se essa classe existir.
