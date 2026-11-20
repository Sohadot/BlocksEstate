import { copyFileSync, mkdirSync, readdirSync, rmSync, statSync } from "node:fs";
import { resolve, sep } from "node:path";

const root = resolve(import.meta.dirname, "..");
const output = resolve(root, "dist");
if (!output.startsWith(root + sep)) throw new Error("Unsafe build output path");

// Allowlist the public release so private work, source scripts and repository
// metadata cannot accidentally be published through the Cloudflare build output.
const publicFiles = [
  "index.html",
  "styles.css",
  "main.js",
  "favicon.svg",
  "robots.txt",
  "sitemap.xml",
  "social-preview.jpg",
  "_headers",
];

rmSync(output, { recursive: true, force: true });
mkdirSync(output);
for (const name of publicFiles) {
  const source = resolve(root, name);
  if (!statSync(source).isFile()) throw new Error(`Invalid release input: ${name}`);
  copyFileSync(source, resolve(output, name));
}

const actual = readdirSync(output).sort();
const expected = [...publicFiles].sort();
if (JSON.stringify(actual) !== JSON.stringify(expected)) {
  throw new Error(`Unexpected deployment contents: ${actual.join(", ")}`);
}
console.log(`PASS — Cloudflare static bundle contains only ${publicFiles.length} approved public files.`);
