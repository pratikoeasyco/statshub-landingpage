import { MARQUEE_ITEMS } from "@/lib/content";

function Row() {
  return (
    <ul className="flex shrink-0 items-center" aria-hidden="true">
      {MARQUEE_ITEMS.map((item) => {
        const Icon = item.icon;

        return (
          <li
            key={item.label}
            className="flex shrink-0 items-center gap-2.5 px-5 sm:px-7"
          >
            {/*
              A cor vem do dado, então entra por style: classe do Tailwind não
              pode ser montada em runtime (o scanner não a encontraria).
            */}
            <span
              className="grid h-8 w-8 shrink-0 place-items-center rounded-full border"
              style={{
                color: item.color,
                borderColor: `${item.color}59`,
                backgroundColor: `${item.color}1A`,
              }}
            >
              <Icon size={15} />
            </span>

            <span className="whitespace-nowrap text-[14px] font-medium tracking-tight text-white/85 sm:text-[15px]">
              {item.label}
            </span>

            <span className="ml-3 h-1 w-1 shrink-0 rounded-full bg-line sm:ml-5" />
          </li>
        );
      })}
    </ul>
  );
}

export function Marquee() {
  return (
    <section
      className="relative border-y border-line bg-section/60 py-5"
      aria-label="O que a StatsHub entrega"
    >
      {/* Lista acessível para leitores de tela (o marquee é aria-hidden). */}
      <ul className="sr-only">
        {MARQUEE_ITEMS.map((item) => (
          <li key={item.label}>{item.label}</li>
        ))}
      </ul>

      <div className="mask-fade-x flex overflow-hidden">
        {/* Duas cópias idênticas: a animação desloca -50% (= a largura de uma
            cópia), então o loop é perfeitamente contínuo. */}
        <div className="flex w-max shrink-0 animate-marquee-slow">
          <Row />
          <Row />
        </div>
      </div>
    </section>
  );
}
