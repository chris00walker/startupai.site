# 🛠️ Setup Specification for StartupAI.site

**System:** Value Proposition Design & Validation Platform  
**Stack:** Netlify + Supabase + Vercel AI SDK  
**Author:** CrewAI Assistant  
**Date:** September 2025  

---

## 1. Local Development Environment (Laptop / Dev Machine)

### Local Development Purpose  

Enable development & QA of the marketing site (`startupai.site`) with live Supabase authentication flows and pending cross-site handoff work.

### Local Development Checklist (Oct 4, 2025)

1. **Install Node & Package Manager**
   - Node.js 18 LTS (>= v18.18)
   - pnpm 9.12.1 (project pins package manager)

2. **Install Dependencies**

   ```bash
   pnpm install
   ```

3. **Environment Variables**
   - Copy `.env.example` → `.env.local` and populate with Supabase project credentials (anon key, project URL)
   - Set `NEXT_PUBLIC_APP_URL` to deployed product site (e.g. `https://app-startupai-site.netlify.app`)

4. **Run the Marketing Site Locally**

   ```bash
   pnpm dev
   ```

   - Visit http://localhost:3000
   - Validate email/password and GitHub OAuth login/signup flows
   - Cross-site redirect will target `NEXT_PUBLIC_APP_URL`; backend handoff endpoint is still pending

5. **Lint & Type-Check (optional but recommended)**

   ```bash
   pnpm lint
   pnpm typecheck
   ```

6. **Configure Supabase Project** ✅ **Complete**

   - ✅ Supabase project created: **StartupAI** (`eqxropalhxjeyvfcoyxg`)
   - ✅ Project credentials configured in environment files
   - ✅ Environment variables set:
     - Project URL: `https://eqxropalhxjeyvfcoyxg.supabase.co`
     - Anon Key: configured in `.env.local` (dev) and `.env.production` (prod)
     - Service Role Key: configured in `backend/.env`
   - ✅ OAuth Configuration:
     - GitHub OAuth enabled in Supabase dashboard
     - Redirect URLs configured for localhost and production

   **📋 Setup Details:** [Supabase Configuration](../../../app.startupai.site/docs/engineering/30-data/supabase-setup.md)
   
   **⚠️ OAuth Setup Requirements:**
   OAuth requires configuration in **both** code (`.env.local` / `.env.production`) AND Supabase dashboard settings. GitHub is enabled today; Google/Azure providers remain TODO.

   **⚠️ Pending Supabase Tasks:**
   - Enable extensions: pgvector, pg_net, hstore (uuid-ossp already on)
   - Apply migration `00003_storage_buckets.sql` once extensions enabled (needed for evidence uploads)
   - End-to-end QA of JWT token handoff after backend endpoint is implemented

---

## 2. Netlify + Supabase (Production)

### Production Purpose

Deploy the marketing site via Netlify, leveraging shared Supabase auth with the product application.

### Production Deployment Checklist

1. **Supabase Project Setup** ✅ **Complete**

   - ✅ Production Supabase project: **StartupAI** (`eqxropalhxjeyvfcoyxg`)
   - ⚠️ Database extensions (pgvector, pg_net, hstore) still require manual enable via dashboard
   - ⚠️ Storage migration `00003_storage_buckets.sql` not yet applied (blocks evidence uploads)

2. **Netlify Site Configuration**

   ```toml
   # netlify.toml
   [build]
     command = "pnpm build"
     publish = "out"

   [[redirects]]
     from = "/api/*"
     to = "https://app-startupai-site.netlify.app/api/:splat"
     status = 200
   ```

   - Production builds run `pnpm build` (Next.js static export)
   - Preview deployments enabled for pull requests

3. **Environment Variables (Netlify Dashboard)**
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `NEXT_PUBLIC_APP_URL`
   - GitHub OAuth keys handled in Supabase dashboard (no secrets stored in repo)

