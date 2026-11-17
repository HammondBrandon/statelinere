import Image from "next/image";
import Link from "next/link";
import { photos, unsplash } from "@/lib/site";
import Reveal from "@/components/ui/Reveal";

/** Ambience's signature "How can we help?" — big photo tiles with centered labels. */
const tiles = [
  { label: "Find a Home", script: "across two states", href: "/properties", image: photos.softLiving },
  { label: "Sell Your Home", script: "for top dollar", href: "/sell", image: photos.kitchenWhite },
  { label: "Property Management", script: "for owners & renters", href: "/property-management", image: photos.bohoLiving },
  { label: "Let's Connect", script: "we're right here", href: "/contact", image: photos.diningNook },
];

export default function PhotoTiles() {
  return (
    <section className="bg-white py-24 sm:py-32">
      <div className="container-x">
        <Reveal className="mb-14 text-center">
          <p className="eyebrow text-teal-deep">How can we help?</p>
          <h2 className="mt-4 font-display text-4xl font-light uppercase tracking-wide sm:text-5xl">
            Explore Our Services
          </h2>
        </Reveal>
        <div className="grid gap-4 md:grid-cols-2">
          {tiles.map((t, i) => (
            <Reveal key={t.href} delay={(i % 2) * 120}>
              <Link
                href={t.href}
                className="group relative flex aspect-[16/11] items-end justify-center overflow-hidden rounded-3xl md:aspect-[5/4] lg:aspect-[16/11]"
              >
                <Image
                  src={unsplash(t.image, 1400)}
                  alt=""
                  fill
                  sizes="(min-width:768px) 50vw, 100vw"
                  className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105"
                />
                <span className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent transition-colors group-hover:from-black/70" />
                <span className="relative pb-10 text-center text-white">
                  <span className="block font-display text-3xl font-light uppercase tracking-[0.08em] sm:text-4xl">
                    {t.label}
                  </span>
                  <span className="block font-script text-2xl text-sun opacity-90 sm:text-3xl">{t.script}</span>
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
