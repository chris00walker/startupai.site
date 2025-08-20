import { Metadata } from 'next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
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
  title: 'Optimization Services | Chris Walker Consulting',
  description: 'Improve existing systems and processes to maximize efficiency, performance, and user experience.',
};

export default function OptimizationPage() {
  return (
    <div className="min-h-screen business-gradient tech-grid">
      {/* Breadcrumb Navigation */}
      <PageContainer variant="wide" padding="none" className="pt-6 relative z-10">
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
              <BreadcrumbPage>Optimization</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </PageContainer>

      {/* Floating geometric elements */}
      <>
        <div className="absolute top-36 left-28 w-12 h-12 border border-primary/20 rounded-lg floating-element opacity-20"></div>
        <div className="absolute top-52 right-16 w-14 h-14 bg-primary/5 rounded-full floating-element" style={{animationDelay: '2.5s'}}></div>
        <div className="absolute bottom-44 right-2/5 w-6 h-6 border border-primary/15 rotate-45 floating-element" style={{animationDelay: '0.5s'}}></div>
      </>
      
      <section className="section-padding relative z-10">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            {/* Hero Section */}
            <div className="text-center mb-12">
              <div className="flex items-center justify-center gap-2 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <Badge variant="secondary" className="glow-effect">Optimization Phase</Badge>
              </div>
              <h1 className="business-title text-4xl md:text-5xl mb-6">
                Optimization Services
              </h1>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Improve existing systems and processes to maximize efficiency, performance, and user experience.
              </p>
            </div>

            {/* What's Included Card */}
            <Card className="business-card mb-8 glow-effect hover:scale-[1.02] transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                    <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  What's Included
                </CardTitle>
                <CardDescription>
                  Performance enhancement and efficiency improvements
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-primary/5 transition-colors">
                    <Badge variant="outline" className="glow-effect">✓</Badge>
                    <span>Performance Tuning & Analysis</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-primary/5 transition-colors">
                    <Badge variant="outline" className="glow-effect">✓</Badge>
                    <span>User Experience Optimization</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-primary/5 transition-colors">
                    <Badge variant="outline" className="glow-effect">✓</Badge>
                    <span>Conversion Rate Optimization</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-primary/5 transition-colors">
                    <Badge variant="outline" className="glow-effect">✓</Badge>
                    <span>Cost Reduction Strategies</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-primary/5 transition-colors">
                    <Badge variant="outline" className="glow-effect">✓</Badge>
                    <span>Process Automation</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-primary/5 transition-colors">
                    <Badge variant="outline" className="glow-effect">✓</Badge>
                    <span>Continuous Improvement Planning</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Process Card */}
            <Card className="business-card mb-8 glow-effect hover:scale-[1.02] transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                  </div>
                  Our Process
                </CardTitle>
                <CardDescription>
                  Systematic analysis and performance enhancement approach
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  We analyze your existing systems to identify bottlenecks and 
                  opportunities for improvement. Through systematic optimization, 
                  we help you achieve better performance and user satisfaction. 
                  Our data-driven approach ensures measurable improvements in 
                  efficiency and user experience.
                </p>
              </CardContent>
            </Card>

            {/* CTA Section */}
            <div className="text-center">
              <Button asChild size="lg" className="glow-effect hover:scale-105 transition-all duration-300">
                <Link href="/product#waitlist">
                  <span className="flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    Join the Waitlist
                  </span>
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
