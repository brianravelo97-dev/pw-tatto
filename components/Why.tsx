import Image from "next/image";
import SectionHeading from "./SectionHeading";
import Button from "./Button";

const pillars = [
  {
    t: "Artistas con estilo propio",
    d: "Realismo, japonés, tradicional, lettering y color bajo un mismo techo. Eliges al artista que mejor interpreta tu idea.",
  },
  {
    t: "Diseño a medida",
    d: "Cada pieza se dibuja para ti y para la zona donde va. Tu tatuaje no se repite en otra piel.",
  },
  {
    t: "Cover-ups que transforman",
    d: "Convertimos tatuajes antiguos en piezas nuevas, con composición y sombras pensadas para cubrir con fuerza.",
  },
  {
    t: "Cuidado en cada sesión",
    d: "Guantes, protección y un espacio limpio. Te acompañamos antes, durante y después del tatuaje.",
  },
];

const steps = [
  { t: "Escríbenos", d: "Por DM, WhatsApp o el formulario: tu idea, zona y tamaño aproximado." },
  { t: "Diseño", d: "Conversamos con el artista y damos forma a la propuesta." },
  { t: "Sesión", d: "Agendamos tu hora y llegas a tatuarte sin sorpresas." },
  { t: "Cuidados", d: "Te explicamos cómo cuidar tu tatuaje para que cicatrice perfecto." },
];

export default function Why() {
  return (
    <section id="diferencial" className="relative overflow-hidden pt-24 md:pt-40">
      <div className="mx-auto max-w-[1600px] px-5 md:px-10">
        <SectionHeading
          index="05"
          label="Por qué Libertad"
          title={
            <>
              No hay un solo estilo.
              <br />
              <span className="font-serif normal-case italic text-blood">Hay el tuyo.</span>
            </>
          }
        />

        <ol className="mt-16 grid border-t border-bone/10 sm:grid-cols-2 lg:mt-24 lg:grid-cols-4">
          {pillars.map((p, i) => (
            <li
              key={p.t}
              className="reveal group relative border-b border-bone/10 py-10 sm:px-6 sm:odd:pl-0 lg:border-b-0 lg:border-r lg:px-8 lg:first:pl-0 lg:last:border-r-0"
              style={{ ["--delay" as string]: `${i * 100}ms` }}
            >
              <span className="font-display text-7xl text-outline transition-colors duration-500 group-hover:text-blood group-hover:[-webkit-text-stroke:0]">
                0{i + 1}
              </span>
              <h3 className="mt-8 font-display text-2xl uppercase tracking-wide">{p.t}</h3>
              <p className="mt-4 leading-relaxed text-bone/65">{p.d}</p>
            </li>
          ))}
        </ol>

        {/* Proceso */}
        <div className="mt-24 grid grid-cols-12 gap-x-5 gap-y-12 md:mt-40">
          <div className="relative col-span-12 sm:col-span-8 lg:col-span-4 lg:col-start-2">
            <figure className="reveal-clip relative aspect-[4/5] overflow-hidden rounded-sm">
              <div data-parallax="0.07" className="absolute -inset-y-10 inset-x-0">
                <Image src="/images/work/dragon.jpg" alt="Dragón japonés tatuado en el muslo" fill sizes="(min-width: 1024px) 30vw, 100vw" className="object-cover" />
              </div>
            </figure>
          </div>
          <div className="col-span-12 flex flex-col justify-center lg:col-span-6 lg:col-start-7">
            <p className="reveal eyebrow">El proceso</p>
            <h3 className="reveal mt-5 font-display text-5xl uppercase leading-[0.95] md:text-6xl">
              De la idea <span className="font-serif normal-case italic text-bone/60">a la piel</span>
            </h3>
            <ol className="mt-10">
              {steps.map((s, i) => (
                <li key={s.t} className="reveal flex gap-6 border-t border-bone/10 py-6 last:border-b" style={{ ["--delay" as string]: `${i * 90}ms` }}>
                  <span className="pt-1 font-sans text-xs tracking-[0.2em] text-blood">0{i + 1}</span>
                  <div>
                    <p className="font-display text-2xl uppercase tracking-wide">{s.t}</p>
                    <p className="mt-2 leading-relaxed text-bone/65">{s.d}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>

      {/* Llamado a la acción */}
      <div className="relative mt-24 overflow-hidden bg-blood md:mt-40">
        <div className="mx-auto flex max-w-[1600px] flex-col items-start justify-between gap-10 px-5 py-16 md:flex-row md:items-end md:px-10 md:py-24">
          <p className="reveal font-display text-[12vw] uppercase leading-[0.9] md:text-7xl lg:text-8xl">
            Tu próxima pieza
            <br />
            <span className="font-serif normal-case italic">empieza con un mensaje.</span>
          </p>
          <Button href="#contacto" className="reveal shrink-0 !bg-ink !text-bone [&>span:first-child]:!bg-bone hover:!text-ink">
            Escríbenos
          </Button>
        </div>
      </div>
    </section>
  );
}
