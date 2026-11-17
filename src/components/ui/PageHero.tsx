import Image from "next/image";
import { unsplash } from "@/lib/site";

/** Full-bleed photo hero for inner pages (Ambience style). */
export default function PageHero({
  image,
  eyebrow,
  title,
  script,
  children,
  short = false,
}: {
  image: string;
  eyebrow?: string;
  title: string;
  script?: string;
  children?: React.ReactNode;
  short?: boolean;
}) {
  return (
    <section
      className={`relative isolate flex items-end overflow-hidden ${short ? "min-h-[46vh]" : "min-h-[62vh]"}`}
    >
      <Image
        src={unsplash(image, 2000)}
        alt=""
        fill
        preload
        sizes="100vw"
        className="object-cover -z-10"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-black/65 via-black/30 to-black/40" />
      <div className="container-x pb-14 pt-32 text-center text-white">
        {eyebrow && <p className="eyebrow text-white/85 mb-4 animate-fade-up">{eyebrow}</p>}
        <h1 className="font-display uppercase font-light text-white text-5xl sm:text-6xl lg:text-7xl tracking-wide animate-fade-up">
          {title}
        </h1>
        {script && (
          <p className="font-script text-sun text-3xl sm:text-4xl -mt-1 animate-fade-up [animation-delay:120ms]">
            {script}
          </p>
        )}
        {children && <div className="mt-8 animate-fade-up [animation-delay:200ms]">{children}</div>}
      </div>
    </section>
  );
}
