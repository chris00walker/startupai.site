---
purpose: "Draft additions for Admin persona and Trial role split"
status: "draft"
created: "2026-01-22"
target_files:
  - "app.startupai.site/docs/user-experience/user-personas.md"
  - "app.startupai.site/docs/user-experience/user-stories.md"
  - "app.startupai.site/docs/testing/journey-test-matrix.md"
---

# Documentation Additions: Admin Persona & Trial Split

This document contains draft additions for review before merging into the canonical documentation files.

---

## Part 1: Schema Changes

### Current Schema

```typescript
// frontend/src/db/schema/users.ts:10
export const userRoleEnum = pgEnum('user_role', ['admin', 'founder', 'consultant', 'trial']);
```

### Proposed Schema

```typescript
// frontend/src/db/schema/users.ts:10
export const userRoleEnum = pgEnum('user_role', [
  'admin',
  'founder',
  'consultant',
  'founder_trial',
  'consultant_trial'
]);
```

### Migration Notes

- Existing `trial` users should be migrated to `founder_trial` (preserves current behavior)
- Add `consultant_trial` as new role
- Update RLS policies in Supabase
- Update `frontend/src/lib/auth/roles.ts` with new role mappings

---

## Part 2: Updated Role Hierarchy (user-personas.md)

**Replace the existing Role Hierarchy section with:**

### Canonical Definition

The authoritative role definition is the TypeScript enum:

```typescript
// frontend/src/db/schema/users.ts:10
export const userRoleEnum = pgEnum('user_role', [
  'admin',
  'founder',
  'consultant',
  'founder_trial',
  'consultant_trial'
]);
```

| Role | Description | Default Redirect |
|------|-------------|-----------------|
| `admin` | Platform administrator and support staff | `/admin-dashboard` |
| `founder` | Entrepreneur validating business idea | `/founder-dashboard` |
| `consultant` | Advisor managing founder clients | `/consultant-dashboard` |
| `founder_trial` | Prospective founder evaluating platform | `/onboarding/founder` |
| `consultant_trial` | Prospective consultant evaluating platform | `/onboarding/consultant` |

### Access Control Matrix

| Capability | Admin | Founder | Consultant | Founder Trial | Consultant Trial |
|------------|-------|---------|------------|---------------|------------------|
| Founder Experience | Yes | Yes | No | Limited | No |
| Consultant Experience | Yes | No | Yes | No | Limited |
| System Management | Yes | No | No | No | No |
| User Support | Yes | No | No | No | No |
| Onboarding | Yes | Yes | Yes | Yes | Yes |
| Client Management | Yes | No | Yes | No | Limited |
| Project CRUD | Yes | Yes | No | Limited | No |
| Mock Client Creation | No | No | No | No | Yes |

**Implementation:** `frontend/src/lib/auth/roles.ts`

---

## Part 3: Admin Persona (NEW SECTION for user-personas.md)

**Add after the Consultant Persona section:**

---

## Admin Persona

### Profile

| Attribute | Value |
|-----------|-------|
| **Primary Role** | Platform Administrator / Support Staff |
| **Team Size** | 1-3 internal staff |
| **Tech Comfort** | High (debugging, database queries, log analysis) |
| **Work Context** | Supporting users, maintaining platform health |
| **Accountability** | User success, platform uptime, data integrity |

### Behavioral Profile

| Dimension | Value |
|-----------|-------|
| **Decision Style** | Methodical, investigative, evidence-based |
| **Risk Tolerance** | Low (protecting user data and platform stability) |
| **Learning Preference** | Documentation, runbooks, peer knowledge transfer |
| **Tool Adoption** | Pragmatic - adopts tools that reduce support burden |
| **Information Sources** | Error logs, user reports, monitoring dashboards |

### Psychographics

