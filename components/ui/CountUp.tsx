"use client";

import { useEffect, useRef, useState } from "react";
import { onceInView } from "@/lib/observer";

type Props = {
  to: number;
  duration?: number;
  suffix?: string;
  className?: string;
};

/** easeOutExpo, desacelera no fim, dá a sensação de "assentar" no número. */
const easeOut = (t: number) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));

export function CountUp({ to, duration = 1800, suffix = "", className }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const [value, setValue] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let frame = 0;

    const cleanup = onceInView(el, () => {
      const reduzido = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduzido) {
        setValue(to);
        return;
      }

      const start = performance.now();

      const tick = (now: number) => {
        const progress = Math.min((now - start) / duration, 1);
        setValue(Math.round(easeOut(progress) * to));
        if (progress < 1) frame = requestAnimationFrame(tick);
      };

      frame = requestAnimationFrame(tick);
    });

    return () => {
      cleanup();
      cancelAnimationFrame(frame);
    };
  }, [to, duration]);

  return (
    <span ref={ref} className={className}>
      {value.toLocaleString("pt-BR")}
      {suffix}
    </span>
  );
}
