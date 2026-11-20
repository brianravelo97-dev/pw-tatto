"use client";

import { useEffect, useRef, useState } from "react";
import { artists, services, site, whatsappLink } from "@/lib/site";
import { InstagramIcon, WhatsAppIcon, ArrowUpRight } from "./Icons";
import { SERVICE_EVENT } from "./ServiceCTA";

type Status = "idle" | "sending" | "ok" | "fallback" | "error";

const sizes = ["Pequeño (hasta 5 cm)", "Mediano (5–15 cm)", "Grande (más de 15 cm)", "Manga / espalda / proyecto grande", "No lo sé aún"];

const field =
  "peer w-full border-0 border-b border-bone/20 bg-transparent px-0 pb-3 pt-6 text-base text-bone placeholder-transparent transition-colors focus:border-bone focus:outline-none focus:ring-0";
const labelCls =
  "pointer-events-none absolute left-0 top-6 text-[0.95rem] text-ash transition-all duration-300 peer-focus:top-0 peer-focus:text-[0.65rem] peer-focus:uppercase peer-focus:tracking-[0.2em] peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-[0.65rem] peer-[:not(:placeholder-shown)]:uppercase peer-[:not(:placeholder-shown)]:tracking-[0.2em]";

export default function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [service, setService] = useState("");
  const [message, setMessage] = useState("");
  const [copied, setCopied] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const onService = (e: Event) => setService((e as CustomEvent<string>).detail);
    window.addEventListener(SERVICE_EVENT, onService);
    return () => window.removeEventListener(SERVICE_EVENT, onService);
  }, []);

  function compose(d: Record<string, string>) {
    const srv = services.find((s) => s.id === d.servicio)?.title;
    return [
      `Hola Libertad Estudio, soy ${d.nombre}.`,
      srv && `Servicio: ${srv}`,
      d.artista && `Artista: ${d.artista}`,
      d.zona && `Zona: ${d.zona}`,
      d.tamano && `Tamaño: ${d.tamano}`,
      `Idea: ${d.idea}`,
      `Contacto: ${d.contacto}`,
    ]
      .filter(Boolean)
      .join("\n");
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const data = Object.fromEntries(fd.entries()) as Record<string, string>;
    setMessage(compose(data));
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        setStatus("ok");
        formRef.current?.reset();
        setService("");
        return;
      }
      const json = await res.json().catch(() => ({}));
      setStatus(json.error === "not_configured" || json.error === "delivery_failed" ? "fallback" : "error");
    } catch {
      setStatus("fallback");
    }
  }

  async function copyAndOpenDM() {
    try {
      await navigator.clipboard.writeText(message);
      setCopied(true);
    } catch {
      /* el usuario puede copiarlo manualmente */
    }
    window.open(site.instagram.dm, "_blank", "noopener,noreferrer");
  }

  const wa = whatsappLink("Hola Libertad Estudio, quiero cotizar un tatuaje.");

  return (
    <section id="contacto" className="relative border-t border-bone/10 py-24 md:py-40">
      <div className="mx-auto grid max-w-[1600px] grid-cols-12 gap-x-5 gap-y-16 px-5 md:px-10">
        {/* Información */}
        <div className="col-span-12 lg:col-span-5">
          <p className="reveal eyebrow flex items-center gap-3">
            <span className="text-blood">(06)</span>
            <span className="h-px w-10 bg-bone/25" />
            Contacto
          </p>
          <h2 className="reveal mt-6 font-display text-[14vw] uppercase leading-[0.88] sm:text-7xl lg:text-8xl">
            Reserva
            <br />
            <span className="font-serif normal-case italic text-blood">tu hora</span>
          </h2>
          <p className="reveal mt-8 max-w-md text-[1.02rem] leading-relaxed text-bone/65">
            Cuéntanos qué quieres tatuarte, en qué zona y de qué tamaño. Te responderemos para coordinar diseño, artista y fecha.
          </p>

          <ul className="mt-12 space-y-3">
            {wa && (
              <li className="reveal">
                <ContactLink href={wa} icon={<WhatsAppIcon />} label="WhatsApp" value="Escríbenos directo" />
              </li>
            )}
            <li className="reveal">
              <ContactLink href={site.instagram.dm} icon={<InstagramIcon />} label="Instagram — DM" value={`@${site.instagram.handle}`} />
            </li>
            {site.email && (
              <li className="reveal">
                <ContactLink href={`mailto:${site.email}`} icon={<span className="font-display text-lg">@</span>} label="Correo" value={site.email} />
              </li>
            )}
          </ul>

          {site.address && (
            <div className="reveal mt-10 border-t border-bone/10 pt-6">
              <p className="eyebrow">Ubicación</p>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(site.address)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="link-line mt-3 inline-block text-lg"
              >
                {site.address}
              </a>
            </div>
          )}
        </div>

        {/* Formulario */}
        <div className="col-span-12 lg:col-span-6 lg:col-start-7">
          <div className="reveal relative rounded-sm border border-bone/10 bg-coal p-6 sm:p-10">
            {status === "ok" ? (
              <div className="flex min-h-[420px] flex-col items-start justify-center" role="status">
                <span className="grid h-14 w-14 place-items-center rounded-full bg-blood text-2xl">✓</span>
                <h3 className="mt-8 font-display text-5xl uppercase leading-none">Mensaje recibido</h3>
                <p className="mt-4 max-w-sm text-bone/65">Gracias por escribirnos. Te contactaremos pronto para dar forma a tu próxima pieza.</p>
                <button type="button" onClick={() => setStatus("idle")} className="link-line mt-8 text-xs uppercase tracking-[0.22em]">
                  Enviar otra consulta
                </button>
              </div>
            ) : (
              <form ref={formRef} onSubmit={onSubmit} className="grid gap-x-8 gap-y-7 sm:grid-cols-2" noValidate={false}>
                <h3 className="font-display text-3xl uppercase sm:col-span-2">Cotiza tu tatuaje</h3>

                <div className="relative">
                  <input id="nombre" name="nombre" required autoComplete="name" placeholder="Nombre" className={field} />
                  <label htmlFor="nombre" className={labelCls}>Nombre *</label>
                </div>
                <div className="relative">
                  <input id="f-contacto" name="contacto" required placeholder="Contacto" className={field} />
                  <label htmlFor="f-contacto" className={labelCls}>Teléfono, correo o Instagram *</label>
                </div>

                <SelectField id="servicio" label="Servicio" value={service} onChange={setService}>
                  <option value="">Selecciona…</option>
                  {services.map((s) => (
                    <option key={s.id} value={s.id}>{s.title}</option>
                  ))}
                </SelectField>
                <SelectField id="artista" label="Artista">
                  <option value="">Sin preferencia</option>
                  {artists.map((a) => (
                    <option key={a.name} value={a.name}>{a.name}</option>
                  ))}
                </SelectField>

                <div className="relative">
                  <input id="zona" name="zona" placeholder="Zona" className={field} />
                  <label htmlFor="zona" className={labelCls}>Zona del cuerpo</label>
                </div>
                <SelectField id="tamano" label="Tamaño aproximado">
                  <option value="">Selecciona…</option>
                  {sizes.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </SelectField>

                <div className="relative sm:col-span-2">
                  <textarea id="idea" name="idea" required rows={4} placeholder="Idea" className={`${field} resize-none`} />
                  <label htmlFor="idea" className={labelCls}>Cuéntanos tu idea *</label>
                </div>

                {/* Honeypot anti-spam */}
                <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
                  <label htmlFor="empresa">Empresa</label>
                  <input id="empresa" name="empresa" tabIndex={-1} autoComplete="off" />
                </div>

                <div className="flex flex-col gap-4 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-xs text-ash">* Campos obligatorios</p>
                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="group relative inline-flex items-center justify-center gap-3 overflow-hidden rounded-full bg-bone px-8 py-4 text-[0.78rem] font-semibold uppercase tracking-[0.18em] text-ink transition-colors duration-500 hover:text-bone disabled:opacity-60"
                  >
                    <span aria-hidden className="absolute inset-0 origin-bottom scale-y-0 rounded-full bg-blood transition-transform duration-500 ease-out-expo group-hover:scale-y-100" />
                    <span className="relative">{status === "sending" ? "Enviando…" : "Enviar consulta"}</span>
                    <ArrowUpRight className="relative h-4 w-4" />
                  </button>
                </div>

                {status === "error" && (
                  <p role="alert" className="text-sm text-blood sm:col-span-2">
                    Revisa que nombre, contacto e idea estén completos e inténtalo de nuevo.
                  </p>
                )}

                {status === "fallback" && (
                  <div role="alert" className="rounded-sm border border-bone/15 bg-ink p-5 sm:col-span-2">
                    <p className="text-sm text-bone/80">
                      No pudimos enviar el formulario en este momento. Tu mensaje ya está listo: envíalo directo por{" "}
                      {wa ? "WhatsApp o Instagram" : "Instagram"}.
                    </p>
                    <div className="mt-4 flex flex-wrap gap-3">
                      {wa && (
                        <a
                          href={whatsappLink(message)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 rounded-full bg-bone px-5 py-3 text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-ink hover:bg-blood hover:text-bone"
                        >
                          <WhatsAppIcon className="h-4 w-4" /> WhatsApp
                        </a>
                      )}
                      <button
                        type="button"
                        onClick={copyAndOpenDM}
                        className="inline-flex items-center gap-2 rounded-full border border-bone/30 px-5 py-3 text-[0.7rem] font-semibold uppercase tracking-[0.18em] hover:border-blood"
                      >
                        <InstagramIcon className="h-4 w-4" /> {copied ? "Copiado · abrir DM" : "Copiar y abrir DM"}
                      </button>
                    </div>
                  </div>
                )}
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function SelectField({
  id,
  label,
  children,
  value,
  onChange,
}: {
  id: string;
  label: string;
  children: React.ReactNode;
  value?: string;
  onChange?: (v: string) => void;
}) {
  const controlled = value !== undefined && onChange ? { value, onChange: (e: React.ChangeEvent<HTMLSelectElement>) => onChange(e.target.value) } : {};
  return (
    <div className="relative">
      <label htmlFor={id} className="block text-[0.65rem] uppercase tracking-[0.2em] text-ash">
        {label}
      </label>
      <select
        id={id}
        name={id}
        {...controlled}
        className="mt-1 w-full appearance-none border-0 border-b border-bone/20 bg-transparent px-0 pb-3 pr-8 pt-2 text-base text-bone focus:border-bone focus:outline-none focus:ring-0 [&>option]:bg-coal"
      >
        {children}
      </select>
      <svg aria-hidden viewBox="0 0 24 24" className="pointer-events-none absolute bottom-4 right-0 h-4 w-4 text-ash" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="m6 9 6 6 6-6" />
      </svg>
    </div>
  );
}

function ContactLink({ href, icon, label, value }: { href: string; icon: React.ReactNode; label: string; value: string }) {
  return (
    <a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel="noopener noreferrer"
      className="group flex items-center gap-5 border-b border-bone/10 py-5 transition-colors hover:border-bone/40"
    >
      <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-bone/20 transition-colors duration-500 group-hover:border-blood group-hover:bg-blood">
        {icon}
      </span>
      <span className="flex-1">
        <span className="block text-[0.65rem] uppercase tracking-[0.22em] text-ash">{label}</span>
        <span className="mt-1 block font-display text-2xl uppercase tracking-wide">{value}</span>
      </span>
      <ArrowUpRight className="h-5 w-5 text-ash transition-all duration-500 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-bone" />
    </a>
  );
}
