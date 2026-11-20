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

`npm run check` also creates a clean `dist/` release directory with an explicit
allowlist of eight public assets. Private acquisition material, pricing, buyer
lists, repository scripts and source SVG files do not belong in `dist/`. The
generated `dist/` directory is ignored by Git and must not be committed.


## Social sharing preview

- The Open Graph and X share card both use the **same real image**: `https://blocksestate.com/social-preview.jpg`.
- `social-preview.jpg` is a committed **1200 × 630 JPEG**, generated from the original editable `social-preview.svg` on the social-preview feature branch.
- The image leads with **BlocksEstate**, a titanium-grey architectural visual and its category-level positioning. Sohadot appears only as an acquisition attribution at the bottom, not as the leading identity.
- The Open Graph fields include `og:image`, `og:image:secure_url`, MIME type, dimensions and accessible alternative text; X uses `summary_large_image`, `twitter:image` and alternative text.
- Keep the JPEG publicly accessible over HTTPS without login, redirects to access-controlled resources, or robots blocking. Static quality checks validate the file and metadata together.
- When published, verify the live `/social-preview.jpg` returns **HTTP 200** with **image/jpeg**, and verify LinkedIn / Facebook / X / WhatsApp previews. Social crawlers can retain old cards in cache; use platform re-scrape tools where available.
- The image is not in production merely because the PR has been opened. Merge, deployment and public crawler verification are separate gates.

## Hosting and security (verified November 20, 2026)

The live site currently responds from **GitHub Pages**, identifiable by its
`x-github-request-id` response header. GitHub Pages does not process `_headers`;
the checked-in file is **not** evidence that HTTP security headers are active.
The current live homepage did not send the four headers specified in `_headers`.
GitHub Pages is still the source of the public site until a migration completes.

The chosen future host may be **Cloudflare Pages** or **Cloudflare Workers Static
Assets**: both support `_headers` for static asset responses. Dynamic Worker or
Pages Function responses need separate handling. No DNS or hosting settings are
changed by this repository.

For **Cloudflare Pages Git integration**, connect `Sohadot/BlocksEstate` and use:

- Build command: `npm run build`
- Build output directory: `dist`
- Project root: repository root
- Production branch: `main` (only after review and merge)

For **Workers Static Assets**, the same `dist/` output and `_headers` can be
used, but deployment requires an appropriate Workers static-assets project
configuration. This repository does not yet configure or deploy a Worker.

First validate the Cloudflare preview deployment and its security headers.
Then, in a separate controlled cutover, configure DNS, the custom domain, TLS
and redirects for `https://blocksestate.com/`. Keep the current GitHub Pages
configuration intact until the Cloudflare deployment has been verified.

    npm run check:live
    npm run check:live -- --require-security-headers

The first command checks the public homepage and image, warning if any intended
security header is absent. The second also **fails** when those headers are
missing or different, and is intended for after the Cloudflare cutover.
Evaluate any Content-Security-Policy against the actual deployed site rather
than adding an untested policy. Source guidance:
[Pages static headers](https://developers.cloudflare.com/pages/configuration/headers/)
and [Workers Static Assets headers](https://developers.cloudflare.com/workers/static-assets/headers/).

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
