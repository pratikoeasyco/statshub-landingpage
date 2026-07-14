"use client";

import { createContext, useContext, type ReactNode } from "react";
import type { Asset, ShotMap } from "@/lib/assets";

type Assets = {
  /** public/logo.png, se ausente, usa a marca desenhada em código. */
  logo: Asset | null;
  /** public/screenshots/*, cada um substitui o mockup do módulo. */
  screenshots: ShotMap;
};

const AssetsContext = createContext<Assets>({ logo: null, screenshots: {} });

export const useLogo = () => useContext(AssetsContext).logo;
export const useScreenshots = () => useContext(AssetsContext).screenshots;

export function AssetsProvider({
  value,
  children,
}: {
  value: Assets;
  children: ReactNode;
}) {
  return (
    <AssetsContext.Provider value={value}>{children}</AssetsContext.Provider>
  );
}
