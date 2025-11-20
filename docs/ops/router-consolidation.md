---
purpose: "Private technical source of truth for router consolidation tasks"
status: "active"
last_reviewed: "2025-10-27"
---

# Router Consolidation Status

- Marketing site runs entirely on the App Router (`src/app`). No `pages/` directory remains.
- Product app completed migration earlier in 2025; remaining work focuses on removing legacy references and redirects.

## Ongoing Hygiene

| Task | Owner | Status |
| --- | --- | --- |
| Audit for stray `pages/` imports or Next 12 patterns. | Platform engineering | ✅ (monthly lint rule). |
| Review Netlify `_redirects` for obsolete routes. | Marketing engineering | 🟡 – clean up once sitemap restored (`marketing#149`). |
| Document any third-party integrations still calling legacy endpoints. | Ops | 🟡 – track in [`product-handshake/marketing-to-app-contracts.md`](../product-handshake/marketing-to-app-contracts.md). |

Future router changes should follow the ADR process in the product repo.