| Attribute | Value |
|-----------|-------|
| **Primary Motivation** | Helping users succeed, keeping platform healthy |
| **Core Fear** | Data loss, security breach, unresolved user issues |
| **Success Definition** | Fast resolution times, happy users, stable platform |
| **Frustration Triggers** | Poor observability, missing audit trails, undocumented edge cases |
| **Delight Triggers** | Self-serve solutions, clear dashboards, proactive issue detection |

### Goals & Motivations

1. **Resolve user issues quickly** without requiring engineering escalation
2. **Monitor platform health** and catch problems before users report them
3. **Maintain data integrity** across all user accounts and projects
4. **Enable safe experimentation** via feature flags and controlled rollouts
5. **Ensure compliance** with audit trails and access controls

### Pain Points

1. Limited visibility into user state without database queries
2. No easy way to "see what the user sees" for debugging
3. Manual processes for common support tasks
4. Fragmented information across logs, database, and monitoring tools
5. Lack of proactive alerting for user-impacting issues

### Key Workflows

| Workflow | Entry Point | Journey Reference |
|----------|-------------|-------------------|
| User Support | `/admin/users` | `admin-journey-map.md` Phase 1 |
| Impersonation | `/admin/users/:id/impersonate` | `admin-journey-map.md` Phase 2 |
| System Health | `/admin/health` | `admin-journey-map.md` Phase 3 |
| Feature Flags | `/admin/features` | `admin-journey-map.md` Phase 4 |
| Audit Logs | `/admin/audit` | `admin-journey-map.md` Phase 5 |
| Data Operations | `/admin/data` | `admin-journey-map.md` Phase 6 |

### Feature Access

| Feature | Access | Notes |
|---------|--------|-------|
| User Search & Lookup | Yes | Find users by email, ID, or project |
| User Impersonation | Yes | View platform as specific user (read-only) |
| Project State Inspection | Yes | View any project's current state |
| Workflow Retry | Yes | Re-trigger failed CrewAI jobs |
| Feature Flag Management | Yes | Enable/disable features per user or globally |
| Audit Log Access | Yes | View all system activity |
| Data Export | Yes | Export user data for support/compliance |
| User Role Changes | Yes | Upgrade trial to paid, fix role issues |
| Bulk Operations | Yes | With approval workflow for destructive actions |

### Admin Sub-Segments

The Admin persona encompasses distinct sub-segments with different primary responsibilities:

#### Support Admin

| Attribute | Value |
|-----------|-------|
| **Primary Focus** | User issue resolution |
| **Key Need** | Fast access to user context |
| **Pain Point** | "I need to see exactly what the user is seeing" |
| **Platform Adaptation** | User lookup, impersonation, state inspection |
| **Escalation Path** | → Engineering for bugs, → Data Admin for integrity issues |

#### Operations Admin

| Attribute | Value |
|-----------|-------|
| **Primary Focus** | Platform health and reliability |
| **Key Need** | Proactive monitoring and alerting |
| **Pain Point** | "I want to know about problems before users do" |
| **Platform Adaptation** | Health dashboards, job monitoring, error aggregation |
| **Escalation Path** | → Engineering for infrastructure, → Support for user comms |

#### Data Admin

| Attribute | Value |
|-----------|-------|
| **Primary Focus** | Data integrity and compliance |
| **Key Need** | Audit trails and safe data operations |
| **Pain Point** | "I need to fix data issues without making things worse" |
| **Platform Adaptation** | Audit logs, data export, integrity checks |
| **Escalation Path** | → Engineering for schema issues, → Legal for compliance |

### Security Boundaries

| Boundary | Enforcement |
|----------|-------------|
| All admin actions logged | Audit trail with actor, action, target, timestamp |
| No access to user credentials | Passwords, tokens never exposed |
| Impersonation is read-only | Cannot modify data while impersonating |
| Destructive actions require confirmation | Two-step process with impact preview |
| RLS policies enforced | Admin uses service role with explicit grants |
| Session timeouts | 30-minute idle timeout for admin sessions |

---

