"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Search } from "lucide-react";
import { cn } from "@/lib/cn";

/** Brickly-style search bar that sits in the hero and hands off to /properties. */
export default function QuickSearch() {
  const router = useRouter();
  const [mode, setMode] = useState<"sale" | "rent">("sale");
  const [q, setQ] = useState("");
  const [state, setState] = useState("");

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const sp = new URLSearchParams();
    if (mode === "rent") sp.set("transaction", "rent");
    if (q.trim()) sp.set("q", q.trim());
    if (state) sp.set("state", state);
    router.push(`/properties${sp.size ? `?${sp}` : ""}`);
  }

  return (
    <div className="mx-auto w-full max-w-3xl text-left">
      <div role="tablist" aria-label="Search type" className="mb-0 inline-flex overflow-hidden rounded-t-2xl">
        {(
          [
            ["sale", "Buy"],
            ["rent", "Rent"],
          ] as const
        ).map(([v, label]) => (
          <button
            key={v}
            role="tab"
            type="button"
            aria-selected={mode === v}
            onClick={() => setMode(v)}
            className={cn(
              "px-7 py-3 text-xs font-semibold uppercase tracking-[0.2em] transition-colors",
              mode === v ? "bg-white text-ink" : "bg-white/20 text-white backdrop-blur hover:bg-white/30",
            )}
          >
            {label}
          </button>
        ))}
      </div>
      <form
        onSubmit={submit}
        className="flex flex-col gap-2 rounded-2xl rounded-tl-none bg-white p-2.5 shadow-lift sm:flex-row sm:items-center"
      >
        <label htmlFor="hero-q" className="sr-only">City, ZIP, or address</label>
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-muted" aria-hidden />
          <input
            id="hero-q"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="City, ZIP, county, or address"
            className="w-full rounded-xl bg-transparent py-3.5 pl-11 pr-4 text-ink placeholder:text-ink-muted outline-none focus:bg-cream"
          />
        </div>
        <label htmlFor="hero-state" className="sr-only">State</label>
        <select
          id="hero-state"
          value={state}
          onChange={(e) => setState(e.target.value)}
          className="rounded-xl border border-line bg-white px-4 py-3.5 text-sm text-ink sm:w-44"
        >
          <option value="">Both states</option>
          <option value="GA">Georgia</option>
          <option value="AL">Alabama</option>
        </select>
        <button
          type="submit"
          className="rounded-xl bg-sun px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.18em] text-ink hover:bg-sun-deep"
        >
          Search Homes
        </button>
      </form>
    </div>
  );
}
