/* ==========================================================================
   Rastreamento de afiliado (client-side, sem backend, sem dependência).

   O afiliado divulga  https://statshub.com.br/?code=<afiliado>  . Este script:

     1. lê o `code` da URL;
     2. grava num cookie `sh_ref` em `.statshub.com.br` (visível também para o
        app, que fica em app.statshub.com.br, sem nenhuma integração de código);
     3. se a URL vier sem code, recupera do cookie;
     4. com o code em mãos, acrescenta `code=<valor>` em todo link que aponte
        para o checkout da NeonPay ou para o app, preservando o `offer` e nunca
        sobrescrevendo um `code` que o link já tenha.

   Por que reescrever no CLIQUE, e não só no load: o toggle mensal/trimestral
   troca o href do botão de checkout em tempo de execução (a partir de
   `data-url-*`, que não carrega code). Um listener delegado em fase de captura
   pega o href no instante do clique, então é imune a essa troca e a qualquer
   link criado depois.

   Tudo roda dentro de try/catch: se algo falhar, os links seguem como estão.
   Nada aqui pode quebrar a página.
   ========================================================================== */

(function () {
  "use strict";

  try {
    var COOKIE = "sh_ref";
    var MAXAGE = 15552000; // 180 dias, em segundos
    /* Só mexemos em links para estes destinos. */
    var ALVOS = ["checkout.neonpay.com.br", "app.statshub.com.br"];
    /* O code é um identificador curto de afiliado. Validar evita gravar lixo
       (ou tentativa de injeção) no cookie e nas URLs. */
    var VALIDO = /^[A-Za-z0-9_-]{1,64}$/;

    function lerCookie(nome) {
      var m = document.cookie.match(
        new RegExp("(?:^|;\\s*)" + nome + "=([^;]*)"),
      );
      try {
        return m ? decodeURIComponent(m[1]) : "";
      } catch (e) {
        return "";
      }
    }

    function gravarCookie(valor) {
      var attrs = "; path=/; max-age=" + MAXAGE + "; SameSite=Lax";
      /* O domínio com ponto é o que faz o app enxergar o cookie. Só aplica no
         domínio real; em localhost/preview fica um cookie do próprio host, para
         não ser recusado pelo navegador. */
      if (/(^|\.)statshub\.com\.br$/.test(location.hostname)) {
        attrs += "; domain=.statshub.com.br";
      }
      if (location.protocol === "https:") attrs += "; Secure";
      document.cookie = COOKIE + "=" + encodeURIComponent(valor) + attrs;
    }

    /* 1. code da URL ---------------------------------------------------- */
    var daUrl = "";
    try {
      daUrl = (new URLSearchParams(location.search).get("code") || "").trim();
    } catch (e) {
      daUrl = "";
    }
    if (daUrl && !VALIDO.test(daUrl)) daUrl = "";

    /* 2. grava. Só sobrescreve quando a URL traz um code novo; URL sem code
          nunca apaga um sh_ref que já exista. */
    if (daUrl) gravarCookie(daUrl);

    /* 3. sem code na URL, tenta o cookie. */
    var code = daUrl || lerCookie(COOKIE);
    if (!code || !VALIDO.test(code)) return; // nada a propagar

    /* 4. devolve o href com o code, ou null se não for para mexer. */
    function comCode(href) {
      try {
        var u = new URL(href, location.href);
        if (ALVOS.indexOf(u.hostname) === -1) return null; // destino que não é alvo
        if (u.searchParams.has("code")) return null; // já tem code, respeita
        /* code em primeiro lugar, depois os parâmetros que já existiam (offer,
           utm_*, ...) na ordem original. Só para igualar ao formato canônico da
           NeonPay: code=<id>&offer=...; para um parser a ordem é indiferente. */
        var params = new URLSearchParams();
        params.set("code", code);
        u.searchParams.forEach(function (value, key) {
          params.append(key, value);
        });
        u.search = params.toString();
        return u.href;
      } catch (e) {
        return null;
      }
    }

    function reescrever(a) {
      if (!a || !a.getAttribute) return;
      var href = a.getAttribute("href");
      if (!href) return;
      var novo = comCode(href);
      if (novo && novo !== href) a.setAttribute("href", novo);
    }

    /* Passe no load: cobre os links estáticos já presentes. Redundante com o
       clique, mas ajuda em "copiar endereço do link", clique do meio, etc. */
    function passeInicial() {
      var links = document.querySelectorAll(
        'a[href*="neonpay.com.br"], a[href*="app.statshub.com.br"]',
      );
      for (var i = 0; i < links.length; i++) reescrever(links[i]);
    }
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", passeInicial);
    } else {
      passeInicial();
    }

    /* No clique (captura): reescreve o href do <a> um instante antes de o
       navegador seguir para ele. Roda antes de qualquer handler de bolha e é
       imune a re-render e ao toggle de plano. */
    function aoAtivar(ev) {
      try {
        var alvo = ev.target;
        var a = alvo && alvo.closest ? alvo.closest("a[href]") : null;
        if (a) reescrever(a);
      } catch (e) {
        /* ignora: um clique nunca pode ser barrado por causa disto */
      }
    }
    document.addEventListener("click", aoAtivar, true); // esquerdo
    document.addEventListener("auxclick", aoAtivar, true); // meio (nova aba)
    document.addEventListener(
      "keydown",
      function (ev) {
        if (ev.key === "Enter") aoAtivar(ev); // link acionado pelo teclado
      },
      true,
    );
  } catch (e) {
    /* Qualquer falha inesperada: a página continua normal, sem rastreamento. */
  }
})();
