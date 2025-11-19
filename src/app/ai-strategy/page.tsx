import type { Metadata } from 'next';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { PageContainer } from '@/components/ui/layout/page-container';
import {
  PageHeader,
  PageTitle,
  PageDescription,
} from '@/components/ui/layout/page-header';
import {
  ArrowRight,
  Brain,
  Shield,
  Zap,
  Target,
  Sparkles,
  CheckCircle2,
  TrendingUp,
  Lock,
  FileSearch,
  Layers,
  GitBranch,
} from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'AI Strategy Assistant | StartupAI',
  description:
    'Generate strategy canvases, validate experiments, and turn ideas into execution plans. Private-by-design AI for founders and operators.',
};

export default function AIStrategyPage() {
  return (
    <div className="min-h-screen business-gradient tech-grid">
      {/* Floating geometric elements */}
      <div className="absolute top-40 right-20 w-10 h-10 border border-primary/20 rounded-lg floating-element opacity-20"></div>
      <div
        className="absolute top-64 left-20 w-16 h-16 bg-primary/5 rounded-full floating-element"
        style={{ animationDelay: '1.8s' }}
      ></div>
      <div
        className="absolute bottom-52 left-2/3 w-8 h-8 border border-primary/15 rotate-45 floating-element"
        style={{ animationDelay: '3.2s' }}
      ></div>

      {/* Breadcrumb Navigation */}
      <PageContainer variant="wide" padding="sm">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/">Home</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>AI Strategy</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </PageContainer>

      {/* Hero Section */}
      <section className="business-gradient text-foreground py-16 md:py-24 relative overflow-hidden">
        {/* Sophisticated AI-themed background */}
        <div className="absolute inset-0 bg-[url('/graphics/neural-network.svg')] bg-right bg-contain bg-no-repeat opacity-15"></div>
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-l from-primary/5 to-transparent rounded-full blur-3xl"></div>
        <PageContainer variant="centered" padding="lg">
          <PageHeader variant="centered" className="mb-8">
            <Badge variant="secondary" className="mb-4">
              <Sparkles className="mr-1 h-3 w-3" />
              AI Strategy Sprint
            </Badge>
            <PageTitle className="text-4xl md:text-6xl">
              Your AI Cofounder
            </PageTitle>
            <PageDescription className="text-xl">
              Transform your startup idea into a validated business model and
              technical architecture in just one week. Get evidence-based
              validation and production-ready plans without the guesswork.
            </PageDescription>
          </PageHeader>
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Button size="lg" variant="outline" asChild>
              <Link href="#how-it-works">See How It Works</Link>
            </Button>
          </div>
        </PageContainer>
      </section>

      {/* Pain Points We Solve */}
      <section className="py-16">
        <PageContainer variant="wide" padding="lg">
          <PageHeader variant="centered" className="mb-12">
            <PageTitle>The Problem We Solve</PageTitle>
            <PageDescription>
              Stop drowning in generic AI outputs and fragmented tools
            </PageDescription>
          </PageHeader>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-5 w-5 text-destructive" />
                  Idea Overwhelm
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Too many ideas, no clear validation path. Generic AI tools
                  give you templates, not evidence-based insights.
                </CardDescription>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-destructive" />
                  Credibility Gap
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Investors and customers need proof, not PowerPoints. Current
                  tools lack traceability and evidence chains.
                </CardDescription>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <GitBranch className="h-5 w-5 text-destructive" />
                  Tool Fragmentation
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Jumping between 10+ tools breaks your flow. Strategy, design,
                  and development remain disconnected silos.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </PageContainer>
      </section>

      {/* Features Section */}
      <section className="section-padding bg-muted/20 relative">
        {/* Decorative background pattern */}
        <div className="absolute inset-0 bg-[url('/graphics/abstract-mesh.svg')] bg-center bg-cover opacity-10"></div>
        <div className="container relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              AI Strategy Sprint Features
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Everything you need to validate and launch your AI startup idea
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileSearch className="h-5 w-5 text-primary" />
                  Evidence-Based Validation
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Generate Strategy Canvases, Business Model Canvases, and Value
                  Propositions backed by real market data and competitor
                  analysis—not generic templates.
                </CardDescription>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Layers className="h-5 w-5 text-primary" />
                  Domain-Driven Architecture
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Automatically generate bounded contexts, entity models, and
                  API contracts that align with your business strategy—no more
                  guessing at technical design.
                </CardDescription>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-primary" />
                  Instant Code Scaffolding
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Go from validated strategy to working prototype in minutes.
                  Generate production-ready code with best practices baked in.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Solution Features */}
      <section className="container mx-auto px-4 py-16 bg-muted/50">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold">
              Evidence-Led Strategy Meets Rapid Execution
            </h2>
            <p className="text-lg text-muted-foreground">
              A complete AI-powered workflow from idea to production
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-2">
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <FileSearch className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="mb-2 font-semibold">
                    Evidence-Based Validation
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Generate Strategy Canvases, Business Model Canvases, and
                    Value Propositions backed by real market data and competitor
                    analysis—not generic templates.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <Layers className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="mb-2 font-semibold">
                    Domain-Driven Architecture
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Automatically generate bounded contexts, entity models, and
                    API contracts that align with your business strategy—no more
                    guessing at technical design.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <Zap className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="mb-2 font-semibold">
                    Instant Code Scaffolding
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Go from validated strategy to working prototype in minutes.
                    Generate production-ready code with best practices baked in.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <Lock className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="mb-2 font-semibold">Private-by-Design</h3>
                  <p className="text-sm text-muted-foreground">
                    Your ideas stay yours. Local-first architecture with
                    optional cloud sync. Full data control and audit trails.
                  </p>
                </div>
              </div>
            </div>
            <div className="relative">
              <Card className="border-2 border-primary/20">
                <CardHeader>
                  <Badge className="mb-2 w-fit">Live Example</Badge>
                  <CardTitle>Perishable Commerce Platform</CardTitle>
                  <CardDescription>
                    From idea to validated architecture in 2 hours
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                    <span className="text-sm">
                      Market analysis: 47 competitors analyzed
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                    <span className="text-sm">
                      Value prop: 3 unique differentiators found
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                    <span className="text-sm">
                      DDD model: 5 bounded contexts defined
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                    <span className="text-sm">
                      Code: 12 microservices scaffolded
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                    <span className="text-sm">
                      Evidence chain: 100% traceable
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="container mx-auto px-4 py-16">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold">How It Works</h2>
            <p className="text-lg text-muted-foreground">
              From raw idea to validated strategy in three steps
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <span className="text-2xl font-bold text-primary">1</span>
              </div>
              <h3 className="mb-2 text-lg font-semibold">
                Describe Your Vision
              </h3>
              <p className="text-sm text-muted-foreground">
                Tell us your idea in plain language. Our AI analyzes market fit,
                competition, and viability using real data.
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <span className="text-2xl font-bold text-primary">2</span>
              </div>
              <h3 className="mb-2 text-lg font-semibold">
                Generate & Validate
              </h3>
              <p className="text-sm text-muted-foreground">
                Get evidence-backed canvases, value props, and technical
                architectures. Every claim is traceable to sources.
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <span className="text-2xl font-bold text-primary">3</span>
              </div>
              <h3 className="mb-2 text-lg font-semibold">Build & Iterate</h3>
              <p className="text-sm text-muted-foreground">
                Generate production code, test with users, and refine. Your
                strategy and code evolve together, staying aligned.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Signals */}
      <section className="container mx-auto px-4 py-16 bg-muted/50">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold">Built for Trust</h2>
            <p className="text-lg text-muted-foreground">
              Your ideas, your data, your control
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            <Card>
              <CardHeader>
                <Shield className="mb-2 h-8 w-8 text-primary" />
                <CardTitle>100% Private</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Local-first architecture. Your strategic data never leaves
                  your control unless you explicitly choose to sync.
                </CardDescription>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <TrendingUp className="mb-2 h-8 w-8 text-primary" />
                <CardTitle>Evidence-Based</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Every recommendation backed by data. Full audit trail from
                  insight to implementation. No black boxes.
                </CardDescription>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CheckCircle2 className="mb-2 h-8 w-8 text-primary" />
                <CardTitle>Production Ready</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Generated code follows best practices. CI/CD ready. Security
                  and performance considerations built-in.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="mb-4 text-3xl font-bold">
            Ready to Build Your Next Venture?
          </h2>
          <p className="mb-8 text-lg text-muted-foreground">
            Join forward-thinking founders using AI to validate faster and build
            smarter.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Button size="lg" variant="outline" asChild>
              <Link href="/contact">Schedule a Demo</Link>
            </Button>
          </div>
          <p className="mt-6 text-sm text-muted-foreground">
            <Badge variant="outline" className="mr-2">
              Limited Beta
            </Badge>
            Currently onboarding 50 founders per month
          </p>
        </div>
      </section>
    </div>
  );
}
