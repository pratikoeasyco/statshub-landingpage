"use client";

import Image from "next/image";
import dynamic from "next/dynamic";
import type { ComponentType } from "react";
import { MODULES, type ModuleId } from "@/lib/content";
import { BrowserFrame } from "./BrowserFrame";
import { FitScale } from "./FitScale";
import { useScreenshots } from "./AssetsProvider";

/*
  Os mockups desenhados em código só entram em cena se faltar o print real de
  algum módulo. Como hoje os 5 prints existem, eles nunca renderizam.

  Por isso são carregados sob demanda (`next/dynamic`): o código deles vai para
  um chunk separado que o navegador simplesmente nunca baixa. Antes, sendo
  import normal, essas 5 telas viajavam no bundle principal sem nunca aparecer.
*/
const lazyMock = (load: () => Promise<{ default: ComponentType }>) =>
  dynamic(load, { ssr: false });

const FULL: Record<ModuleId, ComponentType> = {
  jogos: lazyMock(() => import("../mockups/MockJogos").then((m) => ({ default: m.MockJogos }))),
  scanner: lazyMock(() => import("../mockups/MockScanner").then((m) => ({ default: m.MockScanner }))),
  robos: lazyMock(() => import("../mockups/MockRobos").then((m) => ({ default: m.MockRobos }))),
  james: lazyMock(() => import("../mockups/MockJames").then((m) => ({ default: m.MockJames }))),
  zeus: lazyMock(() => import("../mockups/MockZeus").then((m) => ({ default: m.MockZeus }))),
};

const COMPACT: Record<ModuleId, ComponentType> = {
  jogos: lazyMock(() => import("../mockups/MockJogos").then((m) => ({ default: m.MockJogosCompact }))),
  scanner: lazyMock(() => import("../mockups/MockScanner").then((m) => ({ default: m.MockScanner }))),
  robos: lazyMock(() => import("../mockups/MockRobos").then((m) => ({ default: m.MockRobosCompact }))),
  james: lazyMock(() => import("../mockups/MockJames").then((m) => ({ default: m.MockJamesCompact }))),
  zeus: lazyMock(() => import("../mockups/MockZeus").then((m) => ({ default: m.MockZeusCompact }))),
};

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

type Props = {
  module: ModuleId;
  /** Aura laranja atrás do mockup. */
  glow?: boolean;
  /** Flutuação contínua (usada no hero). */
  float?: boolean;
  /** Prioriza o carregamento (apenas a imagem do hero). */
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
    <FitScale designWidth={w} designHeight={h} fluid>
      <Full />
    </FitScale>
  ) : (
    <>
      <div className="hidden md:block">
        <FitScale designWidth={w} designHeight={h}>
          <Full />
        </FitScale>
      </div>
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
      {/* A flutuação é uma keyframe CSS: roda no compositor, fora da thread principal. */}
      <div className={`relative ${float ? "animate-float" : ""}`}>{framed}</div>
    </div>
  );
}
