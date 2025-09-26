# Purpose

This file provides explicit instructions and context for AI‑based coding assistants (e.g. OpenAI Codex, Agent Mode and other code generation tools) working on this repository. It complements the organisation‑wide global rules by defining project‑specific setup, structure, conventions and workflow. Agents must read this document before generating or modifying any code.

# Project Overview

**StartupAI.site** is a Next.js-based marketing website and authentication portal for an AI-powered business strategy platform. This is the front-end gateway that introduces users to the AI co-founder concept and handles user onboarding before redirecting to the main agentic platform.

## Business Context

Based on comprehensive market research (see `/docs/business/` directory), StartupAI addresses a validated market need where entrepreneurs feel "overwhelmed with startup ideas" and "unsure how to validate them." The platform targets the $300-$1,000 market currently served by freelance consultants and fragmented tools.

**Key Value Propositions:**
- **Speed**: Transform ideas into Business Model Canvas in minutes vs. weeks
- **Evidence-Based**: All recommendations backed by research and citations
- **Privacy-First**: Enterprise-grade data protection for sensitive business ideas
- **Integrated Workflow**: From strategy to domain models to code scaffolding

## Architecture Role

**StartupAI.site** serves as:
1. **Marketing Hub**: Landing pages, feature explanations, pricing tiers
2. **Authentication Gateway**: User registration and login
3. **Documentation Portal**: Business research, case studies, methodology
4. **Redirect Portal**: Seamless handoff to CWC Agentic Platform (localhost:3001)

## Technology Stack

- **Framework**: Next.js 14+ with App Router
- **Styling**: Tailwind CSS with shadcn/ui components
- **Authentication**: Currently simplified for testing (see MEMORY about login form modifications)
- **Deployment**: Configured for web deployment via Windsurf
- **Content**: Markdown-based documentation in `/docs/business/`

## Target Users

**Primary**: Non-technical founders and small tech teams seeking AI-assisted business planning
**Secondary**: Startup studios, accelerators, and business consultants
**Tertiary**: Technical indie hackers wanting strategy-to-code automation

# Setup Commands

Before modifying or running the application, execute the following commands:

```text
| Task                     | Command          |
| ------------------------ | ---------------- |
| Install dependencies     | `pnpm install`   |
| Start development server | `pnpm dev`       |
| Run unit tests           | `pnpm test`      |
| Run linter               | `pnpm lint`      |
| Build for production     | `pnpm build`     |
```text

Agents should run these commands to verify that the project builds and tests pass both before and after making changes.

# Project Structure

Understand and respect the repository layout:

## Core Directories

**`/src/`** - Main application source code
- `/src/components/` - Reusable UI components (shadcn/ui based). Use React functional components with hooks.
- `/src/app/` - Next.js App Router pages and layouts. Follow file-system routing conventions.
- `/src/lib/` - Shared utilities, configurations, and helper functions. Keep these pure and well-tested.

**`/docs/`** - Documentation and business research
- `/docs/business/` - Sequenced business analysis documents (1-research.md through 6-bibliography.md)
- Follow the established cross-referencing system between documents

**`/public/`** - Static assets such as images, icons, and fonts. Do not modify at runtime.

**`/components/`** - Additional UI components (may be legacy structure)

## Key Files

- `agents.md` - This file, project-specific AI assistant instructions
- `package.json` - Dependencies and scripts (uses pnpm)
- `tailwind.config.js` - Tailwind CSS configuration
- `next.config.js` - Next.js configuration

## Important Notes

- **Authentication**: Login form currently modified for testing (see MEMORY) - requires reset after testing
- **Business Documents**: Maintain the 1-6 sequence and cross-reference system in `/docs/business/`
- **Styling**: Use Tailwind CSS classes and shadcn/ui components for consistency
- **Routing**: Follow Next.js App Router conventions in `/src/app/`

Create new files in the appropriate folder following existing patterns. Avoid restructuring or renaming top‑level directories unless asked to do so.

# Coding Conventions

## TypeScript Standards
- Use strict mode and adhere to the compiler options defined in `tsconfig.json`
- Define proper interfaces for all props, API responses, and data structures
- Leverage Next.js TypeScript integration for pages and API routes