## Part 4: Trial Persona Split (REPLACE existing Trial section in user-personas.md)

**Replace the existing "Trial User" section with:**

---

## Trial Users

Trial users are prospective customers evaluating the platform. There are two distinct trial types matching the two paid tiers.

### Founder Trial (`founder_trial`)

#### Profile

| Attribute | Value |
|-----------|-------|
| **Primary Role** | Prospective Founder |
| **Status** | Evaluating platform for personal use |
| **Duration** | 14-day trial |
| **Conversion Target** | Founder plan ($49/month) |

#### Goals

1. **Evaluate if StartupAI can validate my idea** before committing $49/mo
2. **Experience the Quick Start and AI analysis** to see quality of output
3. **Understand the methodology** (VPD, Canvas tools) before paying
4. **Compare to alternatives** (doing it myself, hiring consultant, other tools)

#### Restrictions

| Action | Limit | Period | Description |
|--------|-------|--------|-------------|
| `reports.generate` | 3 | Daily | AI-generated reports per day |
| `projects.create` | 3 | Lifetime | Total projects during trial |
| `workflows.run` | 5 | Monthly | CrewAI workflow runs per month |

**Implementation:** `frontend/src/lib/auth/trial-limits.ts`

#### Conversion Path

```
Founder Trial
    │
    ▼
Completes Quick Start Onboarding
    │
    ▼
Sees AI Analysis Results
    │
    ▼
Hits Usage Limit OR Trial Expires
    │
    ▼
Upgrade Prompt → Founder ($49/mo)
```

#### Feature Access

| Feature | Access | Notes |
|---------|--------|-------|
| Quick Start Form | Yes | Full access |
| CrewAI Analysis | Limited | 5 runs/month |
| Project Creation | Limited | 3 total |
| Report Generation | Limited | 3/day |
| Canvas Tools | Yes | Full access |
| Dashboard | Yes | Full access |
| Settings | Limited | Cannot delete projects |
| HITL Approvals | Yes | For their projects |

---

### Consultant Trial (`consultant_trial`)

#### Profile

| Attribute | Value |
|-----------|-------|
| **Primary Role** | Prospective Consultant |
| **Status** | Evaluating platform for client practice |
| **Duration** | 14-day trial |
| **Conversion Target** | Consultant plan ($149/month) |

#### Goals

1. **Evaluate if StartupAI can scale my practice** before committing $149/mo
2. **Test the client management workflow** with mock clients
3. **See the portfolio dashboard** to understand multi-client oversight
4. **Assess deliverable quality** that I would present to real clients
5. **Compare margin potential** vs. current referral model

#### Restrictions

| Action | Limit | Period | Description |
|--------|-------|--------|-------------|
| `clients.create_mock` | 2 | Lifetime | Mock clients for testing |
| `clients.invite_real` | 0 | - | Cannot invite real clients |
| `reports.generate` | 5 | Daily | AI-generated reports per day |
| `workflows.run` | 10 | Monthly | CrewAI workflow runs per month |

**Implementation:** `frontend/src/lib/auth/trial-limits.ts`

#### Mock Client System

Consultant trial users can create "mock clients" to test the full workflow without involving real people:

| Mock Client Attribute | Value |
|----------------------|-------|
| **Creation** | Admin-generated sample data |
| **Business Ideas** | Pre-populated with 3 diverse examples |
| **Validation State** | Various stages (Phase 1, Phase 2, etc.) |
| **Purpose** | Let consultant experience portfolio view |

```
Consultant Trial
    │
    ▼
Completes Practice Setup (Onboarding)
    │
    ▼
Receives 2 Mock Clients (pre-populated)
    │
    ▼
Explores Portfolio Dashboard
    │
    ▼
Tests Client Detail View
    │
    ▼
Sees Client Management Workflow
    │
    ▼
Upgrade Prompt → Consultant ($149/mo)
```

#### Feature Access

