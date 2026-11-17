import Image from "next/image";
import Link from "next/link";
import { site, nav, serviceAreas } from "@/lib/site";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-teal-ink text-white/75">
      {/* Sun stripe */}
      <div className="h-1.5 bg-gradient-to-r from-sun via-sun to-teal" aria-hidden />
      <div className="container-x grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1fr]">
        <div>
          <Image
            src="/brand/stateline-realty-co-white.png"
            alt={site.name}
            width={389}
            height={478}
            className="h-28 w-auto"
          />
          <p className="mt-6 max-w-xs text-sm leading-relaxed">{site.description}</p>
          <p className="mt-6 font-script text-3xl text-sun">{site.tagline}</p>
        </div>

        <div>
          <h2 className="eyebrow text-white mb-5">Explore</h2>
          <ul className="space-y-3 text-sm">
            {nav.map((n) => (
              <li key={n.href}>
                <Link href={n.href} className="hover:text-sun">{n.label}</Link>
              </li>
            ))}
            <li><Link href="/contact" className="hover:text-sun">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h2 className="eyebrow text-white mb-5">Where We Work</h2>
          <ul className="space-y-3 text-sm">
            {(["GA", "AL"] as const).map((st) => (
              <li key={st}>
                <Link href={`/properties?state=${st}`} className="hover:text-sun">
                  Homes in {serviceAreas[st].label}
                </Link>
              </li>
            ))}
            <li><Link href="/properties?transaction=rent" className="hover:text-sun">Homes for Rent</Link></li>
            <li><Link href="/sell#valuation" className="hover:text-sun">What&apos;s My Home Worth?</Link></li>
            <li><a href={site.portals.tenantPortal} className="hover:text-sun">Tenant Portal</a></li>
            <li><a href={site.portals.ownerPortal} className="hover:text-sun">Owner Portal</a></li>
          </ul>
        </div>

        <div>
          <h2 className="eyebrow text-white mb-5">Visit</h2>
          <address className="not-italic text-sm leading-relaxed">
            {site.address.street}
            <br />
            {site.address.city}, {site.address.state} {site.address.zip}
          </address>
          <div className="mt-5 space-y-1 text-sm">
            <p>Sales <a href={site.phoneHref} className="text-white hover:text-sun">{site.phone}</a></p>
            <p>Rentals <a href={site.pmPhoneHref} className="text-white hover:text-sun">{site.pmPhone}</a></p>
            <p><a href={`mailto:${site.email}`} className="text-white hover:text-sun">{site.email}</a></p>
          </div>
          <div className="mt-6 flex gap-4 text-sm">
            <a href={site.social.facebook} className="hover:text-sun" target="_blank" rel="noopener noreferrer">Facebook</a>
            <a href={site.social.instagram} className="hover:text-sun" target="_blank" rel="noopener noreferrer">Instagram</a>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-x flex flex-col gap-3 py-6 text-xs md:flex-row md:items-center md:justify-between">
          <p>© {year} {site.name} · {site.pmName}. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <span>Equal Housing Opportunity</span>
            <Link href="/privacy-policy" className="hover:text-sun">Privacy Policy</Link>
            <Link href="/accessibility" className="hover:text-sun">Accessibility</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
