import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";
import assert from "node:assert/strict";

const root = resolve(import.meta.dirname, "..");
const read = (path) => readFileSync(resolve(root, path), "utf8");
const html = read("index.html");
const css = read("styles.css");
const js = read("main.js");
const robots = read("robots.txt");
const sitemap = read("sitemap.xml");
let checks = 0;

function check(condition, message) {
  assert.ok(condition, message);
  checks++;
}

for (const path of ["index.html", "styles.css", "main.js", "favicon.svg", "robots.txt", "sitemap.xml", "_headers", "README.md"]) {
  check(existsSync(resolve(root, path)), "Missing required file: " + path);
}

check(html.includes('lang="en"'), "Language declaration missing");
check(/<main\b/.test(html) && /<h1\b/.test(html), "Semantic landmarks missing");
check(/<meta name="description"/.test(html), "Metadata description missing");
check(/<link rel="canonical" href="https:\/\/blocksestate\.com\/"/.test(html), "Canonical URL missing");
check(/<meta property="og:title"/.test(html), "OpenGraph title missing");
check(/BlocksEstate\.com/.test(html), "Domain presentation missing");
check(/Category-level potential describes a positioning opportunity/.test(html), "Category qualification missing");
check(/not representations of existing BlocksEstate products/.test(html), "Product-state qualification missing");
check(/mailto:agent@sohadot\.com/.test(html), "Acquisition email missing");
check(/https:\/\/www\.escrow\.com\/domains\/how-it-works/.test(html), "Official escrow information link missing");
check(/No affiliation or endorsement is implied/.test(html), "Escrow independence disclosure missing");
check(/prefers-reduced-motion/.test(css), "Reduced-motion treatment missing");
check(/:focus-visible/.test(css), "Visible focus styling missing");
check(/@media \(max-width: 680px\)/.test(css), "Mobile viewport rules missing");
check(/aria-pressed/.test(html) && /setAttribute\("aria-pressed"/.test(js), "Button state handling missing");
check(/keydown/.test(js), "Keyboard handling missing");
check(/Sitemap: https:\/\/blocksestate\.com\/sitemap\.xml/.test(robots), "Robots sitemap missing");
check(/<loc>https:\/\/blocksestate\.com\/<\/loc>/.test(sitemap), "Sitemap canonical mismatch");

const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map((match) => match[1]);
check(ids.length === new Set(ids).size, "Duplicate HTML IDs");
for (const match of html.matchAll(/\bhref="#([^"]+)"/g)) {
  check(ids.includes(match[1]), "Broken in-page anchor: #" + match[1]);
}
for (const path of ["styles.css", "main.js", "favicon.svg"]) {
  check(html.includes('"/' + path + '"'), "Asset reference missing: " + path);
}

const jsonLd = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
check(Boolean(jsonLd), "Structured data missing");
if (jsonLd) {
  const data = JSON.parse(jsonLd[1]);
  check(data["@type"] === "WebPage", "Structured data must describe the page rather than a fictitious operating company");
  check(data.url === "https://blocksestate.com/", "Structured data URL mismatch");
}
const icon = read("favicon.svg");
check(icon.startsWith("<svg ") && icon.includes("</svg>"), "Malformed SVG favicon");

for (const phrase of ["guaranteed roi", "market leader", "official escrow partner", "the definitive brand identity"]) {
  check(!html.toLowerCase().includes(phrase), "Unsubstantiated claim: " + phrase);
}
console.log("PASS — " + checks + " static quality assertions.");
