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
  title: 'How It Works | StartupAI - AI Co-Founder for Founders',
  description:
    'From idea to evidence in 2 weeks. We build, test, and validate your startup with real customers. Repeat up to 3 times to find product-market fit.',
  openGraph: {
    title: 'How It Works | StartupAI',
    description:
      'From idea to evidence in 2 weeks. Build, test, and validate with our AI founders team.',
    type: 'website',
  },
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
            <div className="flex justify-center mb-4">
              <Badge variant="secondary" className="text-sm px-4 py-1">
                2-Week Validation Cycle
              </Badge>
            </div>
            <PageHeader variant="centered">
              <PageTitle className="business-title text-4xl md:text-6xl mb-6">
                From Idea to Evidence in 2 Weeks
              </PageTitle>
              <PageDescription className="business-subtitle text-xl max-w-3xl mx-auto">
                We build, test, and validate your startup with real customers.
                Repeat up to 3 times to find product-market fit.
              </PageDescription>
            </PageHeader>
            <div className="flex items-center justify-center gap-4 mt-8">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <div className="w-2 h-2 bg-primary rounded-full glow-effect"></div>
                <span>2 Weeks Per Cycle</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <div className="w-2 h-2 bg-secondary rounded-full glow-effect"></div>
                <span>Real User Data</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <div className="w-2 h-2 bg-accent rounded-full glow-effect"></div>
                <span>Up to 3 Cycles</span>
              </div>
            </div>
          </div>
        </PageContainer>
      </section>

      {/* 4-Step Validation Flow */}
      <section className="bg-gray-50 py-12">
        <PageContainer variant="wide">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              The 4-Step Validation Process
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Each 2-week cycle follows a proven methodology to transform your
              idea into validated evidence.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Step 1: Strategy Foundation */}
            <Card className="professional-card-wide glow-effect hover:scale-105 transition-all duration-500 relative overflow-hidden">
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
                        d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                      />
                    </svg>
                  </div>
                  <div>
                    <CardTitle className="text-2xl">
                      Strategy Foundation
                    </CardTitle>
                    <CardDescription className="text-base">
                      Days 1-3
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Tell us your idea, we validate your business model. We create
                  your Business Model Canvas, Value Proposition Design, and
                  identify key assumptions to test.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary" className="text-xs">
                    Business Model Canvas
                  </Badge>
                  <Badge variant="secondary" className="text-xs">
                    Value Prop Design
                  </Badge>
                  <Badge variant="secondary" className="text-xs">
                    Hypothesis Testing
                  </Badge>
                  <Badge variant="secondary" className="text-xs">
                    Domain Model
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Step 2: Build & Deploy */}
            <Card className="professional-card-wide glow-effect hover:scale-105 transition-all duration-500 relative overflow-hidden">
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
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                  </div>
                  <div>
                    <CardTitle className="text-2xl">Build & Deploy</CardTitle>
                    <CardDescription className="text-base">
                      Days 4-7
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  We build and deploy your MVP. You get a live URL, functional
                  application, and full code ownership. Real working software,
                  not mockups.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary" className="text-xs">
                    Working MVP
                  </Badge>
                  <Badge variant="secondary" className="text-xs">
                    Live Deployment
                  </Badge>
                  <Badge variant="secondary" className="text-xs">
                    Code Ownership
                  </Badge>
                  <Badge variant="secondary" className="text-xs">
                    Full Documentation
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Step 3: Test with Real Users */}
            <Card className="professional-card-wide glow-effect hover:scale-105 transition-all duration-500 relative overflow-hidden">
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
                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <CardTitle className="text-2xl">
                      Test with Real Users
                    </CardTitle>
                    <CardDescription className="text-base">
                      Week 2, Days 1-5
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  We drive real traffic and collect data. User behavior,
                  analytics, and feedback from actual potential customers.
                  Includes ~$450-525 ad spend.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary" className="text-xs">
                    Ad Campaigns
                  </Badge>
                  <Badge variant="secondary" className="text-xs">
                    User Analytics
                  </Badge>
                  <Badge variant="secondary" className="text-xs">
                    Real Feedback
                  </Badge>
                  <Badge variant="secondary" className="text-xs">
                    Data Collection
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Step 4: Pivot or Proceed */}
            <Card className="professional-card-wide glow-effect hover:scale-105 transition-all duration-500 relative overflow-hidden">
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
                        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                      />
                    </svg>
                  </div>
                  <div>
                    <CardTitle className="text-2xl">
                      Pivot or Proceed
                    </CardTitle>
                    <CardDescription className="text-base">
                      Week 2, Days 6-7
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  We analyze results and recommend next steps. Data-driven pivot
                  recommendations based on what real users told us about your
                  idea.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary" className="text-xs">
                    Data Analysis
                  </Badge>
                  <Badge variant="secondary" className="text-xs">
                    Pivot Guidance
                  </Badge>
                  <Badge variant="secondary" className="text-xs">
                    Evidence-Based
                  </Badge>
                  <Badge variant="secondary" className="text-xs">
                    Next Steps
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </PageContainer>
      </section>

      {/* Timeline Visual */}
      <section className="bg-background py-12">
        <PageContainer variant="wide">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              Not Months. Not Even a Month. Just 2 Weeks.
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Each validation cycle is designed to move fast and deliver real
              evidence.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-2xl p-8 border border-primary/10">
              <div className="grid md:grid-cols-2 gap-8">
                {/* Week 1 */}
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Badge
                      variant="default"
                      className="text-lg px-4 py-1 bg-primary"
                    >
                      Week 1
                    </Badge>
                    <span className="text-sm text-muted-foreground">
                      Build Phase
                    </span>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                        1-3
                      </div>
                      <div>
                        <p className="font-medium">Strategy Foundation</p>
                        <p className="text-sm text-muted-foreground">
                          Business model, value prop, assumptions
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                        4-7
                      </div>
                      <div>
                        <p className="font-medium">Build & Deploy</p>
                        <p className="text-sm text-muted-foreground">
                          Working MVP with live URL
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Week 2 */}
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Badge
                      variant="default"
                      className="text-lg px-4 py-1 bg-green-500 hover:bg-green-500"
                    >
                      Week 2
                    </Badge>
                    <span className="text-sm text-muted-foreground">
                      Test Phase
                    </span>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                        1-5
                      </div>
                      <div>
                        <p className="font-medium">Test with Real Users</p>
                        <p className="text-sm text-muted-foreground">
                          Drive traffic, collect data
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                        6-7
                      </div>
                      <div>
                        <p className="font-medium">Pivot or Proceed</p>
                        <p className="text-sm text-muted-foreground">
                          Analysis & recommendations
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </PageContainer>
      </section>

      {/* Validation Cycle Repeatability */}
      <section className="bg-gray-50 py-12">
        <PageContainer variant="wide">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              Test 3 Ideas or Pivot 3 Times—Your Choice
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our beta Lifetime Deal includes 3 full validation cycles. Use
              them to test different ideas or iterate on the same one until you
              find product-market fit.
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            <div className="relative">
              {/* Connecting Lines */}
              <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-primary via-secondary to-accent -z-10"></div>

              <div className="grid md:grid-cols-3 gap-8">
                {/* Cycle 1 */}
                <div className="bg-white rounded-xl p-6 shadow-lg border border-primary/20">
                  <div className="flex items-center justify-between mb-4">
                    <Badge variant="default" className="text-base px-3 py-1">
                      Cycle 1
                    </Badge>
                    <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary/80 rounded-full flex items-center justify-center text-white font-bold text-lg">
                      1
                    </div>
                  </div>
                  <h3 className="font-bold text-lg mb-2">Test Your Idea</h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    Start with your initial concept. Build, test, and see what
                    real users think.
                  </p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span>2 weeks</span>
                  </div>
                </div>

                {/* Cycle 2 */}
                <div className="bg-white rounded-xl p-6 shadow-lg border border-secondary/20">
                  <div className="flex items-center justify-between mb-4">
                    <Badge variant="secondary" className="text-base px-3 py-1">
                      Cycle 2
                    </Badge>
                    <div className="w-12 h-12 bg-gradient-to-br from-secondary to-secondary/80 rounded-full flex items-center justify-center text-white font-bold text-lg">
                      2
                    </div>
                  </div>
                  <h3 className="font-bold text-lg mb-2">Pivot or Iterate</h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    Based on data, either test a new idea or refine your
                    approach with evidence-based changes.
                  </p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span>2 weeks</span>
                  </div>
                </div>

                {/* Cycle 3 */}
                <div className="bg-white rounded-xl p-6 shadow-lg border border-accent/20">
                  <div className="flex items-center justify-between mb-4">
                    <Badge variant="outline" className="text-base px-3 py-1">
                      Cycle 3
                    </Badge>
                    <div className="w-12 h-12 bg-gradient-to-br from-accent to-accent/80 rounded-full flex items-center justify-center text-white font-bold text-lg">
                      3
                    </div>
                  </div>
                  <h3 className="font-bold text-lg mb-2">Find PMF</h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    Use your final cycle to validate your refined idea and
                    confirm product-market fit.
                  </p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span>2 weeks</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center mt-12">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-full px-6 py-3">
                <svg
                  className="w-5 h-5 text-primary"
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
                <span className="font-medium">
                  Total: Up to 6 weeks to validated product-market fit
                </span>
              </div>
            </div>
          </div>
        </PageContainer>
      </section>

      {/* CTA Section */}
      <section className="bg-background py-12">
        <PageContainer variant="centered">
          <div className="text-center bg-gradient-to-r from-primary/5 to-secondary/5 rounded-2xl p-8 border border-primary/10">
            <h2 className="text-3xl font-bold mb-4">
              Ready to Validate Your Startup Idea?
            </h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Join our private beta and get 3 full validation cycles. Build,
              test, and pivot with real user data—not assumptions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="text-lg">
                <Link href="/beta">Apply for Beta Access</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="text-lg">
                <Link href="/pricing">See Pricing</Link>
              </Button>
            </div>
          </div>
        </PageContainer>
      </section>
    </div>
  );
}
