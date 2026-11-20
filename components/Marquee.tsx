import { styles } from "@/lib/site";
import { Star } from "./Icons";

export default function Marquee() {
  const row = [...styles, ...styles];
  return (
    <div className="relative overflow-hidden border-y border-bone/10 bg-coal py-6 md:py-8" aria-label="Estilos que trabajamos">
      <ul className="flex w-max animate-marquee items-center hover:[animation-play-state:paused]">
        {row.map((s, i) => (
          <li key={i} className="flex items-center" aria-hidden={i >= styles.length}>
            <span className={`px-8 font-display text-4xl uppercase md:text-6xl ${i % 2 ? "text-outline" : "text-bone"}`}>{s}</span>
            <Star className="h-5 w-5 text-blood md:h-6 md:w-6" />
          </li>
        ))}
      </ul>
    </div>
  );
}
