import { Navbar } from "@/components/sections/Navbar";
import { Hero } from "@/components/sections/Hero";
import { Marquee } from "@/components/sections/Marquee";
import { Features } from "@/components/sections/Features";
import { Showcase } from "@/components/sections/Showcase";
import { Modules } from "@/components/sections/Modules";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Comparison } from "@/components/sections/Comparison";
import { Testimonials } from "@/components/sections/Testimonials";
import { CtaBand } from "@/components/sections/CtaBand";
import { Pricing } from "@/components/sections/Pricing";
import { Faq } from "@/components/sections/Faq";
import { Footer } from "@/components/sections/Footer";
import { AssetsProvider } from "@/components/ui/AssetsProvider";
import { SupportButton } from "@/components/ui/SupportButton";
import { FAQS, PLANS } from "@/lib/content";
import { findLogo, findScreenshots } from "@/lib/assets";

/* ---------------------------------- SEO ---------------------------------- */

const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "StatsHub",
  applicationCategory: "SportsApplication",
  operatingSystem: "Web",
  description:
    "Plataforma profissional de análise de futebol com estatísticas avançadas, scanner ao vivo, robôs de alerta e IA.",
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    reviewCount: "312",
  },
  offers: PLANS.map((plan) => ({
    "@type": "Offer",
    name: `Plano ${plan.name}`,
    price: plan.prices.mensal.price.replace(",", "."),
    priceCurrency: "BRL",
    url: plan.prices.mensal.url,
    category: plan.name,
  })),
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: { "@type": "Answer", text: faq.answer },
  })),
};

/* ---------------------------------------------------------------------------- */

export default function Home() {
  /* Lidos da pasta public/ durante o build: se o arquivo existir, ele é usado;
     senão, o site cai na versão desenhada em código. */
  const assets = { logo: findLogo(), screenshots: findScreenshots() };

  return (
    <AssetsProvider value={assets}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <Navbar />

      <main>
        <Hero />
        <Marquee />
        <Features />
        <Showcase />
        <Modules />
        <HowItWorks />
        <Comparison />
        <Testimonials />
        <CtaBand />
        <Pricing />
        <Faq />
      </main>

      <Footer />

      {/* Fixo no canto inferior direito, em toda a página. */}
      <SupportButton />
    </AssetsProvider>
  );
}
