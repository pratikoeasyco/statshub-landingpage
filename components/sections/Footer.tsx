import { ArrowUpRight } from "lucide-react";
import { FOOTER } from "@/lib/content";
import { Logo } from "../ui/Logo";

/** Link para fora do site abre em nova aba; âncora interna, não. */
const isExternal = (href: string) => /^https?:\/\//i.test(href);

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-line bg-section">
      <div className="pointer-events-none absolute left-1/2 top-0 h-px w-full max-w-[600px] -translate-x-1/2 bg-gradient-to-r from-transparent via-brand/50 to-transparent" />

      <div className="container-x py-16 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.5fr_repeat(3,1fr)] lg:gap-8">
          <div className="max-w-sm">
            <Logo className="h-10" />
            <p className="mt-5 text-[14px] leading-relaxed text-muted">
              {FOOTER.description}
            </p>
          </div>

          {FOOTER.columns.map((column) => (
            <nav key={column.title} aria-label={column.title}>
              <h3 className="text-[12px] font-semibold uppercase tracking-[0.14em] text-white">
                {column.title}
              </h3>

              <ul className="mt-5 space-y-3">
                {column.links.map((link) => {
                  const external = isExternal(link.href);

                  return (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        target={external ? "_blank" : undefined}
                        rel={external ? "noopener noreferrer" : undefined}
                        className="group inline-flex items-center gap-1.5 text-[14px] text-muted transition-colors duration-300 hover:text-white"
                      >
                        <span className="h-px w-0 bg-brand transition-all duration-300 ease-smooth group-hover:w-3" />
                        {link.label}
                        {external && (
                          <ArrowUpRight
                            size={13}
                            className="opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                          />
                        )}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-line pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[13px] text-muted">
            © {new Date().getFullYear()} StatsHub. Todos os direitos reservados.
          </p>
          <p className="max-w-xl text-[12.5px] leading-relaxed text-[#7A7A7A] sm:text-right">
            {FOOTER.disclaimer}
          </p>
        </div>
      </div>
    </footer>
  );
}
