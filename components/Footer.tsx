import Logo from "./Logo";
import { artists, nav, site, whatsappLink } from "@/lib/site";
import { InstagramIcon, WhatsAppIcon } from "./Icons";

export default function Footer() {
  const wa = whatsappLink();
  const year = new Date().getFullYear();
  return (
    <footer className="relative overflow-hidden border-t border-bone/10 bg-ink pt-20 md:pt-28">
      <div className="mx-auto max-w-[1600px] px-5 md:px-10">
        <div className="grid grid-cols-12 gap-x-5 gap-y-12">
          <div className="col-span-12 md:col-span-5">
            <div className="flex items-center gap-4">
              <Logo size={64} />
              <div>
                <p className="font-display text-2xl uppercase leading-none">Libertad Estudio</p>
                <p className="mt-2 text-xs uppercase tracking-[0.22em] text-ash">{site.tagline}</p>
              </div>
            </div>
            <p className="mt-8 max-w-sm font-serif text-2xl italic leading-snug text-bone/70">Tu piel, tu historia. Tinta sin límites.</p>
          </div>

          <nav aria-label="Secundaria" className="col-span-6 md:col-span-2 md:col-start-7">
            <p className="eyebrow">Navegación</p>
            <ul className="mt-5 space-y-3">
              {nav.map((n) => (
                <li key={n.href}>
                  <a href={n.href} className="link-line text-bone/80 hover:text-bone">{n.label}</a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="col-span-6 md:col-span-2">
            <p className="eyebrow">Artistas</p>
            <ul className="mt-5 space-y-3">
              {artists.map((a) => (
                <li key={a.name}>
                  {a.handle ? (
                    <a href={`https://www.instagram.com/${a.handle}/`} target="_blank" rel="noopener noreferrer" className="link-line text-bone/80 hover:text-bone">
                      @{a.handle}
                    </a>
                  ) : (
                    <span className="text-bone/60">{a.name}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-12 md:col-span-2">
            <p className="eyebrow">Contacto</p>
            <ul className="mt-5 space-y-3 text-bone/80">
              <li>
                <a href={site.instagram.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:text-bone">
                  <InstagramIcon className="h-4 w-4" /> <span className="link-line">Instagram</span>
                </a>
              </li>
              {wa && (
                <li>
                  <a href={wa} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:text-bone">
                    <WhatsAppIcon className="h-4 w-4" /> <span className="link-line">WhatsApp</span>
                  </a>
                </li>
              )}
              {site.email && (
                <li>
                  <a href={`mailto:${site.email}`} className="link-line break-all">{site.email}</a>
                </li>
              )}
              {site.address && <li className="text-bone/60">{site.address}</li>}
            </ul>
          </div>
        </div>
      </div>

      <p aria-hidden className="pointer-events-none mt-16 select-none whitespace-nowrap text-center font-display text-[26vw] uppercase leading-[0.75] text-outline md:mt-20">
        Libertad
      </p>

      <div className="border-t border-bone/10">
        <div className="mx-auto flex max-w-[1600px] flex-col gap-3 px-5 py-6 text-[0.7rem] uppercase tracking-[0.2em] text-ash sm:flex-row sm:justify-between md:px-10">
          <p>© {year} Libertad Estudio</p>
          <a href="#inicio" className="link-line self-start hover:text-bone sm:self-auto">Volver arriba ↑</a>
        </div>
      </div>
    </footer>
  );
}
