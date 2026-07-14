# StatsHub — landing page

O site é estático. Não há build, não há React, não há framework.

```
html/            o site inteiro (700 KB). Detalhes em html/README.md
server.js        entrega a pasta html/. Sem dependências: só o Node.
package.json     npm start -> node server.js
next-original/   o projeto Next que deu origem a tudo isto. Só referência.
```

## Como sobe

O painel roda `npm start`, que roda `node server.js`, que serve `html/` na
porta de `process.env.PORT` (ou 3000).

`npm run build` não faz nada de propósito: não existe nada para compilar. E não
é preciso instalar nada: o `package.json` não tem dependências.

## Por que não é mais Next

A página engasgava ao rolar no Safari do iPhone. Reescrita em HTML puro, no
mesmo aparelho (iPhone 13), mesma rolagem:

|                 | Next/React | HTML puro |
| --------------- | ---------- | --------- |
| fps na rolagem  | 29         | **37**    |
| frames perdidos | 82%        | **72%**   |
| JavaScript      | 121 KB     | **8 KB**  |
| tempo de load   | 156 ms     | **83 ms** |

Lighthouse (mobile): **99** de performance, LCP 2,0 s, TBT 0 ms, CLS 0.

Em produção o `next start` segurava ~560 MB de memória para servir uma página
que nunca muda. O `server.js` usa ~30 MB.

## Como editar o site

Mexa direto em `html/index.html`, `html/styles.css` e `html/main.js`. O que está
lá é o que vai pro ar: não existe etapa de geração no meio.

Antes de mexer no CSS, leia as cinco regras no topo do `html/styles.css`. São o
motivo de o site rolar liso no iPhone, e cada uma custou uma medição.

## next-original/

Fica no repositório só como referência do que a página era. Não é servido, não é
compilado e não precisa ser instalado. Se um dia deixar de ser consultado, pode
ser apagado: está tudo no histórico do git.

## Deploy

O servico no painel e do tipo **Aplicativo**, com build por **Dockerfile**.
O build copia `html/` para dentro de um nginx e sobe na porta **80**.

O `server.js` continua aqui so para rodar local (`npm start`). Em producao
quem serve e o nginx do Dockerfile.
