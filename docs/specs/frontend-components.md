---
purpose: "Private technical source of truth for frontend component architecture"
status: "active"
last_reviewed: "2025-10-27"
---

# Frontend Components

The product frontend (App Router) and marketing site share Shadcn/Tailwind primitives. This spec highlights the components most relevant to the marketing story—particularly the onboarding experience we showcase publicly.

## Design System

| Area | Files | Notes |
| --- | --- | --- |
| Shadcn primitives | `app.startupai.site/frontend/src/components/ui/*` | Generated via `pnpm shadcn:add`. Mirrors marketing components in `startupai.site/src/components/ui/*`. |
| Tokens | `globals.css` in both repos | Shared palette, radius, typography. |
| Layout | `frontend/src/components/layout/*` | Navigation/sidebar shells for authenticated experience. |

Changes to shared components require coordinated updates in both repos.

## Onboarding Module

| Component | File | Responsibility |
| --- | --- | --- |
| `OnboardingWizard` | `frontend/src/components/onboarding/OnboardingWizard.tsx` | Orchestrates session lifecycle: calls `/api/onboarding/*`, manages local state, handles optimistic UI. |
| `ConversationInterface` | `frontend/src/components/onboarding/ConversationInterface.tsx` | Renders AI/user messages, follow-up prompts, loading states. |
| `OnboardingSidebar` | `frontend/src/components/onboarding/OnboardingSidebar.tsx` | Displays stage progress, persona snapshot, feature flags. |
| `ProjectCreationWizard` | `frontend/src/components/onboarding/ProjectCreationWizard.tsx` | Post-onboarding flow to create initial project from brief (beta). |
| Tests | `frontend/src/components/onboarding/__tests__/*` | Specification-driven tests covering flows and accessibility (jest + testing-library). |

Marketing assets (demo video, screenshots) should remain aligned with these components.

## Pages & Routing

- `frontend/src/app/onboarding/page.tsx` guards access, resolves plan type, renders wizard with suspense skeleton.
- Authenticated routes share `frontend/src/app/(app)/layout.tsx` for navigation + Supabase session guard.
- Marketing reuses shared UI elements (buttons, cards) but renders static pages under `startupai.site/src/app/*`.

## State & Data Flow

- Minimal local state via React hooks. Persistent data stored in Supabase (`onboarding_sessions`, `entrepreneur_briefs`).
- Supabase server client used in Server Components; browser client only in interactive components.
- Toast notifications handled by Shadcn `useToast` / `sonner` wrappers.

## Accessibility & Performance

- Skeleton loaders ensure perceived performance while data loads.
- Keyboard navigation supported (skip link, focus management) per `dev/a11y-i18n.md`.
- Conversation interface uses semantic roles (`aria-live`, landmarks) to remain screen reader friendly.

## Roadmap Considerations

- Integrate live CrewAI outputs once backend stabilizes (update conversation component to stream responses).
- Extract shared component package if duplication between marketing/product grows.
- Expand tests to cover localization once multi-locale support lands.

For exhaustive component documentation, cross-reference archived specs in `app.startupai.site/docs/archive/legacy/frontend-components-specification.md`.
