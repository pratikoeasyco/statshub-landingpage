import { Check } from "lucide-react";
import { CTA_TARGET, SHOWCASE } from "@/lib/content";
import { Button } from "../ui/Button";
import { PlatformShot } from "../ui/PlatformShot";
import { Reveal } from "../ui/Reveal";

export function Showcase() {
  return (
    <section
      id="demonstracao"
      className="relative overflow-hidden border-y border-line bg-section py-24 sm:py-32"
    >
      <div className="pointer-events-none absolute -left-40 top-1/3 -z-10 h-[420px] w-[420px] bg-[radial-gradient(closest-side,rgba(255,106,0,0.11),transparent)]" />

      <div className="container-x grid items-center gap-14 lg:grid-cols-2 lg:gap-16">
        {/* Imagem entra pela esquerda */}
        <Reveal variant="left" className="order-2 lg:order-1">
          <PlatformShot module="jogos" />
        </Reveal>

        {/* Texto entra pela direita */}
        <div className="order-1 lg:order-2">
          <Reveal
            as="h2"
            variant="right"
            className="text-gradient text-balance text-3xl font-semibold leading-[1.12] tracking-[-0.03em] sm:text-4xl lg:text-[42px]"
          >
            {SHOWCASE.title}
          </Reveal>

          <Reveal
            as="p"
            variant="right"
            delay={80}
            className="mt-5 max-w-lg text-pretty text-[15px] leading-relaxed text-muted sm:text-base"
          >
            {SHOWCASE.subtitle}
          </Reveal>

          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {SHOWCASE.benefits.map((benefit, i) => (
              <Reveal
                key={benefit}
                as="li"
                delay={i * 70}
                className="flex items-center gap-3 rounded-xl border border-line bg-card px-4 py-3 transition-colors duration-300 hover:border-brand/30"
              >
                <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-brand/15">
                  <Check size={11} className="text-brand" strokeWidth={3.5} />
                </span>
                <span className="text-[14px] font-medium text-white/90">
                  {benefit}
                </span>
              </Reveal>
            ))}
          </ul>

          <Reveal delay={140} className="mt-9">
            <Button href={CTA_TARGET} size="lg">
              Conhecer os Planos
            </Button>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
