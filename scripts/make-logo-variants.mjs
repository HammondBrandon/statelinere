// Turns the client's white-background logo PNGs into transparent versions,
// plus a "white" variant (teal → white, sun stays yellow) for dark photography.
// Every pixel is a blend of white with brand teal #0097B2 or brand yellow #FEC52B,
// so alpha can be recovered from the channel where the brand color is darkest.
// Run from the project root: node scripts/make-logo-variants.mjs
import sharp from "sharp";

const TEAL = [0, 151, 178];
const YELLOW = [254, 197, 43];
const jobs = [
  ["scripts/source-logos/stateline-realty-co.png", "public/brand/stateline-realty-co"],
  ["scripts/source-logos/stateline-property-management.png", "public/brand/stateline-property-management"],
];

for (const [src, outBase] of jobs) {
  const { data, info } = await sharp(src).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const color = Buffer.from(data);
  const white = Buffer.from(data);
  // Some exports already have a transparent background; keep their alpha as-is.
  let hasTransparency = false;
  for (let i = 3; i < data.length; i += 4) if (data[i] < 255) { hasTransparency = true; break; }
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const b = data[i + 2];
    const isTeal = b > r;
    const a = isTeal ? (255 - r) / 255 : (255 - b) / (255 - YELLOW[2]);
    const alpha = hasTransparency
      ? data[i + 3]
      : Math.max(0, Math.min(255, Math.round(a * 255)));
    color.set([...(isTeal ? TEAL : YELLOW), alpha], i);
    white.set([...(isTeal ? [255, 255, 255] : YELLOW), alpha], i);
  }
  for (const [buf, suffix] of [[color, ""], [white, "-white"]]) {
    await sharp(buf, { raw: info }).trim().png().toFile(`${outBase}${suffix}.png`);
  }
  console.log("wrote", outBase);
}
