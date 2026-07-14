import { Headset } from "lucide-react";
import { SUPPORT_URL } from "@/lib/content";

/**
 * Botão discreto de suporte, fixo no canto inferior direito.
 * Fica só o ícone e, no hover, o rótulo "Suporte" desliza para fora.
 *
 * Server Component: a entrada e o hover são CSS, então não vai um byte de JS.
 */
export function SupportButton() {
  return (
    <a
      href={SUPPORT_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar com o suporte no Telegram"
      className="group fixed bottom-5 right-5 z-40 flex h-11 animate-rise items-center overflow-hidden rounded-full border border-line bg-card/90 px-3 text-white shadow-[0_10px_30px_-10px_rgba(0,0,0,.8)] backdrop-blur transition-[transform,background-color,border-color] duration-300 ease-smooth hover:scale-105 hover:border-brand/50 hover:bg-brand sm:bottom-7 sm:right-7"
    >
      <Headset size={18} className="shrink-0 text-brand group-hover:text-white" />

      {/* Some por padrão; abre no hover. */}
      <span className="max-w-0 whitespace-nowrap text-[14px] font-semibold opacity-0 transition-all duration-300 ease-smooth group-hover:ml-2 group-hover:max-w-[90px] group-hover:opacity-100">
        Suporte
      </span>
    </a>
  );
}
