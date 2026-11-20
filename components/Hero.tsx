import Image from "next/image";
import Button from "./Button";
import Badge from "./Badge";
import { site } from "@/lib/site";

export default function Hero() {
  return (
    <section id="inicio" className="relative isolate overflow-hidden pt-24 md:pt-28">
      {/* Halo rojo tenue */}
      <div aria-hidden className="pointer-events-none absolute -right-[20%] top-[10%] -z-10 h-[70vh] w-[70vh] rounded-full bg-blood/20 blur-[140px]" />

      <div className="mx-auto max-w-[1600px] px-5 md:px-10">
        {/* Línea superior */}
        <div className="reveal flex flex-wrap items-center justify-between gap-y-2 border-b border-bone/10 pb-4">
          <p className="eyebrow">
            <span className="mr-2 inline-block h-1.5 w-1.5 -translate-y-px rounded-full bg-blood align-middle" />
            {site.tagline}
          </p>
          <p className="eyebrow hidden sm:block">Estudio de artistas</p>
          <p className="eyebrow">Horas disponibles vía DM</p>
        </div>

        {/* Título */}
        <h1 className="relative mt-6 select-none md:mt-4">
          <span className="sr-only">Libertad Estudio — tatuajes y body piercing</span>
          <span aria-hidden className="relative z-10 block overflow-hidden md:mix-blend-difference">
            <span className="reveal block font-display text-[23.5vw] uppercase leading-[0.82] tracking-[-0.01em] 2xl:text-[22rem]">
              Libertad
            </span>
          </span>
          <span
            aria-hidden
            className="reveal absolute right-0 top-[88%] z-20 font-serif text-[12vw] md:top-[62%] md:text-[11vw] italic leading-none text-blood md:right-[4%] 2xl:text-[10.5rem]"
            style={{ ["--delay" as string]: "250ms" }}
          >
            estudio
          </span>
        </h1>

        {/* Cuerpo */}
        <div className="relative mt-10 grid grid-cols-12 gap-x-5 gap-y-10 pb-20 md:mt-6 md:pb-28">
          <div className="col-span-12 flex flex-col justify-end md:col-span-5 lg:col-span-4">
            <p className="reveal max-w-md font-serif text-3xl leading-[1.1] md:text-4xl" style={{ ["--delay" as string]: "200ms" }}>
              Tu piel, tu historia. <em className="text-bone/60">Tinta sin límites.</em>
            </p>
            <p className="reveal mt-5 max-w-sm text-[0.95rem] leading-relaxed text-bone/65" style={{ ["--delay" as string]: "300ms" }}>
              Tatuajes y body piercing en un estudio que reúne artistas de estilos distintos: realismo, japonés, tradicional, lettering y color.
            </p>
            <div className="reveal mt-8 flex flex-wrap gap-3" style={{ ["--delay" as string]: "400ms" }}>
              <Button href="#contacto">Reservar hora</Button>
              <Button href="#trabajos" variant="ghost">
                Ver trabajos
              </Button>
            </div>
          </div>

          <div className="relative col-span-6 hidden md:col-span-3 md:block lg:col-span-3 lg:col-start-6">
            <figure className="reveal-clip relative mt-16 aspect-[4/5] overflow-hidden rounded-sm" style={{ ["--delay" as string]: "350ms" }}>
              <div data-parallax="0.06" className="absolute -inset-y-8 inset-x-0">
                <Image
                  src="/images/work/hannya-coverup.jpg"
                  alt="Cover-up de máscara hannya en antebrazo"
                  fill
                  sizes="(min-width: 768px) 25vw, 50vw"
                  className="object-cover"
                  priority
                />
              </div>
            </figure>
            <figcaption className="mt-3 flex justify-between text-[0.68rem] uppercase tracking-[0.2em] text-ash">
              <span>Hannya — cover-up</span>
              <span>@atramentttoo</span>
            </figcaption>
          </div>

          <div className="relative col-span-12 md:col-span-4 lg:col-span-4 lg:col-start-9">
            <figure className="reveal-clip relative aspect-[4/5] overflow-hidden rounded-sm md:-mt-[14vw] md:aspect-[3/4]" style={{ ["--delay" as string]: "150ms" }}>
              <div data-parallax="0.1" className="absolute -inset-y-12 inset-x-0">
                <Image
                  src="/images/work/owl.jpg"
                  alt="Tatuaje realista de tucúquere en antebrazo"
                  fill
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className="object-cover"
                  priority
                />
              </div>
            </figure>
            <figcaption className="mt-3 flex justify-between text-[0.68rem] uppercase tracking-[0.2em] text-ash">
              <span>Tucúquere — realismo</span>
              <span>@risek.tattoo</span>
            </figcaption>
            <Badge className="absolute -top-12 right-4 z-20 w-24 md:-left-16 md:right-auto md:top-[38%] md:w-32" />
          </div>

          <a
            href="#estudio"
            className="absolute bottom-6 left-0 hidden items-center gap-3 text-[0.68rem] uppercase tracking-[0.3em] text-ash transition-colors hover:text-bone md:flex"
          >
            <span className="relative block h-10 w-px overflow-hidden bg-bone/15">
              <span className="absolute inset-x-0 top-0 h-1/2 animate-[scrollcue_2s_ease-in-out_infinite] bg-bone" />
            </span>
            Scroll
          </a>
        </div>
      </div>
    </section>
  );
}