| Feature | Access | Notes |
|---------|--------|-------|
| Practice Setup | Yes | Full onboarding |
| Portfolio Dashboard | Yes | With mock clients |
| Client Detail View | Yes | View-only on mock data |
| Mock Client Creation | Limited | 2 mock clients |
| Real Client Invites | No | Blocked until upgrade |
| Quick Start for Client | Yes | On mock clients only |
| White-Label Export | No | Upgrade required |
| Client Archive/Restore | Yes | On mock clients |

#### Conversion Triggers

| Trigger | Response |
|---------|----------|
| Attempts to invite real client | Upgrade prompt with value prop |
| Creates 3rd mock client | Upgrade prompt |
| Trial day 10 | Email reminder with portfolio screenshot |
| Trial expiration | "Your mock clients are waiting" email |

---

## Part 5: Admin User Stories (NEW SECTION for user-stories.md)

**Add after the Trial User Stories section:**

---

## Admin Stories (US-A)

### US-A01: Search and Find Users

**As an** Admin,
**I want to** search for users by email, name, or project ID,
**So that** I can quickly find the user I need to help.

**Acceptance Criteria:**

**Given** I am logged in as an Admin
**When** I navigate to `/admin/users`
**Then** I should see a search interface with email, name, and project ID fields

**Given** I enter a partial email address
**When** I click "Search"
**Then** I should see matching users with their role, status, and last active date

**Given** I enter a project ID
**When** I click "Search"
**Then** I should see the user who owns that project

**E2E Test:** `19-admin-user-management.spec.ts` - "should search users by email"
**Journey Reference:** [`admin-journey-map.md`](./admin-journey-map.md) - Phase 1

---

### US-A02: View User Profile and State

**As an** Admin,
**I want to** view a user's complete profile and current state,
**So that** I can understand their situation before helping them.

**Acceptance Criteria:**

**Given** I have found a user via search
**When** I click on their row
**Then** I should see their profile page with: account info, role, plan, projects list, recent activity

**Given** I am viewing a user's profile
**When** I look at the "Current State" section
**Then** I should see: active project phase, pending HITL checkpoints, usage limits remaining

**Given** the user has multiple projects
**When** I view their projects list
**Then** I should see each project's status, phase, and last activity

**E2E Test:** `19-admin-user-management.spec.ts` - "should display user profile details"
**Journey Reference:** [`admin-journey-map.md`](./admin-journey-map.md) - Phase 1

---

### US-A03: Impersonate User (Read-Only)

**As an** Admin,
**I want to** view the platform as a specific user sees it,
**So that** I can debug issues they're experiencing.

**Acceptance Criteria:**

**Given** I am viewing a user's profile
**When** I click "View as User"
**Then** I should see their dashboard exactly as they see it (read-only mode)

**Given** I am impersonating a user
**When** I try to click any action button
**Then** I should see a toast: "Read-only mode - actions disabled"

**Given** I am impersonating a user
**When** I click "Exit Impersonation" in the admin banner
**Then** I should return to the admin dashboard

**Given** I impersonate a user
**When** the session starts
**Then** an audit log entry should be created with my admin ID and the target user ID

**E2E Test:** `19-admin-user-management.spec.ts` - "should impersonate user in read-only mode"
**Journey Reference:** [`admin-journey-map.md`](./admin-journey-map.md) - Phase 2

---

### US-A04: Retry Failed Workflow

**As an** Admin,
**I want to** retry a failed CrewAI workflow for a user,
**So that** I can resolve stuck projects without engineering help.

**Acceptance Criteria:**

**Given** I am viewing a user's project that has a failed workflow
**When** I see the "Failed Jobs" section
**Then** I should see the job name, error message, and failure timestamp

**Given** I am viewing a failed job
**When** I click "Retry"
**Then** I should see a confirmation dialog with: job name, estimated duration, impact summary

**Given** I confirm the retry
**When** the job is re-queued
**Then** I should see success message and the job status should change to "pending"

