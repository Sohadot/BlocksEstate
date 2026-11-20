import assert from "node:assert/strict";

const origin = "https://blocksestate.com";
const requireSecurity = process.argv.includes("--require-security-headers");
const requireCloudflare = process.argv.includes("--require-cloudflare-edge");
const expectedHeaders = {
  "x-content-type-options": "nosniff",
  "referrer-policy": "strict-origin-when-cross-origin",
  "x-frame-options": "DENY",
  "permissions-policy": "camera=(), microphone=(), geolocation=()",
};

async function get(path) {
  const response = await fetch(origin + path, {
    redirect: "manual",
    signal: AbortSignal.timeout(15000),
    headers: { "User-Agent": "BlocksEstate-release-smoke-check/1.0" },
  });
  assert.equal(response.status, 200, `Unexpected HTTP ${response.status} on ${path}`);
  return response;
}

try {
  const page = await get("/");
  assert.match(page.headers.get("content-type") ?? "", /^text\/html\b/i, "Homepage is not HTML");
  const html = await page.text();
  assert.ok(html.includes('<link rel="canonical" href="https://blocksestate.com/">'), "Live canonical mismatch");
  assert.ok(html.includes('content="https://blocksestate.com/social-preview.jpg"'), "Live OG image mismatch");

  const preview = await get("/social-preview.jpg");
  assert.match(preview.headers.get("content-type") ?? "", /^image\/jpeg\b/i, "Preview is not served as JPEG");
  await preview.arrayBuffer();

  const absent = Object.entries(expectedHeaders).filter(([name, value]) =>
    page.headers.get(name) !== value,
  );
  const cloudflareSeen = page.headers.has("cf-ray");
  const host = cloudflareSeen ? "Cloudflare proxy → GitHub Pages" :
    page.headers.has("x-github-request-id") ? "GitHub Pages (direct)" : "unidentified";

  console.log(`PASS — Live homepage and social image respond correctly (${host}).`);
  if (requireCloudflare && !cloudflareSeen) {
    throw new Error("Cloudflare edge was not detected; expected a CF-Ray response header");
  }
  if (absent.length) {
    const details = absent.map(([name, value]) =>
      `${name}: expected ${value}; got ${page.headers.get(name) ?? "(missing)"}`,
    ).join("\n  ");
    const message = `Security headers are not yet verified:\n  ${details}`;
    if (requireSecurity) throw new Error(message);
    console.warn(`WARN — ${message}\nEnforce these at the Cloudflare proxy using response-header rules.`);
  } else {
    console.log("PASS — Live static security headers match the intended Cloudflare policy.");
  }
} catch (error) {
  console.error(`FAIL — Live deployment check: ${error.message}`);
  process.exitCode = 1;
}
