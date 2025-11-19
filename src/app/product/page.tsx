import { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { PageContainer } from '@/components/ui/layout/page-container';
import {
  PageHeader,
  PageTitle,
  PageDescription,
} from '@/components/ui/layout/page-header';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

export const metadata: Metadata = {
  title: 'Product | StartupAI - AI Co-Founder for Founders',
  description:
    'Your startup deserves better than freelancers and no-code. Working software + real user data + pivot guidance. All in 2 weeks.',
  openGraph: {
    title: 'Product | StartupAI',
    description:
      'Working software + real user data + pivot guidance. All in 2 weeks from our AI founders team.',
    type: 'website',
  },
};

export default function ProductPage() {
  return (
    <div className="min-h-screen">
      {/* Breadcrumb Navigation */}
      <PageContainer variant="wide" padding="none" className="pt-6">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/">Home</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Product</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </PageContainer>

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-background to-gray-50">
        <PageContainer variant="wide" padding="lg">
          <div className="flex justify-center mb-4">
            <Badge variant="secondary" className="text-sm px-4 py-1">
              AI Co-Founding Platform
            </Badge>
          </div>
          <PageHeader variant="centered" className="mb-8">
            <PageTitle className="text-4xl md:text-6xl">
              Your Startup Deserves Better Than{' '}
              <span className="text-gradient">Freelancers and No-Code</span>
            </PageTitle>
            <PageDescription className="text-xl max-w-2xl mx-auto">
              Working software + real user data + pivot guidance. All in 2
              weeks.
            </PageDescription>
          </PageHeader>
        </PageContainer>
      </section>

      {/* What You Get Section */}
      <section className="bg-gray-50 py-12">
        <PageContainer variant="wide">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">What You Get</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Every validation cycle delivers four essential components to
              validate your startup idea.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Strategy Foundation */}
            <Card className="professional-card-wide">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-4">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                    />
                  </svg>
                </div>
                <CardTitle>Strategy Foundation</CardTitle>
                <CardDescription>
                  Professional business model and value proposition
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <svg
                      className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span>Business Model Canvas</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg
                      className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span>Value Proposition Design</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg
                      className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span>Domain model and technical architecture</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Working Software */}
            <Card className="professional-card-wide">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mb-4">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                    />
                  </svg>
                </div>
                <CardTitle>Working Software</CardTitle>
                <CardDescription>
                  Real code you own, not prototypes or mockups
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <svg
                      className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span>Deployed MVP with live URL</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg
                      className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span>Full code ownership (GitHub access)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg
                      className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span>Documentation and deployment guide</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Validation Data */}
            <Card className="professional-card-wide">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center mb-4">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    />
                  </svg>
                </div>
                <CardTitle>Validation Data</CardTitle>
                <CardDescription>
                  Real user behavior from actual potential customers
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <svg
                      className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span>User analytics and behavior tracking</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg
                      className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span>Ad campaigns (~$450-525 spend included)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg
                      className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span>Hypothesis test results</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Pivot Guidance */}
            <Card className="professional-card-wide">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center mb-4">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                </div>
                <CardTitle>Pivot Guidance</CardTitle>
                <CardDescription>
                  Evidence-based recommendations for next steps
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <svg
                      className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span>Data-driven analysis</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg
                      className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span>Pivot or proceed recommendation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg
                      className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span>Actionable next steps</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </PageContainer>
      </section>

      {/* Why StartupAI vs. Alternatives */}
      <section className="bg-background py-12">
        <PageContainer variant="wide">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              Why StartupAI vs. Alternatives
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Compare our approach to traditional methods and see the
              difference.
            </p>
          </div>

          <div className="space-y-6">
            {/* vs. Freelancers */}
            <Card className="border-2">
              <CardContent className="p-6">
                <div className="grid md:grid-cols-3 gap-6 items-center">
                  <div>
                    <h3 className="font-bold text-lg mb-2">vs. Freelancers</h3>
                    <div className="text-sm text-muted-foreground space-y-1">
                      <p>Cost: $8-15K</p>
                      <p>Timeline: 2-3 months</p>
                      <p>Quality: Variable</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-center">
                    <svg
                      className="w-8 h-8 text-green-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-2 text-primary">
                      StartupAI
                    </h3>
                    <div className="text-sm space-y-1">
                      <p>Cost: $1,500 + FREE Lifetime Founder Tier</p>
                      <p>Timeline: 2 weeks</p>
                      <p>Quality: Consistent, systematic</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* vs. Dev Shops */}
            <Card className="border-2">
              <CardContent className="p-6">
                <div className="grid md:grid-cols-3 gap-6 items-center">
                  <div>
                    <h3 className="font-bold text-lg mb-2">vs. Dev Shops</h3>
                    <div className="text-sm text-muted-foreground space-y-1">
                      <p>Cost: $25-50K</p>
                      <p>Timeline: 4-6 months</p>
                      <p>Scope: Overkill for validation</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-center">
                    <svg
                      className="w-8 h-8 text-green-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-2 text-primary">
                      StartupAI
                    </h3>
                    <div className="text-sm space-y-1">
                      <p>Cost: $1,500 + FREE Lifetime Founder Tier</p>
                      <p>Timeline: 2 weeks</p>
                      <p>Scope: Right-sized for validation</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* vs. No-Code Tools */}
            <Card className="border-2">
              <CardContent className="p-6">
                <div className="grid md:grid-cols-3 gap-6 items-center">
                  <div>
                    <h3 className="font-bold text-lg mb-2">
                      vs. No-Code Tools
                    </h3>
                    <div className="text-sm text-muted-foreground space-y-1">
                      <p>Cost: DIY time investment</p>
                      <p>Limits: Platform constraints</p>
                      <p>Lock-in: Monthly fees, vendor dependency</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-center">
                    <svg
                      className="w-8 h-8 text-green-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-2 text-primary">
                      StartupAI
                    </h3>
                    <div className="text-sm space-y-1">
                      <p>Cost: $1,500 one-time</p>
                      <p>Limits: Real code, full flexibility</p>
                      <p>Lock-in: FREE Founder Tier, full ownership</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* vs. ChatGPT/Claude DIY */}
            <Card className="border-2">
              <CardContent className="p-6">
                <div className="grid md:grid-cols-3 gap-6 items-center">
                  <div>
                    <h3 className="font-bold text-lg mb-2">
                      vs. ChatGPT/Claude DIY
                    </h3>
                    <div className="text-sm text-muted-foreground space-y-1">
                      <p>Output: Code snippets</p>
                      <p>Integration: Manual assembly required</p>
                      <p>Validation: No testing included</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-center">
                    <svg
                      className="w-8 h-8 text-green-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-2 text-primary">
                      StartupAI
                    </h3>
                    <div className="text-sm space-y-1">
                      <p>Output: Deployed product</p>
                      <p>Integration: End-to-end system</p>
                      <p>Validation: Real user testing included</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Lifetime Value Callout */}
            <div className="text-center mt-8">
              <Card className="bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20 inline-block">
                <CardContent className="p-6">
                  <p className="text-lg font-bold mb-2">
                    💰 Save $10,440+ over 5 years with Beta LTD
                  </p>
                  <p className="text-sm text-muted-foreground">
                    No monthly subscriptions. Full platform access forever.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </PageContainer>
      </section>

      {/* We Orchestrate the Best AI Tools */}
      <section className="bg-gray-50 py-12">
        <PageContainer variant="wide">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              We Orchestrate the Best AI Tools
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-4">
              Like Stripe Hides Payment Rails, We Hide AI Complexity
            </p>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              You don't choose which tool—we route intelligently to the best
              one for each task.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <svg
                    className="w-6 h-6 text-primary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <h3 className="font-bold mb-2">Best Tool for Each Task</h3>
                <p className="text-sm text-muted-foreground">
                  Claude Code for architecture, Cursor for refactoring, Bolt
                  for rapid prototyping. We route automatically.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <svg
                    className="w-6 h-6 text-primary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                    />
                  </svg>
                </div>
                <h3 className="font-bold mb-2">No Tool-Switching Overhead</h3>
                <p className="text-sm text-muted-foreground">
                  We handle the orchestration complexity. You focus on your
                  business, not which AI to use.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <svg
                    className="w-6 h-6 text-primary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <h3 className="font-bold mb-2">Full Code Export</h3>
                <p className="text-sm text-muted-foreground">
                  Power users: Export to any IDE (GitHub, Cursor, VS Code).
                  Full ownership, zero lock-in.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* For Developers Accordion (Collapsed by Default) */}
          <details className="bg-white rounded-lg border p-6">
            <summary className="font-bold text-lg cursor-pointer flex items-center gap-2">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
              For Developers: Technical Architecture Details
            </summary>
            <div className="mt-4 space-y-4 text-sm text-muted-foreground">
              <p>
                <strong>Tool Routing Strategy:</strong> We use a multi-agent
                orchestration layer that evaluates task requirements and routes
                to the optimal AI tool based on context, complexity, and desired
                output.
              </p>
              <p>
                <strong>Code Ownership:</strong> All code is committed to your
                private GitHub repository. You have full access to view, modify,
                or export at any time.
              </p>
              <p>
                <strong>Tech Stack:</strong> Next.js 15, TypeScript, Tailwind
                CSS, Supabase, Vercel/Netlify deployment. Modern, scalable, and
                maintainable.
              </p>
              <p>
                <strong>Export Options:</strong> Clone your repo, open in any
                IDE (VS Code, Cursor, Windsurf), and continue development with
                your own tools.
              </p>
            </div>
          </details>
        </PageContainer>
      </section>

      {/* Built on Proven Frameworks */}
      <section className="bg-background py-12">
        <PageContainer variant="wide">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              Built on Proven Frameworks
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Not generic AI prompts—systematic application of validated
              methodologies.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                    />
                  </svg>
                </div>
                <h3 className="font-bold mb-2">
                  Business Model Generation
                </h3>
                <p className="text-sm text-muted-foreground">
                  Strategyzer's proven Business Model Canvas framework
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                    />
                  </svg>
                </div>
                <h3 className="font-bold mb-2">Value Proposition Design</h3>
                <p className="text-sm text-muted-foreground">
                  Systematic customer pain-gain-job mapping
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                    />
                  </svg>
                </div>
                <h3 className="font-bold mb-2">Testing Business Ideas</h3>
                <p className="text-sm text-muted-foreground">
                  Evidence-based validation methodology
                </p>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-gradient-to-r from-primary/5 to-secondary/5 border-primary/10">
            <CardContent className="p-8 text-center">
              <h3 className="font-bold text-xl mb-2">
                Strategy Rigor + Execution Velocity
              </h3>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                We combine Strategyzer frameworks (used by 1M+ entrepreneurs)
                with AI speed to deliver professional-grade strategy in days,
                not weeks.
              </p>
            </CardContent>
          </Card>
        </PageContainer>
      </section>

      {/* Mock Screenshots Section */}
      <section className="bg-gray-50 py-12">
        <PageContainer variant="wide">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">See It in Action</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Get a preview during your beta validation cycle.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="aspect-video bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-lg border border-blue-500/20 flex items-center justify-center mb-4">
                  <div className="text-center">
                    <svg
                      className="w-16 h-16 text-primary mx-auto mb-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                    <p className="text-sm text-muted-foreground">
                      Deployed MVP Example
                    </p>
                  </div>
                </div>
                <h3 className="font-bold mb-2">Your Live Application</h3>
                <p className="text-sm text-muted-foreground">
                  See your fully deployed MVP with a real URL that customers can
                  visit and use.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="aspect-video bg-gradient-to-br from-green-500/20 to-blue-500/20 rounded-lg border border-green-500/20 flex items-center justify-center mb-4">
                  <div className="text-center">
                    <svg
                      className="w-16 h-16 text-primary mx-auto mb-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                      />
                    </svg>
                    <p className="text-sm text-muted-foreground">
                      Analytics Dashboard
                    </p>
                  </div>
                </div>
                <h3 className="font-bold mb-2">Real User Data</h3>
                <p className="text-sm text-muted-foreground">
                  Track user behavior, conversions, and engagement metrics from
                  actual potential customers.
                </p>
              </CardContent>
            </Card>
          </div>
        </PageContainer>
      </section>

      {/* Real User Pain Points */}
      <section className="bg-background py-12">
        <PageContainer variant="wide">
          <PageHeader variant="centered" className="mb-12">
            <PageTitle>What Founders Are Saying</PageTitle>
            <PageDescription className="max-w-2xl mx-auto">
              Real challenges from entrepreneurs who need better validation
              tools.
            </PageDescription>
          </PageHeader>
          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                    <svg
                      className="h-5 w-5 text-primary"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold">Startup Founder</p>
                    <p className="text-sm text-muted-foreground">
                      Reddit Community
                    </p>
                  </div>
                </div>
                <p className="text-muted-foreground italic">
                  "I'm overwhelmed with startup ideas and unsure how to validate
                  them. I need guided validation with real evidence."
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                    <svg
                      className="h-5 w-5 text-primary"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold">AI Tool User</p>
                    <p className="text-sm text-muted-foreground">
                      Product Review
                    </p>
                  </div>
                </div>
                <p className="text-muted-foreground italic">
                  "ChatGPT business plans are too generic. I need working
                  software and real user feedback, not more documents."
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                    <svg
                      className="h-5 w-5 text-primary"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold">Entrepreneur</p>
                    <p className="text-sm text-muted-foreground">
                      Market Research
                    </p>
                  </div>
                </div>
                <p className="text-muted-foreground italic">
                  "Hiring freelancers is expensive and slow. I need fast,
                  affordable validation before committing $50K to dev shops."
                </p>
              </CardContent>
            </Card>
          </div>
        </PageContainer>
      </section>

      {/* CTA Section */}
      <section className="bg-primary/5 py-12">
        <PageContainer variant="wide">
          <Card className="bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20">
            <CardContent className="text-center py-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to Validate Your Startup Idea?
              </h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Join our private beta and get 3 full validation cycles for
                $1,500. Build, test, and pivot with real user data—not
                assumptions.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="text-lg">
                  <Link href="/beta">
                    Join Beta - 3 Validation Cycles for $1,500
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="text-lg">
                  <Link href="/process">See How It Works</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </PageContainer>
      </section>
    </div>
  );
}
