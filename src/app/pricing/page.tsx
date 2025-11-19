'use client';

import * as React from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { PageContainer } from '@/components/ui/layout/page-container';
import {
  PageHeader,
  PageTitle,
  PageDescription,
} from '@/components/ui/layout/page-header';
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
  Sparkles,
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
  disabled?: boolean;
  disabledMessage?: string;
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
      name: 'Free Trial',
      plan: 'trial',
      roles: ['founder', 'consultant'],
      price: '$0',
      period: 'forever',
      description: 'Test the core evidence experience and explore fit',
      badge: 'Get Started',
      badgeVariant: 'secondary' as const,
      icon: Lightbulb,
      savings: 'No risk, no commitment',
      timeValue: 'Perfect for founders exploring fit',
      features: [
        'Basic evidence collection and organization',
        'AI-powered insights on collected evidence',
        'Simple assumption tracking',
        'Export to common formats',
        'Community support and resources',
      ],
      cta: 'Start Free',
      disabled: true,
      disabledMessage: 'Apply Below',
      highlighted: false,
    },
    {
      name: 'Strategy Sprint',
      plan: 'strategy-sprint',
      roles: ['founder', 'consultant'],
      price: '$1,500',
      period: 'one-time',
      description:
        'Evidence-backed strategy canvases & DDD architecture in 1 week',
      badge: 'Limited Beta - First 200 Only',
      badgeVariant: 'default' as const,
      icon: Target,
      savings: 'Save $7,164+ over 3 years (FREE Lifetime Platform Access)',
      timeValue:
        'First 200 only • Lifetime Founder Tier included ($199/mo value)',
      features: [
        '3 full validation cycles (test 3 ideas OR pivot 3x on one idea)',
        'Each cycle: Strategy + Build + Deploy + Test + Pivot analysis',
        'Real ad spend included (~$450-525 total across all cycles)',
        'Deployed MVP at live URL with analytics',
        '🎁 FREE Lifetime Founder Tier Upgrade (automatic after validation)',
        'All Founder Tier features forever - normally $199/mo',
        'Never pay subscription fees - only inference costs (~$20-50/mo)',
        'Priority support for beta users',
        'Beta feedback role (help shape product roadmap)',
      ],
      cta: 'Start Sprint',
      disabled: true,
      disabledMessage: 'Apply Below',
      highlighted: true,
    },
    {
      name: 'Founder Platform',
      plan: 'founder-platform',
      roles: ['founder'],
      price: '$199',
      period: 'seat / month',
      description: 'Your AI strategist for continuous iteration and validation',
      badge: 'Best Value',
      badgeVariant: 'secondary' as const,
      icon: Zap,
      savings: 'Replaces $150+/mo in separate tools',
      timeValue:
        'Hard-gated: no pass to Feasibility/Viability without evidence',
      features: [
        'Includes: 100 Assumptions/mo + 50 Experiment Design credits/mo',
        'Premium routing: escalates only when needed (confidence-gated)',
        'Fit Dashboard metrics',
        'Notion/Miro export; GitHub integration',
        'Private-by-design; citations & confidence chips',
        'Overages: +100 assumptions $10 · +1 experiment credit $0.50',
      ],
      cta: 'Start Subscription',
      highlighted: false,
      disabled: true,
      disabledMessage: 'Unlocked After Sprint',
    },
    {
      name: 'Agency Co-Pilot',
      plan: 'agency-co-pilot',
      roles: ['consultant'],
      price: '$499',
      period: 'seat / month (pooled usage)',
      description:
        'Embedded AI strategy consultant for agencies serving multiple clients',
      badge: 'Enterprise',
      badgeVariant: 'default' as const,
      icon: Rocket,
      savings: 'Fraction of hiring junior developer ($8K+/mo)',
      timeValue: 'White-label & client workspace management',
      features: [
        'Everything in Founder Platform',
        'Pooled usage: 200 Experiment Design credits / seat / mo',
        'Client workspace management & white-label',
        'Custom AI training on your IP; advanced DDD modeling tools',
        'Private cloud or on-prem; API for automation; audit export',
        'Dedicated success manager',
        'Overages: +1 experiment credit $0.30 (team-pooled)',
      ],
      cta: 'Go Pro',
      highlighted: false,
      disabled: true,
      disabledMessage: 'Unlocked After Sprint',
    },
  ];

  const filteredTiers = pricingTiers.filter((tier) =>
    tier.roles.includes(selectedRole)
  );

  // Helper function to get role-specific content for Sprint card
  const getSprintContent = (role: Role) => {
    if (role === 'consultant') {
      return {
        tierName: 'Agency Co-Pilot',
        savings: 'Save $17,964+ over 3 years (FREE Lifetime Agency Co-Pilot)',
        timeValue:
          'First 200 only • Lifetime Agency Co-Pilot included ($499/mo value)',
        savingsAmount: '$17,964+',
        monthlyValue: '$499/mo',
        features: [
          '3 full validation cycles (test 3 ideas OR pivot 3x on one idea)',
          'Each cycle: Strategy + Build + Deploy + Test + Pivot analysis',
          'Real ad spend included (~$450-525 total across all cycles)',
          'Deployed MVP at live URL with analytics',
          '🎁 FREE Lifetime Agency Co-Pilot Upgrade (automatic after validation)',
          'All Agency Co-Pilot features forever - normally $499/mo',
          'Never pay subscription fees - only inference costs (~$20-50/mo)',
          'Priority support + dedicated success manager for beta users',
          'Beta feedback role (help shape product roadmap)',
        ],
      };
    }
    // Default to founder
    return {
      tierName: 'Founder Tier',
      savings: 'Save $7,164+ over 3 years (FREE Lifetime Founder Tier)',
      timeValue:
        'First 200 only • Lifetime Founder Tier included ($199/mo value)',
      savingsAmount: '$7,164+',
      monthlyValue: '$199/mo',
      features: [
        '3 full validation cycles (test 3 ideas OR pivot 3x on one idea)',
        'Each cycle: Strategy + Build + Deploy + Test + Pivot analysis',
        'Real ad spend included (~$450-525 total across all cycles)',
        'Deployed MVP at live URL with analytics',
        '🎁 FREE Lifetime Founder Tier Upgrade (automatic after validation)',
        'All Founder Tier features forever - normally $199/mo',
        'Never pay subscription fees - only inference costs (~$20-50/mo)',
        'Priority support for beta users',
        'Beta feedback role (help shape product roadmap)',
      ],
    };
  };

  const comparisonData = [
    {
      service: 'Traditional Consultant',
      price: '$3,000-$10,000',
      timeline: '2-4 weeks',
      quality: 'Variable',
      icon: Users,
    },
    {
      service: 'DIY Tool Stack',
      price: '$300+/month',
      timeline: '80+ hours/month',
      quality: 'Siloed evidence',
      icon: Crown,
    },
    {
      service: 'Our AI Platform',
      price: '$1,500 one-time',
      timeline: '1 week',
      quality: 'Traceable evidence',
      icon: Sparkles,
    },
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

      {/* Beta Banner */}
      <PageContainer variant="wide" padding="sm" className="pt-4">
        <div className="bg-gradient-to-r from-green-500/20 to-blue-500/20 border border-green-500/30 rounded-lg p-4 text-center">
          <p className="text-sm md:text-base font-semibold text-foreground">
            🎯{' '}
            <span className="text-green-600 dark:text-green-400">
              Private Beta Launch:
            </span>{' '}
            First 200 Sprint customers get{' '}
            <span className="text-primary font-bold">
              FREE Lifetime Platform Access
            </span>{' '}
            (up to $17,964+ value over 3 years)
          </p>
        </div>
      </PageContainer>

      {/* Hero Section */}
      <section className="business-gradient relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5"></div>
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="gradient-blob absolute top-20 left-10 w-64 h-64 opacity-30"></div>
          <div
            className="gradient-blob absolute bottom-20 right-10 w-48 h-48 opacity-20"
            style={{ animationDelay: '2s' }}
          ></div>
        </div>
        <PageContainer variant="wide" padding="lg" className="relative z-10">
          <div className="text-center">
            <Badge variant="secondary" className="mb-4 glow-effect">
              <Sparkles className="mr-1 h-3 w-3" />
              Private Beta - Limited to 200 Spots
            </Badge>
            <PageHeader variant="centered">
              <PageTitle className="business-title text-4xl md:text-6xl mb-6">
                Join the Private Beta: Get Lifetime Platform Access
              </PageTitle>
              <PageDescription className="business-subtitle text-xl max-w-3xl mx-auto">
                First 200 Sprint customers get FREE Lifetime Platform access (up
                to $17,964+ value). Validate your startup idea with 3 full
                cycles, then scale forever without subscription fees.
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
            <Tabs
              value={selectedRole}
              onValueChange={(value) => setSelectedRole(value as Role)}
              className="w-full max-w-md"
            >
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
              const isOtherHovered =
                hoveredCard !== null && hoveredCard !== index;
              const shouldScale = tier.highlighted && hoveredCard === null;

              // Get role-specific content for Sprint card
              const sprintContent =
                tier.plan === 'strategy-sprint'
                  ? getSprintContent(selectedRole)
                  : null;
              const displaySavings = sprintContent
                ? sprintContent.savings
                : tier.savings;
              const displayTimeValue = sprintContent
                ? sprintContent.timeValue
                : tier.timeValue;
              const displayFeatures = sprintContent
                ? sprintContent.features
                : tier.features;

              return (
                <Card
                  key={index}
                  onMouseEnter={() => setHoveredCard(index)}
                  onMouseLeave={() => setHoveredCard(null)}
                  className={`business-card relative overflow-hidden transition-all duration-500 flex flex-col ${
                    tier.highlighted ? 'border-primary/30 shadow-2xl' : ''
                  } ${tier.disabled ? 'opacity-60 grayscale' : ''} ${
                    isHovered
                      ? 'scale-105 shadow-2xl ring-2 ring-primary/20'
                      : shouldScale
                        ? 'scale-105'
                        : isOtherHovered
                          ? 'scale-95 opacity-75'
                          : 'scale-100'
                  }`}
                >
                  {/* Disabled Overlay */}
                  {tier.disabled && (
                    <div className="absolute inset-0 bg-gray-900/60 backdrop-blur-[2px] z-10 rounded-lg flex items-center justify-center">
                      <div className="text-center p-6">
                        <p className="text-white font-bold text-lg mb-2">
                          {tier.disabledMessage}
                        </p>
                        <p className="text-gray-300 text-sm">
                          Available after Sprint completion
                        </p>
                      </div>
                    </div>
                  )}

                  <CardHeader className="text-center pb-4">
                    <div className="flex items-center justify-center gap-3 mb-4">
                      <div className="p-3 rounded-lg bg-primary/10 glow-effect">
                        <IconComponent className="h-6 w-6 text-primary" />
                      </div>
                      <Badge
                        variant={tier.badgeVariant}
                        className="glow-effect"
                      >
                        {tier.badge}
                      </Badge>
                    </div>

                    <CardTitle className="text-2xl business-title">
                      {tier.name}
                    </CardTitle>
                    <CardDescription className="text-base mt-2">
                      {tier.description}
                    </CardDescription>

                    <div className="mt-6">
                      <div className="text-4xl font-bold text-gradient">
                        {tier.price}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        per {tier.period}
                      </div>
                    </div>

                    {/* Value Proposition Cards */}
                    <div className="mt-4 space-y-2">
                      <div className="bg-green-500/10 p-2 rounded border border-green-500/20">
                        <p className="text-xs text-green-400 font-semibold">
                          💰 {displaySavings}
                        </p>
                      </div>
                      <div className="bg-blue-500/10 p-2 rounded border border-blue-500/20">
                        <p className="text-xs text-blue-400 font-semibold">
                          ⏱️ {displayTimeValue}
                        </p>
                      </div>
                    </div>

                    {/* FREE Platform Tier Callout for Sprint */}
                    {sprintContent && (
                      <div className="mt-4 p-3 rounded-lg bg-gradient-to-r from-green-500/20 to-blue-500/20 border border-green-500/30">
                        <p className="text-sm font-bold text-green-600 dark:text-green-400">
                          🎁 Includes FREE Lifetime {sprintContent.tierName}{' '}
                          Upgrade
                        </p>
                        <p className="text-xs text-green-600/80 dark:text-green-300/80 mt-1">
                          Never pay subscription fees •{' '}
                          {sprintContent.savingsAmount} saved over 3 years
                        </p>
                      </div>
                    )}
                  </CardHeader>

                  <CardContent className="space-y-4 flex-grow flex flex-col">
                    <ul className="space-y-3 flex-grow">
                      {displayFeatures.map((feature, featureIndex) => (
                        <li
                          key={featureIndex}
                          className="flex items-start gap-3"
                        >
                          <Check className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                          <span className="text-sm leading-relaxed">
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>

                    <Button
                      className={`w-full mt-6 glow-effect hover:scale-105 transition-all duration-300 ${
                        tier.highlighted ? 'bg-primary hover:bg-primary/90' : ''
                      }`}
                      disabled={tier.disabled}
                      asChild={!tier.disabled}
                    >
                      {!tier.disabled ? (
                        <a
                          href={`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3001'}/signup?plan=${tier.plan}&role=${selectedRole}`}
                        >
                          {tier.cta}
                          <ArrowRight className="h-4 w-4 ml-2" />
                        </a>
                      ) : (
                        <>
                          {tier.cta}
                          <ArrowRight className="h-4 w-4 ml-2" />
                        </>
                      )}
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
            <h2 className="business-title text-3xl md:text-4xl mb-4">
              Why Choose AI Over Traditional Methods?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              See how our AI-powered approach compares to traditional consulting
              and DIY solutions.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {comparisonData.map((item, index) => {
              const IconComponent = item.icon;
              const isOurs = item.service === 'Our AI Platform';
              return (
                <Card
                  key={index}
                  className={`business-card text-center transition-all duration-300 ${
                    isOurs
                      ? 'border-primary/50 bg-primary/5 scale-105'
                      : 'hover:scale-105'
                  }`}
                >
                  <CardHeader>
                    <div className="flex justify-center mb-4">
                      <div
                        className={`p-3 rounded-lg glow-effect ${
                          isOurs ? 'bg-primary/20' : 'bg-primary/10'
                        }`}
                      >
                        <IconComponent className="h-6 w-6 text-primary" />
                      </div>
                    </div>
                    <CardTitle
                      className={`text-lg ${isOurs ? 'text-primary' : ''}`}
                    >
                      {item.service}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Cost</p>
                      <p
                        className={`text-xl font-bold ${
                          isOurs ? 'text-primary' : 'text-gradient'
                        }`}
                      >
                        {item.price}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">
                        Timeline
                      </p>
                      <p className="font-semibold">{item.timeline}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">
                        Quality
                      </p>
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
            <h2 className="business-title text-3xl md:text-4xl mb-4">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="max-w-3xl mx-auto space-y-6">
            <Card className="business-card">
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-2">
                  What's a validation cycle?
                </h3>
                <p className="text-muted-foreground">
                  A 2-week validation cycle consists of Week 1 (Strategy + Build
                  + Deploy) and Week 2 (Test + Analyze + Pivot). You get
                  complete evidence on whether your idea works or how to pivot
                  based on real user data.
                </p>
              </CardContent>
            </Card>

            <Card className="business-card">
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-2">
                  Can I test 3 different ideas or pivot 3 times on one idea?
                </h3>
                <p className="text-muted-foreground">
                  Either! Use your 3 cycles to test 3 separate startup ideas OR
                  test one idea with up to 3 pivots based on real user data.
                  Total flexibility to find what works.
                </p>
              </CardContent>
            </Card>

            <Card className="business-card">
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-2">
                  What happens after I use my 3 cycles?
                </h3>
                <p className="text-muted-foreground">
                  You automatically get FREE lifetime platform access (Founder
                  Tier for founders, Agency Co-Pilot for consultants). Continue
                  building, testing, and scaling—pay only inference costs
                  (~$20-50/mo), never subscription fees. That's{' '}
                  <strong>$7,164-$17,964+ saved over 3 years</strong> depending
                  on your tier.
                </p>
              </CardContent>
            </Card>

            <Card className="business-card">
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-2">
                  What are inference costs?
                </h3>
                <p className="text-muted-foreground">
                  Actual cost of AI API calls (Claude, GPT-4, etc.) - typically
                  $20-50/month for active usage. We charge exactly what
                  providers charge us, zero markup. No hidden fees, no
                  surprises.
                </p>
              </CardContent>
            </Card>

            <Card className="business-card">
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-2">
                  Will I ever have to pay monthly fees?
                </h3>
                <p className="text-muted-foreground">
                  Never. LTD customers are grandfathered with FREE platform tier
                  for life (Founder Tier or Agency Co-Pilot depending on your
                  role). You only pay actual AI inference costs. No subscription
                  fees—that's{' '}
                  <strong>$7,164-$17,964+ saved over 3 years</strong>.
                </p>
              </CardContent>
            </Card>

            <Card className="business-card">
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-2">When does beta start?</h3>
                <p className="text-muted-foreground">
                  Rolling beta starts Q1 2026. First 200 spots total, released
                  in phases of 50. Apply now to secure your spot in the first
                  cohort and lock in lifetime benefits.
                </p>
              </CardContent>
            </Card>

            <Card className="business-card">
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-2">
                  What's included in the Free Trial?
                </h3>
                <p className="text-muted-foreground">
                  Free Trial gives you access to onboarding, initial value
                  proposition creation, and lets you explore the AI and UI. No
                  testing or deployment, but perfect to validate StartupAI's
                  desirability before committing to the Sprint LTD.
                </p>
              </CardContent>
            </Card>

            <Card className="business-card">
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-2">
                  What if I'm not accepted into the beta?
                </h3>
                <p className="text-muted-foreground">
                  We're accepting the first 200 qualified applicants. If you
                  miss this round, you'll be added to our waitlist for future
                  cohorts. However, the lifetime deal is only available for the
                  first 200 beta participants.
                </p>
              </CardContent>
            </Card>

            <Card className="business-card">
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-2">
                  Is the $1,500 refundable?
                </h3>
                <p className="text-muted-foreground">
                  We offer a 30-day money-back guarantee. If you're not
                  satisfied after your first validation cycle, we'll provide a
                  full refund—no questions asked.
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
              <h2 className="business-title text-3xl md:text-4xl mb-4">
                Ready to Join the Beta?
              </h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Only 200 lifetime deal spots available. Join the private beta,
                validate your idea, and get FREE lifetime platform access worth
                up to $17,964+.
              </p>
              <Button size="lg" className="bg-primary text-white hover:bg-primary/90" asChild>
                <Link href="/beta">
                  Apply Now
                </Link>
              </Button>
            </CardContent>
          </Card>
        </PageContainer>
      </section>
    </div>
  );
}

export default function PricingPage() {
  return (
    <React.Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading pricing...</p>
          </div>
        </div>
      }
    >
      <PricingContent />
    </React.Suspense>
  );
}
