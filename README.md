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

## Hosting

Static hosting recommended. The checked-in files may be deployed as-is with index.html at the site root. For Cloudflare Pages, use a static/no-framework configuration and publish the directory containing index.html, subject to the hosting account's supported settings. Configure the custom domain, SSL, canonical-host redirect and DNS separately.

The _headers file provides basic security-related headers on platforms (such as Cloudflare Pages) that support that convention. A custom Content-Security-Policy should be evaluated with the actual hosting stack before release.

The intended canonical host is https://blocksestate.com/. Confirm domain control, live resolution and any www redirect before production deployment.

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
