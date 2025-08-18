import { Metadata } from 'next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Process | Chris Walker Consulting',
  description: 'Learn about the proven methodology and process used for eCommerce strategy and development projects.',
};

export default function ProcessPage() {
  return (
    <div className="min-h-screen business-gradient tech-grid">
      {/* Floating geometric elements */}
      <div className="absolute top-20 right-24 w-20 h-20 border border-primary/20 rounded-lg floating-element opacity-20"></div>
      <div className="absolute top-72 left-8 w-16 h-16 bg-primary/5 rounded-full floating-element" style={{animationDelay: '2s'}}></div>
      <div className="absolute bottom-32 right-1/3 w-12 h-12 border border-primary/15 rotate-45 floating-element" style={{animationDelay: '4s'}}></div>
      <div className="absolute top-96 right-12 w-8 h-8 bg-primary/10 rounded-lg floating-element" style={{animationDelay: '1s'}}></div>
      
      <section className="section-padding relative z-10">
        <div className="container">
          <div className="max-w-6xl mx-auto">
            {/* Hero Section */}
            <div className="text-center mb-16">
              <h1 className="business-title text-4xl md:text-6xl mb-6 text-gradient">
                Proven Process for
                <br />
                <span className="text-primary">Startup Success</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
                A systematic approach that transforms ideas into thriving digital platforms, 
                from strategic discovery through scalable implementation and continuous optimization.
              </p>
              <div className="flex items-center justify-center gap-4 mt-8">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span>4-Phase Framework</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <div className="w-2 h-2 bg-secondary rounded-full"></div>
                  <span>Proven Results</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <div className="w-2 h-2 bg-accent rounded-full"></div>
                  <span>Scalable Solutions</span>
                </div>
              </div>
            </div>

            {/* Process Steps */}
            <div className="grid md:grid-cols-2 gap-8 mb-16">
              {/* Step 1: Discovery & Research */}
              <Link href="/services/discovery" className="block">
                <Card className="business-card glow-effect hover:scale-105 transition-all duration-500 relative overflow-hidden cursor-pointer">
                  <div className="absolute top-4 right-4">
                    <Badge variant="outline" className="text-foreground glow-effect font-bold">01</Badge>
                  </div>
                  <CardHeader>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                      </div>
                      <div>
                        <CardTitle className="text-2xl">Discovery & Research</CardTitle>
                        <CardDescription className="text-base">Foundation Phase</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      We start by understanding your business goals, target market, and competitive landscape. 
                      This phase includes stakeholder interviews, market research, and technical assessment.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="secondary" className="text-xs">Market Analysis</Badge>
                      <Badge variant="secondary" className="text-xs">Stakeholder Interviews</Badge>
                      <Badge variant="secondary" className="text-xs">Technical Assessment</Badge>
                    </div>
                  </CardContent>
                </Card>
              </Link>

              {/* Step 2: Strategy & Planning */}
              <Link href="/services/validation" className="block">
                <Card className="business-card glow-effect hover:scale-105 transition-all duration-500 relative overflow-hidden cursor-pointer">
                  <div className="absolute top-4 right-4">
                    <Badge variant="outline" className="glow-effect font-bold">02</Badge>
                  </div>
                  <CardHeader>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                        </svg>
                      </div>
                      <div>
                        <CardTitle className="text-2xl">Strategy & Planning</CardTitle>
                        <CardDescription className="text-base">Blueprint Phase</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      Based on our findings, we develop a comprehensive strategy and roadmap. 
                      This includes technical architecture, feature prioritization, and timeline planning.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="secondary" className="text-xs">Architecture Design</Badge>
                      <Badge variant="secondary" className="text-xs">Feature Planning</Badge>
                      <Badge variant="secondary" className="text-xs">Timeline Roadmap</Badge>
                    </div>
                  </CardContent>
                </Card>
              </Link>

              {/* Step 3: Implementation & Testing */}
              <Link href="/services/scaling" className="block">
                <Card className="business-card glow-effect hover:scale-105 transition-all duration-500 relative overflow-hidden cursor-pointer">
                  <div className="absolute top-4 right-4">
                    <Badge variant="outline" className="glow-effect font-bold">03</Badge>
                  </div>
                  <CardHeader>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg">
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                        </svg>
                      </div>
                      <div>
                        <CardTitle className="text-2xl">Implementation & Testing</CardTitle>
                        <CardDescription className="text-base">Development Phase</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      We build and test solutions iteratively, ensuring quality and performance at every step. 
                      Regular check-ins keep you informed of progress and allow for adjustments.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="secondary" className="text-xs">Iterative Development</Badge>
                      <Badge variant="secondary" className="text-xs">Quality Testing</Badge>
                      <Badge variant="secondary" className="text-xs">Progress Updates</Badge>
                    </div>
                  </CardContent>
                </Card>
              </Link>

              {/* Step 4: Launch & Optimization */}
              <Link href="/services/optimization" className="block">
                <Card className="business-card glow-effect hover:scale-105 transition-all duration-500 relative overflow-hidden cursor-pointer">
                  <div className="absolute top-4 right-4">
                    <Badge variant="outline" className="glow-effect font-bold">04</Badge>
                  </div>
                  <CardHeader>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg">
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                      </div>
                      <div>
                        <CardTitle className="text-2xl">Launch & Optimization</CardTitle>
                        <CardDescription className="text-base">Growth Phase</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      After launch, we monitor performance and make data-driven optimizations. 
                      Ongoing support ensures your platform continues to meet evolving business needs.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="secondary" className="text-xs">Performance Monitoring</Badge>
                      <Badge variant="secondary" className="text-xs">Data Analysis</Badge>
                      <Badge variant="secondary" className="text-xs">Ongoing Support</Badge>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </div>

            {/* CTA Section */}
            <div className="text-center bg-gradient-to-r from-primary/5 to-secondary/5 rounded-2xl p-8 border border-primary/10">
              <h2 className="text-3xl font-bold mb-4">Ready to Start Your Project?</h2>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Let's discuss how this proven process can help you achieve your eCommerce goals 
                and build a platform that drives real business results.
              </p>
              <Button asChild size="lg" className="glow-effect hover:scale-105 transition-all duration-300">
                <Link href="/contact">
                  <span className="flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    Start Your Project
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
