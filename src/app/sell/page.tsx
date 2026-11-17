import type { Metadata } from "next";
import Image from "next/image";
import { Camera, LineChart, Megaphone, Handshake } from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import LeadForm from "@/components/forms/LeadForm";
import { photos, unsplash } from "@/lib/site";

export const metadata: Metadata = {
  title: "Sell Your Home",
  description: "List with Stateline Realty Co. Get a free home valuation, professional photography, and exposure in both the Georgia and Alabama MLS.",
};

const pillars = [
  { icon: LineChart, title: "Priced Right", text: "A detailed market analysis using real comps from both MLSes, not a guess from an algorithm." },
  { icon: Camera, title: "Beautifully Presented", text: "Professional photography, staging advice, and listing copy that make buyers stop scrolling." },
  { icon: Megaphone, title: "Seen Everywhere", text: "Georgia MLS, Alabama MLS, Zillow, Realtor.com, social, and our own buyer network." },
  { icon: Handshake, title: "Negotiated Hard", text: "We protect your bottom line through offers, inspections, appraisal, and closing." },
];

export default function SellPage() {
  return (
    <>
      <PageHero image={photos.kitchenWhite} eyebrow="Selling" title="Sell With Confidence" script="and a little sunshine" />

      <section className="bg-white py-24">
        <div className="container-x">
          <Reveal>
            <SectionHeading
              eyebrow="Our approach"
              title="Listed to Shine"
              script="from day one"
              intro="Homes near the state line can attract buyers from two markets. We make sure both of them see yours."
            />
          </Reveal>
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {pillars.map((p, i) => (
              <Reveal key={p.title} delay={i * 100} className="rounded-3xl bg-cream p-8">
                <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-sun-soft text-ink">
                  <p.icon className="h-7 w-7" aria-hidden />
                </span>
                <h3 className="mt-6 font-display text-2xl uppercase tracking-wide">{p.title}</h3>
                <p className="mt-3 leading-relaxed">{p.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="valuation" className="scroll-mt-24 bg-teal-mist py-24">
        <div className="container-x grid items-start gap-14 lg:grid-cols-[1fr_1.1fr]">
          <Reveal>
            <SectionHeading
              align="left"
              eyebrow="Free home valuation"
              title="What's My Home"
              script="really worth?"
              intro="Tell us a little about your property and a local agent will send a personalized market analysis, usually within 24 hours. No pressure, no obligation."
            />
            <div className="relative mt-10 hidden aspect-[4/3] overflow-hidden rounded-[2rem] lg:block">
              <Image src={unsplash(photos.sunsetHome, 1200)} alt="" fill sizes="40vw" className="object-cover" />
            </div>
          </Reveal>
          <Reveal delay={120} className="rounded-3xl bg-white p-7 shadow-lift sm:p-10">
            <LeadForm
              topic="valuation"
              showAddress
              submitLabel="Get My Valuation"
              messagePlaceholder="Bedrooms, bathrooms, recent updates, and your timeline"
            />
          </Reveal>
        </div>
      </section>
    </>
  );
}
