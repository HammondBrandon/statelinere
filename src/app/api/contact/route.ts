import { NextRequest, NextResponse } from "next/server";
import { leadSchema, TOPIC_LABELS, PM_TOPICS } from "@/lib/lead-schema";
import { site } from "@/lib/site";

const esc = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const parsed = leadSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Validation failed" }, { status: 422 });
  }
  const lead = parsed.data;

  // Honeypot filled → pretend success, drop silently.
  if (lead.website) return NextResponse.json({ success: true });

  const isPm = PM_TOPICS.includes(lead.topic);
  const to = isPm
    ? process.env.PM_TO_EMAIL ?? process.env.CONTACT_TO_EMAIL ?? site.pmEmail
    : process.env.CONTACT_TO_EMAIL ?? site.email;
  const topic = TOPIC_LABELS[lead.topic];

  const rows: [string, string | undefined][] = [
    ["Name", lead.name],
    ["Email", lead.email],
    ["Phone", lead.phone],
    ["Topic", topic],
    ["Property", lead.propertyAddress],
    ["Listing", lead.listingRef],
  ];

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.log("[lead]", { to, ...lead });
    return NextResponse.json({ success: true });
  }

  const text = [
    `New ${isPm ? site.pmName : site.name} inquiry`,
    "",
    ...rows.filter(([, v]) => v).map(([k, v]) => `${k}: ${v}`),
    "",
    lead.message,
  ].join("\n");

  const html = `
<div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;color:#1d2a2f">
  <div style="background:#0097b2;padding:20px 28px;border-bottom:6px solid #fec52b">
    <p style="margin:0;color:#fff;font-size:18px;letter-spacing:.08em;text-transform:uppercase">${esc(isPm ? site.pmName : site.name)}</p>
    <p style="margin:4px 0 0;color:#fff;opacity:.85;font-size:12px">New website inquiry — ${esc(topic)}</p>
  </div>
  <table style="width:100%;border-collapse:collapse;margin:24px 0">
    ${rows
      .filter(([, v]) => v)
      .map(
        ([k, v]) =>
          `<tr><td style="padding:8px 28px;font-size:11px;text-transform:uppercase;letter-spacing:.1em;color:#6f7c81;width:110px">${k}</td><td style="padding:8px 0;font-size:14px">${esc(v!)}</td></tr>`,
      )
      .join("")}
  </table>
  <div style="margin:0 28px 28px;padding:18px 20px;background:#fbf8f3;border-left:3px solid #fec52b;font-size:14px;line-height:1.6;white-space:pre-wrap">${esc(lead.message)}</div>
</div>`;

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: process.env.CONTACT_FROM_EMAIL ?? `${site.name} <no-reply@statelinerealtyco.com>`,
        to: [to],
        reply_to: lead.email,
        subject: `${topic} — ${lead.name}`,
        text,
        html,
      }),
    });
    if (!res.ok) {
      console.error("[resend]", await res.text());
      return NextResponse.json({ error: "Failed to send" }, { status: 502 });
    }
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[contact]", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
