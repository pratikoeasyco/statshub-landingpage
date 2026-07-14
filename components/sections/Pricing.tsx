"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, ShieldCheck, Star, X } from "lucide-react";
import { BILLING, PLANS, PLANS_CTA, type BillingPeriod } from "@/lib/content";
import { EASE, fadeUp, viewportSoft } from "@/lib/motion";
import { Button } from "../ui/Button";
import { SectionHeading } from "../ui/SectionHeading";

export function Pricing() {
  const [period, setPeriod] = useState<BillingPeriod>("mensal");

  return (
    <section
      id="planos"
      className="relative overflow-hidden border-y border-line bg-section py-24 sm:py-32"
    >
      <div className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[500px] w-[900px] -translate-x-1/2 rounded-full bg-brand/[0.10] blur-[140px]" />

      <div className="container-x">
        <SectionHeading
          title="Escolha o plano e comece agora"
          subtitle="Os dois planos dão acesso à plataforma. O Elite libera a IA, o James, o Zeus e a criação de robôs."
        />

        {/* Toggle mensal / trimestral */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={viewportSoft}
          className="mt-12 flex flex-col items-center gap-3"
        >
          <span className="text-[13px] font-medium text-muted">
            {BILLING.label}
          </span>

          <div
            role="tablist"
            aria-label={BILLING.label}
            className="flex items-center gap-1 rounded-full border border-line bg-card p-1"
          >
            {BILLING.periods.map((p) => {
              const active = period === p.id;

              return (
                <button
                  key={p.id}
                  role="tab"
                  aria-selected={active}
                  onClick={() => setPeriod(p.id)}
                  className={`relative rounded-full px-5 py-2.5 text-[14px] font-semibold transition-colors duration-300 ${
                    active ? "text-white" : "text-muted hover:text-white"
                  }`}
                >
                  {/* A pílula laranja desliza entre as duas opções. */}
                  {active && (
                    <motion.span
                      layoutId="billing-pill"
                      transition={{ duration: 0.35, ease: EASE }}
                      className="absolute inset-0 rounded-full bg-brand shadow-btn"
                    />
                  )}

                  {/* Fica acima da pílula. */}
                  <span className="relative z-10 flex items-center gap-2">
                    {p.label}
                    {p.discount && (
                      <span
                        className={`rounded-md px-1.5 py-0.5 text-[10px] font-bold ${
                          active ? "bg-white/25 text-white" : "bg-ok/15 text-ok"
                        }`}
                      >
                        {p.discount}
                      </span>
                    )}
                  </span>
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Os dois planos */}
        <div className="mx-auto mt-14 grid max-w-4xl items-start gap-6 md:grid-cols-2">
          {PLANS.map((plan, i) => {
            const featured = plan.highlight;
            const price = plan.prices[period];

            return (
              <motion.article
                key={plan.id}
                variants={fadeUp}
                custom={i}
                initial="hidden"
                whileInView="show"
                viewport={viewportSoft}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.35 }}
                className={`group relative flex flex-col rounded-3xl border p-7 transition-colors duration-300 sm:p-8 ${
                  featured
                    ? "border-brand/50 bg-card shadow-glow-lg"
                    : "border-line bg-card/60 hover:border-white/20"
                }`}
              >
                {featured && (
                  <>
                    <span className="pointer-events-none absolute inset-0 -z-10 rounded-3xl bg-gradient-to-b from-brand/[0.12] via-transparent to-transparent" />
                    <span className="absolute -top-3.5 right-6 flex items-center gap-1.5 whitespace-nowrap rounded-full bg-brand-gradient px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.1em] text-white shadow-[0_10px_30px_-10px_rgba(255,106,0,1)]">
                      <Star size={11} fill="currentColor" />
                      {plan.badge}
                    </span>
                  </>
                )}

                <h3 className="text-[20px] font-bold tracking-tight text-white">
                  {plan.name}
                </h3>
                <p className="mt-2 min-h-[40px] text-[13.5px] leading-relaxed text-muted">
                  {plan.description}
                </p>

                {/* O preço troca junto com o toggle. */}
                <div className="mt-6">
                  <motion.div
                    key={period}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, ease: EASE }}
                  >
                    <div className="flex items-end gap-1.5">
                      <span className="pb-1.5 text-[15px] font-medium text-muted">
                        R$
                      </span>
                      <span className="text-[52px] font-bold leading-none tracking-[-0.04em] text-white">
                        {price.price.split(",")[0]}
                      </span>
                      <span className="pb-1.5 text-[18px] font-bold text-white">
                        ,{price.price.split(",")[1]}
                      </span>
                      <span className="pb-1.5 text-[15px] font-medium text-muted">
                        /mês
                      </span>
                    </div>
                    <p className="mt-2.5 text-[12.5px] text-muted">{price.note}</p>
                  </motion.div>
                </div>

                <Button
                  href={price.url}
                  variant={featured ? "primary" : "secondary"}
                  size="lg"
                  glow={featured}
                  className="mt-6 w-full"
                >
                  {PLANS_CTA}
                </Button>

                <div className="my-7 h-px bg-line" />

                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#6E6E6E]">
                  O que está incluído
                </p>

                <ul className="mt-5 flex-1 space-y-3">
                  {plan.features.map((feature) => (
                    <li
                      key={feature.label}
                      className={`flex items-start gap-3 text-[14px] ${
                        feature.included ? "text-white/85" : "text-[#6E6E6E]"
                      }`}
                    >
                      {feature.included ? (
                        <Check
                          size={16}
                          className="mt-0.5 shrink-0 text-ok"
                          strokeWidth={3}
                        />
                      ) : (
                        <X
                          size={16}
                          className="mt-0.5 shrink-0 text-danger"
                          strokeWidth={3}
                        />
                      )}
                      {feature.label}
                    </li>
                  ))}
                </ul>
              </motion.article>
            );
          })}
        </div>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={viewportSoft}
          className="mt-12 flex items-center justify-center gap-2 text-center text-[13.5px] text-muted"
        >
          <ShieldCheck size={16} className="shrink-0 text-brand" />
          Pagamento seguro · Sem fidelidade · Cancele quando quiser
        </motion.p>
      </div>
    </section>
  );
}
