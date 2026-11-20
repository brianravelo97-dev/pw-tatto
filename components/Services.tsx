import Image from "next/image";
import SectionHeading from "./SectionHeading";
import ServiceCTA from "./ServiceCTA";
import Logo from "./Logo";
import { ArrowUpRight } from "./Icons";
import { services } from "@/lib/site";

export default function Services() {
  return (
    <section id="servicios" className="relative bg-bone py-24 text-ink md:py-40">
      <div className="mx-auto max-w-[1600px] px-5 md:px-10">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end [&_.eyebrow]:text-ink/55 [&_.h-px]:bg-ink/25">
          <SectionHeading
            index="02"
            label="Servicios"
            title={
              <>
                Lo que hacemos
                <br />
                <span className="font-serif normal-case italic text-blood">con tinta</span> y acero
              </>
            }
          />
          <p className="reveal max-w-sm text-[0.98rem] leading-relaxed text-ink/65">
            Cada trabajo empieza con una conversación. Cuéntanos tu idea y te orientamos sobre estilo, tamaño, zona y artista.
          </p>
        </div>

        <ul className="mt-16 border-t border-ink/15 md:mt-24">
          {services.map((s, i) => (
            <li key={s.id} className="group reveal border-b border-ink/15" style={{ ["--delay" as string]: `${i * 80}ms` }}>
              <div className="grid grid-cols-12 items-center gap-x-5 gap-y-6 py-8 md:py-10">
                <span className="col-span-2 font-sans text-xs tracking-[0.2em] text-ink/45 md:col-span-1">0{i + 1}</span>

                <div className="col-span-10 md:col-span-5">
                  <p className="text-[0.68rem] font-semibold uppercase tracking-[0.25em] text-blood">{s.kicker}</p>
                  <h3 className="mt-2 font-display text-5xl uppercase leading-[0.95] transition-transform duration-700 ease-out-expo md:text-6xl md:group-hover:translate-x-4 xl:text-7xl">
                    {s.title}
                  </h3>
                </div>

                <div className="col-span-12 md:col-span-4">
                  <p className="max-w-md leading-relaxed text-ink/70">{s.description}</p>
                  <ServiceCTA
                    service={s.id}
                    className="mt-5 inline-flex items-center gap-2 text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-ink transition-colors hover:text-blood"
                  >
                    <span className="link-line">Consultar</span>
                    <ArrowUpRight className="h-4 w-4 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </ServiceCTA>
                </div>

                <div className="col-span-12 md:col-span-2">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-sm bg-ink md:aspect-square">
                    {s.image ? (
                      <Image
                        src={s.image}
                        alt={s.alt ?? s.title}
                        fill
                        sizes="(min-width: 768px) 16vw, 100vw"
                        className="object-cover transition-transform duration-1000 ease-out-expo md:scale-110 md:grayscale md:group-hover:scale-100 md:group-hover:grayscale-0"
                      />
                    ) : (
                      <div className="grid h-full place-items-center">
                        <Logo size={120} className="w-1/2 max-w-[140px] h-auto transition-transform duration-1000 ease-out-expo group-hover:rotate-12" />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
