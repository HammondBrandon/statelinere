import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHero from "@/components/ui/PageHero";
import Reveal from "@/components/ui/Reveal";
import { posts, formatPostDate } from "@/lib/journal";
import { photos, unsplash } from "@/lib/site";

export const metadata: Metadata = {
  title: "The Journal",
  description: "Tips, market notes, and local stories for buyers, sellers, renters, and owners in Georgia and Alabama.",
};

export default function JournalPage() {
  const [lead, ...rest] = posts;
  return (
    <>
      <PageHero short image={photos.softLiving} eyebrow="The Journal" title="Notes & News" script="from the front porch" />
      <section className="bg-cream py-24">
        <div className="container-x">
          <Reveal as="article" className="group relative grid overflow-hidden rounded-[2rem] bg-white shadow-soft lg:grid-cols-2">
            <div className="relative aspect-[4/3] lg:aspect-auto lg:min-h-[420px]">
              <Image src={unsplash(lead.image, 1400)} alt="" fill sizes="(min-width:1024px) 50vw, 100vw" className="object-cover" />
            </div>
            <div className="flex flex-col justify-center p-8 sm:p-12">
              <p className="text-xs uppercase tracking-[0.16em] text-ink-muted">{lead.category} · {formatPostDate(lead.date)}</p>
              <h2 className="mt-3 font-display text-4xl uppercase tracking-wide">
                <Link href={`/journal/${lead.slug}`} className="after:absolute after:inset-0 group-hover:text-teal-deep">{lead.title}</Link>
              </h2>
              <p className="mt-4 text-lg font-light leading-relaxed">{lead.excerpt}</p>
              <p className="mt-6 text-sm font-semibold uppercase tracking-[0.16em] text-teal-deep">Read article →</p>
            </div>
          </Reveal>
          <div className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {rest.map((p, i) => (
              <Reveal as="article" key={p.slug} delay={i * 100} className="group relative">
                <div className="relative aspect-[4/3] overflow-hidden rounded-3xl">
                  <Image src={unsplash(p.image, 900)} alt="" fill sizes="(min-width:1024px) 33vw, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                </div>
                <p className="mt-5 text-xs uppercase tracking-[0.16em] text-ink-muted">{p.category} · {formatPostDate(p.date)}</p>
                <h3 className="mt-2 font-display text-2xl uppercase tracking-wide">
                  <Link href={`/journal/${p.slug}`} className="after:absolute after:inset-0 group-hover:text-teal-deep">{p.title}</Link>
                </h3>
                <p className="mt-2 leading-relaxed">{p.excerpt}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
