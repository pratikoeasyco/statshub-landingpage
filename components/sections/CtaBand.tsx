import { ArrowRight } from "lucide-react";
import { CTA_TARGET } from "@/lib/content";
import { Button } from "../ui/Button";
import { Reveal } from "../ui/Reveal";

export function CtaBand() {
  return (
    <section className="relative px-5 py-16 sm:py-24">
      <Reveal
        variant="scale"
        className="relative mx-auto max-w-[1200px] overflow-hidden rounded-[32px] px-6 py-16 text-center sm:px-12 sm:py-24"
      >
        {/* Gradiente laranja + textura */}
        <div className="absolute inset-0 -z-10 bg-brand-gradient" />
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(120%_120%_at_50%_0%,rgba(255,255,255,.28),transparent_55%)]" />
        <div className="absolute inset-0 -z-10 bg-grid opacity-[0.18] mix-blend-overlay" />
        <div className="absolute -bottom-24 left-1/2 -z-10 h-64 w-[70%] -translate-x-1/2 bg-[radial-gradient(closest-side,rgba(255,255,255,0.28),transparent)]" />

        <h2 className="mx-auto max-w-3xl text-balance text-[32px] font-bold leading-[1.1] tracking-[-0.035em] text-white sm:text-[44px] lg:text-[54px]">
          Pronto para elevar o nível das suas análises?
        </h2>

        <p className="mx-auto mt-5 max-w-xl text-pretty text-[15px] leading-relaxed text-white/85 sm:text-[17px]">
          Comece hoje e transforme dados em decisões. Acesso imediato, sem
          fidelidade e com todas as ferramentas liberadas.
        </p>

        <div className="mt-10">
          <Button href={CTA_TARGET} variant="light" size="xl" className="group">
            Quero Assinar Agora
            <ArrowRight
              size={20}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Button>
        </div>

        <p className="mt-6 text-[13px] font-medium text-white/75">
          Acesso liberado em menos de 1 minuto · Cancele quando quiser
        </p>
      </Reveal>
    </section>
  );
}
