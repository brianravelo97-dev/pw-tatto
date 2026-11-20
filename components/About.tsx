import Image from "next/image";
import SectionHeading from "./SectionHeading";

const facts = [
  { k: "Tattoo", v: "& Bodypiercing" },
  { k: "4", v: "Artistas en el estudio" },
  { k: "8+", v: "Estilos trabajados" },
  { k: "DM", v: "Reservas por mensaje" },
];

export default function About() {
  return (
    <section id="estudio" className="relative py-24 md:py-40">
      <div className="mx-auto grid max-w-[1600px] grid-cols-12 gap-x-5 gap-y-16 px-5 md:px-10">
        <div className="col-span-12 lg:col-span-6">
          <SectionHeading
            index="01"
            label="El estudio"
            title={
              <>
                La libertad
                <br />
                <span className="font-serif normal-case italic text-blood">se lleva</span> en
                <br />
                la piel.
              </>
            }
          />

          <div className="mt-12 grid gap-6 text-[1.02rem] leading-relaxed text-bone/70 md:grid-cols-2 md:gap-8">
            <p className="reveal" style={{ ["--delay" as string]: "150ms" }}>
              Libertad Estudio es un espacio de tatuaje y body piercing donde distintos artistas comparten un mismo taller y una
              misma idea: que cada persona pueda llevar en la piel lo que realmente quiere contar.
            </p>
            <p className="reveal" style={{ ["--delay" as string]: "250ms" }}>
              Del realismo más fino a la caligrafía de trazo grueso, del tradicional al japonés. Aquí no hay un solo estilo: hay
              libertad para elegir el tuyo, y un equipo que lo toma en serio.
            </p>
          </div>

          <dl className="mt-14 grid grid-cols-2 border-t border-bone/10 sm:grid-cols-4">
            {facts.map((f, i) => (
              <div
                key={f.k}
                className="reveal border-b border-bone/10 py-6 pr-4 sm:border-b-0 sm:border-r sm:pl-5 sm:first:pl-0 sm:last:border-r-0"
                style={{ ["--delay" as string]: `${i * 90}ms` }}
              >
                <dt className="font-display text-4xl uppercase">{f.k}</dt>
                <dd className="mt-2 text-xs uppercase tracking-[0.18em] text-ash">{f.v}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="relative col-span-12 lg:col-span-5 lg:col-start-8">
          <figure className="reveal-clip relative aspect-[4/5] overflow-hidden rounded-sm">
            <div data-parallax="0.08" className="absolute -inset-y-10 inset-x-0">
              <Image
                src="/images/work/sparrow-portrait.jpg"
                alt="Gorrión en línea fina tatuado en Libertad Estudio por Pereza Ink"
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover"
              />
            </div>
            <figcaption className="absolute right-0 top-0 bg-ink/80 px-4 py-2 text-[0.68rem] uppercase tracking-[0.22em] text-bone/80 backdrop-blur">
              Gorrión — @pereza.ink
            </figcaption>
          </figure>

          <figure
            className="reveal-clip absolute -bottom-16 -left-4 w-[46%] overflow-hidden rounded-sm border-[6px] border-ink shadow-2xl md:-left-16 lg:-left-24"
            style={{ ["--delay" as string]: "300ms" }}
          >
            <div className="relative aspect-[4/5]">
              <span className="absolute bottom-2 left-2 z-10 bg-ink/80 px-2 py-1 text-[0.6rem] uppercase tracking-[0.2em] text-bone/80">Dentro del estudio</span>
              <Image
                src="/images/work/studio-wall.jpg"
                alt="Muro del estudio con cuadros, cascos y estanques de moto intervenidos"
                fill
                sizes="(min-width: 1024px) 20vw, 46vw"
                className="object-cover"
              />
            </div>
          </figure>

          <p className="reveal absolute -right-8 top-0 hidden rotate-180 whitespace-nowrap [writing-mode:vertical-rl] text-[0.68rem] uppercase tracking-[0.35em] text-ash md:block">
            Libertad Studio — Tattoo &amp; Bodypiercing
          </p>
        </div>
      </div>
    </section>
  );
}
