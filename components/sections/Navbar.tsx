"use client";

import { useEffect, useState } from "react";
import { LogIn } from "lucide-react";
import { CTA_TARGET, LOGIN_URL, NAV_LINKS } from "@/lib/content";
import { Button } from "../ui/Button";
import { Logo } from "../ui/Logo";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    /*
      Listener passivo e barato: só compara um número e, no máximo, troca um
      booleano. Não lê layout (nada de getBoundingClientRect), então não força
      recálculo de estilo a cada scroll.
    */
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`animate-drop fixed inset-x-0 top-0 z-50 h-[72px] transition-[background-color,border-color,backdrop-filter] duration-500 ease-smooth ${
        scrolled
          ? "border-b border-line/80 bg-background/70 backdrop-blur-xl backdrop-saturate-150"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <nav className="container-x flex h-full items-center justify-between gap-3">
        {/* `shrink-0`: sem isso o flex esprememe a <img> e distorce a marca. */}
        <a href="#top" aria-label="StatsHub, ir para o início" className="shrink-0">
          <Logo className="h-6 sm:h-9" />
        </a>

        {/* Os links de seção só cabem no desktop. */}
        <ul className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="group relative block rounded-full px-4 py-2 text-sm font-medium text-muted transition-colors duration-300 hover:text-white"
              >
                {link.label}
                <span className="absolute inset-x-4 -bottom-0.5 h-px scale-x-0 bg-gradient-to-r from-transparent via-brand to-transparent transition-transform duration-300 ease-smooth group-hover:scale-x-100" />
              </a>
            </li>
          ))}
        </ul>

        {/*
          Os dois botões ficam visíveis em qualquer tela, inclusive no mobile.
          No mobile eles encolhem e o rótulo do CTA fica mais curto, senão não
          caberiam ao lado da logo.
        */}
        <div className="flex shrink-0 items-center gap-2">
          <Button
            href={LOGIN_URL}
            variant="secondary"
            size="sm"
            className="px-3 sm:h-11 sm:px-5 sm:text-sm"
          >
            <LogIn size={15} className="hidden sm:block" />
            Entrar
          </Button>

          <Button href={CTA_TARGET} size="sm" className="sm:h-11 sm:px-5 sm:text-sm">
            <span className="sm:hidden">Começar</span>
            <span className="hidden sm:inline">Começar Agora</span>
          </Button>
        </div>
      </nav>
    </header>
  );
}
