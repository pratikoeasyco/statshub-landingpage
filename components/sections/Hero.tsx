"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Check, Gift } from "lucide-react";
import { CTA_TARGET, HERO, LOGIN_URL } from "@/lib/content";
import { EASE, fadeUp, fadeScale, stagger } from "@/lib/motion";
import { Button } from "../ui/Button";
import { CountUp } from "../ui/CountUp";
import { PlatformShot } from "../ui/PlatformShot";

export function Hero() {
  const ref = useRef<HTMLElement>(null);

  /* Parallax leve: o mockup sobe mais devagar que o texto conforme rola. */
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const mockY = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, -40]);
  const opacity = useTransform(scrollYProgress, [0, 0.85], [1, 0.15]);

  return (
    <section
      ref={ref}
      id="top"
      className="relative overflow-hidden pb-20 pt-[120px] sm:pb-28 lg:pb-32 lg:pt-[164px]"
    >
      {/* Fundos decorativos */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-grid [mask-image:radial-gradient(70%_60%_at_50%_0%,#000,transparent)]" />
        <div className="absolute left-1/2 top-[-18%] h-[520px] w-[900px] -translate-x-1/2 animate-breathe rounded-full bg-brand/[0.14] blur-[130px]" />
        <div className="absolute -right-40 top-[22%] h-[400px] w-[400px] rounded-full bg-brand/[0.07] blur-[120px]" />
      </div>

      {/*
        Mobile: uma coluna só, e a ordem do DOM já é a desejada
        (título > descrição > imagem > botões > checks).
        Desktop: vira grid de 2 colunas e a imagem é reposicionada à direita,
        centralizada, ocupando as duas linhas de texto.
      */}
      <div className="container-x">
        <motion.div
          style={{ opacity }}
          className="flex flex-col lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.08fr)] lg:items-center lg:gap-x-10 lg:gap-y-0 xl:gap-x-16"
        >
          {/* Título + descrição. Centralizado no mobile, à esquerda no desktop. */}
          <motion.div
            style={{ y: textY }}
            variants={stagger(0.09)}
            initial="hidden"
            animate="show"
            className="text-center lg:col-start-1 lg:row-start-1 lg:text-left"
          >
            <motion.h1
              variants={fadeUp}
              className="text-balance text-[38px] font-semibold leading-[1.06] tracking-[-0.035em] sm:text-[52px] lg:text-[60px] xl:text-[64px]"
            >
              <span className="text-gradient">{HERO.title[0]}</span>{" "}
              <span className="text-brand-gradient">{HERO.title[1]}</span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="mx-auto mt-6 max-w-xl text-pretty text-[15px] leading-relaxed text-muted sm:text-[17px] lg:mx-0"
            >
              {HERO.subtitle}
            </motion.p>
          </motion.div>

          {/* Mockup */}
          <motion.div
            style={{ y: mockY }}
            variants={fadeScale}
            initial="hidden"
            animate="show"
            custom={2}
            className="perspective relative mt-10 lg:col-start-2 lg:row-start-1 lg:row-span-2 lg:mt-0 lg:self-center"
          >
            <motion.div
              initial={{ rotateY: 8, rotateX: 3 }}
              animate={{ rotateY: 0, rotateX: 0 }}
              transition={{ duration: 1.4, ease: EASE, delay: 0.2 }}
              className="lg:-mr-8 xl:-mr-16"
            >
              <PlatformShot module="jogos" float priority />
            </motion.div>

            {/* Reflexo suave abaixo do mockup */}
            <div className="pointer-events-none absolute inset-x-10 -bottom-6 h-14 rounded-full bg-brand/25 blur-3xl" />
          </motion.div>

          {/* Botões + teste gratuito + indicadores */}
          <motion.div
            style={{ y: textY }}
            variants={stagger(0.09, 0.2)}
            initial="hidden"
            animate="show"
            className="mt-10 lg:col-start-1 lg:row-start-2 lg:mt-9"
          >
            <motion.div
              variants={fadeUp}
              className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-center lg:justify-start"
            >
              {/* Vai para o app: é onde o teste gratuito começa. */}
              <Button href={LOGIN_URL} size="lg" glow>
                {HERO.primaryCta}
                <ArrowRight size={17} />
              </Button>
              <Button href={CTA_TARGET} variant="secondary" size="lg">
                {HERO.secondaryCta}
              </Button>
            </motion.div>

            <motion.p
              variants={fadeUp}
              className="mt-4 flex items-center justify-center gap-2 text-[13.5px] text-muted lg:justify-start"
            >
              <Gift size={15} className="shrink-0 text-brand" />
              {HERO.trialNote}
            </motion.p>

            {/*
              Sempre 2 por linha. `w-fit mx-auto` centraliza o bloco todo no
              mobile sem desalinhar o texto dentro de cada item.
            */}
            <motion.ul
              variants={fadeUp}
              className="mx-auto mt-8 grid w-fit grid-cols-2 gap-x-5 gap-y-3 sm:gap-x-6 lg:mx-0 lg:w-full"
            >
              {HERO.indicators.map((item) => (
                <li
                  key={item.label}
                  className="flex items-start gap-2.5 text-left text-[13px] text-muted sm:items-center sm:text-[14px]"
                >
                  <span className="mt-0.5 grid h-[18px] w-[18px] shrink-0 place-items-center rounded-full border border-brand/40 bg-brand/10 sm:mt-0">
                    <Check size={10} className="text-brand" strokeWidth={3} />
                  </span>
                  {"value" in item && item.value ? (
                    <span>
                      <b className="font-semibold text-white">
                        <CountUp to={item.value} suffix={item.suffix ?? ""} />
                      </b>{" "}
                      {item.label}
                    </span>
                  ) : (
                    <span>{item.label}</span>
                  )}
                </li>
              ))}
            </motion.ul>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