**Given** I retry a job
**When** the action completes
**Then** an audit log entry should be created with job ID and outcome

**E2E Test:** `20-admin-operations.spec.ts` - "should retry failed workflow"
**Journey Reference:** [`admin-journey-map.md`](./admin-journey-map.md) - Phase 3

---

### US-A05: View System Health Dashboard

**As an** Admin,
**I want to** see overall platform health at a glance,
**So that** I can identify issues before users report them.

**Acceptance Criteria:**

**Given** I am logged in as an Admin
**When** I navigate to `/admin/health`
**Then** I should see: Modal API status, Supabase status, active workflow count, error rate (last hour)

**Given** I am on the health dashboard
**When** any service shows degraded status
**Then** I should see a yellow/red indicator with the affected service name

**Given** I am on the health dashboard
**When** I click on "Recent Errors"
**Then** I should see the 20 most recent errors with user ID, error type, and timestamp

**E2E Test:** `20-admin-operations.spec.ts` - "should display system health dashboard"
**Journey Reference:** [`admin-journey-map.md`](./admin-journey-map.md) - Phase 3

---

### US-A06: Manage Feature Flags

**As an** Admin,
**I want to** enable or disable features for specific users or globally,
**So that** I can control rollouts and troubleshoot issues.

**Acceptance Criteria:**

**Given** I am logged in as an Admin
**When** I navigate to `/admin/features`
**Then** I should see a list of all feature flags with current state (on/off/percentage)

**Given** I am viewing a feature flag
**When** I click "Edit"
**Then** I should see options: Enable globally, Disable globally, Enable for specific users, Percentage rollout

**Given** I enable a feature for a specific user
**When** I enter their email and save
**Then** that user should see the feature on their next page load

**Given** I change a feature flag
**When** the change is saved
**Then** an audit log entry should be created with old value, new value, and affected scope

**E2E Test:** `20-admin-operations.spec.ts` - "should toggle feature flag for user"
**Journey Reference:** [`admin-journey-map.md`](./admin-journey-map.md) - Phase 4

---

### US-A07: View Audit Logs

**As an** Admin,
**I want to** view audit logs of all admin actions,
**So that** I can review what changes were made and by whom.

**Acceptance Criteria:**

**Given** I am logged in as an Admin
**When** I navigate to `/admin/audit`
**Then** I should see a filterable log of all admin actions

**Given** I am viewing audit logs
**When** I filter by action type (impersonation, retry, feature flag, etc.)
**Then** I should see only logs matching that action type

**Given** I am viewing audit logs
**When** I filter by date range
**Then** I should see only logs within that range

**Given** I am viewing an audit log entry
**When** I click for details
**Then** I should see: admin email, action, target, timestamp, old value, new value

**E2E Test:** `21-admin-audit.spec.ts` - "should filter audit logs by action type"
**Journey Reference:** [`admin-journey-map.md`](./admin-journey-map.md) - Phase 5

---

### US-A08: Change User Role

**As an** Admin,
**I want to** change a user's role (e.g., upgrade trial to founder),
**So that** I can resolve billing issues or grant access manually.

**Acceptance Criteria:**

**Given** I am viewing a user's profile
**When** I click "Change Role"
**Then** I should see a dropdown with valid role transitions

**Given** I select a new role
**When** I click "Save"
**Then** I should see a confirmation dialog with: current role, new role, effective immediately

**Given** I confirm the role change
**When** the change is saved
**Then** the user should have the new role on their next page load

**Given** I change a user's role
**When** the action completes
**Then** an audit log entry should be created with old role, new role, and reason (if provided)

**E2E Test:** `19-admin-user-management.spec.ts` - "should change user role"
**Journey Reference:** [`admin-journey-map.md`](./admin-journey-map.md) - Phase 1

---

### US-A09: Export User Data

**As an** Admin,
**I want to** export a user's data for support or compliance purposes,
**So that** I can respond to data requests or debug complex issues.

