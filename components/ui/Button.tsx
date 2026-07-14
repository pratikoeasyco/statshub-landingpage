"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { EASE } from "@/lib/motion";

type Variant = "primary" | "secondary" | "ghost" | "light";
type Size = "sm" | "md" | "lg" | "xl";

const VARIANTS: Record<Variant, string> = {
  primary:
    "bg-brand text-white shadow-btn hover:bg-brand-hover hover:shadow-btn-hover",
  secondary:
    "border border-line bg-white/[0.04] text-white backdrop-blur hover:border-white/25 hover:bg-white/[0.08]",
  ghost: "text-muted hover:text-white",
  light:
    "bg-white text-[#111111] shadow-[0_10px_40px_-12px_rgba(0,0,0,.6)] hover:bg-white/90",
};

const SIZES: Record<Size, string> = {
  sm: "h-9 px-4 text-[13px]",
  md: "h-11 px-5 text-sm",
  lg: "h-[52px] px-7 text-[15px]",
  xl: "h-[60px] px-9 text-base sm:h-16 sm:px-12 sm:text-lg",
};

type ButtonProps = {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: Variant;
  size?: Size;
  className?: string;
  /** Aura laranja pulsante atrás do botão (usada no CTA forte). */
  glow?: boolean;
  ariaLabel?: string;
};

export function Button({
  children,
  href,
  onClick,
  variant = "primary",
  size = "md",
  className = "",
  glow = false,
  ariaLabel,
}: ButtonProps) {
  const base =
    "group relative inline-flex select-none items-center justify-center gap-2 rounded-full font-semibold tracking-tight transition-all duration-300 ease-smooth will-change-transform";

  const content = (
    <>
      {glow && (
        <span
          aria-hidden
          className="absolute -inset-3 -z-10 rounded-full bg-brand/40 opacity-60 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
        />
      )}
      {children}
    </>
  );

  const classes = `${base} ${VARIANTS[variant]} ${SIZES[size]} ${className}`;

  const motionProps = {
    whileHover: { scale: 1.03 },
    whileTap: { scale: 0.97 },
    transition: { duration: 0.25, ease: EASE },
  } as const;

  if (href) {
    /*
      Link externo (checkout, app) abre em nova aba, para o visitante não perder
      a landing. Âncora interna (#planos) continua na mesma aba: abrir uma
      âncora em aba nova só levaria de volta ao topo do site.
    */
    const external = /^https?:\/\//i.test(href);

    return (
      <motion.a
        href={href}
        onClick={onClick}
        aria-label={ariaLabel}
        className={classes}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        {...motionProps}
      >
        {content}
      </motion.a>
    );
  }

  return (
    <motion.button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel}
      className={classes}
      {...motionProps}
    >
      {content}
    </motion.button>
  );
}
