import Link from "next/link";
import { cn } from "@/lib/cn";

type Variant = "sun" | "teal" | "outline" | "outline-light" | "white";

const styles: Record<Variant, string> = {
  sun: "bg-sun text-ink hover:bg-sun-deep",
  teal: "bg-teal text-white hover:bg-teal-deep",
  white: "bg-white text-ink hover:bg-sun",
  outline: "border border-ink/20 text-ink hover:border-teal hover:text-teal-deep",
  "outline-light": "border border-white/70 text-white hover:bg-white hover:text-ink",
};

const base =
  "inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-[0.78rem] font-semibold uppercase tracking-[0.16em] transition-colors disabled:opacity-60 disabled:pointer-events-none";

export function ButtonLink({
  href,
  variant = "teal",
  className,
  children,
}: {
  href: string;
  variant?: Variant;
  className?: string;
  children: React.ReactNode;
}) {
  const external = /^(https?:|tel:|mailto:)/.test(href);
  if (external) {
    return (
      <a href={href} className={cn(base, styles[variant], className)}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={cn(base, styles[variant], className)}>
      {children}
    </Link>
  );
}

export function Button({
  variant = "teal",
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant }) {
  return <button className={cn(base, styles[variant], className)} {...props} />;
}
