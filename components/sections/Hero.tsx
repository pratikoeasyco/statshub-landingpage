import { ArrowRight, Check, Gift } from "lucide-react";
import { CTA_TARGET, HERO, LOGIN_URL } from "@/lib/content";
import { Button } from "../ui/Button";
import { CountUp } from "../ui/CountUp";
import { PlatformShot } from "../ui/PlatformShot";

/*
  Server Component. A entrada é uma keyframe CSS (`animate-*`), disparada no
  primeiro paint: nada aqui espera JavaScript.

  O parallax de scroll saiu de propósito. Ele obrigava um listener de scroll
  recalculando transforms a cada pixel rolado, bem no topo da página, que é
  justo o momento em que o navegador está ocupado desenhando o conteúdo que o
  visitante veio ver. O mockup continua flutuando (keyframe CSS, roda no
  compositor, custo zero para a thread principal).
*/
export function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden pb-20 pt-[120px] sm:pb-28 lg:pb-32 lg:pt-[164px]"
    >
      {/* Fundos decorativos */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-grid [mask-image:radial-gradient(70%_60%_at_50%_0%,#000,transparent)]" />
        <div className="absolute left-1/2 top-[-18%] h-[520px] w-[900px] -translate-x-1/2 animate-breathe bg-[radial-gradient(closest-side,rgba(255,106,0,0.20),transparent)]" />
        <div className="absolute -right-40 top-[22%] h-[400px] w-[400px] bg-[radial-gradient(closest-side,rgba(255,106,0,0.10),transparent)]" />
      </div>

      {/*
        Mobile: uma coluna só, e a ordem do DOM já é a desejada
        (título > descrição > imagem > botões > checks).
        Desktop: vira grid de 2 colunas e a imagem é reposicionada à direita.
      */}
      <div className="container-x">
        <div className="flex flex-col lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.08fr)] lg:items-center lg:gap-x-10 lg:gap-y-0 xl:gap-x-16">
          {/* Título + descrição. Centralizado no mobile, à esquerda no desktop. */}
          <div className="text-center lg:col-start-1 lg:row-start-1 lg:text-left">
            <h1 className="animate-rise text-balance text-[38px] font-semibold leading-[1.06] tracking-[-0.035em] sm:text-[52px] lg:text-[60px] xl:text-[64px]">
              <span className="text-gradient">{HERO.title[0]}</span>{" "}
              <span className="text-brand-gradient">{HERO.title[1]}</span>
            </h1>

            <p className="animate-rise mx-auto mt-6 max-w-xl text-pretty text-[15px] leading-relaxed text-muted [animation-delay:90ms] sm:text-[17px] lg:mx-0">
              {HERO.subtitle}
            </p>
          </div>

          {/* Mockup */}
          <div className="animate-pop relative mt-10 [animation-delay:180ms] lg:col-start-2 lg:row-start-1 lg:row-span-2 lg:mt-0 lg:self-center">
            <div className="lg:-mr-8 xl:-mr-16">
              <PlatformShot module="jogos" float priority />
            </div>

            {/* Reflexo suave abaixo do mockup */}
            <div className="pointer-events-none absolute inset-x-10 -bottom-8 h-20 bg-[radial-gradient(closest-side,rgba(255,106,0,0.30),transparent)]" />
          </div>

          {/* Botões + teste gratuito + indicadores */}
          <div className="mt-10 lg:col-start-1 lg:row-start-2 lg:mt-9">
            <div className="animate-rise flex flex-col gap-3 [animation-delay:180ms] sm:flex-row sm:items-center sm:justify-center lg:justify-start">
              {/* Vai para o app: é onde o teste gratuito começa. */}
              <Button href={LOGIN_URL} size="lg" glow>
                {HERO.primaryCta}
                <ArrowRight size={17} />
              </Button>
              <Button href={CTA_TARGET} variant="secondary" size="lg">
                {HERO.secondaryCta}
              </Button>
            </div>

            <p className="animate-rise mt-4 flex items-center justify-center gap-2 text-[13.5px] text-muted [animation-delay:260ms] lg:justify-start">
              <Gift size={15} className="shrink-0 text-brand" />
              {HERO.trialNote}
            </p>

            {/*
              Sempre 2 por linha. `w-fit mx-auto` centraliza o bloco todo no
              mobile sem desalinhar o texto dentro de cada item.
            */}
            <ul className="animate-rise mx-auto mt-8 grid w-fit grid-cols-2 gap-x-5 gap-y-3 [animation-delay:340ms] sm:gap-x-6 lg:mx-0 lg:w-full">
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
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
