import { z } from "zod";

export const LEAD_TOPICS = [
  "general",
  "buying",
  "selling",
  "valuation",
  "listing",
  "renting",
  "owner",
  "maintenance",
] as const;

export type LeadTopic = (typeof LEAD_TOPICS)[number];

export const TOPIC_LABELS: Record<LeadTopic, string> = {
  general: "General question",
  buying: "Buying a home",
  selling: "Selling my home",
  valuation: "Free home valuation",
  listing: "A specific listing",
  renting: "Renting a home",
  owner: "Property management for my rental",
  maintenance: "Maintenance request",
};

/** Topics routed to the property management inbox */
export const PM_TOPICS: LeadTopic[] = ["renting", "owner", "maintenance"];

export const leadSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(120),
  email: z.string().trim().email("Please enter a valid email").max(200),
  phone: z.string().trim().max(40).optional(),
  topic: z.enum(LEAD_TOPICS),
  message: z.string().trim().min(5, "Please add a short message").max(4000),
  propertyAddress: z.string().trim().max(300).optional(),
  listingRef: z.string().trim().max(200).optional(),
  /** Honeypot: real visitors never fill it; the API silently drops it if filled */
  website: z.string().max(500).optional(),
});

export type LeadInput = z.infer<typeof leadSchema>;
