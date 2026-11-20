"use client";

import type { ReactNode } from "react";

export const SERVICE_EVENT = "libertad:service";

/** Lleva al formulario y preselecciona el servicio elegido. */
export default function ServiceCTA({ service, children, className = "" }: { service: string; children: ReactNode; className?: string }) {
  return (
    <a
      href="#contacto"
      className={className}
      onClick={() => window.dispatchEvent(new CustomEvent(SERVICE_EVENT, { detail: service }))}
    >
      {children}
    </a>
  );
}
