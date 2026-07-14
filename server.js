/* ==========================================================================
   Servidor do site.

   O site é estático: não há nada para compilar, e nenhuma página é montada por
   requisição. Este arquivo só entrega os arquivos da pasta html/.

   Antes daqui rodava o `next start`, que segurava ~560 MB de memória para
   servir uma página que nunca muda. Isto aqui usa ~30 MB e não tem dependência
   nenhuma: só o Node.
   ========================================================================== */

const http = require("node:http");
const fs = require("node:fs");
const path = require("node:path");

const RAIZ = path.join(__dirname, "html");
const PORTA = process.env.PORT || 3000;

const TIPOS = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".webp": "image/webp",
  ".jpg": "image/jpeg",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".woff2": "font/woff2",
  ".ico": "image/x-icon",
  ".xml": "application/xml",
  ".txt": "text/plain; charset=utf-8",
};

const servidor = http.createServer((req, res) => {
  /* Só GET e HEAD: o site não recebe dados de ninguém. */
  if (req.method !== "GET" && req.method !== "HEAD") {
    res.writeHead(405, { Allow: "GET, HEAD" });
    return res.end();
  }

  const url = new URL(req.url, "http://localhost");
  let rel = decodeURIComponent(url.pathname);
  if (rel.endsWith("/")) rel += "index.html";

  /*
    `path.join` normaliza `..`, então um pedido como /../../etc/passwd vira um
    caminho fora da raiz. Conferir que o resultado ainda começa dentro de RAIZ
    é o que impede isso. Sem esta linha, o servidor entrega qualquer arquivo do
    disco a quem pedir.
  */
  const arquivo = path.join(RAIZ, rel);
  if (!arquivo.startsWith(RAIZ)) {
    res.writeHead(403);
    return res.end();
  }

  fs.stat(arquivo, (erro, info) => {
    if (erro || !info.isFile()) {
      /* Página não encontrada: devolve a landing mesmo assim, com 404 no
         cabeçalho. Ninguém cai numa tela de erro por digitar a URL errado. */
      const html = fs.readFileSync(path.join(RAIZ, "index.html"));
      res.writeHead(404, { "Content-Type": TIPOS[".html"] });
      return res.end(req.method === "HEAD" ? undefined : html);
    }

    const ext = path.extname(arquivo).toLowerCase();
    const dentroDeAssets = rel.startsWith("/assets/");

    res.writeHead(200, {
      "Content-Type": TIPOS[ext] || "application/octet-stream",
      "Content-Length": info.size,
      /*
        Os assets nunca mudam de conteúdo sem mudar de nome: o navegador guarda
        para sempre. O HTML, o CSS e o JS eu publico de novo, então o navegador
        guarda mas sempre confere antes de reusar. Sem isso, uma correção sua
        levaria dias para chegar em quem já visitou o site.
      */
      "Cache-Control": dentroDeAssets
        ? "public, max-age=31536000, immutable"
        : "no-cache",
      "X-Content-Type-Options": "nosniff",
    });

    if (req.method === "HEAD") return res.end();
    fs.createReadStream(arquivo).pipe(res);
  });
});

servidor.listen(PORTA, () => {
  console.log(`StatsHub no ar em http://localhost:${PORTA}`);
});
