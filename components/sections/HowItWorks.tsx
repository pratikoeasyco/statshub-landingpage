"use client";

import { useEffect, useRef, useState } from "react";
import { STEPS } from "@/lib/content";
import { onceInView } from "@/lib/observer";
import { Reveal } from "../ui/Reveal";
import { SectionHeading } from "../ui/SectionHeading";

export function HowItWorks() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [grown, setGrown] = useState(false);

  /*
    Antes a linha crescia acompanhando o scroll, o que exigia recalcular a
    posição a cada frame. Agora ela cresce uma vez, com uma transição CSS,
    quando a seção aparece. O efeito na tela é praticamente o mesmo e o custo
    para a máquina cai a zero depois de rodar.
  */
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    return onceInView(el, () => setGrown(true));
  }, []);

  return (
    <section
      id="como-funciona"
      className="relative overflow-hidden border-y border-line bg-section py-24 sm:py-32"
    >
      <div className="container-x">
        <SectionHeading
          title="Do primeiro acesso à primeira oportunidade"
          subtitle="Quatro passos. Nenhuma configuração complicada, nenhuma curva de aprendizado."
        />

        <div ref={trackRef} className="relative mt-20">
          {/* Trilho vertical (mobile/tablet) */}
          <div className="absolute left-[27px] top-2 h-[calc(100%-16px)] w-[2px] rounded-full bg-line lg:hidden">
            <div
              className="h-full w-full origin-top rounded-full bg-gradient-to-b from-brand to-brand/50 transition-transform duration-[1600ms] ease-smooth"
              style={{ transform: `scaleY(${grown ? 1 : 0})` }}
            />
          </div>

          {/* Trilho horizontal (desktop), com o ponto de luz na ponta */}
          <div className="absolute left-0 top-[27px] hidden h-[2px] w-full rounded-full bg-line lg:block">
            <div
              className="h-full w-full origin-left rounded-full bg-gradient-to-r from-brand to-brand/50 transition-transform duration-[1600ms] ease-smooth"
              style={{ transform: `scaleX(${grown ? 1 : 0})` }}
            />
            <span
              className="absolute top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand shadow-[0_0_20px_4px_rgba(255,106,0,.7)] transition-[left] duration-[1600ms] ease-smooth"
              style={{ left: grown ? "100%" : "0%" }}
            />
          </div>

          <ol className="grid gap-10 lg:grid-cols-4 lg:gap-6">
            {STEPS.map((step, i) => {
              const Icon = step.icon;

              return (
                <Reveal
                  key={step.number}
                  as="li"
                  delay={i * 120}
                  className="relative pl-[68px] lg:pl-0"
                >
                  {/* Marcador */}
                  <span className="absolute left-0 top-0 grid h-14 w-14 place-items-center rounded-2xl border border-line bg-card text-brand shadow-card lg:relative lg:mb-7">
                    <Icon size={20} />
                    <i className="absolute -right-1.5 -top-1.5 grid h-6 w-6 place-items-center rounded-lg bg-brand text-[10px] font-bold not-italic text-white shadow-[0_6px_16px_-6px_rgba(255,106,0,.9)]">
                      {step.number}
                    </i>
                  </span>

                  <h3 className="text-[17px] font-semibold tracking-tight text-white lg:mt-0">
                    {step.title}
                  </h3>
                  <p className="mt-2 max-w-xs text-[14px] leading-relaxed text-muted">
                    {step.description}
                  </p>
                </Reveal>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
