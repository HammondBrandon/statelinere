import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BedDouble, Bath, Ruler, Trees, CalendarDays, Car, ChevronLeft, Phone, Mail, Home } from "lucide-react";
import PhotoGallery from "@/components/listings/PhotoGallery";
import ListingCard from "@/components/listings/ListingCard";
import MlsDisclaimer from "@/components/listings/MlsDisclaimer";
import LeadForm from "@/components/forms/LeadForm";
import MortgageEstimate from "@/components/listings/MortgageEstimate";
import { getListing, getSimilarListings, formatPrice, formatAddressLine2 } from "@/lib/mls";
import { site } from "@/lib/site";

export async function generateMetadata({ params }: PageProps<"/properties/[id]">): Promise<Metadata> {
  const { id } = await params;
  const l = await getListing(id);
  if (!l) return { title: "Listing not found" };
  const title = `${l.address.street}, ${l.address.city}, ${l.address.state}`;
  return {
    title,
    description: `${formatPrice(l)} · ${l.beds ?? "–"} bd · ${l.baths ?? "–"} ba · ${l.remarks?.slice(0, 140) ?? ""}`,
    openGraph: { title, images: l.photos[0] ? [l.photos[0]] : undefined },
  };
}

export default async function ListingPage({ params }: PageProps<"/properties/[id]">) {
  const { id } = await params;
  const l = await getListing(id);
  if (!l) notFound();
  const similar = await getSimilarListings(l, 3);
  const isRent = l.transaction === "rent";
  const isLand = l.propertyType === "Land" || l.propertyType === "Farm & Ranch";
  const ref = `${l.address.street}, ${formatAddressLine2(l)} (MLS# ${l.mlsNumber})`;

  const facts = [
    !isLand && l.beds != null && { icon: BedDouble, label: "Bedrooms", value: l.beds },
    !isLand && l.baths != null && { icon: Bath, label: "Bathrooms", value: l.baths },
    l.sqft != null && { icon: Ruler, label: "Square feet", value: l.sqft.toLocaleString() },
    l.lotAcres != null && { icon: Trees, label: "Acres", value: l.lotAcres },
    l.yearBuilt != null && { icon: CalendarDays, label: "Year built", value: l.yearBuilt },
    l.garage != null && { icon: Car, label: "Garage", value: l.garage },
    { icon: Home, label: "Type", value: l.propertyType },
  ].filter(Boolean) as { icon: typeof Home; label: string; value: string | number }[];

  const details: [string, string | number | null | undefined][] = [
    ["MLS #", l.mlsNumber],
    ["Status", l.status],
    ["County", l.address.county],
    ["Subdivision", l.subdivision],
    [isRent ? "Available" : "Days on market", isRent ? l.availableDate : l.daysOnMarket],
    ["HOA", l.hoaFee ? `$${l.hoaFee}/mo` : null],
    ["Annual taxes", l.taxAnnual ? `$${l.taxAnnual.toLocaleString()}` : null],
  ];

  const mapSrc =
    l.lat && l.lng
      ? `https://www.openstreetmap.org/export/embed.html?bbox=${l.lng - 0.02}%2C${l.lat - 0.012}%2C${l.lng + 0.02}%2C${l.lat + 0.012}&layer=mapnik&marker=${l.lat}%2C${l.lng}`
      : null;

  return (
    <div className="bg-cream pt-24 pb-24">
      <div className="container-x">
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 py-5 text-sm text-ink-muted">
          <Link href={isRent ? "/properties?transaction=rent" : "/properties"} className="inline-flex items-center gap-1 hover:text-teal-deep">
            <ChevronLeft className="h-4 w-4" aria-hidden /> {isRent ? "Rentals" : "All properties"}
          </Link>
          <span aria-hidden>/</span>
          <span className="truncate">{l.address.street}</span>
        </nav>

        <PhotoGallery photos={l.photos} alt={`${l.address.street}, ${l.address.city}`} />

        <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_380px]">
          {/* Main column */}
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-white px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-ink ring-1 ring-line">{l.status}</span>
              <span className="rounded-full bg-sun px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-ink">
                {isRent ? "For Rent" : "For Sale"}
              </span>
              {l.isStatelineListing && (
                <span className="rounded-full bg-teal px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-white">
                  {l.isManagedRental ? "Stateline Managed" : "Stateline Listing"}
                </span>
              )}
            </div>
            {l.headline && <p className="mt-5 font-script text-3xl text-teal">{l.headline}</p>}
            <h1 className="font-display text-4xl uppercase tracking-wide sm:text-5xl">
              {l.address.street}
              {l.address.unit ? ` #${l.address.unit}` : ""}
            </h1>
            <p className="mt-2 text-lg">{formatAddressLine2(l)}</p>
            <p className="mt-5 font-display text-5xl font-light text-teal-deep">{formatPrice(l)}</p>

            <ul className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
              {facts.map((f) => (
                <li key={f.label} className="rounded-2xl bg-white p-4 ring-1 ring-line/70">
                  <f.icon className="h-5 w-5 text-teal" aria-hidden />
                  <p className="mt-3 font-display text-2xl tracking-wide text-ink">{f.value}</p>
                  <p className="text-xs uppercase tracking-[0.14em] text-ink-muted">{f.label}</p>
                </li>
              ))}
            </ul>

            {l.remarks && (
              <section className="mt-12">
                <h2 className="font-display text-3xl uppercase tracking-wide">About This {isLand ? "Property" : "Home"}</h2>
                <p className="mt-4 text-lg font-light leading-relaxed">{l.remarks}</p>
              </section>
            )}

            {l.features?.length ? (
              <section className="mt-12">
                <h2 className="font-display text-3xl uppercase tracking-wide">Features</h2>
                <div className="mt-6 grid gap-6 sm:grid-cols-2">
                  {l.features.map((g) => (
                    <div key={g.group} className="rounded-2xl bg-white p-6 ring-1 ring-line/70">
                      <h3 className="eyebrow text-teal-deep">{g.group}</h3>
                      <ul className="mt-4 space-y-2">
                        {g.items.map((it) => (
                          <li key={it} className="flex gap-2"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-sun" />{it}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </section>
            ) : null}

            <section className="mt-12">
              <h2 className="font-display text-3xl uppercase tracking-wide">Details</h2>
              <dl className="mt-6 grid gap-x-10 sm:grid-cols-2">
                {details
                  .filter(([, v]) => v != null && v !== "")
                  .map(([k, v]) => (
                    <div key={k} className="flex justify-between border-b border-line py-3 text-sm">
                      <dt className="text-ink-muted">{k}</dt>
                      <dd className="font-medium text-ink">{v}</dd>
                    </div>
                  ))}
              </dl>
            </section>

            {mapSrc && (
              <section className="mt-12">
                <h2 className="font-display text-3xl uppercase tracking-wide">Location</h2>
                <div className="mt-6 overflow-hidden rounded-3xl ring-1 ring-line">
                  <iframe title={`Map of ${l.address.street}`} src={mapSrc} className="h-80 w-full" loading="lazy" />
                </div>
              </section>
            )}

            {!isRent && !isLand && <MortgageEstimate price={l.price} taxAnnual={l.taxAnnual ?? undefined} hoa={l.hoaFee ?? undefined} />}

            <div className="mt-12">
              <MlsDisclaimer sources={[l.source]} />
              {l.listOffice && <p className="mt-3 text-xs text-ink-muted">Listing courtesy of {l.listOffice}.</p>}
            </div>
          </div>

          {/* Sidebar — contact agent (Brickly) */}
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-3xl bg-white p-7 shadow-lift ring-1 ring-line/60">
              <p className="eyebrow text-teal-deep">{isRent ? "Interested in renting?" : "Schedule a tour"}</p>
              <p className="mt-2 font-display text-3xl uppercase tracking-wide text-ink">Ask About This Home</p>
              <div className="mt-5 space-y-2 border-y border-line py-5 text-sm">
                <p className="font-semibold text-ink">{l.listAgent?.name ?? site.name}</p>
                <a href={isRent ? site.pmPhoneHref : site.phoneHref} className="flex items-center gap-2 hover:text-teal-deep">
                  <Phone className="h-4 w-4 text-teal" aria-hidden /> {isRent ? site.pmPhone : site.phone}
                </a>
                <a href={`mailto:${isRent ? site.pmEmail : site.email}`} className="flex items-center gap-2 hover:text-teal-deep">
                  <Mail className="h-4 w-4 text-teal" aria-hidden /> {isRent ? site.pmEmail : site.email}
                </a>
              </div>
              <div className="mt-6">
                <LeadForm
                  compact
                  topic={isRent ? "renting" : "listing"}
                  listingRef={ref}
                  submitLabel={isRent ? "Request a Showing" : "Request Info"}
                  defaultMessage={`I'm interested in ${l.address.street}, ${l.address.city}. Please reach out.`}
                />
              </div>
              {isRent && (
                <a href={site.portals.applyOnline} className="mt-5 block rounded-full bg-sun py-3.5 text-center text-xs font-semibold uppercase tracking-[0.16em] text-ink hover:bg-sun-deep">
                  Apply Online
                </a>
              )}
            </div>
          </aside>
        </div>

        {similar.length > 0 && (
          <section className="mt-24">
            <h2 className="font-display text-4xl uppercase tracking-wide">
              You Might Also Like
            </h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {similar.map((s) => <ListingCard key={s.id} listing={s} />)}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
