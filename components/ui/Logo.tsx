"use client";

import Image from "next/image";
import { useLogo } from "./AssetsProvider";

type Props = {
  /**
   * Altura da logo, via classe do Tailwind (ex.: `h-9 sm:h-11`).
   * `public/logo.png` está recortado justo, sem margem transparente, então
   * a altura da classe é a altura real da arte na tela.
   */
  className?: string;
};

export function Logo({ className = "h-11" }: Props) {
  const logo = useLogo();

  /* Logo real: basta salvar o arquivo em public/logo.png. */
  if (logo) {
    return (
      <Image
        src={logo.src}
        alt="StatsHub"
        width={logo.width}
        height={logo.height}
        priority
        className={`w-auto ${className}`}
      />
    );
  }

  /* Fallback desenhado em código, para o site nunca ficar sem marca. */
  return (
    <span className="inline-flex items-center gap-2.5">
      <span className="relative grid h-9 w-9 place-items-center rounded-[11px] bg-brand-gradient shadow-[0_8px_24px_-10px_rgba(255,106,0,.8)]">
        <svg width="19" height="19" viewBox="0 0 20 20" fill="none" aria-hidden="true">
          <rect x="2.5" y="11" width="3.2" height="6.5" rx="1.2" fill="#fff" />
          <rect
            x="8.4"
            y="7"
            width="3.2"
            height="10.5"
            rx="1.2"
            fill="#fff"
            fillOpacity=".92"
          />
          <rect
            x="14.3"
            y="2.5"
            width="3.2"
            height="15"
            rx="1.2"
            fill="#fff"
            fillOpacity=".78"
          />
        </svg>
      </span>

      <span className="text-[19px] font-bold tracking-[-0.02em] text-white">
        Stats<span className="text-brand">Hub</span>
      </span>
    </span>
  );
}
