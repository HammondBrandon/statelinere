/**
 * Journal / blog posts — placeholder content for the client to replace.
 * (Brickly's "latest news" section; can move to a CMS later.)
 */
export interface Post {
  slug: string;
  title: string;
  date: string; // ISO
  category: string;
  excerpt: string;
  image: string;
  body: string[];
}

const u = (id: string) => `https://images.unsplash.com/photo-${id}`;

export const posts: Post[] = [
  {
    slug: "buying-on-the-state-line",
    title: "Buying on the State Line: Georgia vs. Alabama",
    date: "2026-11-03",
    category: "Buying",
    excerpt:
      "Property taxes, closing customs, and school zones change the moment you cross the line. Here's what to weigh before you pick a side.",
    image: u("1558036117-15d82a90b9b1"),
    body: [
      "One of the best parts of living near the Georgia–Alabama line is choice. A ten-minute drive can change your property tax bill, your school district, and even your time zone.",
      "Alabama has some of the lowest property taxes in the country, which can make a real difference in your monthly payment. Georgia offers a homestead exemption and a wide range of newer construction in growing communities.",
      "Closings work differently too. In Georgia, closings are handled by an attorney; in Alabama, many transactions close with a title company. We work both sides of the line every week and will walk you through each step.",
      "The right answer depends on your commute, your budget, and how you like to live. Let's talk through it together.",
    ],
  },
  {
    slug: "preparing-your-home-for-sale",
    title: "Preparing Your Home for Sale: A Simple Checklist",
    date: "2026-10-21",
    category: "Selling",
    excerpt:
      "Light, space, and a little sunshine. The small projects that make the biggest difference before your listing photos.",
    image: u("1600210492486-724fe5c67fb0"),
    body: [
      "Buyers fall in love online first. That means your listing photos need to feel bright, open, and inviting.",
      "Start by decluttering every surface, then deep clean, touch up paint, and swap any dated light bulbs for warm, consistent ones. Open every blind on photo day.",
      "Outside, fresh pine straw, a clean front door, and a couple of potted plants go a long way toward curb appeal.",
      "Not sure where to start? We'll walk your home with you and give you an honest, prioritized list.",
    ],
  },
  {
    slug: "what-a-property-manager-does",
    title: "What a Great Property Manager Actually Does",
    date: "2026-10-08",
    category: "Property Management",
    excerpt:
      "From tenant screening to 2 a.m. maintenance calls — what to expect when you hand over the keys to your rental.",
    image: u("1560518883-ce09059eeffa"),
    body: [
      "Owning a rental should build wealth, not take over your weekends. A great property manager protects your investment and your time.",
      "That starts with thorough tenant screening, clear leases that follow Georgia and Alabama landlord-tenant law, and on-time rent collection with owner payouts you can count on.",
      "Just as important is maintenance: regular inspections, trusted local vendors, and a real person answering the phone when something breaks.",
      "Stateline Property Management handles all of it, with monthly statements and an online owner portal so you always know where things stand.",
    ],
  },
  {
    slug: "first-time-buyer-programs",
    title: "First-Time Buyer Programs Worth Knowing",
    date: "2026-09-24",
    category: "Buying",
    excerpt:
      "Down payment assistance, USDA loans, and state programs that can make your first home more attainable.",
    image: u("1570129477492-45c003edd2be"),
    body: [
      "Buying your first home may be closer than you think. Both Georgia and Alabama offer programs to help with down payment and closing costs.",
      "Many towns in our area also qualify for USDA financing, which can mean zero down payment for eligible buyers.",
      "We'll connect you with trusted local lenders who know these programs inside and out.",
    ],
  },
];

export function getPost(slug: string) {
  return posts.find((p) => p.slug === slug) ?? null;
}

export function formatPostDate(iso: string) {
  return new Date(iso + "T12:00:00").toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}
