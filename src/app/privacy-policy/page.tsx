import type { Metadata } from "next";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "Privacy Policy" };

// TODO: have the client's attorney review/replace this placeholder policy.
export default function PrivacyPage() {
  return (
    <div className="bg-white pt-32 pb-24">
      <div className="container-x max-w-3xl space-y-5 leading-relaxed">
        <h1 className="font-display text-5xl uppercase tracking-wide">Privacy Policy</h1>
        <p className="text-sm text-ink-muted">Placeholder: pending client review.</p>
        <p>
          {site.name} respects your privacy. When you submit a form on this site, we collect the
          information you provide (such as your name, email, phone number, and message) so we can
          respond to your inquiry. We do not sell your personal information.
        </p>
        <h2 className="font-display text-2xl uppercase tracking-wide pt-4">Listing data</h2>
        <p>
          Property listings are provided through Internet Data Exchange (IDX) agreements with the
          Georgia MLS and Alabama MLS for consumers&apos; personal, non-commercial use.
        </p>
        <h2 className="font-display text-2xl uppercase tracking-wide pt-4">Contact</h2>
        <p>
          Questions? Email <a className="text-teal-deep underline" href={`mailto:${site.email}`}>{site.email}</a>.
        </p>
      </div>
    </div>
  );
}
