# StartupAI

**Transforming startup chaos into strategic clarity through AI-powered business intelligence.**

StartupAI addresses a critical gap in the startup ecosystem: the overwhelming struggle founders face when trying to transform raw business ideas into credible, actionable strategies. Research shows that 83% of entrepreneurs feel "lost in a sea of information" when validating ideas, juggling fragmented tools, expensive consultants, and generic AI outputs that lack business context.

This platform represents the evolution from traditional consulting to an AI-native approach, where founders can rapidly generate Business Model Canvases, validate assumptions with evidence-based insights, and translate strategy into technical architecture - all while maintaining data privacy and actionable guidance.

**The Problem We Solve:**
- **Time Pressure**: Founders waste 20-40 hours on manual planning worth $1.5K-$6K in consultant fees
- **Fragmented Tools**: Teams juggle Miro boards, spreadsheets, and disconnected research tools
- **Validation Uncertainty**: 72% of business assumptions never get tested, leading to costly pivots
- **Generic Output**: Standard AI tools produce "bargain bin quality" plans that could apply to any business

**Our Solution:**
An integrated AI co-pilot that delivers speed (instant canvases), guidance (built-in domain expertise), and actionability (traceable from strategy to code) - replacing the need for expensive consultants while providing enterprise-grade privacy and customization.

This website serves as the marketing and authentication gateway for the StartupAI platform. It provides the entry point for users to learn about services, sign up for waitlists, and authenticate into the main application platform where the AI-powered business intelligence tools are delivered.

## Live Demo

The website is deployed and accessible at:

- **Production**: <https://chriswalker.consulting>
- **GitHub Pages**: <https://chris00walker.github.io/chriswalker.consulting>
- **Local Development**: http://localhost:3000

## Features

- **Professional Design System**: ShadCN UI components with "new-york" style variant
- **Service Showcase**: Detailed pages for Discovery, Validation, Scaling, Advisory, and Optimization services
- **Authentication Flow**: Login/signup forms with redirect to main platform
- **Waitlist Integration**: Formspree-powered forms for lead generation
- **SEO Optimized**: Meta tags, structured data, and performance optimized
- **Responsive Design**: Mobile-first approach with modern UI/UX
- **Static Export**: Optimized for GitHub Pages deployment
- **Loading States**: Enhanced UX with proper loading and error handling

## Tech Stack

- **Framework**: Next.js 15.5.3 with App Router
- **Language**: TypeScript 5.8.3
- **Runtime**: React 19.1.1
- **Styling**: Tailwind CSS with custom design tokens
- **Components**: ShadCN/UI component library (30+ components)
- **Forms**: React Hook Form with Zod validation
- **Authentication**: Custom auth service with token management
- **Deployment**: Vercel/GitHub Pages with static export
- **Form Handling**: Formspree integration for production
- **Build Tool**: Turbopack for fast development


## Prerequisites

- Node.js 18+
- pnpm (install via `corepack enable pnpm`)

## Local Development

1. Clone the repository:

   ```bash
   git clone https://github.com/chris00walker/chriswalker.consulting.git
   cd chriswalker.consulting
   ```

2. Install dependencies:

   ```bash
   pnpm install
   ```

3. Start the development server:

   ```bash
   pnpm dev
   ```

4. Open your browser and navigate to:

   ```text
   http://localhost:3000
   ```

## Available Scripts

- `pnpm dev` - Start development server (http://localhost:3000)
- `pnpm build` - Build for production with static export
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint
- `pnpm type-check` - Run TypeScript type checking
- `pnpm format` - Format code with Prettier
- `pnpm format:check` - Check code formatting

## Project Structure

```text
src/
├── app/                 # Next.js App Router pages
│   ├── login/          # Authentication pages
│   └── signup/         # User registration
├── components/          # Reusable React components
│   ├── ui/             # ShadCN/UI components (30+ components)
│   ├── login-form.tsx  # Authentication form component
│   └── sections/       # Page sections
├── lib/                # Utility libraries
│   ├── auth.ts         # Authentication service
│   └── utils.ts        # ShadCN utilities (cn function)
└── assets/             # Static assets
```

## Authentication Integration

This website integrates with the CWC Agentic Platform for user authentication:

- **Login Flow**: Users authenticate and are redirected to http://localhost:3001
- **Token Management**: JWT tokens stored in localStorage
- **Loading States**: Enhanced UX with spinners and error handling
- **Development Mode**: Accepts any credentials for testing purposes

### Integration with CWC Agentic Platform

1. User visits marketing site (port 3000)
2. User clicks login and enters credentials
3. Authentication service processes login
4. User is redirected to main platform (port 3001)
5. Session token is maintained across platforms

## Deployment

The website is automatically deployed to GitHub Pages via GitHub Actions:

1. Push changes to the `main` branch
2. GitHub Actions builds the static site
3. Deploys to GitHub Pages automatically
4. Available at <https://chriswalker.consulting>

## Design System

The project includes a comprehensive design system with:

- **Design Tokens**: Consistent colors, typography, spacing
- **Component Library**: Professional UI components
- **Layout System**: Responsive grid and container patterns
- **Animation System**: Smooth transitions and micro-interactions

## Form Integration

- **Development**: Uses local API routes for testing
- **Production**: Integrates with Formspree for form submissions
- **Environment Detection**: Automatically switches based on NODE_ENV

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a pull request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
>>>>>>> 749ab5c (feat: Add authentication system and update project configuration)
