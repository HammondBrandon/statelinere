"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X, Phone } from "lucide-react";
import { nav, site } from "@/lib/site";
import { cn } from "@/lib/cn";

/** Routes that open with a dark full-bleed photo get a transparent header. */
function hasPhotoHero(pathname: string) {
  if (/^\/(properties|journal)\/.+/.test(pathname)) return false;
  return true;
}

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const overHero = hasPhotoHero(pathname) && !scrolled && !open;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu after navigation (render-phase reset, no effect needed).
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const isPm = pathname.startsWith("/property-management");
  const logoBase = isPm ? "stateline-property-management" : "stateline-realty-co";

  return (
    <>
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,color] duration-300",
        overHero ? "bg-gradient-to-b from-black/45 to-transparent text-white" : "bg-white/95 backdrop-blur text-ink shadow-[0_1px_0_var(--color-line)]",
      )}
    >
      <div className="container-x flex h-20 items-center justify-between gap-6">
        <Link href="/" className="flex items-center shrink-0" aria-label={`${site.name} home`}>
          <Image
            src={`/brand/${logoBase}${overHero ? "-white" : ""}.png`}
            alt={isPm ? site.pmName : site.name}
            width={isPm ? 371 : 389}
            height={isPm ? 302 : 478}
            className={cn("w-auto transition-all duration-300", isPm ? "h-14" : "h-16")}
            preload
          />
        </Link>

        <nav aria-label="Main" className="hidden xl:flex items-center gap-8">
          {nav.map((item) => {
            const active = pathname === item.href || pathname.startsWith(item.href + "/");
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "relative text-[0.78rem] font-medium uppercase tracking-[0.18em] py-2",
                  "after:absolute after:left-0 after:-bottom-0.5 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-current after:transition-transform hover:after:scale-x-100",
                  active && "after:scale-x-100",
                  active && !overHero && "text-teal-deep",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={site.phoneHref}
            className={cn(
              "hidden md:inline-flex items-center gap-2 text-sm font-medium",
              overHero ? "text-white/90 hover:text-white" : "text-ink-soft hover:text-teal-deep",
            )}
          >
            <Phone className="h-4 w-4" aria-hidden />
            {site.phone}
          </a>
          <Link
            href="/contact"
            className={cn(
              "hidden sm:inline-flex rounded-full px-5 py-2.5 text-[0.78rem] font-semibold uppercase tracking-[0.16em] transition-colors",
              overHero
                ? "bg-white text-ink hover:bg-sun"
                : "bg-teal text-white hover:bg-teal-deep",
            )}
          >
            Let&apos;s Talk
          </Link>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="xl:hidden -mr-2 p-2"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
          >
            {open ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
          </button>
        </div>
      </div>
    </header>

      {/* Mobile / tablet menu: outside <header> so the header's backdrop-filter
          doesn't become the containing block for this fixed panel. */}
      <div
        id="mobile-menu"
        className={cn(
          "xl:hidden fixed inset-x-0 top-20 bottom-0 z-40 bg-cream text-ink transition-[opacity,visibility] duration-300",
          open ? "opacity-100 visible" : "opacity-0 invisible",
        )}
      >
        <nav aria-label="Mobile" className="container-x flex flex-col pt-6 pb-10 h-full overflow-y-auto">
          {[{ label: "Home", href: "/" }, ...nav, { label: "Contact", href: "/contact" }].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="font-display text-4xl uppercase tracking-wide py-3 border-b border-line hover:text-teal-deep"
            >
              {item.label}
            </Link>
          ))}
          <div className="mt-auto pt-8 space-y-2 text-sm">
            <a href={site.phoneHref} className="block font-semibold text-teal-deep">{site.phone}</a>
            <a href={`mailto:${site.email}`} className="block">{site.email}</a>
          </div>
        </nav>
      </div>
    </>
  );
}
