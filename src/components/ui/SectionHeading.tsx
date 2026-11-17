import { cn } from "@/lib/cn";

/**
 * Eyebrow + condensed display title + optional script accent word,
 * mirroring the logo lockup (STATELINE / Realty Co.).
 */
export default function SectionHeading({
  eyebrow,
  title,
  script,
  intro,
  align = "center",
  tone = "dark",
  className,
}: {
  eyebrow?: string;
  title: string;
  script?: string;
  intro?: React.ReactNode;
  align?: "center" | "left";
  tone?: "dark" | "light";
  className?: string;
}) {
  return (
    <div
      className={cn(
        align === "center" ? "mx-auto text-center items-center" : "text-left items-start",
        "flex flex-col max-w-3xl",
        className,
      )}
    >
      {eyebrow && (
        <p className={cn("eyebrow mb-4", tone === "light" ? "text-sun" : "text-teal-deep")}>{eyebrow}</p>
      )}
      <h2
        className={cn(
          "font-display uppercase font-normal text-4xl sm:text-5xl lg:text-6xl tracking-wide",
          tone === "light" && "text-white",
        )}
      >
        {title}
        {script && (
          <span
            className={cn(
              "block font-script normal-case tracking-normal text-[0.72em] leading-tight -mt-1",
              tone === "light" ? "text-sun" : "text-teal",
            )}
          >
            {script}
          </span>
        )}
      </h2>
      {intro && (
        <div
          className={cn(
            "mt-5 text-base sm:text-lg leading-relaxed font-light",
            tone === "light" ? "text-white/80" : "text-ink-soft",
          )}
        >
          {intro}
        </div>
      )}
    </div>
  );
}
