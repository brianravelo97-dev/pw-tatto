import { NextResponse } from "next/server";

export const runtime = "nodejs";

type Payload = {
  nombre?: string;
  contacto?: string;
  servicio?: string;
  artista?: string;
  zona?: string;
  tamano?: string;
  idea?: string;
  empresa?: string; // honeypot
};

const clean = (v: unknown, max = 600) => (typeof v === "string" ? v.trim().slice(0, max) : "");

/**
 * Recibe las consultas del formulario y las reenvía a CONTACT_WEBHOOK_URL
 * (Make, Zapier, n8n, Formspree, Google Apps Script, Slack, etc.).
 */
export async function POST(req: Request) {
  let body: Payload;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  // Bots: el campo oculto debe venir vacío.
  if (clean(body.empresa)) return NextResponse.json({ ok: true });

  const data = {
    nombre: clean(body.nombre, 120),
    contacto: clean(body.contacto, 160),
    servicio: clean(body.servicio, 60),
    artista: clean(body.artista, 60),
    zona: clean(body.zona, 120),
    tamano: clean(body.tamano, 60),
    idea: clean(body.idea, 2000),
  };

  if (!data.nombre || !data.contacto || !data.idea) {
    return NextResponse.json({ ok: false, error: "missing_fields" }, { status: 422 });
  }

  const webhook = process.env.CONTACT_WEBHOOK_URL;
  if (!webhook) {
    return NextResponse.json({ ok: false, error: "not_configured" }, { status: 503 });
  }

  try {
    const res = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ ...data, origen: "web", fecha: new Date().toISOString() }),
      signal: AbortSignal.timeout(10_000),
    });
    if (!res.ok) throw new Error(`Webhook ${res.status}`);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[contact]", err);
    return NextResponse.json({ ok: false, error: "delivery_failed" }, { status: 502 });
  }
}
