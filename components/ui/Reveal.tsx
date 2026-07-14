"use client";

import { motion, type Variants } from "framer-motion";
import type { ElementType, ReactNode } from "react";
import { fadeUp, viewportSoft } from "@/lib/motion";

type RevealProps = {
  children: ReactNode;
  /** Variante de entrada. Padrão: fadeUp. */
  variants?: Variants;
  /** Índice usado para o delay progressivo (stagger manual). */
  index?: number;
  className?: string;
  as?: ElementType;
  /** Fração do elemento visível para disparar. */
  amount?: number;
};

/**
 * Scroll reveal baseado em Intersection Observer (via Framer `whileInView`).
 * Dispara uma única vez, quando o elemento entra na viewport.
 */
export function Reveal({
  children,
  variants = fadeUp,
  index = 0,
  className,
  as = "div",
  amount,
}: RevealProps) {
  const MotionTag = motion[as as keyof typeof motion] as typeof motion.div;

  return (
    <MotionTag
      className={className}
      variants={variants}
      custom={index}
      initial="hidden"
      whileInView="show"
      viewport={amount ? { once: true, amount } : viewportSoft}
    >
      {children}
    </MotionTag>
  );
}
