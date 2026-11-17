# Stateline Realty Co.

Next.js 16 site for Stateline Realty Co. + Stateline Property Management.

- **Design direction:** Ambience (full-bleed warm photography, light condensed type, big photo tiles)
  plus Brickly (hero search, "how it works", listing grid with sale/rent tags, detail page with
  contact-agent card, journal).
- **Brand:** Sun Yellow `#FEC52B`, Stateline Teal `#0097B2` (tokens in `src/app/globals.css`).

```bash
npm install
npm run dev
```

## Brand fonts (action needed)
The branding sheet specifies **Canter (Bold)** and **Handelson Three**. Neither is on Google Fonts,
so **Antonio** and **Yellowtail** stand in for now. To switch:
1. Add licensed `.woff2` files to `public/fonts/` (Handelson Three needs a commercial license).
2. Uncomment the two `@font-face` rules in `src/app/globals.css`. The font stacks already list
   "Canter" / "Handelson Three" first.

## Logos
`public/brand/` holds transparent + white variants generated from the originals in
`scripts/source-logos/` via `node scripts/make-logo-variants.mjs`.

## MLS feeds
All listing data goes through `src/lib/mls/index.ts`:

| Feed | File | Status |
|---|---|---|
| Georgia MLS (RETS) | `src/lib/mls/providers/gamls.ts` | stub: port Journey Realty's `rets-client.ts` |
| Alabama MLS (RESO Web API) | `src/lib/mls/providers/alabama.ts` | stub: awaiting vendor/endpoint |
| Sample data | `src/lib/mls/sample-data.ts` | used while neither feed is configured |

Both feeds are queried in parallel, merged, and **de-duplicated by address** (border properties are
often listed in both MLSes). Each provider maps into the shared `Listing` type in `types.ts`.
Per-MLS IDX disclaimers live in `src/components/listings/MlsDisclaimer.tsx`; confirm the exact wording
and logo in each data license.

## Placeholders to replace
Search the codebase for `TODO`: contact info, address, domain, service-area towns, team, stats,
testimonials, journal posts, portal links (tenant/owner/apply/pay), and privacy policy.
Photos are Unsplash placeholders (`src/lib/site.ts`, `src/lib/journal.ts`, sample data).
