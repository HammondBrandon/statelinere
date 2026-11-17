/**
 * Stateline Realty Co. — business details used across the site.
 *
 * Everything marked TODO is a placeholder until the client confirms it.
 * Change it here and it updates the header, footer, contact page, schema, etc.
 */

export const site = {
  name: "Stateline Realty Co.",
  shortName: "Stateline",
  pmName: "Stateline Property Management",
  tagline: "Home on both sides of the line.",
  description:
    "Stateline Realty Co. helps families buy, sell, and rent homes across Georgia and Alabama, with full-service property management for owners and investors.",
  url: "https://www.statelinerealtyco.com", // TODO: confirm domain

  // TODO: confirm all contact details with client
  phone: "(706) 555-0142",
  phoneHref: "tel:+17065550142",
  pmPhone: "(706) 555-0187",
  pmPhoneHref: "tel:+17065550187",
  email: "hello@statelinerealtyco.com",
  pmEmail: "rentals@statelinerealtyco.com",
  address: {
    street: "100 Main Street",
    city: "Your City",
    state: "GA",
    zip: "30000",
  },
  hours: [
    { days: "Monday – Friday", time: "9:00 AM – 5:30 PM" },
    { days: "Saturday", time: "By appointment" },
  ],

  social: {
    facebook: "https://www.facebook.com/", // TODO
    instagram: "https://www.instagram.com/", // TODO
  },

  /** Tenant / owner portal links (e.g. AppFolio, Buildium, Rentvine). TODO */
  portals: {
    tenantPortal: "#",
    ownerPortal: "#",
    applyOnline: "#",
    payRent: "#",
  },
} as const;

/**
 * Areas served on each side of the state line.
 * TODO: replace with the client's actual market.
 */
export const serviceAreas = {
  GA: {
    label: "Georgia",
    blurb:
      "Small-town streets, lake weekends, and easy drives into the city — Georgia living with room to breathe.",
    image:
      "https://images.unsplash.com/photo-1558036117-15d82a90b9b1",
    towns: ["Columbus", "LaGrange", "West Point", "Carrollton", "Tallapoosa", "Bremen"],
  },
  AL: {
    label: "Alabama",
    blurb:
      "Wide-open land, friendly neighbors, and some of the best value in the Southeast just across the line.",
    image:
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef",
    towns: ["Phenix City", "Valley", "Lanett", "Heflin", "Roanoke", "Auburn"],
  },
} as const;

export const nav = [
  { label: "Find a Home", href: "/properties" },
  { label: "Buy", href: "/buy" },
  { label: "Sell", href: "/sell" },
  { label: "Property Management", href: "/property-management" },
  { label: "About", href: "/about" },
  { label: "Journal", href: "/journal" },
] as const;

/** Shared placeholder photography (Unsplash). Swap for client photos later. */
export const photos = {
  heroLiving: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6",
  sunsetField: "https://images.unsplash.com/photo-1500382017468-9049fed747ef",
  warmLiving: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0",
  softLiving: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace",
  brightLiving: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7",
  leatherLiving: "https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83",
  kitchen: "https://images.unsplash.com/photo-1556912173-3bb406ef7e77",
  kitchenWhite: "https://images.unsplash.com/photo-1507089947368-19c1da9775ae",
  bohoLiving: "https://images.unsplash.com/photo-1631679706909-1844bbd07221",
  diningNook: "https://images.unsplash.com/photo-1519710164239-da123dc03ef4",
  porchHome: "https://images.unsplash.com/photo-1570129477492-45c003edd2be",
  sunsetHome: "https://images.unsplash.com/photo-1558036117-15d82a90b9b1",
  brickHome: "https://images.unsplash.com/photo-1449844908441-8829872d2607",
  keys: "https://images.unsplash.com/photo-1560518883-ce09059eeffa",
  openPlan: "https://images.unsplash.com/photo-1600573472550-8090b5e0745e",
} as const;

/** Build an optimized Unsplash URL at a given width. */
export function unsplash(url: string, width = 1600): string {
  if (!url.includes("images.unsplash.com")) return url;
  return `${url}?auto=format&fit=crop&w=${width}&q=80`;
}
