---
purpose: "Define Core Web Vitals and performance practices for marketing"
status: "active"
last_reviewed: "2025-10-27"
---

# Performance Playbook

Marketing renders statically with Netlify edge caching, so most performance risk comes from asset weight, third-party scripts, and cross-site handoffs. This document replaces the condensed migration note with live implementation detail.

## Performance Budgets

| Metric | Target | Monitoring |
| --- | --- | --- |
| **LCP** (Largest Contentful Paint) | < 2.5s on desktop, < 3.0s on mobile (Fast 3G). | Manual Lighthouse run each release; automate via `marketing#150`. |
| **CLS** (Cumulative Layout Shift) | < 0.05 | Visual baseline tests (Percy) + Lighthouse. |
| **TTI** (Time to Interactive) | < 3.5s | Lighthouse. |
| **Total JS** | < 200 kB after gzip on landing page. | `pnpm build` bundle analyzer (soon). |

## Implementation Checklist

| Area | Current Implementation | Notes |
| --- | --- | --- |
| Static export | `next.config.js` sets `output: 'export'` and `trailingSlash: true`. Netlify serves pre-rendered HTML from `/out`. | Minimizes cold starts; dynamic content must be handled client-side. |
| Caching headers | `netlify.toml` configures immutable caching for `.js`, `.css`, `.woff2` assets and security headers for all routes. | Ensure file names are hashed (Next.js default). |
| Fonts | `@fontsource/inter` bundled locally; avoids additional network requests. | Consider `display=swap` evaluation for LCP improvements. |
| Images | Stored in `/public/images` and optimized manually. `next/image` disabled due to static export; track any heavy assets. | TODO: Add pre-compressed WebP/AVIF variations where missing. |
| Animations | Limited to transitions declared in `src/app/globals.css`. No scroll-jacking or autoplay video. | If new hero video introduced, gate behind user interaction. |
| Third-party scripts | PostHog only. No GA/Ads/Chat widgets. | Future additions must pass privacy + performance review. |

## Build & Verification

1. Run `pnpm build`; investigate any React/Next warnings.
2. Use Lighthouse (Chrome or `pnpm exec lighthouse http://localhost:3000`) to verify budgets before merge.
3. Monitor Netlify deploy summary for asset size regressions.
4. Incident? Follow `docs/ops/monitoring.md` to roll back and capture metrics.

## Cross-Site Considerations

- The app repo enforces similar budgets. When product pages embed marketing components (e.g., shared navigation), confirm the shared styles remain tree-shakeable.
- Supabase or CrewAI dashboard embeds should lazy-load to avoid penalizing marketing LCP.
- When marketing fetches status JSON or other dynamic content, use `fetch` with `next: { revalidate: 60 }` (once ISR is re-introduced) or handle client-side with caching.

## Future Work

- `marketing#150` – Add GitHub Action that runs Lighthouse against production post-deploy.
- `marketing#152` – Introduce bundle analyzer script (`next-bundle-analyzer`) to keep JS payloads in check.
- `marketing#153` – Adopt image CDN or BlurData placeholders once Next.js static image pipeline stabilises for export builds.

Performance findings and regressions should be logged in `docs/work/in-progress.md` under the “Performance & Accessibility” swim lane.
