"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { CTA_TARGET, FAQS } from "@/lib/content";
import { Button } from "../ui/Button";
import { Reveal } from "../ui/Reveal";
import { SectionHeading } from "../ui/SectionHeading";

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="relative py-24 sm:py-32">
      <div className="container-x">
        <SectionHeading
          title="Perguntas frequentes"
          subtitle="Se ficar qualquer dúvida, é só falar com a gente. Respondemos rápido."
        />

        <div className="mx-auto mt-14 max-w-3xl space-y-3">
          {FAQS.map((faq, i) => {
            const isOpen = open === i;
            const panelId = `faq-panel-${i}`;
            const buttonId = `faq-button-${i}`;

            return (
              <Reveal
                key={faq.question}
                delay={i * 60}
                className={`overflow-hidden rounded-2xl border bg-card transition-colors duration-300 ${
                  isOpen ? "border-brand/35" : "border-line hover:border-white/20"
                }`}
              >
                <h3>
                  <button
                    id={buttonId}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left sm:px-6"
                  >
                    <span className="text-[15px] font-semibold tracking-tight text-white sm:text-[16.5px]">
                      {faq.question}
                    </span>

                    <span
                      className={`grid h-8 w-8 shrink-0 place-items-center rounded-full border transition-all duration-300 ease-smooth ${
                        isOpen
                          ? "rotate-45 border-brand bg-brand text-white"
                          : "border-line bg-[#1A1A1A] text-muted"
                      }`}
                    >
                      <Plus size={15} strokeWidth={2.5} />
                    </span>
                  </button>
                </h3>

                {/*
                  Truque do grid: animar de `0fr` para `1fr` faz a altura crescer
                  suavemente sem que ninguém precise medir nada em JavaScript.
                  Era para isso que servia o AnimatePresence do Framer Motion.
                */}
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  className="grid transition-[grid-template-rows,opacity] duration-400 ease-smooth"
                  style={{
                    gridTemplateRows: isOpen ? "1fr" : "0fr",
                    opacity: isOpen ? 1 : 0,
                  }}
                >
                  <div className="overflow-hidden">
                    <p className="px-5 pb-5 text-pretty text-[14.5px] leading-relaxed text-muted sm:px-6 sm:pb-6">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>

        <Reveal className="mt-14 flex flex-col items-center gap-5 text-center">
          <p className="text-[15px] text-muted">
            Ainda com dúvida? Comece pelo plano que faz sentido para você.
          </p>
          <Button href={CTA_TARGET} size="lg" glow>
            Começar Agora
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
