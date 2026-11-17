/**
 * Single entry point for listing data.
 *
 * Pages call searchListings / getListing / getFeaturedListings and never talk
 * to a feed directly. Configured feeds (GAMLS, Alabama MLS) are queried in
 * parallel and merged; if neither is configured yet, sample data is used.
 */
import type {
  Listing,
  ListingSearch,
  ListingSearchResult,
  MlsProvider,
  MlsSource,
} from "./types";
import { gamlsProvider } from "./providers/gamls";
import { alabamaProvider } from "./providers/alabama";
import { sampleProvider } from "./providers/sample";
import { dedupeAcrossFeeds, sortListings } from "./filter";

export * from "./types";

const LIVE_PROVIDERS: MlsProvider[] = [gamlsProvider, alabamaProvider];

function activeProviders(): MlsProvider[] {
  const live = LIVE_PROVIDERS.filter((p) => p.isConfigured());
  return live.length ? live : [sampleProvider];
}

export function providerLabel(source: MlsSource): string {
  return [...LIVE_PROVIDERS, sampleProvider].find((p) => p.source === source)?.label ?? source;
}

export async function searchListings(params: ListingSearch): Promise<ListingSearchResult> {
  const providers = activeProviders();
  const page = Math.max(1, params.page ?? 1);
  const pageSize = params.pageSize ?? 12;

  // Ask each feed for enough rows to cover this page after merging.
  const want = page * pageSize;
  const settled = await Promise.allSettled(
    providers.map((p) => p.search({ ...params, page: 1, pageSize: want })),
  );

  const merged: Listing[] = [];
  let total = 0;
  const sources: MlsSource[] = [];
  settled.forEach((r, i) => {
    if (r.status === "fulfilled") {
      merged.push(...r.value.listings);
      total += r.value.total;
      sources.push(providers[i].source);
    } else {
      console.error(`[mls] ${providers[i].source} search failed`, r.reason);
    }
  });

  const unique = sortListings(dedupeAcrossFeeds(merged), params.sort);
  const removedDupes = merged.length - unique.length;
  total = Math.max(unique.length, total - removedDupes);
  const start = (page - 1) * pageSize;

  return {
    listings: unique.slice(start, start + pageSize),
    total,
    page,
    pageSize,
    totalPages: Math.max(1, Math.ceil(total / pageSize)),
    sources,
    isSample: providers[0] === sampleProvider,
  };
}

/** id format: `${source}-${mlsNumber}` e.g. "gamls-10234567" */
export async function getListing(id: string): Promise<Listing | null> {
  const dash = id.indexOf("-");
  if (dash < 1) return null;
  const source = id.slice(0, dash).toUpperCase();
  const mlsNumber = id.slice(dash + 1);
  const provider = activeProviders().find((p) => p.source === source);
  if (!provider) return null;
  try {
    return await provider.getByMlsNumber(mlsNumber);
  } catch (err) {
    console.error(`[mls] ${source} lookup failed`, err);
    return null;
  }
}

/** Homepage grid: Stateline's own active sale listings first, then newest. */
export async function getFeaturedListings(limit = 6): Promise<Listing[]> {
  const { listings } = await searchListings({ transaction: "sale", pageSize: 40 });
  const active = listings.filter((l) => l.status === "Active" || l.status === "Coming Soon");
  const ours = active.filter((l) => l.isStatelineListing);
  const rest = active.filter((l) => !l.isStatelineListing);
  return [...ours, ...rest].slice(0, limit);
}

export async function getRentals(limit = 6): Promise<Listing[]> {
  const { listings } = await searchListings({ transaction: "rent", pageSize: limit });
  return listings;
}

export async function getSimilarListings(listing: Listing, limit = 3): Promise<Listing[]> {
  const { listings } = await searchListings({
    transaction: listing.transaction,
    state: listing.address.state,
    pageSize: limit + 1,
  });
  return listings.filter((l) => l.id !== listing.id).slice(0, limit);
}

export function formatPrice(l: Pick<Listing, "price" | "transaction">): string {
  const s = l.price.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });
  return l.transaction === "rent" ? `${s}/mo` : s;
}

export function formatAddressLine2(l: Listing): string {
  return `${l.address.city}, ${l.address.state} ${l.address.zip}`;
}
