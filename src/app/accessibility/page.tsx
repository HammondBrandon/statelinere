import type { Metadata } from "next";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "Accessibility" };

export default function AccessibilityPage() {
  return (
    <div className="bg-white pt-32 pb-24">
      <div className="container-x max-w-3xl space-y-5 leading-relaxed">
        <h1 className="font-display text-5xl uppercase tracking-wide">Accessibility</h1>
        <p>
          {site.name} is committed to making this website usable for everyone, and we aim to meet
          WCAG 2.1 AA guidelines. If you have trouble using any part of the site, please call{" "}
          <a className="text-teal-deep underline" href={site.phoneHref}>{site.phone}</a> or email{" "}
          <a className="text-teal-deep underline" href={`mailto:${site.email}`}>{site.email}</a> and
          we&apos;ll help right away.
        </p>
        <p>We are pledged to the letter and spirit of U.S. policy for the achievement of equal housing opportunity.</p>
      </div>
    </div>
  );
}
