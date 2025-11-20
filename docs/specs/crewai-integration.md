---
purpose: "Private technical source of truth for CrewAI integration"
status: "active"
last_reviewed: "2025-10-27"
---

# CrewAI Integration

CrewAI orchestrates multi-agent workflows that transform onboarding inputs into strategic deliverables. Marketing messaging around “AI-generated insights” should reflect the status below.

## Architecture Snapshot

| Layer | Location | Notes |
| --- | --- | --- |
| Orchestration spec | `backend/CREW_AI.md` | Defines agents, tasks, tools, and expected outputs. |
| Backend code | `backend/src/startupai/` | Python crew that runs on Netlify serverless (or background worker). |
| Frontend triggers | `frontend/src/app/api/onboarding/*` | Calls CrewAI (currently stubbed) once onboarding completes. |
| Outputs surfaced | `frontend/src/app/(app)/reports/*`, Fit Dashboard components | Awaiting live CrewAI data. |

## Agents (per `CREW_AI.md`)

- **Discovery Agent** – Parses conversation history, identifies gaps.
- **Strategy Agent** – Synthesises Fit Report, Value Prop Canvas, and roadmap suggestions.
- **Evidence Agent** – Maps user claims to supporting evidence (future; requires ingestion pipeline).
- **QA Agent** – Validates outputs, flags missing sections.

Each agent has access to shared tools (Notion-style memory, Supabase fetchers, PostHog context) once implemented.

## Workflow

1. Onboarding completes (`/api/onboarding/complete`) and enqueues CrewAI job when `systemActions.triggerWorkflow` is true.
2. CrewAI pulls session history + entrepreneur brief, generates:
   - Strategy narrative (Fit Report)
   - Canvas drafts (BMC/VPC/TBI)
   - Experiment backlog suggestions
3. Outputs stored in Supabase tables (`crew_ai_runs`, `crew_ai_outputs`) for retrieval.
4. Frontend surfaces results in dashboard/report views; marketing demo will embed excerpts.

**Current status (Oct 2025):** Steps 1–2 are scaffolded; integration points exist but job execution still returns scripted responses pending final tooling. Messaging should promise “AI-generated insights (rolling out)” until automation ships.

## Error Handling

- CrewAI tasks include retry logic (backoff) defined in `backend/src/startupai/crew.py`.
- API returns `retryable` flags; marketing should avoid promising immediate AI output if service degrades.
- Failures log to PostHog (`crewai_analysis_failed`) and to backend logs for SRE review.

## Privacy & Compliance

- Sensitive fields (customer names, revenue) are redacted before sending to CrewAI. See masking utilities in `backend/src/startupai/tools.py (sanitization stubs)`.
- Opt-in flag required for enhanced analysis; marketing must communicate opt-in requirement.

## Roadmap

- **Short term** – Wire CrewAI job triggering from `/api/onboarding/complete`, surface outputs in Fit Report UI.
- **Medium term** – Support background re-runs when new evidence arrives; expose change history.
- **Long term** – Allow agencies to plug in their own knowledge bases.

Marketing copy should align with these phases and reference this doc when updating claims.
