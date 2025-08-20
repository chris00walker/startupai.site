'use client';

import * as React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { PageContainer } from '@/components/ui/layout/page-container';
import { PageHeader, PageTitle, PageDescription } from '@/components/ui/layout/page-header';
import { 
  Check, 
  Zap,
  ArrowRight,
  Target,
  Rocket,
  Users,
  Shield,
  TrendingUp,
  Clock,
  Lightbulb,
  Brain,
  Code,
  Crown,
  Sparkles
} from 'lucide-react';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

export default function PricingPage() {
  const [hoveredCard, setHoveredCard] = React.useState<number | null>(null);

  const pricingTiers = [
    {
      name: "Strategy Sprint",
      price: "$1,500",
      period: "one-time",
      description: "Evidence-backed strategy canvases & DDD architecture in 1 week",
      badge: "Most Popular",
      badgeVariant: "default" as const,
      icon: Target,
      savings: "Save $2,250 vs traditional consulting",
      timeValue: "20+ hours of founder time saved",
      features: [
        "Business Model Canvas with evidence chain",
        "Value Proposition Canvas with market data",
        "Competitive analysis of 40+ competitors",
        "Domain-Driven Design architecture",
        "Bounded contexts & entity models",
        "API contracts & data flows",
        "Testing Business Ideas roadmap",
        "100% traceable to data sources"
      ],
      cta: "Start Sprint",
      highlighted: true
    },
    {
      name: "Founder Platform",
      price: "$199",
      period: "month",
      description: "Your AI strategy consultant for continuous iteration and validation",
      badge: "Best Value",
      badgeVariant: "secondary" as const,
      icon: Zap,
      savings: "Replaces $150+/mo in separate tools",
      timeValue: "Always-available AI strategists",
      features: [
        "Unlimited Strategy Canvases",
        "Real-time market validation",
        "Code scaffolding from strategy",
        "Multi-project workspace",
        "Private-by-design architecture",
        "GitHub integration",
        "Export to Strategyzer formats",
        "Weekly office hours"
      ],
      cta: "Start Subscription",
      highlighted: false
    },
    {
      name: "Agency Co-Pilot",
      price: "$499",
      period: "month",
      description: "Embedded AI strategy consultant for agencies serving multiple clients",
      badge: "Enterprise",
      badgeVariant: "outline" as const,
      icon: Rocket,
      savings: "Fraction of hiring junior developer ($8K+/mo)",
      timeValue: "Prevents costly architecture refactors",
      features: [
        "Everything in Founder Platform",
        "White-label deployment",
        "Client workspace management",
        "Custom AI training on your IP",
        "Advanced DDD modeling tools",
        "Private cloud or on-premise",
        "API access for automation",
        "Dedicated success manager"
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
      price: "$1,500 one-time",
      timeline: "1 week",
      quality: "Consistent & Fast",
      icon: Sparkles
    }
  ];

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
              <BreadcrumbPage>Pricing</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </PageContainer>

      {/* Hero Section */}
      <section className="business-gradient relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5"></div>
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="gradient-blob absolute top-20 left-10 w-64 h-64 opacity-30"></div>
          <div className="gradient-blob absolute bottom-20 right-10 w-48 h-48 opacity-20" style={{animationDelay: '2s'}}></div>
        </div>
        <PageContainer variant="wide" padding="lg" className="relative z-10">
          <div className="text-center">
            <Badge variant="secondary" className="mb-4 glow-effect">
              <Sparkles className="mr-1 h-3 w-3" />
              Evidence-Based Pricing
            </Badge>
            <PageHeader variant="centered">
              <PageTitle className="business-title text-4xl md:text-6xl mb-6">
                From Idea to Production Without Breaking the Bank
              </PageTitle>
              <PageDescription className="business-subtitle text-xl max-w-3xl mx-auto">
                Get the strategy validation of a $10K consultant and the technical architecture of a senior developer—all powered by your AI strategy consultant.
              </PageDescription>
            </PageHeader>
          </div>
        </PageContainer>
      </section>

      {/* Pricing Tiers */}
      <section className="bg-gray-50 py-12">
        <PageContainer variant="wide">
          <div className="grid md:grid-cols-3 gap-8">
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
                className={`business-card relative overflow-hidden transition-all duration-500 flex flex-col ${
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
                
                <CardContent className="space-y-4 flex-grow flex flex-col">
                  <ul className="space-y-3 flex-grow">
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
                    <Link href="/product#waitlist">
                      {tier.cta}
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            );
          })}
          </div>
        </PageContainer>
      </section>

      {/* Cost Comparison Section */}
      <section className="bg-background py-12">
        <PageContainer variant="wide">
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
        </PageContainer>
      </section>

      {/* FAQ Section */}
      <section className="bg-gray-50 py-12">
        <PageContainer variant="narrow">
          <div className="text-center mb-12">
          <h2 className="business-title text-3xl md:text-4xl mb-4">Frequently Asked Questions</h2>
        </div>
        
        <div className="max-w-3xl mx-auto space-y-6">
          <Card className="business-card">
            <CardContent className="pt-6">
              <h3 className="font-semibold mb-2">What's included in the Discovery phase?</h3>
              <p className="text-muted-foreground">
                The Discovery phase includes comprehensive market research, competitive analysis, 
                customer segment identification, and desirability assessment. You'll receive 
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
        </PageContainer>
      </section>

      {/* CTA Section */}
      <section className="bg-background py-12">
        <PageContainer variant="centered">
        <Card className="business-card bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20">
          <CardContent className="text-center py-12">
            <h2 className="business-title text-3xl md:text-4xl mb-4">Ready to Get Started?</h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Limited spots available for our Q4 2025 pilot program. Secure your spot now!
            </p>
            <div className="flex justify-center">
              <Button size="lg" className="hover:scale-105 transition-all duration-300" asChild>
                <Link href="/product#waitlist">
                  <Target className="h-4 w-4 mr-2" />
                  Join the Waitlist
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
        </PageContainer>
      </section>
    </div>
  );
}
