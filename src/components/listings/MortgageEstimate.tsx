"use client";

import { useState } from "react";

/** Lightweight monthly payment estimate for the listing page. */
export default function MortgageEstimate({
  price,
  taxAnnual,
  hoa,
}: {
  price: number;
  taxAnnual?: number;
  hoa?: number;
}) {
  const [down, setDown] = useState(10);
  const [rate, setRate] = useState(6.5);
  const [years, setYears] = useState(30);

  const loan = price * (1 - down / 100);
  const r = rate / 100 / 12;
  const n = years * 12;
  const pi = r === 0 ? loan / n : (loan * r) / (1 - Math.pow(1 + r, -n));
  const tax = (taxAnnual ?? price * 0.008) / 12;
  const ins = (price * 0.0045) / 12;
  const total = pi + tax + ins + (hoa ?? 0);
  const fmt = (v: number) => v.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

  return (
    <section className="mt-12 rounded-3xl bg-white p-7 ring-1 ring-line/70">
      <h2 className="font-display text-3xl uppercase tracking-wide">Estimate Your Payment</h2>
      <div className="mt-6 grid gap-8 md:grid-cols-[1fr_auto] md:items-center">
        <div className="grid gap-5 sm:grid-cols-3">
          <label>
            <span className="field-label">Down payment</span>
            <select className="field" value={down} onChange={(e) => setDown(Number(e.target.value))}>
              {[0, 3.5, 5, 10, 15, 20, 25].map((d) => <option key={d} value={d}>{d}%</option>)}
            </select>
          </label>
          <label>
            <span className="field-label">Rate %</span>
            <input className="field" type="number" step="0.125" min="0" max="15" value={rate} onChange={(e) => setRate(Number(e.target.value) || 0)} />
          </label>
          <label>
            <span className="field-label">Term</span>
            <select className="field" value={years} onChange={(e) => setYears(Number(e.target.value))}>
              {[30, 20, 15].map((y) => <option key={y} value={y}>{y} years</option>)}
            </select>
          </label>
        </div>
        <div className="rounded-2xl bg-teal-mist px-7 py-5 text-center">
          <p className="text-xs uppercase tracking-[0.16em] text-ink-muted">Est. monthly</p>
          <p className="font-display text-4xl text-teal-deep" aria-live="polite">{fmt(total)}</p>
        </div>
      </div>
      <p className="mt-5 text-xs text-ink-muted">
        Principal &amp; interest {fmt(pi)} · Taxes {fmt(tax)} · Insurance {fmt(ins)}
        {hoa ? ` · HOA ${fmt(hoa)}` : ""}. Estimate only; talk to a lender for an exact quote.
      </p>
    </section>
  );
}
