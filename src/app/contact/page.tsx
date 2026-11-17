import type { Metadata } from "next";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import LeadForm from "@/components/forms/LeadForm";
import { LEAD_TOPICS } from "@/lib/lead-schema";
import { photos, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact Us",
  description: `Get in touch with ${site.name}. Call, email, or send us a message.`,
};

export default function ContactPage() {
  return (
    <>
      <PageHero short image={photos.diningNook} eyebrow="Contact" title="Let's Connect" script="we'd love to hear from you" />

      <section className="bg-cream py-24">
        <div className="container-x grid gap-10 lg:grid-cols-[1fr_1.4fr]">
          <div className="space-y-6">
            {[
              { icon: Phone, label: "Sales", value: site.phone, href: site.phoneHref },
              { icon: Phone, label: "Property management", value: site.pmPhone, href: site.pmPhoneHref },
              { icon: Mail, label: "Email", value: site.email, href: `mailto:${site.email}` },
            ].map((c) => (
              <a key={c.label} href={c.href} className="flex items-start gap-4 rounded-3xl bg-white p-6 ring-1 ring-line/60 hover:ring-teal">
                <c.icon className="mt-0.5 h-5 w-5 text-teal" aria-hidden />
                <span>
                  <span className="field-label !mb-1">{c.label}</span>
                  <span className="font-semibold text-ink">{c.value}</span>
                </span>
              </a>
            ))}
            <div className="flex items-start gap-4 rounded-3xl bg-white p-6 ring-1 ring-line/60">
              <MapPin className="mt-0.5 h-5 w-5 text-teal" aria-hidden />
              <address className="not-italic">
                <span className="field-label !mb-1">Office</span>
                <span className="text-ink">
                  {site.address.street}<br />{site.address.city}, {site.address.state} {site.address.zip}
                </span>
              </address>
            </div>
            <div className="flex items-start gap-4 rounded-3xl bg-white p-6 ring-1 ring-line/60">
              <Clock className="mt-0.5 h-5 w-5 text-teal" aria-hidden />
              <div>
                <span className="field-label !mb-1">Hours</span>
                {site.hours.map((h) => (
                  <p key={h.days} className="text-ink">{h.days}: {h.time}</p>
                ))}
              </div>
            </div>
          </div>

          <div className="rounded-3xl bg-white p-7 shadow-lift sm:p-10">
            <h2 className="font-display text-4xl uppercase tracking-wide">Send a Message</h2>
            <p className="mt-2 mb-8">We usually reply within one business day.</p>
            <LeadForm topics={[...LEAD_TOPICS].filter((t) => t !== "listing")} />
          </div>
        </div>
      </section>
    </>
  );
}
