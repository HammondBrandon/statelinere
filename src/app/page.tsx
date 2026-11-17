import Image from "next/image";
import Link from "next/link";
import {
  ChevronDown,
  Search,
  KeyRound,
  Handshake,
  ArrowRight,
  Quote,
  ShieldCheck,
  Wrench,
  Wallet,
} from "lucide-react";
import QuickSearch from "@/components/home/QuickSearch";
import PhotoTiles from "@/components/home/PhotoTiles";
import ListingCard from "@/components/listings/ListingCard";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { getFeaturedListings, getRentals } from "@/lib/mls";
import { photos, serviceAreas, site, unsplash } from "@/lib/site";
import { posts, formatPostDate } from "@/lib/journal";

export const revalidate = 300;

const steps = [
  {
    icon: Search,
    title: "Search Both States",
    text: "Every Georgia and Alabama listing in one place, so you never miss the home just across the line.",
  },
  {
    icon: Handshake,
    title: "Tour With a Local",
    text: "An agent who knows the roads, the schools, and the neighbors on both sides of the line.",
  },
  {
    icon: KeyRound,
    title: "Get Your Keys",
    text: "From offer to closing table, we handle the details so moving day is the only thing on your mind.",
  },
];

// TODO: replace with real client reviews (Google / Zillow)
const testimonials = [
  {
    quote:
      "We were torn between a house in Georgia and one in Alabama. Stateline laid out the taxes, schools, and commute side by side and made the choice easy.",
    name: "The Parker Family",
    detail: "Bought in Valley, AL",
  },
  {
    quote:
      "Our home sold in nine days for over asking. The photos were gorgeous and they kept us in the loop the whole way.",
    name: "Dana & Chris M.",
    detail: "Sold in LaGrange, GA",
  },
  {
    quote:
      "I own four rentals and Stateline Property Management has made them truly hands-off. Statements are clear and tenants are happy.",
    name: "Robert T.",
    detail: "Property owner",
  },
];

