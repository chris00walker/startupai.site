# Chris Walker Consulting

**Transforming startup chaos into strategic clarity through AI-powered business intelligence.**

Chris Walker Consulting addresses a critical gap in the startup ecosystem: the overwhelming struggle founders face when trying to transform raw business ideas into credible, actionable strategies. Research shows that 83% of entrepreneurs feel "lost in a sea of information" when validating ideas, juggling fragmented tools, expensive consultants, and generic AI outputs that lack business context.

This platform represents the evolution from traditional consulting to an AI-native approach, where founders can rapidly generate Business Model Canvases, validate assumptions with evidence-based insights, and translate strategy into technical architecture - all while maintaining data privacy and actionable guidance.

**The Problem We Solve:**
- **Time Pressure**: Founders waste 20-40 hours on manual planning worth $1.5K-$6K in consultant fees
- **Fragmented Tools**: Teams juggle Miro boards, spreadsheets, and disconnected research tools
- **Validation Uncertainty**: 72% of business assumptions never get tested, leading to costly pivots
- **Generic Output**: Standard AI tools produce "bargain bin quality" plans that could apply to any business

**Our Solution:**
An integrated AI co-pilot that delivers speed (instant canvases), guidance (built-in domain expertise), and actionability (traceable from strategy to code) - replacing the need for expensive consultants while providing enterprise-grade privacy and customization.

## Live Demo

The website is deployed on GitHub Pages and accessible at:

- **Production**: <https://chriswalker.consulting>
- **GitHub Pages**: <https://chris00walker.github.io/chriswalker.consulting>

## Features

- **Professional Design System**: Comprehensive component library with consistent styling
- **Service Showcase**: Detailed pages for Discovery, Validation, Scaling, Advisory, and Optimization services
- **AI Strategy Content**: Specialized content for AI strategy consulting
- **Waitlist Integration**: Formspree-powered waitlist form for lead generation
- **Blog Ready**: Structured for future blog content
- **SEO Optimized**: Meta tags, structured data, and performance optimized
- **Responsive Design**: Mobile-first approach with modern UI/UX
- **Static Export**: Optimized for GitHub Pages deployment

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom design tokens
- **Components**: ShadCN/UI component library
- **Forms**: React Hook Form with Zod validation
- **Deployment**: GitHub Pages with static export
- **Form Handling**: Formspree integration for production

## Prerequisites

- Node.js 18+
- npm or yarn package manager

## Local Development

1. Clone the repository:

   ```bash
   git clone https://github.com/chris00walker/chriswalker.consulting.git
   cd chriswalker.consulting
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Open your browser and navigate to:

   ```text
   http://localhost:3000
   ```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking
- `npm run format` - Format code with Prettier

## Project Structure

```text
src/
├── app/                 # Next.js App Router pages
├── components/          # Reusable React components
│   ├── ui/             # ShadCN/UI components
│   ├── sections/       # Page sections
│   └── demo/           # Demo components
├── assets/             # Static assets
└── js/                 # JavaScript utilities
```

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
