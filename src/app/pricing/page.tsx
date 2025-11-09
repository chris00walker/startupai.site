'use client';

import * as React from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
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

type Role = 'founder' | 'consultant';

interface PricingTier {
  name: string;
  plan: string;
  roles: readonly Role[];
  price: string;
  period: string;
  description: string;
  badge: string;
  badgeVariant: 'default' | 'secondary';
  icon: React.ComponentType<{ className?: string }>;
  savings: string;
  timeValue: string;
  features: string[];
  cta: string;
  highlighted: boolean;
}

function PricingContent() {
  const searchParams = useSearchParams();
  const [hoveredCard, setHoveredCard] = React.useState<number | null>(null);
  const [selectedRole, setSelectedRole] = React.useState<Role>('founder');

  React.useEffect(() => {
    const roleParam = searchParams?.get('role');
    if (roleParam === 'consultant') {
      setSelectedRole('consultant');
    } else if (roleParam === 'founder') {
      setSelectedRole('founder');
    }
  }, [searchParams]);

  const pricingTiers: PricingTier[] = [
    {
      name: "Free Trial",
      plan: "trial",
      roles: ['founder', 'consultant'],
      price: "$0",
      period: "forever",
      description: "Test the core evidence experience and explore fit",
      badge: "Get Started",
      badgeVariant: "secondary" as const,
      icon: Lightbulb,
      savings: "No risk, no commitment",
      timeValue: "Perfect for founders exploring fit",
      features: [
        "Basic evidence collection and organization",
        "AI-powered insights on collected evidence",
        "Simple assumption tracking",
        "Export to common formats",
        "Community support and resources"
      ],
      cta: "Start Free",
      highlighted: false
    },
    {
      name: "Strategy Sprint",
      plan: "strategy-sprint",
      roles: ['founder'],
      price: "$1,500",
      period: "one-time",
      description: "Evidence-backed strategy canvases & DDD architecture in 1 week",
      badge: "Most Popular",
      badgeVariant: "default" as const,
      icon: Target,
      savings: "Save $2,250 vs traditional consulting",
      timeValue: "100% traceable to sources (citations + audit log)",
      features: [
        "Fit Report with Evidence Stamp + citations",
        "Value Proposition & Business Model with assumption→evidence chain",
        "Competitor analysis & MVP architecture",
        "API contracts & data flows; Testing Business Ideas roadmap",
        "Option to convert to Platform (credit $199 to first month)"
      ],
      cta: "Start Sprint",
      highlighted: true
    },
    {
      name: "Founder Platform",
      plan: "founder-platform",
      roles: ['founder'],
      price: "$199",
      period: "seat / month",
      description: "Your AI strategist for continuous iteration and validation",
      badge: "Best Value",
      badgeVariant: "secondary" as const,
      icon: Zap,
      savings: "Replaces $150+/mo in separate tools",
      timeValue: "Hard-gated: no pass to Feasibility/Viability without evidence",
      features: [
        "Includes: 100 Assumptions/mo + 50 Experiment Design credits/mo",
        "Premium routing: escalates only when needed (confidence-gated)",
        "Fit Dashboard metrics",
        "Notion/Miro export; GitHub integration",
        "Private-by-design; citations & confidence chips",
        "Overages: +100 assumptions $10 · +1 experiment credit $0.50",
      ],
      cta: "Start Subscription",
      highlighted: false
    },
    {
      name: "Agency Co-Pilot",
      plan: "agency-co-pilot",
      roles: ['consultant'],
      price: "$499",
      period: "seat / month (pooled usage)",
      description: "Embedded AI strategy consultant for agencies serving multiple clients",
      badge: "Enterprise",
      badgeVariant: "default" as const,
      icon: Rocket,
      savings: "Fraction of hiring junior developer ($8K+/mo)",
      timeValue: "White-label & client workspace management",
      features: [
        "Everything in Founder Platform",
        "Pooled usage: 200 Experiment Design credits / seat / mo",
        "Client workspace management & white-label",
        "Custom AI training on your IP; advanced DDD modeling tools",
        "Private cloud or on-prem; API for automation; audit export",
        "Dedicated success manager",
        "Overages: +1 experiment credit $0.30 (team-pooled)",
      ],
      cta: "Go Pro",
      highlighted: false
    }
  ];

  const filteredTiers = pricingTiers.filter(tier => tier.roles.includes(selectedRole));

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
      price: "$300+/month",
      timeline: "80+ hours/month",
      quality: "Siloed evidence",
      icon: Crown
    },
    {
      service: "Our AI Platform",
      price: "$1,500 one-time",
      timeline: "1 week",
      quality: "Traceable evidence",
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
          {/* Role Tabs */}
          <div className="flex justify-center mb-8">
            <Tabs value={selectedRole} onValueChange={(value) => setSelectedRole(value as Role)} className="w-full max-w-md">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="founder">
                  <Lightbulb className="h-4 w-4 mr-2" />
                  For Founders
                </TabsTrigger>
                <TabsTrigger value="consultant">
                  <Users className="h-4 w-4 mr-2" />
                  For Consultants
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {filteredTiers.map((tier, index) => {
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
                    <a href={`${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3001"}/signup?plan=${tier.plan}&role=${selectedRole}`}>
                      {tier.cta}
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </a>
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
                Yes, we offer flexible payment plans for projects over $50,000. Typically, we structure 
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
          </CardContent>
        </Card>
        </PageContainer>
      </section>
    </div>
  );
}

export default function PricingPage() {
  return (
    <React.Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading pricing...</p>
        </div>
      </div>
    }>
      <PricingContent />
    </React.Suspense>
  );
}
