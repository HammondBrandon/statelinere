import Image from "next/image";
import Link from "next/link";
import { BedDouble, Bath, Ruler, Trees } from "lucide-react";
import type { Listing } from "@/lib/mls";
import { formatPrice, formatAddressLine2 } from "@/lib/mls";
import { unsplash } from "@/lib/site";
import { cn } from "@/lib/cn";

const statusTone: Record<string, string> = {
  Active: "bg-white text-ink",
  "Coming Soon": "bg-sun text-ink",
  "Under Contract": "bg-ink text-white",
  Pending: "bg-ink text-white",
  Sold: "bg-ink text-white",
  Leased: "bg-ink text-white",
};

export default function ListingCard({ listing, priority = false }: { listing: Listing; priority?: boolean }) {
  const l = listing;
  const cover = l.photos[0];
  const isLand = l.propertyType === "Land" || l.propertyType === "Farm & Ranch";

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-2xl bg-white shadow-soft ring-1 ring-line/70 transition-shadow duration-300 hover:shadow-lift">
      <div className="relative aspect-[4/3] overflow-hidden bg-sand">
        {cover && (
          <Image
            src={unsplash(cover, 900)}
            alt={`${l.address.street}, ${l.address.city}`}
            fill
            sizes="(min-width:1280px) 400px, (min-width:768px) 50vw, 100vw"
            className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
            preload={priority}
          />
        )}
        <div className="absolute left-4 top-4 flex flex-wrap gap-2">
          <span className={cn("rounded-full px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.14em]", statusTone[l.status] ?? statusTone.Active)}>
            {l.status}
          </span>
          {l.isStatelineListing && (
            <span className="rounded-full bg-teal px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-white">
              {l.isManagedRental ? "Stateline Managed" : "Stateline Listing"}
            </span>
          )}
        </div>
        <span className="absolute right-4 top-4 rounded-full bg-black/45 px-2.5 py-1 text-[0.68rem] font-semibold tracking-[0.14em] text-white backdrop-blur">
          {l.address.state}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        {l.headline && (
          <p className="font-display text-xl uppercase tracking-wide text-ink line-clamp-1">{l.headline}</p>
        )}
        <h3 className="mt-1 font-sans text-sm font-normal tracking-normal text-ink-soft">
          <Link href={`/properties/${l.id}`} className="after:absolute after:inset-0">
            {l.address.street}
            {l.address.unit ? ` #${l.address.unit}` : ""}, {formatAddressLine2(l)}
          </Link>
        </h3>

        <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm text-ink-soft">
          {!isLand && l.beds != null && (
            <li className="flex items-center gap-1.5"><BedDouble className="h-4 w-4 text-teal" aria-hidden />{l.beds} bd</li>
          )}
          {!isLand && l.baths != null && (
            <li className="flex items-center gap-1.5"><Bath className="h-4 w-4 text-teal" aria-hidden />{l.baths} ba</li>
          )}
          {l.sqft != null && (
            <li className="flex items-center gap-1.5"><Ruler className="h-4 w-4 text-teal" aria-hidden />{l.sqft.toLocaleString()} sf</li>
          )}
          {l.lotAcres != null && (isLand || l.lotAcres >= 1) && (
            <li className="flex items-center gap-1.5"><Trees className="h-4 w-4 text-teal" aria-hidden />{l.lotAcres} ac</li>
          )}
        </ul>

        <div className="mt-auto flex items-end justify-between gap-4 border-t border-line pt-4 mt-5">
          <p className="font-display text-2xl tracking-wide text-ink">{formatPrice(l)}</p>
          <p className="eyebrow text-ink-muted !tracking-[0.18em]">
            {l.transaction === "rent" ? "For Rent" : "For Sale"}
          </p>
        </div>
        {l.listOffice && (
          <p className="mt-3 text-[0.7rem] text-ink-muted">Listing courtesy of {l.listOffice}</p>
        )}
      </div>
    </article>
  );
}
