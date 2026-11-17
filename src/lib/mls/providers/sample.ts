import type { MlsProvider } from "../types";
import { SAMPLE_LISTINGS } from "../sample-data";
import { matchesSearch, sortListings } from "../filter";

/** Placeholder feed — active only while neither real MLS is configured. */
export const sampleProvider: MlsProvider = {
  source: "SAMPLE",
  label: "Sample listings",
  isConfigured: () => true,
  async search(params) {
    const all = sortListings(
      SAMPLE_LISTINGS.filter((l) => matchesSearch(l, params)),
      params.sort,
    );
    return { listings: all, total: all.length };
  },
  async getByMlsNumber(mlsNumber) {
    return SAMPLE_LISTINGS.find((l) => l.mlsNumber.toLowerCase() === mlsNumber.toLowerCase()) ?? null;
  },
};
