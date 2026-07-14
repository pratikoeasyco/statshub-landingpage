import { Quote, Star } from "lucide-react";
import { TESTIMONIALS } from "@/lib/content";
import { Reveal } from "../ui/Reveal";
import { SectionHeading } from "../ui/SectionHeading";

export function Testimonials() {
  return (
    <section className="relative py-24 sm:py-32">
      <div className="container-x">
        <SectionHeading
          title="Feedback de quem usa de verdade"
          subtitle="Apostadores que utilizam a StatsHub no dia a dia e contaram o que mudou na análise deles."
        />

        <div className="mt-16 grid gap-5 md:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <Reveal
              key={t.name}
              as="figure"
              delay={(i % 3) * 80}
              className="surface surface-hairline group relative flex flex-col p-6 transition-[transform,border-color] duration-300 hover:scale-[1.03] hover:border-brand/35"
            >
              <span className="pointer-events-none absolute -inset-px -z-10 rounded-2xl bg-gradient-to-b from-brand/[0.08] to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

              <Quote
                size={26}
                className="text-brand/30 transition-colors duration-300 group-hover:text-brand/60"
                fill="currentColor"
              />

              <blockquote className="mt-4 flex-1 text-pretty text-[14.5px] leading-relaxed text-white/85">
                “{t.text}”
              </blockquote>

              <div className="mt-6 flex items-center gap-3 border-t border-line pt-5">
                {/* Avatar com iniciais, sem foto de banco de imagem */}
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-brand-gradient text-[14px] font-bold text-white shadow-[0_3px_10px_-4px_rgba(255,106,0,.9)]">
                  {t.initials}
                </span>

                <figcaption className="min-w-0 flex-1 truncate text-[14px] font-semibold text-white">
                  {t.name}
                </figcaption>

                <div className="flex gap-0.5" aria-label={`Avaliação ${t.rating} de 5`}>
                  {Array.from({ length: t.rating }).map((_, s) => (
                    <Star key={s} size={12} className="text-brand" fill="currentColor" />
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
