import fs from "node:fs";
import path from "node:path";
import type { ModuleId } from "./content";

/**
 * Detecção automática dos arquivos que você coloca em `public/`.
 *
 * Nada aqui exige editar componente: o build lê a pasta, descobre as dimensões
 * de cada imagem e o site passa a usar o arquivo real. Se o arquivo não existir,
 * cai no fallback desenhado em código, nunca fica quebrado.
 */

const PUBLIC = path.join(process.cwd(), "public");

export type Asset = { src: string; width: number; height: number };

/* -------------------------------------------------------------------------- */
/*  Leitura de dimensões (sem dependência externa)                             */
/* -------------------------------------------------------------------------- */

function readSize(file: string): { width: number; height: number } | null {
  const buf = fs.readFileSync(file);

  /* SVG, não tem pixels; devolve um tamanho nominal (a exibição usa CSS). */
  if (file.endsWith(".svg")) {
    const text = buf.toString("utf8", 0, 2000);
    const w = text.match(/width="([\d.]+)/)?.[1];
    const h = text.match(/height="([\d.]+)/)?.[1];
    const box = text.match(/viewBox="[\d.\s-]*?([\d.]+)\s+([\d.]+)"/);
    if (w && h) return { width: Math.round(+w), height: Math.round(+h) };
    if (box) return { width: Math.round(+box[1]), height: Math.round(+box[2]) };
    return { width: 512, height: 512 };
  }

  /* PNG, bloco IHDR a partir do byte 12. */
  if (buf.length > 24 && buf.toString("ascii", 12, 16) === "IHDR") {
    return { width: buf.readUInt32BE(16), height: buf.readUInt32BE(20) };
  }

  /* WebP, RIFF….WEBP + variante VP8X / VP8 / VP8L. */
  if (
    buf.length > 30 &&
    buf.toString("ascii", 0, 4) === "RIFF" &&
    buf.toString("ascii", 8, 12) === "WEBP"
  ) {
    const format = buf.toString("ascii", 12, 16);

    if (format === "VP8X") {
      return {
        width: 1 + buf.readUIntLE(24, 3),
        height: 1 + buf.readUIntLE(27, 3),
      };
    }
    if (format === "VP8 ") {
      return {
        width: buf.readUInt16LE(26) & 0x3fff,
        height: buf.readUInt16LE(28) & 0x3fff,
      };
    }
    if (format === "VP8L") {
      const bits = buf.readUInt32LE(21);
      return {
        width: (bits & 0x3fff) + 1,
        height: ((bits >> 14) & 0x3fff) + 1,
      };
    }
  }

  /* JPEG, varre os marcadores até achar um SOFn. */
  if (buf.length > 4 && buf.readUInt16BE(0) === 0xffd8) {
    let offset = 2;

    while (offset + 9 < buf.length) {
      if (buf[offset] !== 0xff) {
        offset++;
        continue;
      }

      const marker = buf[offset + 1];
      const length = buf.readUInt16BE(offset + 2);
      const isSOF =
        marker >= 0xc0 &&
        marker <= 0xcf &&
        marker !== 0xc4 &&
        marker !== 0xc8 &&
        marker !== 0xcc;

      if (isSOF) {
        return {
          height: buf.readUInt16BE(offset + 5),
          width: buf.readUInt16BE(offset + 7),
        };
      }

      offset += 2 + length;
    }
  }

  return null;
}

/** Procura `base` com qualquer uma das extensões aceitas, dentro de public/. */
function find(dir: string, base: string, exts: string[]): Asset | null {
  for (const ext of exts) {
    const rel = path.posix.join(dir, base + ext);
    const file = path.join(PUBLIC, dir, base + ext);

    if (!fs.existsSync(file)) continue;

    const size = readSize(file);
    if (size) return { src: `/${rel}`, ...size };
  }
  return null;
}

const RASTER = [".png", ".jpg", ".jpeg", ".webp"];
const WITH_SVG = [".svg", ...RASTER];

/* -------------------------------------------------------------------------- */
/*  Logo, public/logo.png                                                     */
/* -------------------------------------------------------------------------- */

/** Se existir, substitui a marca desenhada em código (navbar, rodapé, etc.). */
export function findLogo(): Asset | null {
  return find(".", "logo", WITH_SVG);
}

/* -------------------------------------------------------------------------- */
/*  Favicon, public/favicon.png                                               */
/* -------------------------------------------------------------------------- */

/** Se existir, vira o ícone da aba. Senão, usa o gerado em `app/icon.tsx`. */
export function findFavicon(): Asset | null {
  return find(".", "favicon", [".png", ".svg", ".ico", ".jpg", ".webp"]);
}

/* -------------------------------------------------------------------------- */
/*  Prints da plataforma, public/screenshots/                                 */
/* -------------------------------------------------------------------------- */

/** Nome esperado do arquivo de cada módulo (sem a extensão). */
export const SCREENSHOT_NAMES: Record<ModuleId, string> = {
  jogos: "jogos-do-dia",
  scanner: "scanner-ao-vivo",
  robos: "robos",
  james: "james",
  zeus: "zeus",
};

export type ShotMap = Partial<Record<ModuleId, Asset>>;

/** Prints reais substituem os mockups em código, um a um. */
export function findScreenshots(): ShotMap {
  const shots: ShotMap = {};

  for (const [id, name] of Object.entries(SCREENSHOT_NAMES)) {
    const asset = find("screenshots", name, RASTER);
    if (asset) shots[id as ModuleId] = asset;
  }

  return shots;
}
