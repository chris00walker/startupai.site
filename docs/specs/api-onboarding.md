---
purpose: "Private technical source of truth for onboarding API contracts"
status: "active"
last_reviewed: "2025-11-20"
---

# Onboarding API Specification

The onboarding API lives in the product repository (`app.startupai.site/frontend/src/app/api/onboarding/*`). Marketing relies on these endpoints to ensure copy aligns with product capabilities.

## Endpoints

| Route | Method | Handler | Description |
| --- | --- | --- | --- |
| `/api/onboarding/start` | POST | `frontend/src/app/api/onboarding/start/route.ts` | Validates plan limits, creates/resumes session, returns agent intro + first prompt. |
| `/api/onboarding/message` | POST | `frontend/src/app/api/onboarding/message/route.ts` | Processes user message, updates session history, returns AI response + follow-up question. |
| `/api/onboarding/complete` | POST | `frontend/src/app/api/onboarding/complete/route.ts` | Persists entrepreneur brief, stores feedback, triggers downstream workflows (CrewAI stub). |

All routes require a valid Supabase session (server client verifies via cookies). Marketing never calls these APIs directly but should understand capabilities to message accurately.

## Request & Response (Happy Path)

### `/start`

```jsonc
// Request
{
  "planType": "trial",
  "resumeSessionId": null,
  "userContext": {
    "referralSource": "pricing_page",
    "previousExperience": "first_time",
    "timeAvailable": 20
  }
}

// Response
{
  "success": true,
  "sessionId": "onb_ab12...",
  "agentIntroduction": "Hi, I'm Alex...",
  "firstQuestion": "Tell me about your idea...",
  "estimatedDuration": "18 minutes",
  "stageInfo": { "currentStage": 1, "totalStages": 7, "stageName": "...", "stageDescription": "..." },
  "conversationContext": {
    "agentPersonality": { "tone": "encouraging", ... },
    "expectedOutcomes": ["Fit Report", "Prioritised assumptions"],
    "privacyNotice": "Your data stays private..."
  }
}
```

Error responses follow `{ success: false, error: { code, message, retryable, fallbackOptions } }`. See handler for full set of codes (`INVALID_PLAN`, `SESSION_LIMIT_EXCEEDED`, etc.).

### `/message`

- Accepts `{ sessionId, message, intent?, metadata? }`.
- Returns AI response, follow-up question, stage progress, optional actions (e.g., `triggerWorkflow`).
- For marketing copy: beta implementation uses hybrid approach—API returns AI responses that are reviewed before delivery. See "Beta Delivery Model" section below.

### `/complete`

- Accepts `sessionId`, `finalConfirmation`, `entrepreneurBrief` payload, optional feedback.
- Persists records to:
  - `onboarding_sessions` (`completed_at`, status)
  - `entrepreneur_briefs`
  - `onboarding_feedback`
- Returns success confirmation and next-step URLs (dashboard, reports).

## Plan Limits

Defined in `PLAN_LIMITS` within `start/route.ts`.

| Plan | Sessions / month | Messages / session | Analysis workflows / month |
| --- | --- | --- | --- |
| trial | 3 | 100 | 3 |
| sprint | 5 | 150 | 5 |
| founder | 15 | 300 | 25 |
| enterprise | 100 | 1000 | 200 |

Marketing copy should reference these guardrails (e.g., trial limitations, upgrade prompts).

## Persistence & Analytics

- Sessions stored in `onboarding_sessions` (Supabase). Key fields: `id`, `user_id`, `plan_type`, `stage`, `history`.
- Entrepreneur briefs saved in `entrepreneur_briefs` (JSONB structure).
- Events tracked via PostHog using helpers in `frontend/src/lib/analytics/index.ts` (look for onboarding-specific events).

## Beta Delivery Model (November 2025)

Beta users receive a **hybrid delivery model** combining automated and manual orchestration:

### How It Works

1. **Automated Components**:
   - Session management and progress tracking via API
   - Basic AI responses for onboarding flow
   - Analytics and data collection

2. **Manual Orchestration**:
   - Chris reviews all strategic outputs before delivery
   - CrewAI agents are manually triggered and supervised
   - Final validation reports are QA'd before sending to user

### Mapping to User Promises

| Marketing Promise | Technical Implementation |
|-------------------|--------------------------|
| 3 validation cycles | 3 sessions (sprint plan limit) |
| 2-week delivery | Manual orchestration timeline per cycle |
| Strategy + Build + Test | CrewAI agents run with human oversight |
| Pivot recommendation | Compass agent output + Chris review |

### Why Hybrid?

During beta (200 LTD users), manual oversight ensures quality while we:
- Validate CrewAI agent accuracy
- Refine prompts and workflows
- Build confidence for full automation post-beta

## CrewAI Integration Status

**Current State (Beta)**: Hybrid automation with manual oversight
- API manages sessions and basic flow
- CrewAI agents are triggered but outputs are reviewed
- `/complete` triggers background jobs that require manual QA

**Post-Beta Target**: Full automation
- `/message` and `/complete` will run CrewAI agents autonomously
- Human oversight only for edge cases
- Target: Q2 2026 public launch

## Known Gaps / TODOs

- Retry strategy for transient Supabase errors (currently allows on error, logs to console).
- Rate limiting to prevent abuse (planned after Supabase edge functions come online).
- Public status feed exposing onboarding health metrics (future).

See the canonical detail in `app.startupai.site/docs/specs/api-onboarding.md` after it is updated alongside this document.
