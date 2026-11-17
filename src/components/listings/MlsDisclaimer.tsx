import Image from "next/image";
import type { MlsSource } from "@/lib/mls";

/**
 * Per-feed IDX attribution. Each MLS dictates its own wording/logo —
 * confirm the exact copy in each data license agreement before launch.
 */
export default function MlsDisclaimer({ sources }: { sources: MlsSource[] }) {
  const year = new Date().getFullYear();

  if (sources.includes("SAMPLE")) {
    return (
      <div className="rounded-2xl border border-dashed border-stone bg-cream p-5 text-xs leading-relaxed text-ink-muted">
        <strong className="text-ink">Sample listings shown.</strong> Live Georgia MLS and Alabama MLS
        listings will appear here once the IDX feeds are connected. Addresses, prices, and photos on
        this page are placeholders for design review only.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {sources.includes("GAMLS") && (
        <div className="flex flex-col items-center gap-4 rounded-2xl bg-cream p-5 sm:flex-row">
          <Image src="/images/mls/gamls-idx.png" alt="Georgia MLS" width={110} height={43} className="shrink-0" />
          <p className="text-xs leading-relaxed text-ink-muted">
            © {year} Georgia MLS. All rights reserved. Information deemed reliable but not
            guaranteed. Listing data is provided for consumers&apos; personal, non-commercial use and
            may not be used for any purpose other than to identify prospective properties consumers
            may be interested in purchasing.
          </p>
        </div>
      )}
      {sources.includes("ALMLS") && (
        <div className="rounded-2xl bg-cream p-5">
          {/* TODO: replace with the Alabama MLS's required logo + disclaimer text */}
          <p className="text-xs leading-relaxed text-ink-muted">
            © {year} Alabama MLS. All rights reserved. Information deemed reliable but not
            guaranteed. IDX information is provided exclusively for consumers&apos; personal,
            non-commercial use.
          </p>
        </div>
      )}
    </div>
  );
}
