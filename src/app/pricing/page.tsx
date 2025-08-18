'use client';

import * as React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Check, 
  Zap,
  ArrowRight,
  Target,
  Rocket,
  Crown,
  Sparkles,
  Calendar,
  Users,
  TrendingUp
} from 'lucide-react';

export default function PricingPage() {
  const [hoveredCard, setHoveredCard] = React.useState<number | null>(null);

  const pricingTiers = [
    {
      name: "Strategy Sprint",
      price: "$750",
      period: "one-time",
      description: "AI-powered strategy development in 1 week - replaces $3K+ consultant fees",
      badge: "Most Popular",
      badgeVariant: "default" as const,
      icon: Target,
      savings: "Save $2,250 vs traditional consulting",
      timeValue: "20+ hours of founder time saved",
      features: [
        "AI-generated Business Model Canvas",
        "Value Proposition Canvas with validation",
        "Market research & competitive analysis",
        "Customer segment identification",
        "Assumptions list & testing roadmap",
        "Domain model architecture",
        "1-week delivery timeline",
        "Perfect for investor meetings"
      ],
      cta: "Start Sprint",
      highlighted: true
    },
    {
      name: "SaaS Subscription",
      price: "$99",
      period: "month",
      description: "Continuous AI strategy support - cheaper than your current tool stack",
      badge: "Best Value",
      badgeVariant: "secondary" as const,
      icon: Zap,
      savings: "Replaces $150+/mo in separate tools",
      timeValue: "Always-available AI strategists",
      features: [
        "Unlimited Strategy Sprints",
        "Multi-project management",
        "Continuous idea iteration",
        "Team collaboration features",
        "Export to popular formats",
        "Priority email support",
        "Monthly strategy reviews",
        "Cancel anytime"
      ],
      cta: "Start Subscription",
      highlighted: false
    },
    {
      name: "Pro & Enterprise",
      price: "$299",
      period: "month",
      description: "Advanced features for agencies and privacy-sensitive teams",
      badge: "Enterprise",
      badgeVariant: "outline" as const,
      icon: Rocket,
      savings: "Fraction of hiring junior developer ($8K+/mo)",
      timeValue: "Prevents costly architecture refactors",
      features: [
        "Everything in SaaS Subscription",
        "Private cloud deployment",
        "Custom AI agent training",
        "GitHub integration",
        "Advanced collaboration tools",
        "White-label options",
        "Dedicated support manager",
        "Custom integrations available"
      ],
      cta: "Go Pro",
      highlighted: false
    }
  ];

  const comparisonData = [
    {
      service: "Traditional Consultant",
      price: "$3,000-$10,000",
      timeline: "2-4 weeks",
      quality: "Variable",
      icon: Users
    },
    {
      service: "DIY Tool Stack",
      price: "$150+/month",
      timeline: "20-40 hours",
      quality: "Time-intensive",
      icon: Crown
    },
    {
      service: "Our AI Platform",
      price: "$750 one-time",
      timeline: "1 week",
      quality: "Consistent & Fast",
      icon: Sparkles
    }
  ];

  return (
    <div className="min-h-screen business-gradient">
      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 border border-primary/20 rounded-lg floating-element opacity-30"></div>
      <div className="absolute top-40 right-20 w-16 h-16 border border-secondary/20 rounded-full floating-element opacity-20" style={{animationDelay: '1s'}}></div>
      <div className="absolute bottom-40 left-20 w-12 h-12 border border-accent/20 rounded-lg floating-element opacity-25" style={{animationDelay: '2s'}}></div>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-20">
        <div className="text-center space-y-6 max-w-4xl mx-auto">
          <h1 className="business-title text-4xl md:text-6xl mb-6">
            Invest in Your <span className="text-gradient">Success</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            AI-powered strategy development at a fraction of traditional consulting costs. 
            Save thousands while getting faster, data-driven results.
          </p>
        </div>
      </section>

      {/* Pricing Tiers */}
      <section className="container mx-auto px-6 py-16">
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {pricingTiers.map((tier, index) => {
            const IconComponent = tier.icon;
            const isHovered = hoveredCard === index;
            const isOtherHovered = hoveredCard !== null && hoveredCard !== index;
            const shouldScale = tier.highlighted && hoveredCard === null;
            
            return (
              <Card 
                key={index}
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
                className={`business-card relative overflow-hidden transition-all duration-500 ${
                  tier.highlighted 
                    ? 'border-primary/30 shadow-2xl' 
                    : ''
                } ${
                  isHovered 
                    ? 'scale-105 shadow-2xl ring-2 ring-primary/20' 
                    : shouldScale 
                      ? 'scale-105' 
                      : isOtherHovered 
                        ? 'scale-95 opacity-75' 
                        : 'scale-100'
                }`}
              >
                
                <CardHeader className="text-center pb-4">
                  <div className="flex items-center justify-center gap-3 mb-4">
                    <div className="p-3 rounded-lg bg-primary/10 glow-effect">
                      <IconComponent className="h-6 w-6 text-primary" />
                    </div>
                    <Badge variant={tier.badgeVariant} className="glow-effect">
                      {tier.badge}
                    </Badge>
                  </div>
                  
                  <CardTitle className="text-2xl business-title">{tier.name}</CardTitle>
                  <CardDescription className="text-base mt-2">
                    {tier.description}
                  </CardDescription>
                  
                  <div className="mt-6">
                    <div className="text-4xl font-bold text-gradient">{tier.price}</div>
                    <div className="text-sm text-muted-foreground">per {tier.period}</div>
                  </div>
                  
                  {/* Value Proposition Cards */}
                  <div className="mt-4 space-y-2">
                    <div className="bg-green-500/10 p-2 rounded border border-green-500/20">
                      <p className="text-xs text-green-400 font-semibold">
                        💰 {tier.savings}
                      </p>
                    </div>
                    <div className="bg-blue-500/10 p-2 rounded border border-blue-500/20">
                      <p className="text-xs text-blue-400 font-semibold">
                        ⏱️ {tier.timeValue}
                      </p>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <ul className="space-y-3">
                    {tier.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start gap-3">
                        <Check className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                        <span className="text-sm leading-relaxed">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Button 
                    className={`w-full mt-6 glow-effect hover:scale-105 transition-all duration-300 ${
                      tier.highlighted ? 'bg-primary hover:bg-primary/90' : ''
                    }`} 
                    asChild
                  >
                    <Link href="/signup">
                      {tier.cta}
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Cost Comparison Section */}
      <section className="container mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="business-title text-3xl md:text-4xl mb-4">Why Choose AI Over Traditional Methods?</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            See how our AI-powered approach compares to traditional consulting and DIY solutions.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {comparisonData.map((item, index) => {
            const IconComponent = item.icon;
            const isOurs = item.service === "Our AI Platform";
            return (
              <Card key={index} className={`business-card text-center transition-all duration-300 ${
                isOurs ? 'border-primary/50 bg-primary/5 scale-105' : 'hover:scale-105'
              }`}>
                <CardHeader>
                  <div className="flex justify-center mb-4">
                    <div className={`p-3 rounded-lg glow-effect ${
                      isOurs ? 'bg-primary/20' : 'bg-primary/10'
                    }`}>
                      <IconComponent className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                  <CardTitle className={`text-lg ${
                    isOurs ? 'text-primary' : ''
                  }`}>{item.service}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Cost</p>
                    <p className={`text-xl font-bold ${
                      isOurs ? 'text-primary' : 'text-gradient'
                    }`}>{item.price}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Timeline</p>
                    <p className="font-semibold">{item.timeline}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Quality</p>
                    <p className="font-semibold">{item.quality}</p>
                  </div>
                  {isOurs && (
                    <Badge className="w-full justify-center mt-4">
                      Best Value
                    </Badge>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="container mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="business-title text-3xl md:text-4xl mb-4">Frequently Asked Questions</h2>
        </div>
        
        <div className="max-w-3xl mx-auto space-y-6">
          <Card className="business-card">
            <CardContent className="pt-6">
              <h3 className="font-semibold mb-2">What's included in the Discovery phase?</h3>
              <p className="text-muted-foreground">
                The Discovery phase includes comprehensive market research, competitive analysis, 
                customer segment identification, and technical feasibility assessment. You'll receive 
                a detailed report with actionable recommendations for your next steps.
              </p>
            </CardContent>
          </Card>
          
          <Card className="business-card">
            <CardContent className="pt-6">
              <h3 className="font-semibold mb-2">Do you offer payment plans?</h3>
              <p className="text-muted-foreground">
                Yes, we offer flexible payment plans for projects over $5,000. Typically, we structure 
                payments as 50% upfront and 50% upon completion, with milestone-based payments for larger projects.
              </p>
            </CardContent>
          </Card>
          
          <Card className="business-card">
            <CardContent className="pt-6">
              <h3 className="font-semibold mb-2">What if I need custom requirements?</h3>
              <p className="text-muted-foreground">
                Every project is unique. These packages serve as starting points, and we're happy to 
                customize the scope and pricing based on your specific needs. Contact us for a personalized quote.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-6 py-20">
        <Card className="business-card bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20">
          <CardContent className="text-center py-12">
            <h2 className="business-title text-3xl md:text-4xl mb-4">Ready to Get Started?</h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Book a free 30-minute consultation to discuss your project and determine 
              the best approach for your business goals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="glow-effect hover:scale-105 transition-all duration-300" asChild>
                <Link href="/signup">
                  <Calendar className="h-4 w-4 mr-2" />
                  Book Free Consultation
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="hover:scale-105 transition-all duration-300" asChild>
                <Link href="/process">
                  Learn About Our Process
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
