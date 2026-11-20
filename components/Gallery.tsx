"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { categories, works, type Category } from "@/lib/site";
import { ArrowUpRight } from "./Icons";

export default function Gallery() {
  const [filter, setFilter] = useState<Category | "all">("all");
  const [active, setActive] = useState<number | null>(null);

  const list = useMemo(() => (filter === "all" ? works : works.filter((w) => w.cats.includes(filter))), [filter]);

  return (
    <section id="trabajos" className="relative border-t border-bone/10 bg-coal py-24 md:py-40">
      <div className="mx-auto max-w-[1600px] px-5 md:px-10">
        <div className="grid grid-cols-12 items-end gap-8">
          <div className="col-span-12 lg:col-span-7">
            <p className="reveal eyebrow flex items-center gap-3">
              <span className="text-blood">(04)</span>
              <span className="h-px w-10 bg-bone/25" />
              Trabajos
            </p>
            <h2 className="reveal mt-6 font-display text-[13vw] uppercase leading-[0.9] sm:text-7xl lg:text-8xl">
              Hecho en <span className="font-serif normal-case italic text-blood">Libertad</span>
            </h2>
          </div>
          <div className="reveal col-span-12 lg:col-span-5" role="toolbar" aria-label="Filtrar trabajos por estilo">
            <div className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-1 [scrollbar-width:none] lg:mx-0 lg:flex-wrap lg:justify-end lg:px-0">
              {categories.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setFilter(c.id)}
                  aria-pressed={filter === c.id}
                  className={`shrink-0 rounded-full border px-4 py-2 text-[0.7rem] font-medium uppercase tracking-[0.18em] transition-colors duration-300 ${
                    filter === c.id ? "border-bone bg-bone text-ink" : "border-bone/20 text-bone/70 hover:border-bone/60 hover:text-bone"
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <ul className="mt-14 columns-2 gap-3 md:mt-20 md:columns-3 md:gap-5 xl:columns-4">
          {list.map((w, i) => (
            <li key={w.src} className="reveal mb-3 break-inside-avoid md:mb-5" style={{ ["--delay" as string]: `${(i % 4) * 70}ms` }}>
              <button
                type="button"
                onClick={() => setActive(i)}
                className="group relative block w-full overflow-hidden rounded-sm bg-ink text-left"
                aria-label={`Ampliar: ${w.title}`}
              >
                <Image
                  src={w.src}
                  alt={w.alt}
                  width={w.w}
                  height={w.h}
                  sizes="(min-width: 1280px) 25vw, (min-width: 768px) 33vw, 50vw"
                  className="h-auto w-full transition-transform duration-[1.2s] ease-out-expo group-hover:scale-[1.06]"
                />
                <span className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/0 to-ink/0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-visible:opacity-100" />
                <span className="absolute inset-x-3 bottom-3 flex items-end justify-between gap-3 opacity-0 translate-y-3 transition-all duration-500 ease-out-expo group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100 md:inset-x-4 md:bottom-4">
                  <span>
                    <span className="block font-display text-lg uppercase leading-none md:text-xl">{w.title}</span>
                    {w.artist && <span className="mt-1 block text-[0.65rem] tracking-[0.14em] text-bone/70">@{w.artist}</span>}
                  </span>
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-bone text-ink">
                    <ArrowUpRight />
                  </span>
                </span>
              </button>
            </li>
          ))}
        </ul>

        <p className="reveal mt-12 text-center text-sm text-ash">
          Más trabajos en{" "}
          <a href="https://www.instagram.com/libertad_estudio_/" target="_blank" rel="noopener noreferrer" className="link-line text-bone">
            @libertad_estudio_
          </a>
        </p>
      </div>

      {active !== null && <Lightbox items={list} index={active} onChange={setActive} onClose={() => setActive(null)} />}
    </section>
  );
}

function Lightbox({
  items,
  index,
  onChange,
  onClose,
}: {
  items: typeof works;
  index: number;
  onChange: (i: number) => void;
  onClose: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const touch = useRef<number | null>(null);
  const item = items[index];
  const go = useCallback((d: number) => onChange((index + d + items.length) % items.length), [index, items.length, onChange]);

  useEffect(() => {
    const prev = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = "";
      prev?.focus();
    };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
      if (e.key === "Tab" && ref.current) {
        const f = ref.current.querySelectorAll<HTMLElement>("button");
        const first = f[0];
        const last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go, onClose]);

  return (
    <div
      ref={ref}
      role="dialog"
      aria-modal="true"
      aria-label={`${item.title} — ${index + 1} de ${items.length}`}
      className="fixed inset-0 z-[70] flex flex-col bg-ink/95 backdrop-blur-md animate-[fadein_.4s_ease-out]"
      onClick={(e) => e.target === e.currentTarget && onClose()}
      onTouchStart={(e) => (touch.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touch.current === null) return;
        const dx = e.changedTouches[0].clientX - touch.current;
        if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
        touch.current = null;
      }}
    >
      <div className="flex items-center justify-between px-5 py-4 md:px-10 md:py-6">
        <p className="font-sans text-xs tracking-[0.25em] text-ash">
          {String(index + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
        </p>
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          className="group flex items-center gap-3 text-[0.7rem] uppercase tracking-[0.22em] text-bone/80 hover:text-bone"
        >
          Cerrar
          <span className="relative grid h-10 w-10 place-items-center rounded-full border border-bone/25 transition-colors group-hover:border-blood group-hover:bg-blood">
            <span className="absolute h-px w-4 rotate-45 bg-current" />
            <span className="absolute h-px w-4 -rotate-45 bg-current" />
          </span>
        </button>
      </div>

      <div className="relative flex min-h-0 flex-1 items-center justify-center px-4 md:px-24" onClick={(e) => e.target === e.currentTarget && onClose()}>
        <Image
          key={item.src}
          src={item.src}
          alt={item.alt}
          width={item.w}
          height={item.h}
          sizes="90vw"
          className="h-full max-h-full w-auto max-w-full animate-[zoomin_.6s_cubic-bezier(.16,1,.3,1)] rounded-sm object-contain"
        />
        <NavBtn dir="prev" onClick={() => go(-1)} />
        <NavBtn dir="next" onClick={() => go(1)} />
      </div>

      <div className="px-5 py-5 text-center md:py-8">
        <p className="font-display text-2xl uppercase md:text-3xl">{item.title}</p>
        <p className="mt-1 text-xs tracking-[0.18em] text-ash">{item.artist ? `@${item.artist} · ` : ""}Libertad Estudio</p>
      </div>
    </div>
  );
}

function NavBtn({ dir, onClick }: { dir: "prev" | "next"; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={dir === "prev" ? "Anterior" : "Siguiente"}
      className={`absolute top-1/2 hidden h-14 w-14 -translate-y-1/2 place-items-center rounded-full border border-bone/20 text-bone transition-colors hover:border-blood hover:bg-blood md:grid ${
        dir === "prev" ? "left-6" : "right-6"
      }`}
    >
      <svg aria-hidden viewBox="0 0 24 24" className={`h-5 w-5 ${dir === "prev" ? "rotate-180" : ""}`} fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M4 12h16m-6-6 6 6-6 6" />
      </svg>
    </button>
  );
}
