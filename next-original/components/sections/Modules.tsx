"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Check } from "lucide-react";
import { MODULES, type PlatformModule } from "@/lib/content";
import { useMediaQuery } from "@/lib/useMediaQuery";
import { PlatformShot } from "../ui/PlatformShot";
import { Reveal } from "../ui/Reveal";
import { SectionHeading } from "../ui/SectionHeading";

/** O card do scanner é portrait: precisa de menos largura para caber na coluna. */
const shotWidth = (id: PlatformModule["id"]) =>
  id === "scanner" ? "mx-auto max-w-[320px]" : "";

function Copy({ mod, compact = false }: { mod: PlatformModule; compact?: boolean }) {
  return (
    <>
      <h3
        className={`text-gradient text-balance font-semibold leading-[1.15] tracking-[-0.03em] ${
          compact ? "text-[26px]" : "text-[28px] lg:text-[36px]"
        }`}
      >
        {mod.title}
      </h3>

      <p className="mt-4 max-w-lg text-pretty text-[15px] leading-relaxed text-muted">
        {mod.description}
      </p>

      <ul className="mt-6 space-y-2.5">
        {mod.bullets.map((b) => (
          <li key={b} className="flex items-start gap-3 text-[14px] text-white/85">
            <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full border border-brand/35 bg-brand/10">
              <Check size={11} className="text-brand" strokeWidth={3} />
            </span>
            {b}
          </li>
        ))}
      </ul>
    </>
  );
}

/** Bloco de texto do desktop: avisa qual módulo está no centro da tela. */
function CopyBlock({
  mod,
  index,
  onActive,
}: {
  mod: PlatformModule;
  index: number;
  onActive: (i: number) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);

  /*
    Aqui o observer precisa disparar toda vez (para ida e volta do scroll),
    então é um observer próprio, e não o `onceInView` compartilhado.
    É o único da página com esse comportamento.
  */
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) onActive(index);
      },
      { threshold: 0.6 },
    );

    io.observe(el);
    return () => io.disconnect();
  }, [index, onActive]);

  return (
    <div ref={ref} className="flex min-h-[74vh] flex-col justify-center py-10">
      <Reveal variant="right">
        <Copy mod={mod} />
      </Reveal>
    </div>
  );
}

export function Modules() {
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const [active, setActive] = useState(0);
  const onActive = useCallback((i: number) => setActive(i), []);

  return (
    <section id="modulos" className="relative py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-x-0 top-1/4 -z-10 h-[500px] bg-radial-fade" />

      <div className="container-x">
        <SectionHeading
          title="Várias ferramentas. Uma plataforma."
          subtitle="Cada ferramenta cobre um momento diferente do seu dia. Escolher os jogos, acompanhar ao vivo, receber os alertas e fechar o bilhete."
        />

        {isDesktop ? (
          /* ---------- Desktop: mockup fixo, texto rolando ---------- */
          <div className="mt-20 grid grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] gap-16">
            <div>
              {MODULES.map((mod, i) => (
                <CopyBlock key={mod.id} mod={mod} index={i} onActive={onActive} />
              ))}
            </div>

            <div className="relative">
              <div className="sticky top-28 flex h-[640px] items-center">
                {/* Indicador de progresso dos módulos */}
                <div className="absolute -left-8 top-1/2 flex -translate-y-1/2 flex-col gap-2">
                  {MODULES.map((mod, i) => (
                    <span
                      key={mod.id}
                      className={`w-[3px] rounded-full transition-all duration-500 ease-smooth ${
                        i === active ? "h-8 bg-brand" : "h-3 bg-line"
                      }`}
                    />
                  ))}
                </div>

                {/* Altura fixa: os mockups (paisagem e retrato) se alternam
                    dentro da mesma caixa, sempre centralizados. O crossfade é
                    uma transição CSS de opacity/transform. */}
                <div className="relative h-full w-full">
                  {MODULES.map((mod, i) => (
                    <div
                      key={mod.id}
                      aria-hidden={i !== active}
                      className={`absolute inset-0 flex items-center justify-center transition-[opacity,transform,filter] duration-500 ease-smooth ${
                        i === active
                          ? "opacity-100 blur-0"
                          : "pointer-events-none scale-95 opacity-0 blur-[6px]"
                      }`}
                    >
                      <PlatformShot
                        module={mod.id}
                        className={`w-full ${shotWidth(mod.id)}`}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* ---------- Mobile / tablet: blocos empilhados ---------- */
          <div className="mt-14 space-y-20">
            {MODULES.map((mod) => (
              <Reveal key={mod.id} className="space-y-8">
                <Copy mod={mod} compact />
                <PlatformShot module={mod.id} className={shotWidth(mod.id)} />
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
