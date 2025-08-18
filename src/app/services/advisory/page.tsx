import { Metadata } from 'next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Advisory Services | Chris Walker Consulting',
  description: 'Strategic guidance and ongoing support to help you make informed decisions and avoid common pitfalls.',
};

export default function AdvisoryPage() {
  return (
    <div className="min-h-screen business-gradient tech-grid">
      {/* Floating geometric elements */}
      <div className="absolute top-40 right-20 w-10 h-10 border border-primary/20 rounded-lg floating-element opacity-20"></div>
      <div className="absolute top-64 left-20 w-16 h-16 bg-primary/5 rounded-full floating-element" style={{animationDelay: '1.8s'}}></div>
      <div className="absolute bottom-52 left-2/3 w-8 h-8 border border-primary/15 rotate-45 floating-element" style={{animationDelay: '3.2s'}}></div>
      
      <section className="section-padding relative z-10">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            {/* Hero Section */}
            <div className="text-center mb-12">
              <h1 className="business-title text-4xl md:text-5xl mb-6">
                Advisory Services
              </h1>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Strategic guidance and ongoing support to help you make informed decisions and avoid common pitfalls.
              </p>
            </div>

            {/* What's Included Card */}
            <Card className="business-card mb-8 glow-effect hover:scale-[1.02] transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                    <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  What's Included
                </CardTitle>
                <CardDescription>
                  Strategic guidance and ongoing consultation services
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-primary/5 transition-colors">
                    <Badge variant="outline" className="glow-effect">✓</Badge>
                    <span>Strategic Planning & Roadmapping</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-primary/5 transition-colors">
                    <Badge variant="outline" className="glow-effect">✓</Badge>
                    <span>Technical Architecture Review</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-primary/5 transition-colors">
                    <Badge variant="outline" className="glow-effect">✓</Badge>
                    <span>Risk Assessment & Mitigation</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-primary/5 transition-colors">
                    <Badge variant="outline" className="glow-effect">✓</Badge>
                    <span>Growth Strategy Development</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-primary/5 transition-colors">
                    <Badge variant="outline" className="glow-effect">✓</Badge>
                    <span>Technology Stack Recommendations</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-primary/5 transition-colors">
                    <Badge variant="outline" className="glow-effect">✓</Badge>
                    <span>Ongoing Consultation & Support</span>
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
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                  </div>
                  Our Process
                </CardTitle>
                <CardDescription>
                  Ongoing strategic partnership and consultation approach
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  As your strategic advisor, I provide ongoing guidance to help you 
                  navigate complex decisions and avoid costly mistakes. Regular check-ins 
                  ensure you stay on track toward your goals. Through continuous collaboration, 
                  we adapt strategies based on market changes and business evolution.
                </p>
              </CardContent>
            </Card>

            {/* CTA Section */}
            <div className="text-center">
              <Button asChild size="lg" className="glow-effect hover:scale-105 transition-all duration-300">
                <Link href="/contact">
                  <span className="flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                    Get Strategic Guidance
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
