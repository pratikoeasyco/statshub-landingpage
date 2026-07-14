"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { fadeUp, viewportSoft } from "@/lib/motion";

type Props = {
  title: ReactNode;
  subtitle?: ReactNode;
  align?: "center" | "left";
  className?: string;
};

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
      <motion.h2
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={viewportSoft}
        className={`text-gradient max-w-3xl text-balance text-3xl font-semibold leading-[1.12] tracking-[-0.03em] sm:text-4xl lg:text-[46px] ${
          isCenter ? "mx-auto" : ""
        }`}
      >
        {title}
      </motion.h2>

      {subtitle && (
        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={viewportSoft}
          custom={0.8}
          className={`mt-5 max-w-2xl text-pretty text-[16px] leading-relaxed text-muted sm:text-[17px] ${
            isCenter ? "mx-auto" : ""
          }`}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}