4. **Post-Deploy QA Checklist**
- **Authentication:** Verify email/password and GitHub sign-in/sign-up flows in production
- **Handoff:** Confirm redirect to `app-startupai.site` works (expect 401 until handoff endpoint exists)
- **Analytics:** Ensure analytics scripts load without blocking (conversion tracking to be implemented).
- **Regression:** Run smoke test of top-level pages (`/`, `/product`, `/process`, `/pricing`, `/login`, `/signup`)

---

## 3. CrewAI Backend (Context)

CrewAI backend development lives in `app.startupai.site/backend/`. The marketing site only captures leads and hands off authenticated users; it does **not** run CrewAI locally. Refer to `app.startupai.site/backend/README.md` and `CREW_AI.md` for implementation details.
omitted):
     - All `NEXT_PUBLIC_*` variables duplicated for build-time access

   **Backend/API:**
   - `OPENAI_API_KEY`
   - `ANTHROPIC_API_KEY`
   - `SUPABASE_SERVICE_KEY` (admin access)
   - `VERCEL_AI_SDK_API_KEY`

---

## 3. Agentuity (Workflow Orchestration)

### Agentuity Purpose

Client-facing orchestration + dashboards.

### Agentuity Checklist

1. **Connect to CrewAI Backend**

   - Register API integration with your Netlify Functions endpoint.
   - Map triggers:

     - **Strategy Sprint** → 1 CrewAI run.
     - **Founder Platform** → Multiple runs, history tracking.
     - **Agency Co-Pilot** → Multi-tenant runs with RLS policies.

2. **Configure Webhooks**

   - Set `/.netlify/functions/crew-webhook` endpoint for Agentuity to receive updates.
   - Use Supabase real-time subscriptions for live progress updates.

3. **Dashboard Integration**

   - Display deliverables (PDF, Markdown, YAML) via Supabase Storage signed URLs.
   - Embed validation roadmap into client dashboard view.
   - Use Supabase real-time for live progress tracking.

---

## 4. Security & CI/CD

### Security & CI/CD Checklist

1. **Security**

   - Supabase Auth with OAuth2 (Google, GitHub, etc.) for client login.
   - JWT-based API authentication via Supabase.
   - Row Level Security (RLS) policies for data access control.
   - Netlify Functions environment variable protection.

2. **CI/CD**

   - GitHub Actions for testing + deployment.
   - Netlify automatic deployments on push to `main`.
   - Supabase CLI for database migrations.
   - Example workflow:
     ```yaml
     name: Deploy
     on:
       push:
         branches: [main]
     jobs:
       deploy:
         runs-on: ubuntu-latest
         steps:
           - uses: actions/checkout@v3
           - run: pnpm install
           - run: pnpm run build
           - run: netlify deploy --prod
     ```

---

## Next Steps

- This specification sets up **local dev**, **Netlify + Supabase production**, and **Agentuity orchestration**.
- The new stack provides better DX, cost efficiency, and hot-swappable AI models.
- Once environments are ready, we move to **Prompt Specifications** starting with **CrewAI agents + tasks YAML**.

---

## ✅ Ready for Implementation

This setup specification provides a complete migration path from Google Cloud Platform to the modern serverless stack:

- **Netlify** for deployment and serverless functions
- **Supabase** for database, storage, auth, and analytics  
- **Vercel AI SDK** for hot-swappable AI models

The new architecture offers:
- 🚀 **Better Developer Experience** - Local development with `netlify dev` and `supabase start`
- 💰 **Cost Efficiency** - Pay-per-use serverless functions vs always-on containers
- 🔄 **Hot-swappable AI** - Switch between OpenAI, Anthropic, Google models seamlessly
- 🔒 **Built-in Security** - Supabase RLS and Auth handle complex security scenarios
- ⚡ **Real-time Updates** - Live progress tracking via Supabase subscriptions

**Next:** Ready to implement **CrewAI Prompt Specifications** for the 6-agent workflow.
