import type { Variants, Transition } from "framer-motion";

/** Curva base, mesma sensação de "ease-out premium" usada em SaaS modernos. */
export const EASE = [0.22, 1, 0.36, 1] as const;

export const transition = (delay = 0, duration = 0.7): Transition => ({
  duration,
  delay,
  ease: EASE,
});

/** Quando o elemento entra em cena. Roda uma única vez. */
export const viewport = { once: true, amount: 0.25 } as const;
export const viewportSoft = { once: true, amount: 0.15 } as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: transition(i * 0.08),
  }),
};

export const fade: Variants = {
  hidden: { opacity: 0 },
  show: (i: number = 0) => ({ opacity: 1, transition: transition(i * 0.08, 0.9) }),
};

export const fadeScale: Variants = {
  hidden: { opacity: 0, scale: 0.94, y: 24 },
  show: (i: number = 0) => ({
    opacity: 1,
    scale: 1,
    y: 0,
    transition: transition(i * 0.08, 0.9),
  }),
};

export const slideLeft: Variants = {
  hidden: { opacity: 0, x: -56 },
  show: (i: number = 0) => ({ opacity: 1, x: 0, transition: transition(i * 0.08, 0.85) }),
};

export const slideRight: Variants = {
  hidden: { opacity: 0, x: 56 },
  show: (i: number = 0) => ({ opacity: 1, x: 0, transition: transition(i * 0.08, 0.85) }),
};

/** Container que escalona a entrada dos filhos (cards, listas). */
export const stagger = (staggerChildren = 0.08, delayChildren = 0): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren, delayChildren } },
});

/** Hover padrão dos cards: Scale 1.03. */
export const cardHover = {
  scale: 1.03,
  transition: { duration: 0.35, ease: EASE },
} as const;