## Code Formatting
- Follow Prettier and ESLint rules configured in this repo
- Use single quotes, trailing commas, and consistent indentation
- Run `pnpm lint` to check your work before committing

## React/Next.js Patterns
- **Components**: Write functional components with hooks, prefer composition over inheritance
- **File Structure**: Use kebab-case for files, PascalCase for components, camelCase for variables/functions
- **shadcn/ui**: Leverage existing component library for consistent UI patterns
- **App Router**: Follow Next.js 14+ App Router conventions in `/src/app/`

## StartupAI-Specific Conventions

### Component Organization
```
/src/components/
  ├── ui/           # shadcn/ui components
  ├── forms/        # Form components (login, contact, etc.)
  ├── layout/       # Headers, footers, navigation
  └── marketing/    # Landing page sections
```

### Business Content Integration
- Reference business research from `/docs/business/` when creating marketing copy
- Maintain evidence-based claims with proper citations
- Use the established 1-6 document sequence for content flow

### Authentication Considerations
- **Current State**: Login form simplified for testing (temporary)
- **Production Requirements**: Implement proper validation, error handling, session management
- **Integration**: Seamless handoff to CWC Agentic Platform (localhost:3001)

## Environment Variables
- Use environment variables for all configuration (see `.env.example` if available)
- Never hardcode API endpoints, secrets, or platform URLs
- Document new environment variables in project documentation

# Testing Instructions

## Test Strategy for StartupAI.site

### Component Testing
- Co-locate test files with components using `.test.tsx` or `.spec.tsx` extensions
- Use React Testing Library for component interaction testing
- Test both happy paths and error states for forms and user interactions

### Authentication Flow Testing
- **Current State**: Mock authentication since login is simplified for testing
- **Future State**: Test full authentication flow, validation, and redirect to localhost:3001
- Mock external authentication providers and session management

### Content Integration Testing
- Test markdown content rendering from `/docs/business/` directory
- Verify cross-references between business documents work correctly
- Ensure citation links point to correct bibliography entries

### Next.js Specific Testing
- Test App Router navigation and routing
- Verify server-side rendering works correctly
- Test API routes if any are implemented

## Test Configuration

```bash
# Run all tests
pnpm test

# Run tests in watch mode during development
pnpm test:watch

# Run tests with coverage
pnpm test:coverage
```

## Testing Guidelines

- **Deterministic Tests**: Avoid calls to live services, use mocks and fixtures
- **Business Logic**: Test business content integration and citation systems
- **User Flows**: Test complete user journeys from landing to authentication
- **Responsive Design**: Test component behavior across different screen sizes
- **Accessibility**: Include basic a11y testing for key user interactions

## Critical Test Areas

1. **Authentication Flow**: Login form, validation, redirect to CWC platform
2. **Business Content**: Markdown rendering, cross-references, citation links
3. **Marketing Pages**: Landing page components, pricing displays, feature explanations
4. **Navigation**: App Router functionality, responsive navigation
5. **Form Validation**: Contact forms, newsletter signup, user input handling

Run all tests with `pnpm test` before committing. Do not reduce test coverage or break existing tests.

# Pull Request Guidelines

## Pre-PR Checklist

Before opening a pull request, verify all checks pass:

```bash
pnpm run lint       # Style and linting
pnpm run type-check # Static type checking  
pnpm run test       # Unit and integration tests
pnpm run build      # Production build
pnpm dev           # Verify development server starts correctly
```

## StartupAI-Specific Requirements

### Documentation Updates
- Update `agents.md` if project structure, APIs, or conventions change
- Update business documentation in `/docs/business/` if content strategy changes
- Maintain cross-reference integrity between sequenced documents (1-6)
- Document any new environment variables or configuration requirements

### Authentication Considerations
- **If modifying login/auth**: Note temporary testing state in PR description
- **If production auth changes**: Update MEMORY about login form modifications
- **Integration testing**: Verify redirect to CWC platform (localhost:3001) works

