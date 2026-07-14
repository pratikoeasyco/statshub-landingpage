"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { STEPS } from "@/lib/content";
import { fadeUp, viewportSoft } from "@/lib/motion";
import { SectionHeading } from "../ui/SectionHeading";

export function HowItWorks() {
  const trackRef = useRef<HTMLDivElement>(null);

  /* A linha cresce conforme a seção atravessa a viewport. */
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start 0.85", "end 0.55"],
  });
  const progress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 24,
    restDelta: 0.001,
  });
  const glowX = useTransform(progress, (v) => `${v * 100}%`);

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
            <motion.div
              className="h-full w-full origin-top rounded-full bg-gradient-to-b from-brand to-brand/50"
              style={{ scaleY: progress }}
            />
          </div>

          {/* Trilho horizontal (desktop), com o ponto de luz na ponta */}
          <div className="absolute left-0 top-[27px] hidden h-[2px] w-full rounded-full bg-line lg:block">
            <motion.div
              className="h-full w-full origin-left rounded-full bg-gradient-to-r from-brand to-brand/50"
              style={{ scaleX: progress }}
            />
            <motion.span
              className="absolute top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand shadow-[0_0_20px_4px_rgba(255,106,0,.7)]"
              style={{ left: glowX }}
            />
          </div>

          <ol className="grid gap-10 lg:grid-cols-4 lg:gap-6">
            {STEPS.map((step, i) => {
              const Icon = step.icon;

              return (
                <motion.li
                  key={step.number}
                  variants={fadeUp}
                  custom={i}
                  initial="hidden"
                  whileInView="show"
                  viewport={viewportSoft}
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
                </motion.li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
