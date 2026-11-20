/**
 * Fuente única de contenido de la marca.
 * Todo lo que aparece aquí proviene del Instagram @libertad_estudio_.
 * Los datos que aún no están confirmados (WhatsApp, dirección, correo)
 * se leen de variables de entorno y solo se muestran si existen.
 */

export const site = {
  name: "Libertad Estudio",
  legalName: "Libertad Studio",
  tagline: "Tattoo & Bodypiercing",
  description:
    "Libertad Estudio — estudio de tatuajes y body piercing. Realismo, blackwork, japonés, tradicional, lettering, color y cover-ups. Reserva tu hora.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  instagram: {
    handle: "libertad_estudio_",
    url: "https://www.instagram.com/libertad_estudio_/",
    dm: "https://ig.me/m/libertad_estudio_",
  },
  whatsapp: (process.env.NEXT_PUBLIC_WHATSAPP || "").replace(/\D/g, ""),
  email: process.env.NEXT_PUBLIC_EMAIL || "",
  address: process.env.NEXT_PUBLIC_ADDRESS || "",
} as const;

export function whatsappLink(message?: string) {
  if (!site.whatsapp) return "";
  const text = message ? `?text=${encodeURIComponent(message)}` : "";
  return `https://wa.me/${site.whatsapp}${text}`;
}

export const nav = [
  { href: "#estudio", label: "Estudio" },
  { href: "#servicios", label: "Servicios" },
  { href: "#artistas", label: "Artistas" },
  { href: "#trabajos", label: "Trabajos" },
  { href: "#contacto", label: "Contacto" },
] as const;

export const styles = [
  "Realismo",
  "Black & Grey",
  "Japonés",
  "Tradicional",
  "Lettering",
  "Caligrafía",
  "Color",
  "Fine Line",
  "Cover-up",
  "Body Piercing",
];

export type Service = {
  id: string;
  title: string;
  kicker: string;
  description: string;
  image?: string;
  alt?: string;
};

export const services: Service[] = [
  {
    id: "tatuaje",
    title: "Tatuaje a medida",
    kicker: "Diseño propio",
    description:
      "Partimos de tu idea y la convertimos en un diseño pensado para tu cuerpo. Realismo, black & grey, japonés, tradicional o color: cada pieza se dibuja para ti.",
    image: "/images/work/skull-sketch.jpg",
    alt: "Boceto de calavera con crucifijo dibujado a mano en el estudio",
  },
  {
    id: "cover-up",
    title: "Cover-up",
    kicker: "Segunda oportunidad",
    description:
      "¿Un tatuaje que ya no te representa? Lo transformamos en una pieza nueva, con composición y sombras trabajadas para cubrir sin perder fuerza.",
    image: "/images/work/hannya-coverup.jpg",
    alt: "Cover-up de máscara hannya en antebrazo realizado en Libertad Estudio",
  },
  {
    id: "lettering",
    title: "Lettering & caligrafía",
    kicker: "La letra como arte",
    description:
      "Nombres, frases y caligrafía con carácter: trazos gruesos, letra gótica y composiciones que siguen la forma de tu cuerpo.",
    image: "/images/work/lettering-arm.jpg",
    alt: "Lettering caligráfico en antebrazo",
  },
  {
    id: "piercing",
    title: "Body piercing",
    kicker: "Tattoo & Bodypiercing",
    description:
      "Además de tatuajes, en el estudio realizamos perforaciones. Escríbenos para conocer opciones, joyería y disponibilidad.",
  },
];

export type Artist = {
  name: string;
  handle?: string;
  avatar: string;
  work?: { src: string; alt: string; caption: string };
};

export const artists: Artist[] = [
  {
    name: "Risek",
    handle: "risek.tattoo",
    avatar: "/images/logo.png",
    work: {
      src: "/images/work/owl.jpg",
      alt: "Tatuaje realista de tucúquere en antebrazo por Risek",
      caption: "Tucúquere — realismo",
    },
  },
  {
    name: "Pereza Ink",
    handle: "pereza.ink",
    avatar: "/images/artists/pereza.jpg",
    work: {
      src: "/images/work/rat-pizza.jpg",
      alt: "Tatuaje de rata y pizza en antebrazo por Pereza Ink",
      caption: "Rata & pizza — black & grey + color",
    },
  },
  {
    name: "Atramentttoo",
    handle: "atramentttoo",
    avatar: "/images/artists/atramentttoo.jpg",
    work: {
      src: "/images/work/pinup-bat.jpg",
      alt: "Tatuaje tradicional de pin-up con alas de murciélago por Atramentttoo",
      caption: "Pin-up — tradicional",
    },
  },
  {
    name: "Tomazakre",
    avatar: "/images/artists/tomazakre.jpg",
  },
];

