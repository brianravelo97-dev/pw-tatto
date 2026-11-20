"use client";

import { useEffect } from "react";

/**
 * Un único observador para toda la página:
 *  - `.reveal` / `.reveal-clip` → añade `.is-visible` al entrar en pantalla.
 *  - `[data-parallax="0.15"]` → desplazamiento vertical sutil ligado al scroll.
 * Mantiene las secciones como Server Components y el JS al mínimo.
 */
export default function Motion() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 },
    );

    const observeAll = () =>
      document.querySelectorAll(".reveal:not(.is-visible), .reveal-clip:not(.is-visible)").forEach((el) => io.observe(el));
    observeAll();

    // Re-observar elementos que aparecen después (filtros de galería, etc.)
    const mo = new MutationObserver(observeAll);
    mo.observe(document.body, { childList: true, subtree: true });

    let raf = 0;
    const items = reduce ? [] : Array.from(document.querySelectorAll<HTMLElement>("[data-parallax]"));
    const update = () => {
      raf = 0;
      const vh = window.innerHeight;
      for (const el of items) {
        const r = el.getBoundingClientRect();
        if (r.bottom < -200 || r.top > vh + 200) continue;
        const speed = parseFloat(el.dataset.parallax || "0.1");
        const offset = (r.top + r.height / 2 - vh / 2) * -speed;
        el.style.transform = `translate3d(0, ${offset.toFixed(1)}px, 0)`;
      }
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    if (items.length) {
      update();
      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("resize", onScroll);
    }

    return () => {
      io.disconnect();
      mo.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return null;
}
