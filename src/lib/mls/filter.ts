import type { Listing, ListingSearch, SortOption } from "./types";

/** In-memory filter used by the sample provider and for merging feeds. */
export function matchesSearch(l: Listing, p: ListingSearch): boolean {
  if (p.state && l.address.state !== p.state) return false;
  if (p.transaction && l.transaction !== p.transaction) return false;
  if (p.type && l.propertyType !== p.type) return false;
  if (p.minPrice && l.price < p.minPrice) return false;
  if (p.maxPrice && l.price > p.maxPrice) return false;
  if (p.beds && (l.beds ?? 0) < p.beds) return false;
  if (p.baths && (l.baths ?? 0) < p.baths) return false;
  if (p.statelineOnly && !l.isStatelineListing) return false;
  if (p.q) {
    const hay = [
      l.address.street,
      l.address.city,
      l.address.zip,
      l.address.county,
      l.address.state,
      l.subdivision,
      l.mlsNumber,
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();
    const terms = p.q.toLowerCase().split(/[\s,]+/).filter(Boolean);
    if (!terms.every((t) => hay.includes(t))) return false;
  }
  return true;
}

export function sortListings(list: Listing[], sort: SortOption = "newest"): Listing[] {
  const copy = [...list];
  switch (sort) {
    case "price-asc":
      return copy.sort((a, b) => a.price - b.price);
    case "price-desc":
      return copy.sort((a, b) => b.price - a.price);
    case "sqft-desc":
      return copy.sort((a, b) => (b.sqft ?? 0) - (a.sqft ?? 0));
    default:
      return copy.sort((a, b) => (a.daysOnMarket ?? 0) - (b.daysOnMarket ?? 0));
  }
}

/**
 * Properties near the state line are often listed in BOTH MLSes.
 * Keep the first copy of each street address + zip.
 */
export function dedupeAcrossFeeds(list: Listing[]): Listing[] {
  const seen = new Set<string>();
  return list.filter((l) => {
    const key = `${l.address.street}|${l.address.unit ?? ""}|${l.address.zip}`
      .toLowerCase()
      .replace(/[^a-z0-9|]/g, "");
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}
