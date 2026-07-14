"use client";

import { motion } from "framer-motion";
import { Headset } from "lucide-react";
import { SUPPORT_URL } from "@/lib/content";
import { EASE } from "@/lib/motion";

/**
 * Botão discreto de suporte, fixo no canto inferior direito.
 * Fica só o ícone e, no hover, o rótulo "Suporte" desliza para fora.
 */
export function SupportButton() {
  return (
    <motion.a
      href={SUPPORT_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar com o suporte no Telegram"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: EASE, delay: 1.2 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="group fixed bottom-5 right-5 z-40 flex h-11 items-center gap-0 overflow-hidden rounded-full border border-line bg-card/90 pl-3 pr-3 text-white shadow-[0_10px_30px_-10px_rgba(0,0,0,.8)] backdrop-blur transition-colors duration-300 hover:border-brand/50 hover:bg-brand sm:bottom-7 sm:right-7"
    >
      <Headset size={18} className="shrink-0 text-brand group-hover:text-white" />

      {/* Some por padrão; abre no hover. */}
      <span className="max-w-0 whitespace-nowrap text-[14px] font-semibold opacity-0 transition-all duration-300 ease-smooth group-hover:ml-2 group-hover:max-w-[90px] group-hover:opacity-100">
        Suporte
      </span>
    </motion.a>
  );
}
