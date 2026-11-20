import type { ComponentPropsWithoutRef, ReactNode } from "react";

type Props = ComponentPropsWithoutRef<"a"> & {
  variant?: "solid" | "ghost";
  icon?: ReactNode;
};

/** Enlace con forma de botón y relleno animado al pasar el cursor. */
export default function Button({ variant = "solid", icon, className = "", children, ...rest }: Props) {
  const base =
    "group relative inline-flex items-center justify-center gap-3 overflow-hidden rounded-full px-7 py-4 text-[0.78rem] font-semibold uppercase tracking-[0.18em] transition-[color,border-color,transform] duration-500 ease-out-expo active:scale-[0.97]";
  const styles =
    variant === "solid"
      ? "bg-bone text-ink hover:text-bone"
      : "border border-bone/30 text-bone hover:border-blood hover:text-bone";
  return (
    <a className={`${base} ${styles} ${className}`} {...rest}>
      <span
        aria-hidden
        className="absolute inset-0 origin-bottom scale-y-0 rounded-full bg-blood transition-transform duration-500 ease-out-expo group-hover:scale-y-100"
      />
      <span className="relative">{children}</span>
      {icon ?? (
        <svg aria-hidden viewBox="0 0 24 24" className="relative h-4 w-4 transition-transform duration-500 ease-out-expo group-hover:translate-x-1 group-hover:-rotate-45" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M4 12h16m-6-6 6 6-6 6" />
        </svg>
      )}
    </a>
  );
}
