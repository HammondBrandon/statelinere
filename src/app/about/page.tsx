import type { Metadata } from "next";
import Image from "next/image";
import PageHero from "@/components/ui/PageHero";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { photos, site, unsplash } from "@/lib/site";

export const metadata: Metadata = {
  title: "About Us",
  description: `Meet ${site.name}, a locally owned real estate and property management team serving Georgia and Alabama.`,
};

// TODO: replace with the real team (name, role, photo, phone, email, bio)
const team = [
  { name: "Team Member", role: "Broker / Owner" },
  { name: "Team Member", role: "REALTOR®" },
  { name: "Team Member", role: "REALTOR®" },
  { name: "Team Member", role: "Property Manager" },
];

const values = [
  ["Local first", "We live here too. We shop at the same stores and cheer at the same Friday night games."],
  ["Straight talk", "Honest pricing, honest advice, and quick answers when you call."],
  ["Both sides of the line", "Licensed and active in Georgia and Alabama, so your search never stops at a border."],
];

export default function AboutPage() {
  return (
    <>
      <PageHero image={photos.warmLiving} eyebrow="About us" title="Stateline Realty Co." script="your neighbors in real estate" />

      <section className="bg-white py-24">
        <div className="container-x grid items-center gap-14 lg:grid-cols-2">
          <Reveal>
            <SectionHeading
              align="left"
              eyebrow="Our story"
              title="Built on the Line"
              script="and proud of it"
              intro={
                <>
                  {/* TODO: client's real story */}
                  <p>
                    Stateline Realty Co. was founded on a simple idea: the best place to live isn&apos;t
                    always on one side of a map line. Our team helps buyers, sellers, renters, and
                    property owners make smart moves across Georgia and Alabama.
                  </p>
                  <p className="mt-4">
                    Today we offer full-service real estate sales alongside Stateline Property
                    Management, so whether you&apos;re buying your first home or growing a rental portfolio,
                    you have one local team in your corner.
                  </p>
                </>
              }
            />
          </Reveal>
          <Reveal delay={120} className="grid grid-cols-2 gap-4">
            <div className="relative aspect-[3/4] overflow-hidden rounded-3xl">
              <Image src={unsplash(photos.leatherLiving, 900)} alt="" fill sizes="25vw" className="object-cover" />
            </div>
            <div className="relative mt-12 aspect-[3/4] overflow-hidden rounded-3xl">
              <Image src={unsplash(photos.keys, 900)} alt="" fill sizes="25vw" className="object-cover" />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-cream py-24">
        <div className="container-x grid gap-6 md:grid-cols-3">
          {values.map(([t, d], i) => (
            <Reveal key={t} delay={i * 100} className="rounded-3xl bg-white p-8 text-center">
              <p className="font-script text-4xl text-teal">{t}</p>
              <p className="mt-3 leading-relaxed">{d}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-white py-24">
        <div className="container-x">
          <Reveal>
            <SectionHeading eyebrow="The team" title="Meet the People" script="behind the sunshine" />
          </Reveal>
          <ul className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((m, i) => (
              <Reveal as="li" key={i} delay={i * 80} className="text-center">
                <div className="flex aspect-[4/5] items-center justify-center overflow-hidden rounded-3xl bg-gradient-to-b from-sun-soft to-teal-soft">
                  <Image src="/brand/stateline-realty-co.png" alt="" width={389} height={478} className="h-28 w-auto opacity-60" />
                </div>
                <p className="mt-5 font-display text-2xl uppercase tracking-wide text-ink">{m.name}</p>
                <p className="text-sm text-ink-muted">{m.role}</p>
              </Reveal>
            ))}
          </ul>
          <div className="mt-16 text-center">
            <ButtonLink href="/contact">Work With Us</ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}
