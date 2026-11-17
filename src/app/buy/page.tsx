import type { Metadata } from "next";
import Image from "next/image";
import { Landmark, Map, School, Scale } from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import LeadForm from "@/components/forms/LeadForm";
import { photos, unsplash } from "@/lib/site";

export const metadata: Metadata = {
  title: "Buying a Home in Georgia or Alabama",
  description: "How buying works on both sides of the state line, from pre-approval to closing day.",
};

const buySteps = [
  ["Get pre-approved", "We'll introduce you to trusted local lenders, including USDA, VA, and first-time buyer programs."],
  ["Pick your side of the line", "We compare taxes, schools, commutes, and lifestyle in Georgia and Alabama side by side."],
  ["Tour & make an offer", "We tour with you, share real comps, and write a strong, clean offer."],
  ["Inspections & appraisal", "We coordinate inspectors and negotiate repairs so there are no surprises."],
  ["Close & celebrate", "Attorney closings in Georgia, title closings in Alabama. We know both."],
];

const compare = [
  { icon: Landmark, title: "Property taxes", ga: "Moderate, with homestead exemption", al: "Among the lowest in the U.S." },
  { icon: Scale, title: "Closings", ga: "Handled by a closing attorney", al: "Typically a title company" },
  { icon: School, title: "Schools", ga: "County & city systems", al: "County & city systems" },
  { icon: Map, title: "Time zone", ga: "Eastern", al: "Central (some border towns keep Eastern)" },
];

export default function BuyPage() {
  return (
    <>
      <PageHero image={photos.porchHome} eyebrow="Buying" title="Find Your Place" script="on either side of the line">
        <ButtonLink href="/properties" variant="white">Search Homes</ButtonLink>
      </PageHero>

      <section className="bg-white py-24">
        <div className="container-x grid gap-16 lg:grid-cols-2">
          <Reveal>
            <SectionHeading
              align="left"
              eyebrow="The process"
              title="Five Steps"
              script="to your front door"
              intro="Buying a home is a big deal. We keep it simple, clear, and (dare we say) fun."
            />
          </Reveal>
          <ol className="space-y-6">
            {buySteps.map(([t, d], i) => (
              <Reveal as="li" key={t} delay={i * 80} className="flex gap-6 border-b border-line pb-6">
                <span className="font-display text-4xl font-light text-sun">0{i + 1}</span>
                <div>
                  <h3 className="font-display text-2xl uppercase tracking-wide">{t}</h3>
                  <p className="mt-2 leading-relaxed">{d}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-cream py-24">
        <div className="container-x">
          <Reveal>
            <SectionHeading eyebrow="Georgia vs. Alabama" title="Know the Difference" script="before you choose" />
          </Reveal>
          <div className="mt-14 overflow-hidden rounded-3xl bg-white shadow-soft ring-1 ring-line/60">
            <div className="hidden grid-cols-[1.2fr_1fr_1fr] bg-teal text-white md:grid">
              <p className="p-5" />
              <p className="eyebrow p-5">Georgia</p>
              <p className="eyebrow p-5">Alabama</p>
            </div>
            {compare.map((c) => (
              <div key={c.title} className="grid gap-2 border-t border-line p-5 md:grid-cols-[1.2fr_1fr_1fr] md:gap-0 md:p-0">
                <p className="flex items-center gap-3 font-semibold text-ink md:p-5">
                  <c.icon className="h-5 w-5 text-teal" aria-hidden /> {c.title}
                </p>
                <p className="md:p-5"><span className="font-semibold md:hidden">GA: </span>{c.ga}</p>
                <p className="md:p-5"><span className="font-semibold md:hidden">AL: </span>{c.al}</p>
              </div>
            ))}
          </div>
          <p className="mt-4 text-center text-xs text-ink-muted">General information only. Ask us about the specific county you&apos;re considering.</p>
        </div>
      </section>

      <section className="bg-white py-24">
        <div className="container-x grid items-center gap-14 lg:grid-cols-2">
          <Reveal className="relative aspect-[4/5] overflow-hidden rounded-[2rem]">
            <Image src={unsplash(photos.brightLiving, 1400)} alt="" fill sizes="(min-width:1024px) 50vw, 100vw" className="object-cover" />
          </Reveal>
          <Reveal delay={120}>
            <SectionHeading align="left" eyebrow="Let's get started" title="Talk With a" script="buyer's agent" />
            <div className="mt-8">
              <LeadForm topic="buying" submitLabel="Start My Search" messagePlaceholder="Where are you hoping to live, and what's on your wish list?" />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
