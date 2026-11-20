import Logo from "./Logo";

/** Sello giratorio que reproduce el anillo de texto del logo original. */
export default function Badge({ className = "" }: { className?: string }) {
  const text = "LIBERTAD STUDIO · TATTOO & BODYPIERCING · ";
  return (
    <div className={`grid aspect-square place-items-center ${className || "relative"}`}>
      <svg viewBox="0 0 200 200" className="absolute inset-0 h-full w-full animate-spin-slow" aria-hidden>
        <defs>
          <path id="badge-circle" d="M100,100 m-82,0 a82,82 0 1,1 164,0 a82,82 0 1,1 -164,0" />
        </defs>
        <text className="fill-bone font-sans text-[13.2px] font-medium uppercase" letterSpacing="3.6">
          <textPath href="#badge-circle">{text}</textPath>
        </text>
      </svg>
      <Logo size={88} className="w-[46%] h-auto" />
    </div>
  );
}
