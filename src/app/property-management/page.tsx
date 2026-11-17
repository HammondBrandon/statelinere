import type { Metadata } from "next";
import Image from "next/image";
import { ShieldCheck, Wallet, Wrench, FileText, ClipboardCheck, Megaphone, KeyRound, CreditCard, Hammer, FileSignature } from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import ListingCard from "@/components/listings/ListingCard";
import LeadForm from "@/components/forms/LeadForm";
import { getRentals } from "@/lib/mls";
import { photos, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Property Management",
  description: `${site.pmName}: full-service rental management for owners and quality rental homes for tenants in Georgia and Alabama.`,
};

export const revalidate = 300;

const ownerServices = [
  { icon: Megaphone, title: "Marketing & Leasing", text: "Pro photos, syndication to major rental sites, and showings handled for you." },
  { icon: ShieldCheck, title: "Tenant Screening", text: "Credit, background, income, and rental history checks on every applicant." },
  { icon: Wallet, title: "Rent Collection", text: "Online payments, firm late-fee enforcement, and fast monthly owner payouts." },
  { icon: Wrench, title: "Maintenance", text: "24/7 request line, vetted local vendors, and owner approval on larger repairs." },
  { icon: ClipboardCheck, title: "Inspections", text: "Move-in, move-out, and periodic inspections with photo reports." },
  { icon: FileText, title: "Reporting", text: "Monthly statements, year-end 1099s, and an online owner portal." },
];

const residentLinks = [
  { icon: CreditCard, label: "Pay Rent", href: site.portals.payRent },
  { icon: Hammer, label: "Maintenance Request", href: site.portals.tenantPortal },
  { icon: FileSignature, label: "Apply Online", href: site.portals.applyOnline },
  { icon: KeyRound, label: "Owner Portal", href: site.portals.ownerPortal },
];

export default async function PropertyManagementPage() {
  const rentals = await getRentals(6);

  return (
    <>
      <PageHero image={photos.bohoLiving} eyebrow={site.pmName} title="Property Management" script="handled with care">
        <div className="flex flex-wrap justify-center gap-3">
          <ButtonLink href="#owners" variant="white">For Owners</ButtonLink>
          <ButtonLink href="#rentals" variant="outline-light">Homes for Rent</ButtonLink>
        </div>
      </PageHero>

      {/* Resident quick links */}
      <section className="relative z-10 -mt-10">
        <div className="container-x">
          <ul className="grid grid-cols-2 gap-3 rounded-3xl bg-white p-3 shadow-lift ring-1 ring-line/60 md:grid-cols-4">
            {residentLinks.map((r) => (
              <li key={r.label}>
                <a href={r.href} className="flex flex-col items-center gap-2 rounded-2xl px-3 py-5 text-center text-sm font-semibold text-ink hover:bg-teal-mist sm:flex-row sm:justify-center">
                  <r.icon className="h-5 w-5 text-teal" aria-hidden /> {r.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="owners" className="scroll-mt-24 bg-white py-24">
        <div className="container-x">
          <Reveal className="flex flex-col items-center text-center">
            <Image src="/brand/stateline-property-management.png" alt="" width={371} height={302} className="mb-8 h-24 w-auto" />
            <SectionHeading
              eyebrow="For property owners"
              title="Hands-Off Ownership"
              script="without the headaches"
              intro="Whether you own one rental or a portfolio across both states, we treat your property like our own."
            />
          </Reveal>
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {ownerServices.map((s, i) => (
              <Reveal key={s.title} delay={(i % 3) * 100} className="rounded-3xl bg-cream p-8">
                <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-teal-mist text-teal">
                  <s.icon className="h-7 w-7" aria-hidden />
                </span>
                <h3 className="mt-6 font-display text-2xl uppercase tracking-wide">{s.title}</h3>
                <p className="mt-3 leading-relaxed">{s.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="rentals" className="scroll-mt-24 bg-teal-mist py-24">
        <div className="container-x">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <Reveal>
              <SectionHeading align="left" eyebrow="For renters" title="Available Rentals" script="ready when you are" />
            </Reveal>
            <ButtonLink href="/properties?transaction=rent" variant="outline">See All Rentals</ButtonLink>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {rentals.map((l) => <ListingCard key={l.id} listing={l} />)}
          </div>
        </div>
      </section>

      <section className="bg-white py-24">
        <div className="container-x grid items-start gap-14 lg:grid-cols-2">
          <Reveal>
            <SectionHeading
              align="left"
              eyebrow="Free rental analysis"
              title="What Could Your"
              script="property rent for?"
              intro="Tell us about your property and we'll send a rental estimate and a management proposal with no obligation."
            />
            <div className="mt-8 space-y-1 text-sm">
              <p>Call <a href={site.pmPhoneHref} className="font-semibold text-teal-deep">{site.pmPhone}</a></p>
              <p>Email <a href={`mailto:${site.pmEmail}`} className="font-semibold text-teal-deep">{site.pmEmail}</a></p>
            </div>
          </Reveal>
          <Reveal delay={120} className="rounded-3xl bg-cream p-7 sm:p-10">
            <LeadForm
              topic="owner"
              topics={["owner", "renting", "maintenance"]}
              showAddress
              submitLabel="Send"
              messagePlaceholder="Tell us about the property (beds, baths, current status)"
            />
          </Reveal>
        </div>
      </section>
    </>
  );
}
