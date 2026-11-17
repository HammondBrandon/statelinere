/**
 * Normalized listing model shared by every MLS feed.
 *
 * Stateline pulls from two MLSes — Georgia MLS (GAMLS) and an Alabama MLS.
 * Each provider maps its raw fields into this shape, so the UI never needs
 * to know which feed a listing came from (except for the required
 * per-MLS attribution / disclaimer, which uses `source`).
 */

export type MlsSource = "GAMLS" | "ALMLS" | "SAMPLE";

export type StateCode = "GA" | "AL";

export type TransactionType = "sale" | "rent";

export type ListingStatus =
  | "Active"
  | "Coming Soon"
  | "Under Contract"
  | "Pending"
  | "Sold"
  | "Leased";

export type PropertyType =
  | "Single Family"
  | "Townhome"
  | "Condo"
  | "Multi-Family"
  | "Land"
  | "Farm & Ranch"
  | "Commercial";

export const PROPERTY_TYPES: PropertyType[] = [
  "Single Family",
  "Townhome",
  "Condo",
  "Multi-Family",
  "Land",
  "Farm & Ranch",
  "Commercial",
];

export interface ListingAgent {
  name: string;
  phone?: string;
  email?: string;
  office?: string;
  photo?: string;
}

export interface Listing {
  /** Stable URL id: `${source}-${mlsNumber}` lower-cased, e.g. "gamls-10234567" */
  id: string;
  mlsNumber: string;
  source: MlsSource;
  status: ListingStatus;
  transaction: TransactionType;
  propertyType: PropertyType;
  /** List price, or monthly rent when transaction === "rent" */
  price: number;
  address: {
    street: string;
    unit?: string;
    city: string;
    state: StateCode;
    zip: string;
    county?: string;
  };
  beds: number | null;
  baths: number | null;
  sqft: number | null;
  lotAcres: number | null;
  yearBuilt: number | null;
  garage?: number | null;
  photos: string[];
  headline?: string;
  remarks?: string;
  features?: { group: string; items: string[] }[];
  lat?: number;
  lng?: number;
  daysOnMarket?: number | null;
  hoaFee?: number | null;
  taxAnnual?: number | null;
  subdivision?: string;
  listAgent?: ListingAgent;
  listOffice?: string;
  /** True when Stateline Realty Co. is the listing brokerage */
  isStatelineListing?: boolean;
  /** Rentals managed by Stateline Property Management */
  isManagedRental?: boolean;
  availableDate?: string;
  modifiedAt?: string;
}

export type SortOption = "newest" | "price-asc" | "price-desc" | "sqft-desc";

export interface ListingSearch {
  q?: string;
  state?: StateCode;
  transaction?: TransactionType;
  type?: PropertyType;
  minPrice?: number;
  maxPrice?: number;
  beds?: number;
  baths?: number;
  statelineOnly?: boolean;
  sort?: SortOption;
  page?: number;
  pageSize?: number;
}

export interface ListingSearchResult {
  listings: Listing[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
  /** Which feeds answered this search — drives the disclaimers shown */
  sources: MlsSource[];
  /** True while running on placeholder data */
  isSample: boolean;
}

/** Every MLS feed implements this. */
export interface MlsProvider {
  source: MlsSource;
  /** Display name for attribution, e.g. "Georgia MLS" */
  label: string;
  /** Returns true when credentials are present in the environment */
  isConfigured(): boolean;
  search(params: ListingSearch): Promise<{ listings: Listing[]; total: number }>;
  getByMlsNumber(mlsNumber: string): Promise<Listing | null>;
}
