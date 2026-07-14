import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

type Props = {
  title: ReactNode;
  subtitle?: ReactNode;
  align?: "center" | "left";
  className?: string;
};

/** Server Component: só o <Reveal> em volta é que roda no navegador. */
export function SectionHeading({
  title,
  subtitle,
  align = "center",
  className = "",
}: Props) {
  const isCenter = align === "center";

  return (
    <div
      className={`flex flex-col ${
        isCenter ? "items-center text-center" : "items-start text-left"
      } ${className}`}
    >
      <Reveal
        as="h2"
        className={`text-gradient max-w-3xl text-balance text-3xl font-semibold leading-[1.12] tracking-[-0.03em] sm:text-4xl lg:text-[46px] ${
          isCenter ? "mx-auto" : ""
        }`}
      >
        {title}
      </Reveal>

      {subtitle && (
        <Reveal
          as="p"
          delay={80}
          className={`mt-5 max-w-2xl text-pretty text-[16px] leading-relaxed text-muted sm:text-[17px] ${
            isCenter ? "mx-auto" : ""
          }`}
        >
          {subtitle}
        </Reveal>
      )}
    </div>
  );
}
