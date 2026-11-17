/**
 * Georgia MLS (GAMLS) provider — NOT YET CONNECTED.
 *
 * When approval comes through:
 *   1. Add GAMLS_RETS_LOGIN_URL / GAMLS_RETS_USERNAME / GAMLS_RETS_PASSWORD /
 *      GAMLS_RETS_USER_AGENT to .env.local (see .env.local.example).
 *   2. Port the RETS client from the Journey Realty project
 *      (journey-realty/src/lib/rets-client.ts + rets-types.ts). It already
 *      handles Digest auth, DMQL2 queries, and photo proxying for GAMLS.
 *   3. Map its records into the shared `Listing` shape (types.ts) here and set
 *      source: "GAMLS". Keep `listOffice` populated — GAMLS IDX rules require
 *      listing-brokerage attribution on every card and detail page.
 */
import type { MlsProvider } from "../types";

export const gamlsProvider: MlsProvider = {
  source: "GAMLS",
  label: "Georgia MLS",
  isConfigured: () =>
    Boolean(
      process.env.GAMLS_RETS_LOGIN_URL &&
        process.env.GAMLS_RETS_USERNAME &&
        process.env.GAMLS_RETS_PASSWORD,
    ),
  async search() {
    throw new Error("GAMLS provider not implemented yet — see providers/gamls.ts");
  },
  async getByMlsNumber() {
    throw new Error("GAMLS provider not implemented yet — see providers/gamls.ts");
  },
};
