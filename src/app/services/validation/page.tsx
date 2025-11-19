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
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { PageContainer } from '@/components/ui/layout/page-container';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Validation Services | StartupAI',
  description:
    'Test your concepts with real customers and refine your approach based on data-driven insights.',
};

export default function ValidationPage() {
  return (
    <div className="min-h-screen business-gradient tech-grid">
      {/* Breadcrumb Navigation */}
      <PageContainer
        variant="wide"
        padding="none"
        className="pt-6 relative z-10"
      >
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/">Home</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/services">Services</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Validation</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </PageContainer>

      {/* Floating geometric elements */}
      <>
        <div className="absolute top-32 left-24 w-16 h-16 border border-primary/20 rounded-lg floating-element opacity-20"></div>
        <div
          className="absolute top-56 right-12 w-8 h-8 bg-primary/5 rounded-full floating-element"
          style={{ animationDelay: '3s' }}
        ></div>
        <div
          className="absolute bottom-40 left-1/4 w-10 h-10 border border-primary/15 rotate-45 floating-element"
          style={{ animationDelay: '2s' }}
        ></div>
      </>

      <section className="section-padding relative z-10">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            {/* Hero Section */}
            <div className="text-center mb-12">
              <div className="flex items-center justify-center gap-2 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <Badge variant="secondary" className="glow-effect">
                  Validation Phase
                </Badge>
              </div>
              <h1 className="business-title text-4xl md:text-5xl mb-6">
                Validation Services
              </h1>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Test your concepts with real customers and refine your approach
                based on data-driven insights.
              </p>
            </div>

            {/* What's Included Card */}
            <Card className="business-card mb-8 glow-effect hover:scale-[1.02] transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                    <svg
                      className="w-4 h-4 text-primary"
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
                  What's Included
                </CardTitle>
                <CardDescription>
                  Comprehensive testing and validation deliverables
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-primary/5 transition-colors">
                    <Badge variant="outline" className="glow-effect">
                      ✓
                    </Badge>
                    <span>MVP Development & Testing</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-primary/5 transition-colors">
                    <Badge variant="outline" className="glow-effect">
                      ✓
                    </Badge>
                    <span>User Experience Research</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-primary/5 transition-colors">
                    <Badge variant="outline" className="glow-effect">
                      ✓
                    </Badge>
                    <span>A/B Testing Implementation</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-primary/5 transition-colors">
                    <Badge variant="outline" className="glow-effect">
                      ✓
                    </Badge>
                    <span>Performance Analytics Setup</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-primary/5 transition-colors">
                    <Badge variant="outline" className="glow-effect">
                      ✓
                    </Badge>
                    <span>Customer Feedback Collection</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-primary/5 transition-colors">
                    <Badge variant="outline" className="glow-effect">
                      ✓
                    </Badge>
                    <span>Iteration Planning</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Process Card */}
            <Card className="business-card mb-8 glow-effect hover:scale-[1.02] transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                    <svg
                      className="w-4 h-4 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                      />
                    </svg>
                  </div>
                  Our Process
                </CardTitle>
                <CardDescription>
                  Iterative testing and refinement methodology
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  We build minimal viable products to test core assumptions with
                  real users. Through systematic testing and data collection, we
                  validate or pivot your approach based on actual market
                  feedback. Our iterative process ensures rapid learning and
                  continuous improvement of your product-market fit.
                </p>
              </CardContent>
            </Card>

            {/* CTA Section */}
            <div className="text-center"></div>
          </div>
        </div>
      </section>
    </div>
  );
}
