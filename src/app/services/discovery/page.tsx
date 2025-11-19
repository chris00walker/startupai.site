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
  title: 'Discovery Services | Chris Walker Consulting',
  description:
    'Validate your business idea and identify market opportunities with comprehensive research and analysis.',
};

export default function DiscoveryPage() {
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
              <BreadcrumbPage>Discovery</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </PageContainer>

      {/* Floating geometric elements */}
      <>
        <div className="absolute top-24 right-20 w-14 h-14 border border-primary/20 rounded-lg floating-element opacity-20"></div>
        <div
          className="absolute top-48 left-16 w-10 h-10 bg-primary/5 rounded-full floating-element"
          style={{ animationDelay: '2s' }}
        ></div>
        <div
          className="absolute bottom-32 right-1/3 w-12 h-12 border border-primary/15 rotate-45 floating-element"
          style={{ animationDelay: '1s' }}
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
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
                <Badge variant="secondary" className="glow-effect">
                  Discovery Phase
                </Badge>
              </div>
              <h1 className="business-title text-4xl md:text-5xl mb-6">
                Discovery Services
              </h1>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Validate your business idea and identify market opportunities
                with comprehensive research and analysis.
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
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  What's Included
                </CardTitle>
                <CardDescription>
                  Comprehensive research and analysis deliverables
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-primary/5 transition-colors">
                    <Badge variant="outline" className="glow-effect">
                      ✓
                    </Badge>
                    <span>Market Research & Analysis</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-primary/5 transition-colors">
                    <Badge variant="outline" className="glow-effect">
                      ✓
                    </Badge>
                    <span>Competitive Landscape Assessment</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-primary/5 transition-colors">
                    <Badge variant="outline" className="glow-effect">
                      ✓
                    </Badge>
                    <span>Business Model Validation</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-primary/5 transition-colors">
                    <Badge variant="outline" className="glow-effect">
                      ✓
                    </Badge>
                    <span>Customer Desirability Validation</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-primary/5 transition-colors">
                    <Badge variant="outline" className="glow-effect">
                      ✓
                    </Badge>
                    <span>Customer Journey Mapping</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-primary/5 transition-colors">
                    <Badge variant="outline" className="glow-effect">
                      ✓
                    </Badge>
                    <span>Risk Assessment & Mitigation</span>
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
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                  </div>
                  Our Process
                </CardTitle>
                <CardDescription>
                  Systematic approach to market discovery and validation
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  Our discovery process begins with understanding your vision
                  and goals. We then conduct thorough market research to
                  validate assumptions and identify opportunities for
                  differentiation. Through systematic analysis and stakeholder
                  surveys, we provide actionable insights that guide your
                  strategic decisions.
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
