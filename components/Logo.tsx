import Image from "next/image";

/** Insignia circular original del estudio. */
export default function Logo({ size = 40, className = "", priority = false }: { size?: number; className?: string; priority?: boolean }) {
  return (
    <Image
      src="/images/logo.png"
      alt="Logo de Libertad Estudio"
      width={size}
      height={size}
      priority={priority}
      className={`rounded-full ${className}`}
    />
  );
}
