import { Metadata } from 'next';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
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
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Process | Chris Walker Consulting',
  description:
    'Learn about the proven methodology and process used for eCommerce strategy and development projects.',
};

export default function ProcessPage() {
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
              <BreadcrumbPage>Process</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </PageContainer>

      {/* Hero Section */}
      <section className="business-gradient relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5"></div>
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="gradient-blob absolute top-20 left-10 w-64 h-64 opacity-30"></div>
          <div
            className="gradient-blob absolute bottom-20 right-10 w-48 h-48 opacity-20"
            style={{ animationDelay: '2s' }}
          ></div>
        </div>
        <PageContainer variant="wide" padding="lg" className="relative z-10">
          <div className="text-center">
            <PageHeader variant="centered">
              <PageTitle className="business-title text-4xl md:text-6xl mb-6">
                Proven Process for Startup Success
              </PageTitle>
              <PageDescription className="business-subtitle text-xl max-w-3xl mx-auto">
                A systematic approach that transforms ideas into thriving
                digital platforms, from discovery and validation through scaling
                and continuous optimization.
              </PageDescription>
            </PageHeader>
            <div className="flex items-center justify-center gap-4 mt-8">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <div className="w-2 h-2 bg-primary rounded-full glow-effect"></div>
                <span>4-Phase Framework</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <div className="w-2 h-2 bg-secondary rounded-full glow-effect"></div>
                <span>Proven Results</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <div className="w-2 h-2 bg-accent rounded-full glow-effect"></div>
                <span>Scalable Solutions</span>
              </div>
            </div>
          </div>
        </PageContainer>
      </section>

      {/* Process Steps */}
      <section className="bg-gray-50 py-12">
        <PageContainer variant="wide">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Step 1: Discovery */}
            <Link href="/services/discovery" className="block">
              <Card className="professional-card-wide glow-effect hover:scale-105 transition-all duration-500 relative overflow-hidden cursor-pointer group">
                <div className="absolute top-4 right-4">
                  <Badge
                    variant="outline"
                    className="text-foreground glow-effect font-bold"
                  >
                    01
                  </Badge>
                </div>
                <CardHeader>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
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
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                      </svg>
                    </div>
                    <div>
                      <CardTitle className="text-2xl">Discovery</CardTitle>
                      <CardDescription className="text-base">
                        Phase 1 — Discovery
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    We start by understanding your business goals, target
                    market, and competitive landscape. This phase includes
                    market research, persona development, opportunity
                    assessment, and technical feasibility.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary" className="text-xs">
                      Market Research
                    </Badge>
                    <Badge variant="secondary" className="text-xs">
                      Persona Development
                    </Badge>
                    <Badge variant="secondary" className="text-xs">
                      Opportunity Assessment
                    </Badge>
                    <Badge variant="secondary" className="text-xs">
                      Feasibility Study
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </Link>

            {/* Step 2: Validation */}
            <Link href="/services/validation" className="block">
              <Card className="professional-card-wide glow-effect hover:scale-105 transition-all duration-500 relative overflow-hidden cursor-pointer group">
                <div className="absolute top-4 right-4">
                  <Badge variant="outline" className="glow-effect font-bold">
                    02
                  </Badge>
                </div>
                <CardHeader>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
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
                          d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                        />
                      </svg>
                    </div>
                    <div>
                      <CardTitle className="text-2xl">Validation</CardTitle>
                      <CardDescription className="text-base">
                        Phase 2 — Validation
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    We validate assumptions with real users through MVPs and
                    experiments. Collect feedback, run A/B tests, and confirm
                    product‑market fit before scaling.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary" className="text-xs">
                      MVP Testing
                    </Badge>
                    <Badge variant="secondary" className="text-xs">
                      User Feedback
                    </Badge>
                    <Badge variant="secondary" className="text-xs">
                      A/B Testing
                    </Badge>
                    <Badge variant="secondary" className="text-xs">
                      PMF Validation
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </Link>

            {/* Step 3: Scaling */}
            <Link href="/services/scaling" className="block">
              <Card className="professional-card-wide glow-effect hover:scale-105 transition-all duration-500 relative overflow-hidden cursor-pointer group">
                <div className="absolute top-4 right-4">
                  <Badge variant="outline" className="glow-effect font-bold">
                    03
                  </Badge>
                </div>
                <CardHeader>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg">
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
                          d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                        />
                      </svg>
                    </div>
                    <div>
                      <CardTitle className="text-2xl">Scaling</CardTitle>
                      <CardDescription className="text-base">
                        Phase 3 — Scaling
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    We optimize infrastructure, automate key processes, and
                    implement performance monitoring— building robust systems
                    that support sustainable growth.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary" className="text-xs">
                      Infra Optimization
                    </Badge>
                    <Badge variant="secondary" className="text-xs">
                      Automation
                    </Badge>
                    <Badge variant="secondary" className="text-xs">
                      Monitoring
                    </Badge>
                    <Badge variant="secondary" className="text-xs">
                      Growth Strategy
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </Link>

            {/* Step 4: Optimization */}
            <Link href="/services/optimization" className="block">
              <Card className="professional-card-wide glow-effect hover:scale-105 transition-all duration-500 relative overflow-hidden cursor-pointer group">
                <div className="absolute top-4 right-4">
                  <Badge variant="outline" className="glow-effect font-bold">
                    04
                  </Badge>
                </div>
                <CardHeader>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg">
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
                          d="M13 10V3L4 14h7v7l9-11h-7z"
                        />
                      </svg>
                    </div>
                    <div>
                      <CardTitle className="text-2xl">Optimization</CardTitle>
                      <CardDescription className="text-base">
                        Phase 4 — Optimization
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    We continually analyze performance, improve conversions,
                    reduce costs, and refine strategy— ensuring your platform
                    keeps delivering better results over time.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary" className="text-xs">
                      Performance Analytics
                    </Badge>
                    <Badge variant="secondary" className="text-xs">
                      Conversion Optimization
                    </Badge>
                    <Badge variant="secondary" className="text-xs">
                      Cost Reduction
                    </Badge>
                    <Badge variant="secondary" className="text-xs">
                      Strategic Refinements
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </div>
        </PageContainer>
      </section>

      {/* CTA Section */}
      <section className="bg-background py-12">
        <PageContainer variant="centered">
          <div className="text-center bg-gradient-to-r from-primary/5 to-secondary/5 rounded-2xl p-8 border border-primary/10">
            <h2 className="text-3xl font-bold mb-4">
              Ready to Start Your Project?
            </h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Let's discuss how this proven process can help you achieve your
              eCommerce goals and build a platform that drives real business
              results.
            </p>
          </div>
        </PageContainer>
      </section>
    </div>
  );
}
