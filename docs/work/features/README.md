---
purpose: "Describe how to document marketing features"
status: "active"
last_reviewed: "2025-12-01"
---

# Feature Documentation

Create a folder per feature under `docs/work/features/<feature-slug>/` with two files:

- `feature.md` – Scope, hypothesis, and acceptance criteria.
- `outcomes.md` – Results, metrics, and links to live assets.

## Example: Pricing Page Refresh

```
features/
  pricing-refresh/
    feature.md      # Scope: Update pricing tiers, hypothesis: 10% conversion lift
    outcomes.md     # Results: 12% lift achieved, link to A/B test data
```

### feature.md Template
```markdown
## Scope
What we're building/changing

## Hypothesis
Expected business impact

## Acceptance Criteria
- [ ] Visual requirements met
- [ ] Analytics tracking implemented
- [ ] Mobile responsive
```

### outcomes.md Template
```markdown
## Results
Actual impact measured

## Metrics
- Conversion rate: X%
- Time on page: Y seconds

## Assets
- [Live page](https://...)
- [Analytics dashboard](https://...)
```

## Ecosystem Context

- **Master Architecture**: `startupai-crew/docs/master-architecture/`
- **API Contracts**: `startupai-crew/docs/master-architecture/reference/api-contracts.md`
- **Product App Features**: `app.startupai.site/docs/work/features/`
