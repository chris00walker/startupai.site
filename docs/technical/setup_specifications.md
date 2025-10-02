# 🛠️ Setup Specification for StartupAI.site

**System:** Value Proposition Design & Validation Platform  
**Stack:** Netlify + Supabase + Vercel AI SDK  
**Author:** CrewAI Assistant  
**Date:** September 2025  

---

## 1. Local Development Environment (Laptop / Dev Machine)

### Local Development Purpose  

Enable development & testing of CrewAI workflows before deployment to Netlify with Supabase backend.

### Local Development Checklist

1. **Install Python & Virtual Environment**
   - Install Python 3.10+  
   - Install `pyenv` or use system Python  
   - Create virtual environment:

     ```bash
     python -m venv venv
     source venv/bin/activate
     ```

2. **Install Core Packages**

   ```bash
   pip install crewai fastapi uvicorn pydantic supabase python-dotenv ai vercel-ai-sdk



3. **Install Dev Tools**

   ```bash
   pip install black isort mypy pytest
   ```

4. **Set Up Project Structure**

   startupai-site/
   ├── netlify/
   │   └── functions/       # Netlify Functions for CrewAI backend
   ├── src/
   │   ├── crew/            # CrewAI YAML + Python orchestration
   │   ├── components/      # Next.js components
   │   └── lib/             # Utilities and Supabase client
   ├── supabase/
   │   ├── migrations/      # Database migrations
   │   └── functions/       # Supabase Edge Functions
   ├── tests/
   ├── netlify.toml
   ├── requirements.txt
   └── package.json

5. **Configure Supabase Project** ✅ **Complete**

   - ✅ Supabase project created: **StartupAI** (`eqxropalhxjeyvfcoyxg`)
   - ✅ Project credentials configured in environment files
   - ✅ Environment variables set:
     - Project URL: `https://eqxropalhxjeyvfcoyxg.supabase.co`
     - Anon Key: configured in `.env.local` (dev) and `.env.production` (prod)
     - Service Role Key: configured in `backend/.env`
   - ✅ OAuth Configuration:
     - GitHub OAuth enabled in Supabase dashboard
     - Site URL: `https://app-startupai-site.netlify.app`
     - Redirect URLs configured for localhost and production

   **📋 Setup Details:** [Supabase Configuration](../../../app.startupai.site/docs/engineering/30-data/supabase-setup.md)
   
   **⚠️ OAuth Setup Requirements:**
   OAuth requires configuration in **both** code (`.env.production`) AND Supabase dashboard settings.
   Missing either will cause redirects to fail (e.g., redirecting to localhost in production).

6. **Test Local Development**

   - Start Supabase locally:
     ```bash
     pnpm exec supabase start
     ```
   - Test Netlify Functions locally:
     ```bash
     netlify dev
     ```
   - Create a test YAML with 1 agent + 1 task and test via local endpoint.

   **Note:** Use `pnpm` commands (npm to pnpm migration complete)

---

## 2. Netlify + Supabase (Production)

### Production Purpose

Deploy CrewAI backend via Netlify Functions + Supabase database + Vercel AI SDK.

### Production Deployment Checklist

1. **Supabase Project Setup** ✅ **Complete**

   - ✅ Production Supabase project: **StartupAI** (`eqxropalhxjeyvfcoyxg`)
   - ⚠️ Database schema configuration pending:
     - Tables: `user_profiles`, `projects`, `evidence`, `reports`
     - Row Level Security (RLS) policies
     - Real-time subscriptions for progress tracking
   
   **Next:** Implement Drizzle ORM schema (Task 2)

2. **Supabase Database Schema**

   ```sql
   -- Create tables
   CREATE TABLE clients (
     id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
     email TEXT UNIQUE NOT NULL,
     tier TEXT NOT NULL,
     created_at TIMESTAMP DEFAULT NOW()
   );
   
   CREATE TABLE runs (
     id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
     client_id UUID REFERENCES clients(id),
     status TEXT DEFAULT 'pending',
     entrepreneur_brief JSONB,
     created_at TIMESTAMP DEFAULT NOW()
   );
   ```

3. **Supabase Storage**

   - Create storage bucket: `deliverables`
   - Configure folder structure:

     ```text
     deliverables/
     ├── briefs/
     ├── profiles/
     ├── maps/
     ├── canvases/
     ├── roadmaps/
     └── qa/
     ```
   - Set up RLS policies for secure file access

4. **Supabase Analytics**

   - Enable Supabase Analytics
   - Create materialized views for reporting:
     ```sql
     CREATE MATERIALIZED VIEW vw_client_engagements AS
     SELECT c.*, r.*, d.*, f.*
     FROM clients c
     JOIN runs r ON c.id = r.client_id
     LEFT JOIN deliverables d ON r.id = d.run_id
     LEFT JOIN feedback f ON r.id = f.run_id;
     ```

5. **Vercel AI SDK Setup**

   - Install Vercel AI SDK:
     ```bash
     pnpm add ai @ai-sdk/openai @ai-sdk/anthropic
     ```
   - Configure multiple AI providers:
     - OpenAI GPT-4
     - Anthropic Claude
     - Google Gemini
   - Implement hot-swappable models for:
     - `satisfaction-predictor`
     - `validation-recommender` 
     - `copy-optimizer`

6. **Netlify Functions Deployment**

   - Create `netlify.toml` configuration:

     ```toml
     [build]
       command = "pnpm run build"
       functions = "netlify/functions"
       publish = "out"

     [functions]
       python_runtime = "3.9"

     [[redirects]]
       from = "/api/*"
       to = "/.netlify/functions/:splat"
       status = 200
     ```

   - Deploy to Netlify:

     ```bash
     netlify deploy --prod
     ```

7. **Environment Variables**

   **Marketing Site (startupai.site):**
   - `.env.local` (development, gitignored):
     - `NEXT_PUBLIC_SUPABASE_URL`
     - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
     - `NEXT_PUBLIC_APP_URL=http://localhost:3000`
   - `.env.production` (production, committed):
     - `NEXT_PUBLIC_SUPABASE_URL`
     - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
     - `NEXT_PUBLIC_APP_URL=https://app-startupai-site.netlify.app`
   - `netlify.toml` (build environment, committed):
     - All `NEXT_PUBLIC_*` variables duplicated for build-time access

   **Backend/API:**
   - `OPENAI_API_KEY`
   - `ANTHROPIC_API_KEY`
   - `SUPABASE_URL`
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
