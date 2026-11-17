"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { leadSchema, TOPIC_LABELS, type LeadInput, type LeadTopic } from "@/lib/lead-schema";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

/**
 * One form component for every lead type: general contact, listing inquiry,
 * home valuation, owner/landlord inquiry. `topic` presets the subject.
 */
export default function LeadForm({
  topic = "general",
  topics,
  listingRef,
  showAddress = false,
  submitLabel = "Send Message",
  messagePlaceholder = "How can we help?",
  defaultMessage,
  compact = false,
}: {
  topic?: LeadTopic;
  /** Let the visitor pick from these topics */
  topics?: LeadTopic[];
  listingRef?: string;
  showAddress?: boolean;
  submitLabel?: string;
  messagePlaceholder?: string;
  defaultMessage?: string;
  compact?: boolean;
}) {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LeadInput>({
    resolver: zodResolver(leadSchema),
    defaultValues: { topic, listingRef, message: defaultMessage ?? "", website: "" },
  });

  async function onSubmit(data: LeadInput) {
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error();
      setStatus("sent");
      reset({ topic, listingRef, message: defaultMessage ?? "", website: "" });
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="rounded-2xl bg-teal-mist p-8 text-center">
        <CheckCircle2 className="mx-auto h-10 w-10 text-teal" aria-hidden />
        <p className="mt-4 font-display text-2xl uppercase tracking-wide text-ink">Thank you!</p>
        <p className="mt-2 text-sm text-ink-soft">We&apos;ll be in touch within one business day.</p>
        <button type="button" onClick={() => setStatus("idle")} className="mt-5 text-sm font-semibold text-teal-deep underline underline-offset-4">
          Send another message
        </button>
      </div>
    );
  }

  const err = (msg?: string) => msg && <p className="mt-1.5 text-xs text-red-700">{msg}</p>;

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
      {/* Honeypot */}
      <input type="text" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden {...register("website")} />
      <input type="hidden" {...register("listingRef")} />

      <div className={cn("grid gap-4", !compact && "sm:grid-cols-2")}>
        <label className="block">
          <span className="field-label">Name</span>
          <input className="field" autoComplete="name" {...register("name")} aria-invalid={!!errors.name} />
          {err(errors.name?.message)}
        </label>
        <label className="block">
          <span className="field-label">Phone</span>
          <input className="field" type="tel" autoComplete="tel" {...register("phone")} />
        </label>
      </div>
      <label className="block">
        <span className="field-label">Email</span>
        <input className="field" type="email" autoComplete="email" {...register("email")} aria-invalid={!!errors.email} />
        {err(errors.email?.message)}
      </label>

      {topics ? (
        <label className="block">
          <span className="field-label">I&apos;m interested in</span>
          <select className="field" {...register("topic")}>
            {topics.map((t) => (
              <option key={t} value={t}>{TOPIC_LABELS[t]}</option>
            ))}
          </select>
        </label>
      ) : (
        <input type="hidden" {...register("topic")} />
      )}

      {showAddress && (
        <label className="block">
          <span className="field-label">Property address</span>
          <input className="field" autoComplete="street-address" {...register("propertyAddress")} />
        </label>
      )}

      <label className="block">
        <span className="field-label">Message</span>
        <textarea className="field min-h-28" rows={compact ? 3 : 4} placeholder={messagePlaceholder} {...register("message")} aria-invalid={!!errors.message} />
        {err(errors.message?.message)}
      </label>

      <Button type="submit" disabled={status === "sending"} className="w-full sm:w-auto">
        {status === "sending" ? "Sending…" : submitLabel}
      </Button>
      {status === "error" && (
        <p className="text-sm text-red-700" role="alert">
          Something went wrong. Please call us or try again.
        </p>
      )}
    </form>
  );
}
