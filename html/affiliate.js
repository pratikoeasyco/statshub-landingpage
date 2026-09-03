/**
 * Rastreamento de afiliado — statshub.com.br (página de vendas).
 *
 * Substitui a versão da NeonPay. O que mudou:
 *   - o parâmetro passou de `code` para `aff` (é o que a Kirvano lê no checkout);
 *   - `code` continua sendo LIDO, porque navegador com cookie antigo ainda vai
 *     se cadastrar dentro da janela de indicação;
 *   - o carimbo no botão só acontece com UUID da Kirvano — código velho da
 *     NeonPay não existe lá e carimbá-lo atropelaria a atribuição dela.
 *
 * A gravação que realmente dura os 60 dias é a de app.statshub.com.br/r/<uuid>,
 * feita no cabeçalho HTTP: o Safari (ITP) corta cookie escrito por JS em 7 dias.
 * O que este arquivo faz é redundância — e o carimbo do CTA, que é o que diz à
 * Kirvano quem indicou.
 */
(function () {
  var COOKIE = 'sh_ref';
  var PARAM = 'aff';
  var LEGACY_PARAM = 'code';
  var MAX_AGE = 60 * 24 * 60 * 60; // mesmo número configurado na Kirvano
  var DOMAIN = 'statshub.com.br';
  var SAFE = /^[A-Za-z0-9_-]{1,64}$/;
  var KIRVANO_AFF = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

  function clean(value) {
    if (!value) return null;
    var v = String(value).trim();
    return SAFE.test(v) ? v : null;
  }

  function fromUrl() {
    var q = new URLSearchParams(window.location.search);
    return clean(q.get(PARAM)) || clean(q.get(LEGACY_PARAM));
  }

  function fromCookie() {
    var m = document.cookie.match(new RegExp('(?:^|;\s*)' + COOKIE + '=([^;]*)'));
    if (!m) return null;
    try { return clean(decodeURIComponent(m[1])); } catch (e) { return null; }
  }

  function save(code) {
    var domain = window.location.hostname === DOMAIN || window.location.hostname.indexOf('.' + DOMAIN) > -1
      ? ';domain=.' + DOMAIN
      : '';
    var secure = window.location.protocol === 'https:' ? ';Secure' : '';
    document.cookie = COOKIE + '=' + encodeURIComponent(code) + domain +
      ';path=/;max-age=' + MAX_AGE + ';SameSite=Lax' + secure;
  }

  var code = fromUrl();
  if (code) save(code);
  code = code || fromCookie();

  /**
   * Carimba o afiliado no link do checkout.
   *
   * Nunca sobrescreve um `aff` que já está na URL: se o afiliado mandou o lead
   * direto para o checkout dele, aquela atribuição é dele e o cookie de outro
   * afiliado não pode roubá-la.
   */
  function stamp(href) {
    if (!code || !KIRVANO_AFF.test(code)) return href;
    try {
      var url = new URL(href, window.location.href);
      if (url.hostname.indexOf('kirvano.com') === -1) return href;
      if (url.searchParams.has(PARAM)) return href;
      url.searchParams.set(PARAM, code);
      return url.toString();
    } catch (e) {
      return href;
    }
  }

  /**
   * Reescreve NO CLIQUE, em fase de captura: o main.js da landing troca o href
   * do CTA quando o visitante alterna o período (mensal/trimestral/...), então
   * carimbar no load pegaria um link que deixa de existir no clique seguinte.
   */
  document.addEventListener('click', function (event) {
    var link = event.target && event.target.closest ? event.target.closest('a[href]') : null;
    if (!link) return;
    var next = stamp(link.getAttribute('href'));
    if (next !== link.getAttribute('href')) link.setAttribute('href', next);
  }, true);
})();
