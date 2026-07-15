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
  /*  4. "Como funciona": o trilho preenche conforme a seção passa       */
  /* ------------------------------------------------------------------ */
  /*
    Antes o trilho crescia de uma vez só, assim que a seção aparecia, e não
    tinha nada a ver com a rolagem. Agora ele acompanha o dedo: o CSS lê uma
    variável `--p` (0 a 1) e deriva dela o trilho, a bolinha e os passos que
    acendem.

    Este é o único código da página que roda durante a rolagem, então ele é
    caro de errar. Três cuidados:

      - o listener só existe enquanto a seção está na tela (o observer liga e
        desliga). Fora dela, custo zero;
      - um frame por vez (`travado`), senão o Safari dispara scroll dezenas de
        vezes entre dois frames e o trabalho é jogado fora;
      - o CSS só recebe `transform` e `opacity`. Nada aqui força layout.
  */
  var trilho = document.querySelector(".steps-wrap");

  if (trilho && temIO) {
    var passos = trilho.querySelectorAll(".step");
    var trilhoH = trilho.querySelector(".rail-h");
    var travado = false;
    var anterior = -1;

    /* A largura do trilho só muda quando a janela muda: medir uma vez, e não
       a cada frame. Ler layout durante a rolagem é o que trava o iPhone. */
    function medirLargura() {
      if (trilhoH) {
        trilho.style.setProperty("--w", trilhoH.offsetWidth + "px");
      }
    }

    function atualizar() {
      travado = false;

      var r = trilho.getBoundingClientRect();
      var altura = window.innerHeight;

      /* Começa a preencher quando o topo da seção sobe além de 85% da tela, e
         termina quando o rodapé dela chega à metade. */
      var inicio = altura * 0.85;
      var curso = inicio - altura * 0.5 + r.height;
      var p = (inicio - r.top) / curso;

      p = p < 0 ? 0 : p > 1 ? 1 : p;

      /* Nada mudou o bastante para valer um repaint. */
      if (Math.abs(p - anterior) < 0.004) return;
      anterior = p;

      trilho.style.setProperty("--p", p.toFixed(3));

      for (var i = 0; i < passos.length; i++) {
        /* O passo acende um pouco antes de o trilho encostar nele. */
        passos[i].classList.toggle("on", p >= (i + 0.35) / passos.length);
      }
    }

    function aoRolar() {
      if (travado) return;
      travado = true;
      requestAnimationFrame(atualizar);
    }

    if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
      /* Quem pediu menos movimento vê a seção pronta, acesa, sem animação. */
      trilho.style.setProperty("--p", "1");
      for (var n = 0; n < passos.length; n++) passos[n].classList.add("on");
    } else {
      new IntersectionObserver(function (e) {
        if (e[0].isIntersecting) {
          medirLargura();
          window.addEventListener("scroll", aoRolar, { passive: true });
          atualizar();
        } else {
          window.removeEventListener("scroll", aoRolar);
        }
      }).observe(trilho);

      window.addEventListener("resize", medirLargura, { passive: true });
    }
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

  /* ------------------------------------------------------------------ */
  /*  8. Relógio real do mockup de iPhone                                */
  /* ------------------------------------------------------------------ */
  /*
    A hora e a data na tela de bloqueio são as de verdade, em pt-BR, e vão se
    atualizando sozinhas. Acordo uma vez por segundo, mas só escrevo no DOM
    quando o texto muda de fato (ou seja, na virada do minuto): o resto das
    batidas não custa nada.
  */
  var relogios = document.querySelectorAll("[data-clock]");

  if (relogios.length) {
    var tique = function () {
      var agora = new Date();
      var hora = agora.toLocaleTimeString("pt-BR", {
        hour: "2-digit",
        minute: "2-digit",
      });
      var data = agora.toLocaleDateString("pt-BR", {
        weekday: "long",
        day: "numeric",
        month: "long",
      });

      for (var i = 0; i < relogios.length; i++) {
        var el = relogios[i];
        var novo = el.getAttribute("data-clock") === "time" ? hora : data;
        if (el.textContent !== novo) el.textContent = novo;
      }
    };

    tique();
    setInterval(tique, 1000);
  }

  /* ------------------------------------------------------------------ */
  /*  9. Liga as animações do iPhone só quando ele está na tela          */
  /* ------------------------------------------------------------------ */
  /*
    O feed subindo, o robô balançando e o telefone flutuando nascem pausados
    no CSS. A classe `live` é que os solta, e ela só entra enquanto o telefone
    está visível. Fora da tela, nenhuma animação roda: é o que evita gastar GPU
    e bateria à toa e, no iPhone, manter a rolagem leve.
  */
  var cenas = document.querySelectorAll(".phone-scene, .phone-mini");

  if (cenas.length) {
    if (!temIO) {
      for (var c = 0; c < cenas.length; c++) cenas[c].classList.add("live");
    } else {
      var obsFone = new IntersectionObserver(
        function (entradas) {
          for (var i = 0; i < entradas.length; i++) {
            entradas[i].target.classList.toggle(
              "live",
              entradas[i].isIntersecting,
            );
          }
        },
        { threshold: 0.1 },
      );
      for (var d = 0; d < cenas.length; d++) obsFone.observe(cenas[d]);
    }
  }
})();