export default async function HomePage() {
  const [featured, rentals] = await Promise.all([getFeaturedListings(6), getRentals(3)]);

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section className="relative isolate flex min-h-[100svh] items-center justify-center overflow-hidden">
        <Image
          src={unsplash(photos.heroLiving, 2400)}
          alt=""
          fill
          preload
          sizes="100vw"
          className="-z-10 object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/50 via-black/35 to-black/55" />
        <div className="container-x pt-28 pb-24 text-center text-white">
          <p className="eyebrow text-white/85 animate-fade-up">Georgia · Alabama · Home</p>
          <h1 className="mt-6 font-display text-6xl font-light uppercase tracking-[0.04em] text-white sm:text-7xl lg:text-8xl animate-fade-up">
            Home on <br className="sm:hidden" />Both Sides
          </h1>
          <p className="font-script text-4xl text-sun sm:text-5xl -mt-1 animate-fade-up [animation-delay:120ms]">
            of the state line
          </p>
          <p className="mx-auto mt-6 max-w-xl text-base font-light text-white/85 sm:text-lg animate-fade-up [animation-delay:200ms]">
            Buy, sell, rent, and manage property across Georgia and Alabama with a local team that
            treats every move like it&apos;s our own.
          </p>
          <div className="mt-10 animate-fade-up [animation-delay:280ms]">
            <QuickSearch />
          </div>
        </div>
        <a
          href="#listings"
          className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/80 hover:text-white"
          aria-label="Scroll to content"
        >
          <ChevronDown className="h-8 w-8 animate-bounce" />
        </a>
      </section>

      {/* ── Featured listings ────────────────────────────────────────── */}
      <section id="listings" className="scroll-mt-20 bg-cream py-24 sm:py-28">
        <div className="container-x">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <Reveal>
              <SectionHeading align="left" eyebrow="Latest listings" title="Discover Your" script="next place to land" />
            </Reveal>
            <ButtonLink href="/properties" variant="outline">
              View All Properties <ArrowRight className="h-4 w-4" aria-hidden />
            </ButtonLink>
          </div>
          <div className="mt-14 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {featured.map((l, i) => (
              <Reveal key={l.id} delay={(i % 3) * 100}>
                <ListingCard listing={l} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <PhotoTiles />

      {/* ── How it works ─────────────────────────────────────────────── */}
      <section className="bg-cream py-24 sm:py-28">
        <div className="container-x">
          <Reveal>
            <SectionHeading
              eyebrow="How it works"
              title="Simple From Start"
              script="to sunny finish"
              intro="Whether you're buying, selling, or renting, here's what working with Stateline looks like."
            />
          </Reveal>
          <ol className="mt-16 grid gap-6 md:grid-cols-3">
            {steps.map((s, i) => (
              <Reveal as="li" key={s.title} delay={i * 120} className="relative rounded-3xl bg-white p-8 shadow-soft ring-1 ring-line/60">
                <span className="absolute right-7 top-6 font-display text-6xl font-light text-sun-soft" aria-hidden>
                  0{i + 1}
                </span>
                <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-teal-mist text-teal">
                  <s.icon className="h-7 w-7" aria-hidden />
                </span>
                <h3 className="mt-6 font-display text-2xl uppercase tracking-wide">{s.title}</h3>
                <p className="mt-3 leading-relaxed">{s.text}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* ── About split ──────────────────────────────────────────────── */}
      <section className="overflow-hidden bg-sand/60 py-24 sm:py-32">
        <div className="container-x grid items-center gap-14 lg:grid-cols-2">
          <Reveal className="relative">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem]">
              <Image src={unsplash(photos.warmLiving, 1400)} alt="" fill sizes="(min-width:1024px) 50vw, 100vw" className="object-cover" />
            </div>
            <div className="absolute -bottom-8 -right-4 hidden w-56 rounded-3xl bg-white p-6 shadow-lift sm:block lg:-right-10">
              <Image src="/brand/stateline-realty-co.png" alt="" width={389} height={478} className="mx-auto h-24 w-auto" />
              <p className="mt-3 text-center text-sm text-ink-soft">Locally owned. Proudly two-state.</p>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <SectionHeading
              align="left"
              eyebrow="Why Stateline"
              title="Rooted Right Here"
              script="where two states meet"
              intro={
                <p>
                  We live, work, and raise our families in the communities we serve. That local knowledge,
                  on both sides of the line, is what helps our clients find the right home, price it right,
                  and close with confidence.
                </p>
              }
            />
            {/* TODO: replace with real client stats */}
            <dl className="mt-10 grid grid-cols-3 gap-6 border-t border-stone pt-8">
              {[
                ["2", "States served"],
                ["15+", "Years local"],
                ["500+", "Families helped"],
              ].map(([n, label]) => (
                <div key={label}>
                  <dt className="sr-only">{label}</dt>
                  <dd className="font-display text-5xl font-light text-teal">{n}</dd>
                  <dd className="mt-1 text-xs uppercase tracking-[0.16em] text-ink-muted">{label}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-10 flex flex-wrap gap-3">
              <ButtonLink href="/about">Meet the Team</ButtonLink>
              <ButtonLink href="/sell#valuation" variant="outline">What&apos;s My Home Worth?</ButtonLink>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Two states ───────────────────────────────────────────────── */}
      <section className="bg-white py-24 sm:py-28">
        <div className="container-x">
          <Reveal>
            <SectionHeading
              eyebrow="Where we work"
              title="One Team"
              script="two great states"
              intro="Browse homes by state, or search them both at once."
            />
          </Reveal>
          <div className="mt-14 grid gap-5 lg:grid-cols-2">
            {(["GA", "AL"] as const).map((st, i) => {
              const a = serviceAreas[st];
              return (
                <Reveal key={st} delay={i * 120}>
                  <div className="group relative isolate flex min-h-[460px] flex-col justify-end overflow-hidden rounded-[2rem] p-8 text-white sm:p-10">
                    <Image src={unsplash(a.image, 1400)} alt="" fill sizes="(min-width:1024px) 50vw, 100vw" className="-z-10 object-cover transition-transform duration-[1.2s] group-hover:scale-105" />
                    <div className="absolute inset-0 -z-10 bg-gradient-to-t from-black/75 via-black/30 to-transparent" />
                    <p className="font-display text-[7rem] leading-none font-light text-white/25 absolute right-8 top-6" aria-hidden>{st}</p>
                    <h3 className="font-display text-5xl font-light uppercase tracking-wide text-white">{a.label}</h3>
                    <p className="mt-3 max-w-md text-white/85">{a.blurb}</p>
                    <ul className="mt-5 flex flex-wrap gap-2">
                      {a.towns.map((t) => (
                        <li key={t}>
                          <Link
                            href={`/properties?state=${st}&q=${encodeURIComponent(t)}`}
                            className="inline-block rounded-full border border-white/40 px-3.5 py-1.5 text-xs font-medium backdrop-blur hover:bg-white hover:text-ink"
                          >
                            {t}
                          </Link>
                        </li>
                      ))}
                    </ul>
                    <Link href={`/properties?state=${st}`} className="mt-7 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.16em] text-sun hover:text-white">
                      All {a.label} homes <ArrowRight className="h-4 w-4" aria-hidden />
                    </Link>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Property management ──────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-teal-mist py-24 sm:py-28">
        <div className="container-x grid gap-14 lg:grid-cols-[1fr_1.4fr] lg:items-center">
          <Reveal>
            <Image src="/brand/stateline-property-management.png" alt={site.pmName} width={371} height={302} className="h-28 w-auto" />
            <h2 className="mt-8 font-display text-4xl font-normal uppercase tracking-wide sm:text-5xl">
              Your Rental,
              <span className="block font-script normal-case tracking-normal text-teal text-[0.72em]">handled with care</span>
            </h2>
            <p className="mt-5 text-lg font-light leading-relaxed">
              Full-service management for owners and investors, and well-kept homes for renters
              across Georgia and Alabama.
            </p>
            <ul className="mt-8 space-y-4">
              {[
                [ShieldCheck, "Thorough tenant screening & leasing"],
                [Wallet, "On-time rent collection & monthly statements"],
                [Wrench, "24/7 maintenance with trusted local vendors"],
              ].map(([Icon, text]) => {
                const I = Icon as typeof ShieldCheck;
                return (
                  <li key={text as string} className="flex items-center gap-3 text-ink">
                    <I className="h-5 w-5 shrink-0 text-teal" aria-hidden />
                    {text as string}
                  </li>
                );
              })}
            </ul>
            <div className="mt-10 flex flex-wrap gap-3">
              <ButtonLink href="/property-management">Owner Services</ButtonLink>
              <ButtonLink href="/properties?transaction=rent" variant="outline">Homes for Rent</ButtonLink>
            </div>
          </Reveal>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-2">
            {rentals.slice(0, 2).map((l, i) => (
              <Reveal key={l.id} delay={i * 120}>
                <ListingCard listing={l} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ─────────────────────────────────────────────── */}
      <section className="bg-white py-24 sm:py-28">
        <div className="container-x">
          <Reveal>
            <SectionHeading eyebrow="Kind words" title="From Our Neighbors" />
          </Reveal>
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {testimonials.map((t, i) => (
              <Reveal as="article" key={t.name} delay={i * 120} className="flex flex-col rounded-3xl bg-cream p-8">
                <Quote className="h-8 w-8 text-sun" aria-hidden />
                <blockquote className="mt-5 flex-1 text-lg font-light leading-relaxed text-ink">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <p className="mt-6 font-semibold text-ink">{t.name}</p>
                <p className="text-sm text-ink-muted">{t.detail}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Journal ──────────────────────────────────────────────────── */}
      <section className="bg-cream py-24 sm:py-28">
        <div className="container-x">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <Reveal>
              <SectionHeading align="left" eyebrow="The Journal" title="Notes From" script="the front porch" />
            </Reveal>
            <ButtonLink href="/journal" variant="outline">Read More <ArrowRight className="h-4 w-4" aria-hidden /></ButtonLink>
          </div>
          <div className="mt-14 grid gap-6 lg:grid-cols-3">
            {posts.slice(0, 3).map((p, i) => (
              <Reveal as="article" key={p.slug} delay={i * 100} className="group relative">
                <div className="relative aspect-[4/3] overflow-hidden rounded-3xl">
                  <Image src={unsplash(p.image, 900)} alt="" fill sizes="(min-width:1024px) 33vw, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                </div>
                <p className="mt-5 text-xs uppercase tracking-[0.16em] text-ink-muted">
                  {p.category} · {formatPostDate(p.date)}
                </p>
                <h3 className="mt-2 font-display text-2xl uppercase tracking-wide">
                  <Link href={`/journal/${p.slug}`} className="after:absolute after:inset-0 group-hover:text-teal-deep">
                    {p.title}
                  </Link>
                </h3>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────── */}
      <section className="relative isolate overflow-hidden py-28 sm:py-36">
        <Image src={unsplash(photos.sunsetField, 2400)} alt="" fill sizes="100vw" className="-z-10 object-cover" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/45 via-black/55 to-black/45" />
        <Reveal className="container-x text-center">
          <SectionHeading
            tone="light"
            eyebrow="Thinking of selling?"
            title="Find Out What"
            script="your home is worth"
            intro="Get a free, no-pressure market analysis from a local agent, usually within 24 hours."
          />
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <ButtonLink href="/sell#valuation" variant="sun">Get My Free Valuation</ButtonLink>
            <ButtonLink href="/contact" variant="outline-light">Talk to an Agent</ButtonLink>
          </div>
        </Reveal>
      </section>
    </>
  );
}
