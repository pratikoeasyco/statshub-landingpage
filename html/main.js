/* ==========================================================================
   StatsHub — todo o JavaScript da página.

   São ~90 linhas. A versão anterior mandava 121 KB de React para fazer isto.
   Nada aqui roda durante a rolagem: o navegador só é acordado quando um
   elemento entra na tela, e cada um é descartado logo depois.
   ========================================================================== */

(function () {
  "use strict";

  /*
    Marca o <html>. O CSS só esconde o conteúdo para animar SE esta classe
    existir. Se este arquivo falhar em carregar, a página aparece inteira, sem
    animação, em vez de ficar em branco. Numa página de vendas, isso não é
    detalhe.
  */
  document.documentElement.classList.add("js");

  var temIO = "IntersectionObserver" in window;

  /* ------------------------------------------------------------------ */
  /*  1. Entradas ao rolar                                              */
  /* ------------------------------------------------------------------ */
  /*
    Um único observer para a página inteira. Cada elemento é descartado
    assim que aparece: a animação roda uma vez e o custo vai a zero.
  */
  var alvos = document.querySelectorAll(".rv");

  if (!temIO) {
    /* Navegador antigo: mostra tudo de uma vez. */
    for (var i = 0; i < alvos.length; i++) alvos[i].classList.add("in");
  } else {
    var obsRv = new IntersectionObserver(
      function (entradas) {
        for (var j = 0; j < entradas.length; j++) {
          if (!entradas[j].isIntersecting) continue;
          entradas[j].target.classList.add("in");
          obsRv.unobserve(entradas[j].target);
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -5% 0px" },
    );
    for (var k = 0; k < alvos.length; k++) obsRv.observe(alvos[k]);
  }

  /* ------------------------------------------------------------------ */
  /*  2. Navbar: fundo sólido depois de rolar                            */
  /* ------------------------------------------------------------------ */
  /*
    Um sentinela invisível no topo. Quando ele sai da tela, a navbar ganha
    fundo. É de graça: nenhum listener de scroll rodando o tempo todo.
  */
  var nav = document.querySelector(".nav");
  var topo = document.querySelector("#sentinela");

  if (nav && topo && temIO) {
    new IntersectionObserver(function (e) {
      nav.classList.toggle("stuck", !e[0].isIntersecting);
    }).observe(topo);
  }

  /* ------------------------------------------------------------------ */
  /*  3. Contador do hero                                                */
  /* ------------------------------------------------------------------ */
  var contador = document.querySelector("[data-count]");

  if (contador && temIO) {
    new IntersectionObserver(
      function (e, obs) {
        if (!e[0].isIntersecting) return;
        obs.disconnect();

        var alvo = +contador.getAttribute("data-count");
        var reduzido = matchMedia("(prefers-reduced-motion: reduce)").matches;

        if (reduzido) {
          contador.textContent = alvo.toLocaleString("pt-BR");
          return;
        }

        var inicio = performance.now();
        var dura = 1800;

        (function passo(agora) {
          var t = Math.min((agora - inicio) / dura, 1);
          var eased = t === 1 ? 1 : 1 - Math.pow(2, -10 * t); /* easeOutExpo */
          contador.textContent = Math.round(eased * alvo).toLocaleString("pt-BR");
          if (t < 1) requestAnimationFrame(passo);
        })(inicio);
      },
      { threshold: 0.6 },
    ).observe(contador);
  }

  /* ------------------------------------------------------------------ */
  /*  4. Trilho de "Como funciona" que cresce                            */
  /* ------------------------------------------------------------------ */
  var trilho = document.querySelector(".steps-wrap");

  if (trilho && temIO) {
    new IntersectionObserver(
      function (e, obs) {
        if (!e[0].isIntersecting) return;
        trilho.classList.add("grown");
        obs.disconnect();
      },
      { threshold: 0.3 },
    ).observe(trilho);
  }

  /* ------------------------------------------------------------------ */
  /*  5. Módulos: o print fixo troca conforme o texto rola (desktop)     */
  /* ------------------------------------------------------------------ */
  var blocos = document.querySelectorAll(".mod-block");
  var telas = document.querySelectorAll(".mods-stack > div");
  var pontos = document.querySelectorAll(".mods-dots i");

  if (blocos.length && telas.length && temIO) {
    /* Este precisa disparar na ida E na volta da rolagem, então não desconecta. */
    var obsMod = new IntersectionObserver(
      function (entradas) {
        for (var i = 0; i < entradas.length; i++) {
          if (!entradas[i].isIntersecting) continue;

          var n = +entradas[i].target.getAttribute("data-mod");

          for (var j = 0; j < telas.length; j++) {
            telas[j].classList.toggle("on", j === n);
            if (pontos[j]) pontos[j].classList.toggle("on", j === n);
          }
        }
      },
      { threshold: 0.6 },
    );

    for (var m = 0; m < blocos.length; m++) obsMod.observe(blocos[m]);
  }

  /* ------------------------------------------------------------------ */
  /*  6. Planos: toggle mensal / trimestral                              */
  /* ------------------------------------------------------------------ */
  var toggle = document.querySelector(".toggle");

  if (toggle) {
    var abas = toggle.querySelectorAll("button");

    toggle.addEventListener("click", function (ev) {
      var aba = ev.target.closest("button");
      if (!aba) return;

      var periodo = aba.getAttribute("data-period");
      toggle.setAttribute("data-period", periodo); /* a pílula desliza via CSS */

      for (var i = 0; i < abas.length; i++) {
        abas[i].setAttribute(
          "aria-selected",
          abas[i] === aba ? "true" : "false",
        );
      }

      /* Troca preço, nota e link de checkout de cada plano. */
      var planos = document.querySelectorAll(".plan");
      for (var p = 0; p < planos.length; p++) {
        var plano = planos[p];
        var preco = plano.getAttribute("data-price-" + periodo).split(",");
        var caixa = plano.querySelector(".plan-price");

        plano.querySelector(".plan-int").textContent = preco[0];
        plano.querySelector(".plan-dec").textContent = "," + preco[1];
        plano.querySelector(".plan-note").textContent =
          plano.getAttribute("data-note-" + periodo);
        plano.querySelector(".plan-cta").href =
          plano.getAttribute("data-url-" + periodo);

        /* Reinicia a animação de entrada do preço. */
        caixa.classList.remove("a-rise");
        void caixa.offsetWidth; /* força o navegador a reconhecer a remoção */
        caixa.classList.add("a-rise");
      }
    });
  }

  /* ------------------------------------------------------------------ */
  /*  7. FAQ: accordion                                                  */
  /* ------------------------------------------------------------------ */
  var faq = document.querySelector(".faq");

  if (faq) {
    faq.addEventListener("click", function (ev) {
      var botao = ev.target.closest(".faq-q");
      if (!botao) return;

      /* `closest`, não `parentElement`: o pai do botão é o <h3>, não o item. */
      var item = botao.closest(".faq-item");
      var aberto = item.classList.contains("open");

      /* Fecha os outros: só um aberto por vez. */
      var todos = faq.querySelectorAll(".faq-item");
      for (var i = 0; i < todos.length; i++) {
        todos[i].classList.remove("open");
        todos[i].querySelector(".faq-q").setAttribute("aria-expanded", "false");
      }

      if (!aberto) {
        item.classList.add("open");
        botao.setAttribute("aria-expanded", "true");
      }
    });
  }
})();
