"use client";

import { useEffect, useRef, useState, type ElementType, type ReactNode } from "react";
import { onceInView } from "@/lib/observer";

type Variant = "up" | "left" | "right" | "scale" | "fade";

type Props = {
  children: ReactNode;
  /** Direção da entrada. */
  variant?: Variant;
  /** Atraso em ms (usado para escalonar cards de um grid). */
  delay?: number;
  className?: string;
  as?: ElementType;
};

/**
 * Anima a entrada do conteúdo quando ele aparece na tela.
 *
 * Todo o movimento é CSS (classes `.rv` no globals.css). Este componente só
 * troca uma classe, uma vez. É o que substituiu o Framer Motion: o resultado
 * na tela é o mesmo, mas sem 52 KB de biblioteca nem trabalho de hidratação.
 */
export function Reveal({
  children,
  variant = "up",
  delay = 0,
  className = "",
  as: Tag = "div",
}: Props) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    return onceInView(el, () => setVisible(true));
  }, []);

  return (
    <Tag
      ref={ref}
      className={`rv rv-${variant} ${visible ? "is-in" : ""} ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  );
}
