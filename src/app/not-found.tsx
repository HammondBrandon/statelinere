import PageHero from "@/components/ui/PageHero";
import { ButtonLink } from "@/components/ui/Button";
import { photos } from "@/lib/site";

export default function NotFound() {
  return (
    <PageHero image={photos.sunsetField} eyebrow="404" title="Off the Map" script="this page crossed the line">
      <div className="flex flex-wrap justify-center gap-3">
        <ButtonLink href="/" variant="white">Back Home</ButtonLink>
        <ButtonLink href="/properties" variant="outline-light">Search Homes</ButtonLink>
      </div>
    </PageHero>
  );
}
