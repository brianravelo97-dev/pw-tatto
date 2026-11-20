import type { ReactNode } from "react";

export default function SectionHeading({
  index,
  label,
  title,
  className = "",
}: {
  index: string;
  label: string;
  title: ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <p className="reveal eyebrow flex items-center gap-3">
        <span className="text-blood">({index})</span>
        <span className="h-px w-10 bg-bone/25" />
        {label}
      </p>
      <h2 className="reveal mt-6 font-display text-[13vw] uppercase leading-[0.9] sm:text-7xl lg:text-8xl" style={{ ["--delay" as string]: "100ms" }}>
        {title}
      </h2>
    </div>
  );
}
