"use client";

import { useLayoutEffect, useRef, useState, type ReactNode } from "react";

type Props = {
  /** Largura em que o mockup foi desenhado. */
  designWidth: number;
  /** Altura de projeto. Também serve de hint de aspect-ratio (evita CLS). */
  designHeight: number;
  /**
   * `true` quando o mockup não tem altura fixa (ex.: o card do scanner):
   * a altura real é medida e o container se ajusta a ela.
   */
  fluid?: boolean;
  children: ReactNode;
  className?: string;
};

/**
 * Renderiza um layout de largura fixa (a UI real da plataforma) e o escala para
 * caber no container, preservando a proporção. É assim que temos um "print"
 * nítido em qualquer resolução, sem depender de imagens rasterizadas.
 */
export function FitScale({
  designWidth,
  designHeight,
  fluid = false,
  children,
  className = "",
}: Props) {
  const outer = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);
  const [box, setBox] = useState<{ scale: number; height: number } | null>(null);

  useLayoutEffect(() => {
    const outerEl = outer.current;
    const innerEl = inner.current;
    if (!outerEl || !innerEl) return;

    const measure = () => {
      const scale = outerEl.clientWidth / designWidth;
      // offsetHeight ignora o transform, então é a altura "de projeto".
      const height = fluid ? innerEl.offsetHeight : designHeight;
      setBox({ scale, height });
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(outerEl);
    if (fluid) ro.observe(innerEl);
    return () => ro.disconnect();
  }, [designWidth, designHeight, fluid]);

  return (
    <div
      ref={outer}
      className={`relative w-full overflow-hidden ${className}`}
      style={
        box
          ? { height: box.height * box.scale }
          : { aspectRatio: `${designWidth} / ${designHeight}` }
      }
    >
      <div
        ref={inner}
        className="absolute left-0 top-0 origin-top-left transition-opacity duration-300"
        style={{
          width: designWidth,
          height: fluid ? "auto" : designHeight,
          transform: `scale(${box?.scale ?? 1})`,
          opacity: box ? 1 : 0,
        }}
      >
        {children}
      </div>
    </div>
  );
}
