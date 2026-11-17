import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import PageHero from "@/components/ui/PageHero";
import SearchFilters from "@/components/listings/SearchFilters";
import ListingCard from "@/components/listings/ListingCard";
import MlsDisclaimer from "@/components/listings/MlsDisclaimer";
import { searchListings, PROPERTY_TYPES, type ListingSearch, type PropertyType, type SortOption } from "@/lib/mls";
import { photos } from "@/lib/site";
import { cn } from "@/lib/cn";

export const metadata: Metadata = {
  title: "Homes for Sale & Rent in Georgia and Alabama",
  description:
    "Search every Georgia MLS and Alabama MLS listing in one place: homes, land, farms, and rentals on both sides of the state line.",
};

export const dynamic = "force-dynamic";

const PAGE_SIZE = 12;

function one(v: string | string[] | undefined) {
  return Array.isArray(v) ? v[0] : v;
}
function num(v: string | undefined) {
  const n = v ? Number(v) : NaN;
  return Number.isFinite(n) && n > 0 ? n : undefined;
}

function parseSearch(sp: Record<string, string | string[] | undefined>): ListingSearch {
  const state = one(sp.state);
  const type = one(sp.type);
  const sort = one(sp.sort);
  return {
    q: one(sp.q)?.slice(0, 120),
    state: state === "GA" || state === "AL" ? state : undefined,
    transaction: one(sp.transaction) === "rent" ? "rent" : "sale",
    type: PROPERTY_TYPES.includes(type as PropertyType) ? (type as PropertyType) : undefined,
    minPrice: num(one(sp.minPrice)),
    maxPrice: num(one(sp.maxPrice)),
    beds: num(one(sp.beds)),
    baths: num(one(sp.baths)),
    statelineOnly: one(sp.stateline) === "1",
    sort: (["newest", "price-asc", "price-desc", "sqft-desc"] as SortOption[]).includes(sort as SortOption)
      ? (sort as SortOption)
      : "newest",
    page: num(one(sp.page)) ?? 1,
    pageSize: PAGE_SIZE,
  };
}

export default async function PropertiesPage({ searchParams }: PageProps<"/properties">) {
  const sp = await searchParams;
  const search = parseSearch(sp);
  const result = await searchListings(search);
  const isRent = search.transaction === "rent";

  const pageHref = (p: number) => {
    const q = new URLSearchParams();
    for (const [k, v] of Object.entries(sp)) {
      const val = one(v as string | string[] | undefined);
      if (val && k !== "page") q.set(k, val);
    }
    if (p > 1) q.set("page", String(p));
    const s = q.toString();
    return `/properties${s ? `?${s}` : ""}`;
  };

  return (
    <>
      <PageHero
        short
        image={isRent ? photos.bohoLiving : photos.porchHome}
        eyebrow="Georgia MLS · Alabama MLS"
        title={isRent ? "Homes for Rent" : "Find a Home"}
        script="on both sides of the line"
      />

      <section className="bg-cream pb-24">
        <div className="container-x -mt-10 relative z-10">
          <Suspense>
            <SearchFilters total={result.total} />
          </Suspense>

          {result.listings.length ? (
            <div className="mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {result.listings.map((l, i) => (
                <ListingCard key={l.id} listing={l} priority={i < 3} />
              ))}
            </div>
          ) : (
            <div className="mt-10 rounded-3xl bg-white p-12 text-center shadow-soft">
              <p className="font-display text-3xl uppercase tracking-wide text-ink">No homes match those filters</p>
              <p className="mt-3">Try widening your price range or searching both states.</p>
              <Link href={isRent ? "/properties?transaction=rent" : "/properties"} className="mt-6 inline-block font-semibold text-teal-deep underline underline-offset-4">
                Clear all filters
              </Link>
            </div>
          )}

          {result.totalPages > 1 && (
            <nav aria-label="Pagination" className="mt-12 flex flex-wrap justify-center gap-2">
              {Array.from({ length: result.totalPages }, (_, i) => i + 1).map((p) => (
                <Link
                  key={p}
                  href={pageHref(p)}
                  aria-current={p === result.page ? "page" : undefined}
                  className={cn(
                    "flex h-11 min-w-11 items-center justify-center rounded-full px-3 text-sm font-semibold",
                    p === result.page ? "bg-teal text-white" : "bg-white text-ink hover:bg-sand",
                  )}
                >
                  {p}
                </Link>
              ))}
            </nav>
          )}

          <div className="mt-14">
            <MlsDisclaimer sources={result.sources} />
          </div>
        </div>
      </section>
    </>
  );
}
