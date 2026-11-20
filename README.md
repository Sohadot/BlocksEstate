# BlocksEstate.com

**The Next Architecture of Real Estate.**

BlocksEstate.com is a **concept-first, acquisition-oriented** landing page from the [Sohadot](https://sohadot.com/) portfolio.

The project positions the domain as a possible category-level identity at the intersection of physical property, modular systems, digital infrastructure and ownership. This is a **naming thesis**, not a claim that a new industry category has already been established, nor that BlocksEstate operates property, tokenization, brokerage, investment or software services.

## Scope

- One English-language, responsive, static page.
- Titanium-grey architectural visual language, a commanding single-line hero, and a restrained semantic interpretation of Blocks + Estate inside the conceptual shift.
- The original four-section hierarchy: Conceptual Shift, Strategic Domains of Application, Strategic Value and Sovereign Acquisition.
- Acquisition inquiries via agent@sohadot.com.
- Optional use of Escrow.com, following mutual agreement. Escrow.com is independent; no affiliation, endorsement, payment processing or live transaction initiation is represented.
- Canonical URL, OpenGraph metadata, truthful structured data, robots and sitemap.
- Accessibility: skip link, semantic headings, native links, keyboard and focus support, reduced-motion option.
- Dependency-free HTML, CSS, and JavaScript. No cookies, analytics, frameworks or external fonts.
- No database, form handler, pretend product, generated inventory or price claims.
- Visual palette: satin titanium #B9C0C6, pale titanium #D9DEE1, graphite ink #18232B, and restrained mineral-blue graphite accents. No carbon-black background.

## Development

Open the site through a local static server:

    python3 -m http.server 8080

Then visit http://localhost:8080.

Quality checks require Node.js 20 or later:

    npm run check

No dependency installation is needed.

## Social sharing preview

- The Open Graph and X share card both use the **same real image**: `https://blocksestate.com/social-preview.jpg`.
- `social-preview.jpg` is a committed **1200 × 630 JPEG**, generated from the original editable `social-preview.svg` on the social-preview feature branch.
- The image leads with **BlocksEstate**, a titanium-grey architectural visual and its category-level positioning. Sohadot appears only as an acquisition attribution at the bottom, not as the leading identity.
- The Open Graph fields include `og:image`, `og:image:secure_url`, MIME type, dimensions and accessible alternative text; X uses `summary_large_image`, `twitter:image` and alternative text.
- Keep the JPEG publicly accessible over HTTPS without login, redirects to access-controlled resources, or robots blocking. Static quality checks validate the file and metadata together.
- When published, verify the live `/social-preview.jpg` returns **HTTP 200** with **image/jpeg**, and verify LinkedIn / Facebook / X / WhatsApp previews. Social crawlers can retain old cards in cache; use platform re-scrape tools where available.
- The image is not in production merely because the PR has been opened. Merge, deployment and public crawler verification are separate gates.

## Hosting and security (verified November 20, 2026)

**GitHub is the sole source of site code and releases. GitHub Pages remains the
origin host. Cloudflare DNS proxy is an optional security and CDN layer in front
of that origin, not a replacement for the origin or a second deployment.**

The live site currently responds directly from GitHub Pages, identifiable by
its `x-github-request-id` header. GitHub Pages does not process `_headers`;
the checked-in file is a reference policy only and **does not apply security
headers**. The November 20 live response lacked the four headers specified in
that file. The Cloudflare edge must add these headers through **Response Header
Transform Rules** or an appropriate Managed Transform, when enabled.

If Cloudflare protection is activated:

1. Keep the GitHub Pages custom-domain configuration and `CNAME` unchanged.
   Preserve the existing GitHub Pages origin targets in Cloudflare DNS; proxy
   only the intended web records (orange cloud). Do not proxy MX or change
   email-routing, SPF, DKIM or DMARC records.
2. Verify the GitHub Pages origin HTTPS certificate, then use Cloudflare
   SSL/TLS **Full (strict)** where the origin configuration supports it; avoid
   Flexible mode. Confirm both apex and `www` redirects after activation.
3. Enable suitable Cloudflare edge protections and configure desired response
   headers. The `_headers` file is **not** an importable Cloudflare DNS or
   Transform Rules configuration.
4. Verify the page, acquisition email link, `robots.txt`, the 1200x630 social
   image and its public crawler access after Cloudflare proxying. Avoid blanket
   challenges that could block legitimate social preview crawlers.

No Cloudflare DNS, SSL/TLS, WAF or Rules settings are changed by this repository.
All actual configuration changes must be made and validated in Cloudflare.

    npm run check:live
    npm run check:live -- --require-cloudflare-edge --require-security-headers

The first command checks the public homepage and image, warning if any intended
security header is absent. The second requires a Cloudflare proxy response
(`CF-Ray`) **and** all intended security headers; use it after enabling the
proxy. A custom Content-Security-Policy needs separate review and live testing.
Official guidance: [Cloudflare proxy status](https://developers.cloudflare.com/dns/proxy-status/),
[Full (strict)](https://developers.cloudflare.com/ssl/origin-configuration/ssl-modes/full-strict/),
[Response Header Transform Rules](https://developers.cloudflare.com/rules/transform/response-header-modification/).

## Acquisition handling

- Domain only is included by default; any other assets require specific written agreement.
- Do not invent prices, revenue, products, customers, trademarks, partnerships or product capabilities.
- Buyer contacts Sohadot by email. After both parties agree on terms, a domain escrow transaction may be considered and initiated using the provider's official website.
- Verify any proposed payment instructions with the official escrow provider before transferring the domain. Identity checks, payment methods, availability, fees and transfer conditions vary.
- Illustrative business applications are not legal, investment or financial advice.
- Domain ownership verification, trademark clearance and registrar transfer restrictions are outside this repository and should be checked before sale or branded commercial use.

## Release gate

Before deploying: run npm run check; review mobile and desktop rendering in an actual browser; validate the email link, escrow link and headers; confirm domain/hosting control and legal claims. The pull request does not deploy the site.

Maintained for **Sohadot / BlocksEstate.com**.