**Acceptance Criteria:**

**Given** I am viewing a user's profile
**When** I click "Export Data"
**Then** I should see export options: Full export, Projects only, Activity only

**Given** I select an export type
**When** I click "Generate Export"
**Then** I should see a progress indicator and estimated completion time

**Given** the export completes
**When** I return to the export section
**Then** I should see a download link (valid for 24 hours)

**Given** I generate an export
**When** the action completes
**Then** an audit log entry should be created with export type and user ID

**E2E Test:** `21-admin-audit.spec.ts` - "should export user data"
**Journey Reference:** [`admin-journey-map.md`](./admin-journey-map.md) - Phase 6

---

### US-A10: Run Data Integrity Check

**As an** Admin,
**I want to** run data integrity checks on a user's account,
**So that** I can identify and report data inconsistencies.

**Acceptance Criteria:**

**Given** I am viewing a user's profile
**When** I click "Run Integrity Check"
**Then** I should see the check running with progress indicator

**Given** the integrity check completes with no issues
**When** I view the results
**Then** I should see "All checks passed" with green indicator

**Given** the integrity check finds issues
**When** I view the results
**Then** I should see: issue type, affected records, severity, recommended action

**Given** issues are found
**When** I click "Create Ticket"
**Then** a support ticket should be created with all issue details pre-populated

**E2E Test:** `21-admin-audit.spec.ts` - "should run data integrity check"
**Journey Reference:** [`admin-journey-map.md`](./admin-journey-map.md) - Phase 6

---

## Part 6: Consultant Trial User Stories (NEW SECTION for user-stories.md)

**Add after the Trial User Stories section (update section header to "Founder Trial Stories"):**

---

## Founder Trial Stories (US-FT)

> **Note:** These replace the generic "Trial" stories. The existing US-T01, US-T02, US-T03 should be renamed to US-FT01, US-FT02, US-FT03.

*(Keep existing US-T stories, just rename the prefix)*

---

## Consultant Trial Stories (US-CT)

### US-CT01: Complete Consultant Trial Onboarding

**As a** Consultant Trial user,
**I want to** complete the practice setup onboarding,
**So that** I can evaluate the consultant experience before paying.

**Acceptance Criteria:**

**Given** I am a new user who signed up with "consultant" intent
**When** I complete authentication
**Then** I should be redirected to `/onboarding/consultant`

**Given** I am on the consultant onboarding page
**When** the page loads
**Then** I should see a practice setup form (specializations, industries, experience)

**Given** I complete the practice setup form
**When** I click "Start Trial"
**Then** I should be redirected to `/consultant-dashboard` with 2 pre-populated mock clients

**E2E Test:** `22-consultant-trial.spec.ts` - "should complete consultant trial onboarding"
**Journey Reference:** [`consultant-trial-journey-map.md`](./consultant-trial-journey-map.md) - Phase 1

---

### US-CT02: Explore Portfolio with Mock Clients

**As a** Consultant Trial user,
**I want to** view and interact with mock clients in my portfolio,
**So that** I can understand the multi-client management experience.

**Acceptance Criteria:**

**Given** I have completed consultant trial onboarding
**When** I view my consultant dashboard
**Then** I should see 2 mock clients with different validation stages

**Given** I am viewing my portfolio
**When** I click on a mock client card
**Then** I should see their full detail page with D-F-V signals and canvases

**Given** I am viewing a mock client
**When** I look at the data
**Then** I should see realistic sample data (not placeholder text)

**Given** I am viewing my portfolio
**When** I see the trial badge
**Then** I should see "Trial: 2 mock clients" with days remaining

**E2E Test:** `22-consultant-trial.spec.ts` - "should display mock clients in portfolio"
**Journey Reference:** [`consultant-trial-journey-map.md`](./consultant-trial-journey-map.md) - Phase 2

---

### US-CT03: Attempt Real Client Invite (Upgrade Prompt)

