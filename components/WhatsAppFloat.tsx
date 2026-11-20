import { whatsappLink } from "@/lib/site";
import { WhatsAppIcon } from "./Icons";

/** Botón flotante: solo aparece si NEXT_PUBLIC_WHATSAPP está configurado. */
export default function WhatsAppFloat() {
  const href = whatsappLink("Hola Libertad Estudio, quiero cotizar un tatuaje.");
  if (!href) return null;
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escribir por WhatsApp"
      className="group fixed bottom-5 right-5 z-40 flex items-center gap-3 rounded-full bg-bone py-3 pl-3 pr-3 text-ink shadow-[0_10px_40px_-10px_rgba(0,0,0,.8)] transition-all duration-500 ease-out-expo hover:bg-blood hover:pr-5 hover:text-bone md:bottom-8 md:right-8"
    >
      <span className="grid h-9 w-9 place-items-center rounded-full bg-ink text-bone transition-colors group-hover:bg-bone group-hover:text-blood">
        <WhatsAppIcon className="h-5 w-5" />
      </span>
      <span className="max-w-0 overflow-hidden whitespace-nowrap text-[0.7rem] font-semibold uppercase tracking-[0.18em] transition-all duration-500 ease-out-expo group-hover:max-w-40">
        Escríbenos
      </span>
    </a>
  );
}