export type Category = "black-grey" | "color" | "japones" | "lettering" | "tradicional";

export const categories: { id: Category | "all"; label: string }[] = [
  { id: "all", label: "Todo" },
  { id: "black-grey", label: "Black & Grey" },
  { id: "japones", label: "Japonés" },
  { id: "tradicional", label: "Tradicional" },
  { id: "lettering", label: "Lettering" },
  { id: "color", label: "Color" },
];

export type Work = {
  src: string;
  alt: string;
  title: string;
  artist?: string;
  w: number;
  h: number;
  cats: Category[];
};

export const works: Work[] = [
  { src: "/images/work/owl.jpg", title: "Tucúquere", artist: "risek.tattoo", alt: "Búho realista en antebrazo", w: 1220, h: 1708, cats: ["black-grey"] },
  { src: "/images/work/hannya-coverup.jpg", title: "Hannya — cover-up", artist: "atramentttoo", alt: "Máscara hannya como cover-up en antebrazo", w: 1220, h: 1275, cats: ["japones", "black-grey"] },
  { src: "/images/work/sparrow.jpg", title: "Gorrión", artist: "pereza.ink", alt: "Gorrión en línea fina sobre el brazo", w: 1085, h: 846, cats: ["black-grey"] },
  { src: "/images/work/head-hannya.jpg", title: "Hannya en cabeza", alt: "Máscara hannya tatuada en la cabeza", w: 403, h: 452, cats: ["japones", "black-grey"] },
  { src: "/images/work/pinup-bat.jpg", title: "Pin-up murciélago", artist: "atramentttoo", alt: "Pin-up tradicional con alas rojas de murciélago", w: 1220, h: 1342, cats: ["tradicional"] },
  { src: "/images/work/lettering-back.jpg", title: "Caligrafía", alt: "Caligrafía gótica en el costado", w: 403, h: 451, cats: ["lettering"] },
  { src: "/images/work/dragon.jpg", title: "Dragón", alt: "Dragón japonés en el muslo", w: 402, h: 452, cats: ["japones", "black-grey"] },
  { src: "/images/work/rat-pizza.jpg", title: "Rata & pizza", artist: "pereza.ink", alt: "Rata realista bajo una pizza a color", w: 1220, h: 1126, cats: ["color", "black-grey"] },
  { src: "/images/work/hannya-hand.jpg", title: "Hannya en mano", alt: "Máscara hannya con flores de cerezo en la mano", w: 403, h: 451, cats: ["japones", "color"] },
  { src: "/images/work/cherub.jpg", title: "Querubín & rosa", alt: "Manga black & grey con querubín y rosa", w: 403, h: 451, cats: ["black-grey", "lettering"] },
  { src: "/images/work/jellyfish.jpg", title: "Medusa", alt: "Medusa en tinta azul", w: 403, h: 451, cats: ["color"] },
  { src: "/images/work/skulls.jpg", title: "Calaveras", alt: "Par de calaveras black & grey", w: 402, h: 451, cats: ["black-grey"] },
  { src: "/images/work/pinup-flames.jpg", title: "Pin-up en llamas", alt: "Pin-up tradicional entre llamas rojas", w: 402, h: 451, cats: ["tradicional"] },
  { src: "/images/work/dog.jpg", title: "Retrato de mascota", alt: "Retrato realista de perro a color", w: 403, h: 451, cats: ["color"] },
  { src: "/images/work/lettering-arm.jpg", title: "Lettering", alt: "Lettering caligráfico en antebrazo", w: 403, h: 343, cats: ["lettering"] },
  { src: "/images/work/biomech.jpg", title: "Bestia", alt: "Criatura black & grey de estilo oscuro", w: 402, h: 343, cats: ["black-grey"] },
  { src: "/images/work/portrait-color.jpg", title: "Retrato a color", alt: "Retrato ilustrativo a color en el brazo", w: 402, h: 343, cats: ["color"] },
  { src: "/images/work/skull-sketch.jpg", title: "Boceto original", alt: "Boceto de calavera dibujado a mano", w: 403, h: 451, cats: ["black-grey"] },
];
