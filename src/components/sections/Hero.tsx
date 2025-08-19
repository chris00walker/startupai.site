import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export function Hero() {
  return (
    <section className="business-gradient text-foreground py-16 md:py-24 relative overflow-hidden tech-grid">
      <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-10"></div>
      
      {/* Floating geometric elements */}
      <div className="absolute top-20 left-10 w-20 h-20 border border-primary/20 rounded-lg floating-element opacity-30"></div>
      <div className="absolute top-40 right-20 w-16 h-16 bg-primary/5 rounded-full floating-element" style={{animationDelay: '2s'}}></div>
      <div className="absolute bottom-32 left-1/4 w-12 h-12 border border-primary/15 rotate-45 floating-element" style={{animationDelay: '4s'}}></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            CWC Helps Early-Stage Digital Startups Discover, Validate, Scale and Optimize
            <span className="text-gradient relative inline-block">Business Models</span>
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            Using Strategyzer frameworks and data-driven MVPs to launch faster and
            smarter.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button asChild size="lg" className="glow-effect hover:scale-105 transition-all duration-300">
              <Link href="/services">
                <span className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                  Explore Services
                </span>
              </Link>
            </Button>
            
            <Button asChild variant="outline" size="lg" className="border-gradient hover:scale-105 transition-all duration-300">
              <Link href="/contact">
                <span className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Schedule Consultation
                </span>
              </Link>
            </Button>
          </div>
          
          <div className="mt-12 flex justify-center space-x-8 text-sm text-muted-foreground">
            <div className="flex items-center">
              <Badge variant="outline" className="border-primary/30 text-primary mr-2">
                ✓
              </Badge>
              Custom Development
            </div>
            <div className="flex items-center">
              <Badge variant="outline" className="border-primary/30 text-primary mr-2">
                ✓
              </Badge>
              Strategic Guidance
            </div>
            <div className="flex items-center">
              <Badge variant="outline" className="border-primary/30 text-primary mr-2">
                ✓
              </Badge>
              Proven Results
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
