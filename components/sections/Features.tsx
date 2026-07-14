"use client";

import { motion } from "framer-motion";
import { FEATURES } from "@/lib/content";
import { cardHover, fadeUp, viewportSoft } from "@/lib/motion";
import { SectionHeading } from "../ui/SectionHeading";

export function Features() {
  return (
    <section id="recursos" className="relative py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-px bg-gradient-to-r from-transparent via-line to-transparent" />

      <div className="container-x">
        <SectionHeading
          title="Tudo que você precisa em uma única plataforma"
          subtitle="Estatísticas, scanner ao vivo, robôs de alerta e montagem de bilhete. Você abre a StatsHub e já tem tudo pronto para analisar."
        />

        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((feature, i) => {
            const Icon = feature.icon;

            return (
              <motion.article
                key={feature.title}
                variants={fadeUp}
                custom={i % 4}
                initial="hidden"
                whileInView="show"
                viewport={viewportSoft}
                whileHover={cardHover}
                className="surface surface-hairline group relative overflow-hidden p-6 transition-colors duration-300 hover:border-brand/35"
              >
                {/* Brilho que segue o hover */}
                <span className="pointer-events-none absolute -inset-px -z-10 rounded-2xl bg-gradient-to-b from-brand/[0.10] to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                <span className="grid h-11 w-11 place-items-center rounded-xl border border-line bg-[#1A1A1A] text-brand transition-all duration-300 group-hover:border-brand/40 group-hover:bg-brand/10 group-hover:shadow-[0_0_24px_-6px_rgba(255,106,0,.6)]">
                  <Icon size={19} />
                </span>

                <h3 className="mt-5 text-[16px] font-semibold tracking-tight text-white">
                  {feature.title}
                </h3>
                <p className="mt-2 text-[13.5px] leading-relaxed text-muted">
                  {feature.description}
                </p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