**As a** Consultant Trial user,
**I want to** see an upgrade prompt when I try to invite a real client,
**So that** I understand what I need to do to unlock full functionality.

**Acceptance Criteria:**

**Given** I am on my consultant dashboard
**When** I click "Add Client"
**Then** I should see the invite form appear

**Given** I am filling out the invite form
**When** I enter a real email address and click "Send Invite"
**Then** I should see an upgrade modal instead of sending the invite

**Given** I see the upgrade modal
**When** I view the content
**Then** I should see: feature comparison (trial vs paid), pricing ($149/mo), "Upgrade Now" CTA

**Given** I click "Upgrade Now"
**When** the Stripe checkout loads
**Then** I should see the Consultant plan with correct pricing

**Given** I dismiss the upgrade modal
**When** I return to the dashboard
**Then** my mock clients should still be available

**E2E Test:** `22-consultant-trial.spec.ts` - "should show upgrade prompt on real invite attempt"
**Journey Reference:** [`consultant-trial-journey-map.md`](./consultant-trial-journey-map.md) - Phase 3

---

### US-CT04: View Trial Limits and Status

**As a** Consultant Trial user,
**I want to** see my trial status and remaining limits,
**So that** I know when I need to upgrade.

**Acceptance Criteria:**

**Given** I am logged in as a Consultant Trial user
**When** I view my dashboard
**Then** I should see a trial status card with: days remaining, mock clients used (2/2), features locked

**Given** my trial has 3 days remaining
**When** I view the trial status
**Then** I should see an urgent badge with "3 days left"

**Given** my trial has expired
**When** I try to access the dashboard
**Then** I should see a full-page upgrade prompt with: trial ended message, portfolio preview, upgrade CTA

**E2E Test:** `22-consultant-trial.spec.ts` - "should display trial status card"
**Journey Reference:** [`consultant-trial-journey-map.md`](./consultant-trial-journey-map.md) - Phase 2

---

### US-CT05: Upgrade to Consultant Plan

**As a** Consultant Trial user,
**I want to** upgrade to the paid Consultant plan,
**So that** I can invite real clients and access full features.

**Acceptance Criteria:**

**Given** I am logged in as a Consultant Trial user
**When** I click any upgrade prompt
**Then** I should see Stripe checkout with Consultant plan ($149/mo)

**Given** I complete payment successfully
**When** the webhook processes
**Then** my role should change from `consultant_trial` to `consultant`

**Given** I have upgraded
**When** I return to my dashboard
**Then** I should see: mock clients converted to "sample" clients (archivable), "Add Client" now functional, trial badge removed

**Given** I have upgraded
**When** I try to invite a real client
**Then** the invite should send successfully

**E2E Test:** `22-consultant-trial.spec.ts` - "should upgrade to consultant plan"
**Journey Reference:** [`consultant-trial-journey-map.md`](./consultant-trial-journey-map.md) - Phase 4

---

## Part 7: Updated Journey Test Matrix (journey-test-matrix.md additions)

**Add these sections to journey-test-matrix.md:**

---

## Admin Journey Matrix

**Journey Map:** [`admin-journey-map.md`](../user-experience/admin-journey-map.md) (to be created)

| Journey Phase | Journey Step | User Story | E2E Test File | Status |
|---------------|--------------|------------|---------------|--------|
| Phase 1 | User Search | US-A01 | `19-admin-user-management.spec.ts` | Gap |
| Phase 1 | View User Profile | US-A02 | `19-admin-user-management.spec.ts` | Gap |
| Phase 1 | Change User Role | US-A08 | `19-admin-user-management.spec.ts` | Gap |
| Phase 2 | Impersonate User | US-A03 | `19-admin-user-management.spec.ts` | Gap |
| Phase 3 | Retry Failed Workflow | US-A04 | `20-admin-operations.spec.ts` | Gap |
| Phase 3 | View System Health | US-A05 | `20-admin-operations.spec.ts` | Gap |
| Phase 4 | Manage Feature Flags | US-A06 | `20-admin-operations.spec.ts` | Gap |
| Phase 5 | View Audit Logs | US-A07 | `21-admin-audit.spec.ts` | Gap |
| Phase 6 | Export User Data | US-A09 | `21-admin-audit.spec.ts` | Gap |
| Phase 6 | Data Integrity Check | US-A10 | `21-admin-audit.spec.ts` | Gap |

