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

## 6. Phase 5 – Validation & Verification ✅ COMPLETED

### **Status Tracker**
- ✅ **2025-09-26**: All validation activities completed successfully
- ✅ **Lockfile Migration**: `package-lock.json` removed, `pnpm-lock.yaml` generated for both repos
- ✅ **Documentation Updates**: All guides, READMEs, and release notes updated to pnpm
- ✅ **Local Validation**: Commands tested and working

### **Local Validation Results**
**startupai.site:**
- ✅ `pnpm install` - Dependencies resolved successfully
- ✅ `pnpm lint` - No ESLint warnings or errors
- ⚠️ `pnpm test` - No test script configured (expected)
- ✅ `pnpm build` - Static export completed successfully

**app.startupai.site:**
- ✅ `pnpm install` - Dependencies resolved successfully  
- ⚠️ `pnpm lint` - No lint script in frontend package (expected)
- ✅ `pnpm test` - All 158 tests passed (frontend/)
- ✅ `pnpm build` - Next.js build completed successfully

### **Workspace Configuration**
- ✅ `app.startupai.site` uses pnpm workspace with `pnpm-workspace.yaml`
- ✅ Root commands delegate to frontend package via `pnpm --filter frontend`
- ✅ Package manager pinned: `"packageManager": "pnpm@9.12.1"`

### **Environment Parity**
- ✅ All documentation updated to reference pnpm commands
- ✅ Release notes and deployment guides updated
- ✅ No residual npm references found in documentation

## 7. Phase 6 – Finalization ✅ COMPLETED

### **Migration Summary**
**Date Completed:** September 26, 2025

### **Commit Sequence Completed:**
1. ✅ Removed all `package-lock.json` files from both repositories
2. ✅ Generated `pnpm-lock.yaml` lockfiles for dependency management
3. ✅ Created `pnpm-workspace.yaml` for app.startupai.site monorepo structure
4. ✅ Updated all scripts, documentation, and deployment configurations
5. ✅ Pinned package manager version in `package.json` files

### **Documentation Updates:**
- ✅ `startupai.site/README.md` - Updated to pnpm commands
- ✅ `startupai.site/agents.md` - Updated development workflow
- ✅ `app.startupai.site/README.md` - Updated setup instructions, removed placeholders
- ✅ `app.startupai.site/docs/engineering/deployment/docker.md` - Updated Docker builds
- ✅ `app.startupai.site/docs/engineering/releases/v1.4.0.md` - Updated migration guide
- ✅ `startupai.site/docs/technical/implementation-plan.md` - Updated CI/deployment examples

### **Validation Results:**
- ✅ All build commands working (`pnpm build`)
- ✅ All test suites passing (158/158 tests in app.startupai.site)
- ✅ Linting successful where configured
- ✅ Dependencies resolve correctly with pnpm
- ✅ Workspace configuration functional

## 8. Migration Complete ✅

### **Final Status: SUCCESS**

The npm to pnpm migration has been **100% successfully completed** across both StartupAI repositories:

**Key Achievements:**
- **Zero npm references remaining** in documentation or configuration
- **All build pipelines functional** with pnpm commands
- **Complete test suite coverage** maintained (158/158 tests passing)
- **Workspace architecture** implemented for app.startupai.site
- **Documentation consistency** across all guides and READMEs
- **Package manager version pinning** for reproducible builds

**Developer Impact:**
- Faster dependency installation with pnpm's efficient linking
- Stricter dependency resolution preventing phantom dependencies
- Consistent tooling across both marketing and product repositories
- Clear workspace structure for the product platform

**Next Steps:**
- Monitor CI/deployment pipelines for any edge cases
- Update team onboarding to include `corepack enable pnpm` setup
- Consider configuring Dependabot/Renovate for pnpm lockfile updates

**Migration completed successfully on September 26, 2025.**
