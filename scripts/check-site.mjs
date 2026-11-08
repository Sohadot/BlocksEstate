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
function check(condition, message) { assert.ok(condition, message); checks++; }

for (const path of ["index.html","styles.css","main.js","favicon.svg","robots.txt","sitemap.xml","_headers","README.md"]) {
  check(existsSync(resolve(root,path)), "Missing required file: " + path);
}
check(html.includes('lang="en"'), "Missing language");
check(/<main\b/.test(html) && /<h1\b/.test(html), "Missing semantic landmarks");
check(/<meta name="description"/.test(html), "Missing description");
check(/<meta name="theme-color" content="#b9c0c6"/.test(html), "Titanium theme-color missing");
check(/<meta name="color-scheme" content="light"/.test(html), "Light metallic scheme missing");
check(/--titanium: #b9c0c6/.test(css), "Titanium visual token missing");
check(!css.includes("--base: #101a21"), "Old carbon interface token remains");
check(/<link rel="canonical" href="https:\/\/blocksestate\.com\/"/.test(html), "Canonical missing");
check(/<meta property="og:title"/.test(html), "OpenGraph missing");
check(/<h1 id="hero-title">BlocksEstate<span class="hero-period">/.test(html), "Single-line hero name missing");
check((html.match(/<section class="section /g)||[]).length === 4, "Four-section editorial structure missing");
check(!html.includes("architecture-stage") && !html.includes("semantic-bar"), "Rejected hero stage still present");
check(/class="hero-taxonomy"/.test(html), "Missing wireframe territory strip");
check(/PHYSICAL SPACE/.test(html) && /DIGITAL STRUCTURES/.test(html) && /OWNERSHIP/.test(html), "Missing original hero territory labels");
check(!html.includes('class="nav-text-link"'), "Unrequested header navigation remains");
check(/category-semantic/.test(html), "Category naming idea missing");
check(/Category-level potential describes a positioning opportunity/.test(html) === false, "Obsolete extra category section still present");
check(/not a claim that a new market category already exists/.test(html), "Category-potential qualification missing");
check(/not representations of existing BlocksEstate products/.test(html), "Nonoperational applications qualification missing");
check(/mailto:agent@sohadot\.com/.test(html), "Acquisition route missing");
check(/https:\/\/www\.escrow\.com\/domains\/how-it-works/.test(html), "Official escrow information missing");
check(/No affiliation or endorsement is implied/.test(html), "Escrow independence missing");
check(/prefers-reduced-motion/.test(css), "Reduced-motion support missing");
check(/:focus-visible/.test(css), "Keyboard focus treatment missing");
check(/@media \(max-width: 680px\)/.test(css), "Mobile treatment missing");
check(/getElementById\("year"\)/.test(js), "Footer year handling missing");
check(/Sitemap: https:\/\/blocksestate\.com\/sitemap\.xml/.test(robots), "Robots sitemap missing");
check(/<loc>https:\/\/blocksestate\.com\/<\/loc>/.test(sitemap), "Sitemap URL mismatch");
const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(x => x[1]);
check(ids.length === new Set(ids).size, "Duplicate HTML ID");
for (const match of html.matchAll(/\bhref="#([^"]+)"/g)) check(ids.includes(match[1]), "Broken anchor #"+match[1]);
for (const path of ["styles.css","main.js","favicon.svg"]) check(html.includes('"/'+path+'"'), "Unreferenced static asset "+path);
const m = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
check(Boolean(m), "JSON-LD missing");
if (m) {
  const o = JSON.parse(m[1]);
  check(o["@type"] === "WebPage", "False structured operating-company claim");
  check(o.url === "https://blocksestate.com/", "JSON-LD canonical mismatch");
}
const favicon = read("favicon.svg");
check(favicon.includes('fill="#b9c0c6"'), "Favicon not titanium grey");
check((css.match(/\{/g)||[]).length === (css.match(/\}/g)||[]).length, "CSS delimiter mismatch");
for (const word of ["guaranteed roi","market leader","official escrow partner","the definitive brand identity"]) {
  check(!html.toLowerCase().includes(word), "Unsubstantiated brand claim: "+word);
}
console.log("PASS — "+checks+" static quality assertions; titanium-grey identity verified.");