---

## Consultant Trial Journey Matrix

**Journey Map:** [`consultant-trial-journey-map.md`](../user-experience/consultant-trial-journey-map.md) (to be created)

| Journey Phase | Journey Step | User Story | E2E Test File | Status |
|---------------|--------------|------------|---------------|--------|
| Phase 1 | Trial Signup | US-CT01 | `22-consultant-trial.spec.ts` | Gap |
| Phase 1 | Practice Setup | US-CT01 | `22-consultant-trial.spec.ts` | Gap |
| Phase 2 | View Mock Clients | US-CT02 | `22-consultant-trial.spec.ts` | Gap |
| Phase 2 | View Trial Status | US-CT04 | `22-consultant-trial.spec.ts` | Gap |
| Phase 3 | Attempt Real Invite | US-CT03 | `22-consultant-trial.spec.ts` | Gap |
| Phase 4 | Upgrade to Paid | US-CT05 | `22-consultant-trial.spec.ts` | Gap |

---

## Updated Coverage Statistics

| Category | Stories | Covered | Gaps | Coverage % |
|----------|---------|---------|------|------------|
| Founder (US-F) | 8 | 8 | 0 | 100% |
| Consultant (US-C) | 7 | 7 | 0 | 100% |
| Founder Trial (US-FT) | 3 | 3 | 0 | 100% |
| **Consultant Trial (US-CT)** | **5** | **0** | **5** | **0%** |
| **Admin (US-A)** | **10** | **0** | **10** | **0%** |
| HITL (US-H) | 9 | 9 | 0 | 100% |
| Pivot (US-P) | 4 | 4 | 0 | 100% |
| Edge Case (US-E) | 6 | 0 | 6 | 0% |
| **Total** | **52** | **31** | **21** | **60%** |

---

## Part 8: Files to Create

After this draft is approved, the following new files should be created:

| File | Purpose |
|------|---------|
| `admin-journey-map.md` | Admin 6-phase journey (support → operations → compliance) |
| `consultant-trial-journey-map.md` | Consultant trial 4-phase journey (signup → explore → convert) |
| `19-admin-user-management.spec.ts` | E2E tests for US-A01, US-A02, US-A03, US-A08 |
| `20-admin-operations.spec.ts` | E2E tests for US-A04, US-A05, US-A06 |
| `21-admin-audit.spec.ts` | E2E tests for US-A07, US-A09, US-A10 |
| `22-consultant-trial.spec.ts` | E2E tests for US-CT01 through US-CT05 |

---

## Summary of Additions

| Document | Additions |
|----------|-----------|
| `user-personas.md` | Updated Role Hierarchy, Admin Persona (full), Trial Split (founder_trial + consultant_trial) |
| `user-stories.md` | 10 Admin stories (US-A01-A10), 5 Consultant Trial stories (US-CT01-CT05) |
| `journey-test-matrix.md` | Admin matrix, Consultant Trial matrix, updated coverage stats |
| Schema | Role enum expanded: `trial` → `founder_trial` + `consultant_trial` |

**Total new user stories:** 15
**Total new E2E test files:** 4
**New journey maps needed:** 2

---

**Next Steps:**

1. Review this draft for accuracy and completeness
2. Approve or request changes
3. Apply changes to canonical documentation files
4. Create journey map files
5. Create E2E test file stubs
6. Update schema and migration

---

*Draft created: 2026-01-22*
*Author: Claude Code*
