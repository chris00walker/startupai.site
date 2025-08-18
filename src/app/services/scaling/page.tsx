import { Metadata } from 'next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Scaling Services | Chris Walker Consulting',
  description: 'Build robust systems and processes that support sustainable growth and operational excellence.',
};

export default function ScalingPage() {
  return (
    <div className="min-h-screen business-gradient tech-grid">
      {/* Floating geometric elements */}
      <div className="absolute top-28 right-32 w-18 h-18 border border-primary/20 rounded-lg floating-element opacity-20"></div>
      <div className="absolute top-60 left-8 w-6 h-6 bg-primary/5 rounded-full floating-element" style={{animationDelay: '4s'}}></div>
      <div className="absolute bottom-36 right-1/5 w-8 h-8 border border-primary/15 rotate-45 floating-element" style={{animationDelay: '1.5s'}}></div>
      
      <section className="section-padding relative z-10">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            {/* Hero Section */}
            <div className="text-center mb-12">
              <div className="flex items-center justify-center gap-2 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
                <Badge variant="secondary" className="glow-effect">Scaling Phase</Badge>
              </div>
              <h1 className="business-title text-4xl md:text-5xl mb-6">
                Scaling Services
              </h1>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Build robust systems and processes that support sustainable growth and operational excellence.
              </p>
            </div>

            {/* What's Included Card */}
            <Card className="business-card mb-8 glow-effect hover:scale-[1.02] transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                    <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                    </svg>
                  </div>
                  What's Included
                </CardTitle>
                <CardDescription>
                  Comprehensive scaling and growth infrastructure
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-primary/5 transition-colors">
                    <Badge variant="outline" className="glow-effect">✓</Badge>
                    <span>Infrastructure Scaling Strategy</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-primary/5 transition-colors">
                    <Badge variant="outline" className="glow-effect">✓</Badge>
                    <span>Process Optimization & Automation</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-primary/5 transition-colors">
                    <Badge variant="outline" className="glow-effect">✓</Badge>
                    <span>Team Building & Structure</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-primary/5 transition-colors">
                    <Badge variant="outline" className="glow-effect">✓</Badge>
                    <span>Performance Monitoring Systems</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-primary/5 transition-colors">
                    <Badge variant="outline" className="glow-effect">✓</Badge>
                    <span>Quality Assurance Frameworks</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-primary/5 transition-colors">
                    <Badge variant="outline" className="glow-effect">✓</Badge>
                    <span>Growth Planning & Forecasting</span>
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
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                  </div>
                  Our Process
                </CardTitle>
                <CardDescription>
                  Strategic approach to sustainable growth and scaling
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  Scaling requires careful planning and execution. We help you build 
                  systems that can handle increased load while maintaining quality and 
                  efficiency across all aspects of your business. Our systematic approach 
                  ensures sustainable growth without compromising operational excellence.
                </p>
              </CardContent>
            </Card>

            {/* CTA Section */}
            <div className="text-center">
              <Button asChild size="lg" className="glow-effect hover:scale-105 transition-all duration-300">
                <Link href="/contact">
                  <span className="flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                    Scale Your Business
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
