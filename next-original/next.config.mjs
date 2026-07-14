import path from "node:path";

/*
  STATIC=1 gera um site 100% estático na pasta `out/`, que é o que a hospedagem
  compartilhada da Hostinger (hPanel) consegue servir: ela não roda Node.

  Sem a variável, o build fica normal (com servidor Next), para rodar em VPS,
  Vercel, etc.

  Use `npm run build:static` para gerar a pasta `out/`.
*/
const estatico = process.env.STATIC === "1";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  outputFileTracingRoot: path.resolve("."),
  compiler: { removeConsole: process.env.NODE_ENV === "production" },

  ...(estatico
    ? {
        output: "export",
        /*
          O otimizador de imagens do Next precisa de um servidor. Na exportação
          estática ele não existe, então as imagens são servidas como estão.
        */
        images: { unoptimized: true },
        /* Gera /planos/index.html em vez de /planos.html: o Apache da Hostinger
           serve isso sem precisar de regra de rewrite. */
        trailingSlash: true,
      }
    : {
        images: {
          formats: ["image/avif", "image/webp"],
          deviceSizes: [640, 750, 828, 1080, 1200, 1440, 1920, 2048],
        },
      }),
};

export default nextConfig;
