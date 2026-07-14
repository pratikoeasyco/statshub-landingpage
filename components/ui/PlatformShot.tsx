"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { ComponentType } from "react";
import { MODULES, type ModuleId } from "@/lib/content";
import { BrowserFrame } from "./BrowserFrame";
import { FitScale } from "./FitScale";
import { useScreenshots } from "./AssetsProvider";
import { MockJogos, MockJogosCompact } from "../mockups/MockJogos";
import { MockScanner } from "../mockups/MockScanner";
import { MockRobos, MockRobosCompact } from "../mockups/MockRobos";
import { MockJames, MockJamesCompact } from "../mockups/MockJames";
import { MockZeus, MockZeusCompact } from "../mockups/MockZeus";

/** Cada tela foi desenhada nestas dimensões e é escalada para caber. */
const DESIGN: Record<ModuleId, { w: number; h: number }> = {
  jogos: { w: 1120, h: 628 },
  scanner: { w: 460, h: 880 },
  robos: { w: 1120, h: 628 },
  james: { w: 1120, h: 700 },
  zeus: { w: 1120, h: 628 },
};

const URLS: Record<ModuleId, string> = {
  jogos: "app.statshub.com.br/jogos",
  scanner: "app.statshub.com.br/scanner",
  robos: "app.statshub.com.br/robos",
  james: "app.statshub.com.br/james",
  zeus: "app.statshub.com.br/zeus",
};

const FULL: Record<ModuleId, ComponentType> = {
  jogos: MockJogos,
  scanner: MockScanner,
  robos: MockRobos,
  james: MockJames,
  zeus: MockZeus,
};

const COMPACT: Record<ModuleId, ComponentType> = {
  jogos: MockJogosCompact,
  scanner: MockScanner,
  robos: MockRobosCompact,
  james: MockJamesCompact,
  zeus: MockZeusCompact,
};

type Props = {
  module: ModuleId;
  /** Aura laranja atrás do mockup. */
  glow?: boolean;
  /** Flutuação contínua (usada no hero). */
  float?: boolean;
  /** Prioriza o carregamento (apenas o mockup do hero). */
  priority?: boolean;
  className?: string;
};

export function PlatformShot({
  module,
  glow = true,
  float = false,
  priority = false,
  className = "",
}: Props) {
  /* Se existir um print real em public/screenshots, ele vence o mockup. */
  const shot = useScreenshots()[module];

  const config = MODULES.find((m) => m.id === module);
  const { w, h } = DESIGN[module];
  const Full = FULL[module];
  const Compact = COMPACT[module];

  const isScanner = module === "scanner";

  const inner = shot ? (
    <Image
      src={shot.src}
      alt={`StatsHub: ${config?.tag ?? module}`}
      width={shot.width}
      height={shot.height}
      priority={priority}
      loading={priority ? undefined : "lazy"}
      sizes="(max-width: 768px) 100vw, 60vw"
      className="h-auto w-full"
    />
  ) : isScanner ? (
    /* Card portrait: altura fluida, escalado para a largura disponível. */
    <FitScale designWidth={w} designHeight={h} fluid>
      <Full />
    </FitScale>
  ) : (
    <>
      {/* Desktop: a UI real, escalada para caber sem perder nitidez. */}
      <div className="hidden md:block">
        <FitScale designWidth={w} designHeight={h}>
          <Full />
        </FitScale>
      </div>
      {/* Mobile: recorte focado, legível em telas pequenas. */}
      <div className="md:hidden">
        <Compact />
      </div>
    </>
  );

  /* O scanner é um card, não uma página: dispensa a moldura de janela. */
  const framed = isScanner ? (
    <div className="mx-auto w-full max-w-[440px] overflow-hidden rounded-3xl">
      {inner}
    </div>
  ) : (
    <BrowserFrame url={URLS[module]}>{inner}</BrowserFrame>
  );

  return (
    <div className={`relative ${glow ? "aura" : ""} ${className}`}>
      <motion.div
        animate={float ? { y: [0, -14, 0] } : undefined}
        transition={
          float
            ? { duration: 7, repeat: Infinity, ease: "easeInOut" }
            : undefined
        }
        className="relative"
      >
        {framed}
      </motion.div>
    </div>
  );
}