### Content and Marketing Changes
- **Evidence-based claims**: Cite sources from `/docs/business/` research
- **Pricing information**: Ensure alignment with validated pricing tiers ($99-$199, $500-$1000, $1000-$3000)
- **Value propositions**: Maintain consistency with established business messaging

### UI/UX Changes
- **Design consistency**: Use shadcn/ui components and Tailwind patterns
- **Responsive design**: Test across mobile, tablet, and desktop viewports
- **Accessibility**: Ensure WCAG compliance for key user interactions
- **Performance**: Verify no negative impact on Core Web Vitals

## Commit and PR Standards

### Commit Format
Use conventional commits: `[type] description`
- `[feature]` - New functionality
- `[fix]` - Bug fixes
- `[docs]` - Documentation updates
- `[style]` - UI/styling changes
- `[refactor]` - Code refactoring
- `[test]` - Test additions/updates

### PR Description Template
```markdown
## Changes
- Brief description of what changed

## Business Context
- Reference to relevant business research if applicable
- Impact on user experience or business goals

## Testing
- [ ] All automated tests pass
- [ ] Manual testing completed
- [ ] Cross-browser testing (if UI changes)
- [ ] Authentication flow tested (if relevant)

## Screenshots/GIFs
- Include for any UI changes
```

Keep scope focused – limit each PR to a single concern. Do not mix unrelated changes.

Programmatic Checks & Quality Gates

Run the following scripts to enforce quality before completing any task:

pnpm run lint – Static analysis and style checks.

pnpm run type-check – TypeScript type checking.

pnpm run test – Unit and integration tests.

pnpm run build – Production build to ensure compilation and bundling succeed.

Only mark a task as complete and submit a pull request when all of the above checks pass.

Security & Environment

Secrets management – Never hardcode secrets, API keys or credentials. Use environment variables and document them in .env.example.

Input validation – Validate and sanitise all user input and external data before processing or storage.

Least privilege – Use the minimum permissions required for database queries and API access. Do not expose sensitive endpoints or data.

HTTPS – Ensure secure protocols are used for all network requests in production. Manage cookies and session tokens securely.

Collaboration with Windsurf/Cascade

Always read the organisation‑wide global_rules.md in ~/.codeium/windsurf/memories/global_rules.md before starting. These rules define overarching coding and testing practices.

If a .windsurfrules.md file exists in this repository, treat it as an override for project‑specific constraints (e.g. UI framework rules). When there is a conflict, local rules take precedence.

Use the Windsurf rules format (front matter triggers, patterns and instructions) to define new project‑specific rules instead of overloading global rules.

# Domain‑Specific Notes

## Business Intelligence Context

This project is built on extensive market research validating the "AI co-founder" concept. Key business insights that inform development decisions:

**Market Validation**: 83% demand score based on pain intensity, solution gaps, and willingness-to-pay analysis
**Target Pricing**: $99-$199/month SaaS tier, $500-$1000 strategy sprints, $1000-$3000/month enterprise
**Competitive Landscape**: Convoboss, Plannifyra, and traditional consultants (see `/docs/business/3-alternatives.md`)

## Key Business Terminology

- **AI Co-Founder**: AI system that acts as a strategic partner for business planning
- **Evidence Ledger**: System for tracking and citing sources for all business recommendations
- **Business Model Canvas (BMC)**: Strategic planning tool that's core to the platform
- **Jobs-to-Be-Done (JTBD)**: Framework used throughout business analysis
- **Mixture-of-Experts**: AI architecture approach for specialized domain knowledge

## User Experience Principles

1. **Speed Over Perfection**: Users value rapid iteration over perfect initial outputs
2. **Evidence-Based Trust**: All recommendations must be traceable to sources
3. **Privacy-First**: Entrepreneurs are highly sensitive about idea confidentiality
4. **Progressive Disclosure**: Start simple, add complexity as users engage

## Integration Points

- **CWC Agentic Platform**: Main application at localhost:3001
- **Authentication Flow**: Currently simplified for testing (temporary)
- **Documentation Portal**: Business research serves as both content and validation

## Content Strategy

The `/docs/business/` directory contains the foundational research that validates this entire platform. When creating marketing content or user-facing copy, reference this research to ensure claims are evidence-based and properly cited.
