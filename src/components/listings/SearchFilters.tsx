"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useState, useTransition } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { PROPERTY_TYPES } from "@/lib/mls/types";
import { cn } from "@/lib/cn";

const PRICE_SALE = [100000, 150000, 200000, 250000, 300000, 400000, 500000, 750000, 1000000];
const PRICE_RENT = [800, 1000, 1250, 1500, 1750, 2000, 2500, 3000];

function money(n: number) {
  return n >= 1000000 ? `$${n / 1000000}M` : n >= 1000 ? `$${n / 1000}K` : `$${n}`;
}

export default function SearchFilters({ total }: { total: number }) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const [pending, startTransition] = useTransition();
  const [showMore, setShowMore] = useState(false);
  const [q, setQ] = useState(params.get("q") ?? "");

  const transaction = params.get("transaction") ?? "sale";
  const prices = transaction === "rent" ? PRICE_RENT : PRICE_SALE;

  function update(next: Record<string, string | null>) {
    const sp = new URLSearchParams(params.toString());
    for (const [k, v] of Object.entries(next)) {
      if (v) sp.set(k, v);
      else sp.delete(k);
    }
    sp.delete("page");
    startTransition(() => router.push(`${pathname}?${sp.toString()}`, { scroll: false }));
  }

  const activeCount = ["type", "minPrice", "maxPrice", "beds", "baths", "state", "stateline"].filter((k) =>
    params.get(k),
  ).length;

  return (
    <div className={cn("rounded-3xl bg-white p-4 sm:p-5 shadow-lift ring-1 ring-line/60 transition-opacity", pending && "opacity-70")}>
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
        {/* Buy / Rent toggle */}
        <div role="radiogroup" aria-label="Buy or rent" className="inline-flex shrink-0 rounded-full bg-cream p-1">
          {[
            ["sale", "Buy"],
            ["rent", "Rent"],
          ].map(([v, label]) => (
            <button
              key={v}
              type="button"
              role="radio"
              aria-checked={transaction === v}
              onClick={() => update({ transaction: v === "sale" ? null : v, minPrice: null, maxPrice: null })}
              className={cn(
                "rounded-full px-6 py-2.5 text-xs font-semibold uppercase tracking-[0.16em]",
                transaction === v ? "bg-teal text-white shadow-soft" : "text-ink-soft hover:text-ink",
              )}
            >
              {label}
            </button>
          ))}
        </div>

        <form
          className="relative flex-1"
          onSubmit={(e) => {
            e.preventDefault();
            update({ q: q.trim() || null });
          }}
        >
          <label htmlFor="listing-q" className="sr-only">City, ZIP, county, or address</label>
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-muted" aria-hidden />
          <input
            id="listing-q"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="City, ZIP, county, or address"
            className="field !rounded-full !pl-11 !pr-28"
          />
          <button type="submit" className="absolute right-1.5 top-1/2 -translate-y-1/2 rounded-full bg-sun px-5 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-ink hover:bg-sun-deep">
            Search
          </button>
        </form>

        {/* State chips */}
        <div role="radiogroup" aria-label="State" className="inline-flex shrink-0 rounded-full bg-cream p-1">
          {[
            ["", "Both"],
            ["GA", "GA"],
            ["AL", "AL"],
          ].map(([v, label]) => {
            const on = (params.get("state") ?? "") === v;
            return (
              <button
                key={label}
                type="button"
                role="radio"
                aria-checked={on}
                onClick={() => update({ state: v || null })}
                className={cn(
                  "rounded-full px-4 py-2.5 text-xs font-semibold uppercase tracking-[0.14em]",
                  on ? "bg-ink text-white" : "text-ink-soft hover:text-ink",
                )}
              >
                {label}
              </button>
            );
          })}
        </div>

        <button
          type="button"
          onClick={() => setShowMore((v) => !v)}
          aria-expanded={showMore}
          aria-controls="more-filters"
          className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full border border-line px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.14em] text-ink hover:border-teal"
        >
          <SlidersHorizontal className="h-4 w-4" aria-hidden />
          Filters{activeCount ? ` (${activeCount})` : ""}
        </button>
      </div>

      <div id="more-filters" hidden={!showMore} className="mt-4 border-t border-line pt-4">
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
          <Select label="Property type" value={params.get("type") ?? ""} onChange={(v) => update({ type: v || null })}>
            <option value="">Any type</option>
            {PROPERTY_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
          </Select>
          <Select label="Min price" value={params.get("minPrice") ?? ""} onChange={(v) => update({ minPrice: v || null })}>
            <option value="">No min</option>
            {prices.map((p) => <option key={p} value={p}>{money(p)}</option>)}
          </Select>
          <Select label="Max price" value={params.get("maxPrice") ?? ""} onChange={(v) => update({ maxPrice: v || null })}>
            <option value="">No max</option>
            {prices.map((p) => <option key={p} value={p}>{money(p)}</option>)}
          </Select>
          <Select label="Beds" value={params.get("beds") ?? ""} onChange={(v) => update({ beds: v || null })}>
            <option value="">Any</option>
            {[1, 2, 3, 4, 5].map((n) => <option key={n} value={n}>{n}+</option>)}
          </Select>
          <Select label="Baths" value={params.get("baths") ?? ""} onChange={(v) => update({ baths: v || null })}>
            <option value="">Any</option>
            {[1, 2, 3, 4].map((n) => <option key={n} value={n}>{n}+</option>)}
          </Select>
          <div className="flex items-end">
            <label className="flex w-full cursor-pointer items-center gap-3 rounded-xl border border-line px-4 py-3 text-sm">
              <input
                type="checkbox"
                className="h-4 w-4 accent-teal"
                checked={params.get("stateline") === "1"}
                onChange={(e) => update({ stateline: e.target.checked ? "1" : null })}
              />
              Stateline only
            </label>
          </div>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-sm">
        <p className="text-ink-muted" aria-live="polite">
          <strong className="text-ink">{total.toLocaleString()}</strong> {total === 1 ? "home" : "homes"} found
        </p>
        <div className="flex items-center gap-3">
          {(activeCount > 0 || params.get("q")) && (
            <button
              type="button"
              onClick={() => {
                setQ("");
                startTransition(() => router.push(transaction === "rent" ? `${pathname}?transaction=rent` : pathname, { scroll: false }));
              }}
              className="inline-flex items-center gap-1 text-ink-muted hover:text-ink"
            >
              <X className="h-3.5 w-3.5" aria-hidden /> Clear
            </button>
          )}
          <label htmlFor="sort" className="sr-only">Sort</label>
          <select
            id="sort"
            value={params.get("sort") ?? "newest"}
            onChange={(e) => update({ sort: e.target.value === "newest" ? null : e.target.value })}
            className="rounded-full border border-line bg-white px-4 py-2 text-sm text-ink"
          >
            <option value="newest">Newest</option>
            <option value="price-asc">Price: low to high</option>
            <option value="price-desc">Price: high to low</option>
            <option value="sqft-desc">Largest</option>
          </select>
        </div>
      </div>
    </div>
  );
}

function Select({
  label,
  value,
  onChange,
  children,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="field-label">{label}</span>
      <select value={value} onChange={(e) => onChange(e.target.value)} className="field !py-3">
        {children}
      </select>
    </label>
  );
}
