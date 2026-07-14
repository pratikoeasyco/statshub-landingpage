import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  /** Rótulo mostrado na barra de endereço. */
  url?: string;
  className?: string;
  /** Esconde a barra de janela (usado no card portrait do scanner). */
  bare?: boolean;
};

/**
 * Moldura de janela em volta dos mockups. Dá contexto de "produto real"
 * e mantém o raio de 24px pedido no design system.
 */
export function BrowserFrame({
  children,
  url = "app.statshub.com.br",
  className = "",
  bare = false,
}: Props) {
  return (
    <div
      className={`overflow-hidden rounded-3xl border border-line bg-section shadow-card ${className}`}
    >
      {!bare && (
        <div className="flex h-10 items-center gap-3 border-b border-line bg-[#161616] px-4">
          <div className="flex gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-[#3A3A3A]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#3A3A3A]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#3A3A3A]" />
          </div>
          <div className="mx-auto flex h-6 w-full max-w-[280px] items-center justify-center gap-1.5 rounded-md border border-line/80 bg-[#111111] px-3">
            <span className="h-1.5 w-1.5 rounded-full bg-ok" />
            <span className="truncate text-[10px] font-medium text-[#7A7A7A]">
              {url}
            </span>
          </div>
        </div>
      )}
      <div className="bg-background">{children}</div>
    </div>
  );
}
