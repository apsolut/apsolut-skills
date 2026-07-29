#!/usr/bin/env node
// design-dna pixel sampler — exact hexes from screenshots (Tier 1 ground truth).
//
//   node sample.mjs <image>              -> 12 dominant colors (quantized, node-vibrant-style)
//   node sample.mjs <image> <x> <y> ...  -> exact hex at each x,y pixel
//
// Requires sharp (one well-known dep): npm i sharp
// Sample flat fills away from edges — anti-aliased pixels lie.

const args = process.argv.slice(2);
if (!args.length || args[0] === "--help" || args[0] === "-h") {
  console.log("usage: node sample.mjs <image> [x y [x y ...]]");
  console.log("  no coords -> dominant palette (12 quantized swatches with pixel counts)");
  console.log("  coords    -> exact hex per x,y point");
  process.exit(0);
}

let sharp;
try {
  ({ default: sharp } = await import("sharp"));
} catch {
  console.error("sharp is not installed. Run: npm i sharp");
  process.exit(1);
}

const [img, ...pts] = args;
if (pts.length % 2 !== 0) {
  console.error("coordinates must come in x y pairs");
  process.exit(1);
}

const { data, info } = await sharp(img).raw().toBuffer({ resolveWithObject: true });
const toHex = (r, g, b) =>
  "#" + [r, g, b].map((v) => v.toString(16).padStart(2, "0")).join("");

if (pts.length) {
  for (let i = 0; i < pts.length; i += 2) {
    const x = Number(pts[i]);
    const y = Number(pts[i + 1]);
    if (!Number.isInteger(x) || !Number.isInteger(y) || x < 0 || y < 0 || x >= info.width || y >= info.height) {
      console.error(`${pts[i]},${pts[i + 1]}: out of bounds (image is ${info.width}x${info.height})`);
      continue;
    }
    const p = (y * info.width + x) * info.channels;
    console.log(`${x},${y}: ${toHex(data[p], data[p + 1], data[p + 2])}`);
  }
} else {
  // 5-bit-per-channel quantization -> count buckets -> top 12 swatches
  const counts = new Map();
  for (let i = 0; i < data.length; i += info.channels) {
    const key = ((data[i] >> 3) << 10) | ((data[i + 1] >> 3) << 5) | (data[i + 2] >> 3);
    counts.set(key, (counts.get(key) ?? 0) + 1);
  }
  const total = (data.length / info.channels) | 0;
  [...counts.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 12)
    .forEach(([key, n]) => {
      const hex = toHex(((key >> 10) & 31) << 3, ((key >> 5) & 31) << 3, (key & 31) << 3);
      console.log(`${hex}  ${((n / total) * 100).toFixed(1)}%`);
    });
}
