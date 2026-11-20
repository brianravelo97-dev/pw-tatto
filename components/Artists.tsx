import Image from "next/image";
import SectionHeading from "./SectionHeading";
import { ArrowUpRight } from "./Icons";
import { artists } from "@/lib/site";

export default function Artists() {
  return (
    <section id="artistas" className="relative py-24 md:py-40">
      <div className="mx-auto max-w-[1600px] px-5 md:px-10">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <SectionHeading
            index="03"
            label="Artistas"
            title={
              <>
                Manos <span className="font-serif normal-case italic text-blood">distintas,</span>
                <br />
                un mismo estudio
              </>
            }
          />
          <p className="reveal max-w-sm text-[0.98rem] leading-relaxed text-bone/65">
            Cada artista tiene su propio lenguaje. Revisa su trabajo, elige con quién quieres tatuarte y escríbenos.
          </p>
        </div>

        <ul className="mt-16 grid gap-x-5 gap-y-14 sm:grid-cols-2 md:mt-24 lg:grid-cols-4">
          {artists.map((a, i) => {
            const img = a.work?.src ?? a.avatar;
            const alt = a.work?.alt ?? `Imagen destacada de ${a.name}`;
            const Wrapper = a.handle ? "a" : "div";
            const wrapperProps = a.handle
              ? { href: `https://www.instagram.com/${a.handle}/`, target: "_blank", rel: "noopener noreferrer", "aria-label": `Instagram de ${a.name}` }
              : {};
            return (
              <li key={a.name} className={`reveal ${i % 2 ? "lg:mt-24" : ""}`} style={{ ["--delay" as string]: `${i * 100}ms` }}>
                <Wrapper {...wrapperProps} className="group block">
                  <div className="relative aspect-[3/4] overflow-hidden rounded-sm bg-coal">
                    <Image
                      src={img}
                      alt={alt}
                      fill
                      sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover saturate-[.8] transition-all duration-1000 ease-out-expo group-hover:scale-105 group-hover:saturate-100"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/10 to-transparent opacity-80" />
                    {a.work && (
                      <p className="absolute bottom-4 left-4 right-4 translate-y-2 text-[0.68rem] uppercase tracking-[0.2em] text-bone/80 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                        {a.work.caption}
                      </p>
                    )}
                    {a.handle && (
                      <span className="absolute right-4 top-4 grid h-10 w-10 scale-75 place-items-center rounded-full bg-bone text-ink opacity-0 transition-all duration-500 ease-out-expo group-hover:scale-100 group-hover:opacity-100">
                        <ArrowUpRight />
                      </span>
                    )}
                  </div>
                  <div className="mt-5 flex items-center gap-4">
                    <Image src={a.avatar} alt="" width={44} height={44} className="h-11 w-11 rounded-full border border-bone/15 object-cover" />
                    <div>
                      <h3 className="font-display text-2xl uppercase leading-none tracking-wide">{a.name}</h3>
                      <p className="mt-1.5 text-xs tracking-[0.12em] text-ash">{a.handle ? `@${a.handle}` : "Artista del estudio"}</p>
                    </div>
                  </div>
                </Wrapper>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
