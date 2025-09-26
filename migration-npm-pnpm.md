# Migration Plan: npm to pnpm

## 1. Overview

This document captures the steps required to migrate both StartupAI repositories from npm to pnpm. It consolidates the preparatory work, code changes, documentation updates, and validation required to complete the migration successfully.

Repositories in scope:
- `startupai.site` (marketing site)
- `app.startupai.site` (product platform + nested frontend package)

## 2. Phase 1 – Preparation

- **Inventory npm usage**
  - Identify every place that references npm: `package.json` scripts, CI workflows, deployment settings, documentation (`README.md`, `docs/README.md`, `agents.md`, etc.).
  - Note npm-specific cache scripts or commands.
- **Install pnpm tooling**
  - Ensure developers run `corepack enable pnpm` (or install pnpm manually).
  - Verify CI/deployment environments support pnpm (Vercel/Netlify/GitHub Actions allow pnpm installs) and include Corepack enabling as part of setup.
- **Workspace decision**
  - For `app.startupai.site`, decide whether to create a `pnpm-workspace.yaml` to manage the root and `frontend/` package.

## 3. Phase 2 – Replace Lockfiles

- **Remove npm lockfiles**
  - Delete `package-lock.json` at each repo root.
  - Delete `frontend/package-lock.json` inside `app.startupai.site/frontend/`.
- **Generate pnpm lockfiles**
  - Run `pnpm install` (and `pnpm install --dir frontend` if not using a workspace) to create `pnpm-lock.yaml`.
  - Add lockfiles to version control.
- **Pin package manager version**
  - Add a `"packageManager": "pnpm@<version>"` field to each `package.json` so Corepack selects the expected pnpm release.

## 4. Phase 3 – Update Scripts & Tooling

- **Scripts in `package.json`**
  - Replace `npm run <script>` invocations with `pnpm <script>`.
  - For root scripts delegating to sub-packages, use `pnpm --filter frontend <script>` or workspaces as needed.
 - **CI/CD pipelines**
  - Include `corepack enable pnpm` in CI setup steps before installing dependencies.
  - Update GitHub Actions, Vercel, Netlify, etc., to run `pnpm install --frozen-lockfile` and `pnpm build`.
  - Configure pnpm caching (e.g., GitHub Actions `cache: pnpm`).
  - Optionally add `--prefer-offline` to CI installs for faster repeated builds.
- **Local tooling**
  - Update any lint/test scripts in `package.json`, `Makefile`, or shell scripts to use pnpm.
  - If using a workspace, note the `pnpm --filter frontend <script>` command pattern.

## 5. Phase 4 – **Documentation Updates**

- Update contributor guides (`README.md`, `docs/README.md`, `agents.md`, etc.) to instruct usage of pnpm (`pnpm install`, `pnpm dev`, `pnpm lint`).
- Document pnpm prerequisites (`node >= 18`, `corepack enable pnpm`).
- Mention pnpm workspace usage if implemented.

## 6. Phase 5 – Validation & Verification

- **Status Tracker**
  - Create a simple checklist (in this file or project issue) that records completion dates for each validation activity.
  - Capture command output snippets or CI screenshots so the team can audit the migration later.
- **Local Validation Runbook**
  - From a clean clone, execute `pnpm install` to verify dependency resolution.
  - Run local quality gates in sequence: `pnpm lint`, `pnpm test`, `pnpm build`.
  - For workspaces, document `pnpm --filter <package> <script>` equivalents alongside the root commands.
- **Environment Parity**
  - Confirm VS Code tasks, Husky hooks, or other local tooling call pnpm rather than npm.
  - Ensure `.npmrc` inheritance or legacy npm-specific configs are removed or adapted.
- **CI / Deployment Dry-Run**
  - Trigger workflow runs (GitHub Actions, Vercel, Netlify, etc.) and verify they succeed using pnpm.
  - Record the run IDs and note any caching adjustments that were required.


- **Fresh Install**
  - Remove existing `node_modules` directories and run `pnpm install` to ensure dependencies resolve.
- **Project scripts**
  - Execute `pnpm lint`, `pnpm test`, and `pnpm build` in both repositories (and in `frontend/` if separate).
  - If a workspace is used, document equivalent commands (e.g., `pnpm --filter frontend dev`).
- **Deployment smoke tests**
  - Trigger staging builds to confirm pnpm works in hosted environments.

## 7. Phase 6 – Finalization

- **Commit sequence**
  1. Remove `package-lock.json` files.
  2. Add `pnpm-lock.yaml` (and `pnpm-workspace.yaml` if used).
  3. Update scripts, CI configs, and documentation.
  4. Commit with a clear message, e.g., `build: migrate to pnpm`.
- **Push & monitor**
  - After merging, monitor builds and developer feedback to catch any residual npm references.
- **Changelog / Release notes**
  - Record the migration in project notes to inform future contributors.

## 8. Additional Considerations

- pnpm’s strict dependency hoisting may expose missing peer dependencies; resolve by declaring them explicitly.
- Ensure automated tooling (Dependabot, Renovate) is configured for pnpm lockfiles if used.
- Communicate deadlines and expectations to the team so everyone switches tooling concurrently.

Following the phases above will fully migrate both sites to pnpm while keeping development workflows, documentation, and deployment pipelines aligned.
