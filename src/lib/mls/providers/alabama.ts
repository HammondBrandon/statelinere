/**
 * Alabama MLS provider — NOT YET CONNECTED.
 *
 * Most Alabama MLSes now deliver data over the RESO Web API (OData) rather
 * than RETS, usually through a vendor such as Bridge Interactive, Spark
 * Platform, Trestle, or MLS Grid. Once approval comes through, confirm which
 * vendor/endpoint the MLS assigns, then:
 *   1. Add ALMLS_API_BASE_URL / ALMLS_ACCESS_TOKEN (or client id/secret) to
 *      .env.local (see .env.local.example).
 *   2. Query the `Property` resource with $filter/$top/$skip/$orderby and map
 *      RESO Data Dictionary fields (ListPrice, BedroomsTotal,
 *      BathroomsTotalInteger, LivingArea, Media, etc.) into `Listing`.
 *   3. Set source: "ALMLS" and update `label` to the MLS's official name so the
 *      disclaimer shows the right attribution.
 */
import type { MlsProvider } from "../types";

export const alabamaProvider: MlsProvider = {
  source: "ALMLS",
  label: "Alabama MLS", // TODO: official MLS name for attribution
  isConfigured: () =>
    Boolean(process.env.ALMLS_API_BASE_URL && process.env.ALMLS_ACCESS_TOKEN),
  async search() {
    throw new Error("Alabama MLS provider not implemented yet — see providers/alabama.ts");
  },
  async getByMlsNumber() {
    throw new Error("Alabama MLS provider not implemented yet — see providers/alabama.ts");
  },
};
