"use client";

import { useEffect, useState } from "react";
import Logo from "./Logo";
import { nav, site } from "@/lib/site";
import { InstagramIcon } from "./Icons";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
      setHidden(y > 400 && y > last + 4);
      if (y < last - 4) setHidden(false);
      last = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-700 ease-out-expo ${
          hidden && !open ? "-translate-y-full" : "translate-y-0"
        } ${scrolled && !open ? "border-b border-bone/10 bg-ink/75 backdrop-blur-xl" : "border-b border-transparent"}`}
      >
        <div className="mx-auto flex h-18 max-w-[1600px] items-center justify-between px-5 md:h-20 md:px-10">
          <a href="#inicio" className="group flex items-center gap-3" aria-label="Libertad Estudio — inicio">
            <Logo size={38} priority className="transition-transform duration-700 ease-out-expo group-hover:rotate-[20deg]" />
            <span className="font-display text-lg uppercase leading-none tracking-wide">
              Libertad<span className="ml-1.5 font-serif text-xl normal-case italic tracking-normal text-bone/70">estudio</span>
            </span>
          </a>

          <nav aria-label="Principal" className="hidden items-center gap-9 lg:flex">
            {nav.map((n) => (
              <a key={n.href} href={n.href} className="link-line text-[0.72rem] font-medium uppercase tracking-[0.24em] text-bone/75 transition-colors hover:text-bone">
                {n.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href={site.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram de Libertad Estudio"
              className="hidden h-11 w-11 place-items-center rounded-full border border-bone/20 transition-colors hover:border-blood hover:text-blood sm:grid"
            >
              <InstagramIcon className="h-4.5 w-4.5" />
            </a>
            <a
              href="#contacto"
              className="hidden rounded-full bg-bone px-5 py-3 text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-ink transition-colors duration-300 hover:bg-blood hover:text-bone sm:inline-flex"
            >
              Reservar hora
            </a>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="menu-movil"
              aria-label={open ? "Cerrar menú" : "Abrir menú"}
              className="relative grid h-11 w-11 place-items-center rounded-full border border-bone/20 lg:hidden"
            >
              <span className={`absolute h-px w-5 bg-bone transition-transform duration-500 ease-out-expo ${open ? "rotate-45" : "-translate-y-[4px]"}`} />
              <span className={`absolute h-px w-5 bg-bone transition-transform duration-500 ease-out-expo ${open ? "-rotate-45" : "translate-y-[4px]"}`} />
            </button>
          </div>
        </div>
      </header>

      {/* Menú móvil a pantalla completa */}
      <div
        id="menu-movil"
        className={`fixed inset-0 z-40 flex flex-col bg-ink px-5 pb-10 pt-28 transition-[clip-path] duration-700 ease-out-expo lg:hidden ${
          open ? "[clip-path:inset(0_0_0_0)]" : "pointer-events-none [clip-path:inset(0_0_100%_0)]"
        }`}
        aria-hidden={!open}
      >
        <nav aria-label="Móvil" className="flex flex-1 flex-col justify-center gap-2">
          {nav.map((n, i) => (
            <a
              key={n.href}
              href={n.href}
              tabIndex={open ? 0 : -1}
              onClick={() => setOpen(false)}
              className={`flex items-baseline gap-4 font-display text-[13vw] uppercase leading-[1.02] transition-all duration-700 ease-out-expo ${
                open ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
              }`}
              style={{ transitionDelay: open ? `${120 + i * 60}ms` : "0ms" }}
            >
              <span className="font-sans text-xs tracking-widest text-blood">0{i + 1}</span>
              {n.label}
            </a>
          ))}
        </nav>
        <a
          href="#contacto"
          tabIndex={open ? 0 : -1}
          onClick={() => setOpen(false)}
          className="mb-8 inline-flex items-center justify-center rounded-full bg-bone px-6 py-4 text-[0.75rem] font-semibold uppercase tracking-[0.2em] text-ink active:bg-blood active:text-bone"
        >
          Reservar hora
        </a>
        <div className="flex items-center justify-between border-t border-bone/10 pt-6 text-xs uppercase tracking-[0.2em] text-ash">
          <span>{site.tagline}</span>
          <a href={site.instagram.url} target="_blank" rel="noopener noreferrer" tabIndex={open ? 0 : -1} className="text-bone">
            @{site.instagram.handle}
          </a>
        </div>
      </div>
    </>
  );
}
