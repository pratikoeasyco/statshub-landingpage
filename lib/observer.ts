/**
 * Um único IntersectionObserver para a página inteira.
 *
 * O caminho fácil seria criar um observer dentro de cada componente que anima,
 * mas a página tem umas 60 peças animadas: seriam 60 observers concorrendo.
 * Aqui existe um só, compartilhado, e cada elemento é descartado assim que
 * aparece (a animação roda uma vez).
 */

type Callback = () => void;

const callbacks = new Map<Element, Callback>();
let observer: IntersectionObserver | null = null;

function get(): IntersectionObserver {
  if (observer) return observer;

  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;

        callbacks.get(entry.target)?.();
        callbacks.delete(entry.target);
        observer?.unobserve(entry.target);
      }
    },
    { threshold: 0.15, rootMargin: "0px 0px -5% 0px" },
  );

  return observer;
}

/** Chama `onEnter` na primeira vez que o elemento aparecer. Devolve o cleanup. */
export function onceInView(el: Element, onEnter: Callback): () => void {
  /* Ambientes sem suporte (ou com JS parcial): mostra tudo, sem animar. */
  if (typeof IntersectionObserver === "undefined") {
    onEnter();
    return () => {};
  }

  callbacks.set(el, onEnter);
  get().observe(el);

  return () => {
    callbacks.delete(el);
    observer?.unobserve(el);
  };
}
