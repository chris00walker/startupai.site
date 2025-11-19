import { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { PageContainer } from '@/components/ui/layout/page-container';
import {
  PageHeader,
  PageTitle,
  PageDescription,
} from '@/components/ui/layout/page-header';
import {
  ArrowRight,
  TrendingUp,
  Users,
  Target,
  Zap,
  ShieldCheck,
  BarChart3,
  Brain,
  CheckCircle,
  Clock,
  DollarSign,
  Sparkles,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Case Studies | Evidence-Based AI Strategy',
  description:
    'See how our AI FDE-in-a-box transforms ideas into validated business models and production architectures. Real results from real founders.',
};

export default function CaseStudiesPage() {
  const caseStudies = [
    {
      title: 'HealthTech SaaS Validation',
      category: 'Healthcare',
      timeline: '5 days',
      savings: '$8,500',
      badge: '82.6% Demand Score',
      description:
        'From napkin idea to investor-ready strategy with validated market demand',
      challenge:
        'A solo founder needed to validate a telehealth platform idea before committing resources',
      solution:
        'Used AI FDE to generate evidence-backed canvases and DDD architecture in 5 days',
      results: [
        'Identified 3 underserved market segments worth $2.3M TAM',
        'Validated demand with 82.6/100 score based on 40+ data points',
        'Generated complete DDD architecture with bounded contexts',
        'Secured angel investment within 2 weeks of presentation',
      ],
      metrics: {
        timeToValidation: '5 days',
        costSaved: '$8,500',
        demandScore: '82.6/100',
        dataPoints: '40+',
      },
    },
    {
      title: 'EdTech Platform Architecture',
      category: 'Education',
      timeline: '1 week',
      savings: '$12,000',
      badge: 'Privacy-First Design',
      description:
        'Complete strategy and technical architecture for K-12 learning platform',
      challenge:
        "Agency needed to deliver strategy and architecture for a client's EdTech vision",
      solution:
        'Leveraged AI FDE to create comprehensive business model with privacy-by-design architecture',
      results: [
        'Business Model Canvas with full evidence traceability',
        'GDPR-compliant architecture from day one',
        'API contracts and microservices design',
        'Client approved proposal without revisions',
      ],
      metrics: {
        timeToValidation: '7 days',
        costSaved: '$12,000',
        privacyCompliance: '100%',
        clientSatisfaction: '5/5',
      },
    },
    {
      title: 'Marketplace Pivot Strategy',
      category: 'eCommerce',
      timeline: '3 days',
      savings: '$5,200',
      badge: 'Evidence-Based Pivot',
      description: 'Data-driven pivot from B2C to B2B marketplace model',
      challenge:
        'Struggling B2C marketplace needed evidence to justify pivot to B2B model',
      solution:
        'AI FDE analyzed market data and generated pivot strategy with new architecture',
      results: [
        'Discovered B2B segment with 3x higher willingness to pay',
        'New Value Proposition Canvas validated with market data',
        'Migrated architecture design in 3 days',
        'Revenue increased 240% post-pivot',
      ],
      metrics: {
        timeToValidation: '3 days',
        costSaved: '$5,200',
        revenueIncrease: '240%',
        marketFit: 'Strong',
      },
    },
  ];

  const evidenceMetrics = [
    {
      icon: Brain,
      title: 'AI-Analyzed Data Points',
      value: '15,000+',
      description: 'Market signals processed per project',
    },
    {
      icon: Clock,
      title: 'Average Time to Strategy',
      value: '5 days',
      description: 'From idea to validated model',
    },
    {
      icon: DollarSign,
      title: 'Average Savings',
      value: '$8,500',
      description: 'Versus traditional consulting',
    },
    {
      icon: CheckCircle,
      title: 'Validation Success Rate',
      value: '94%',
      description: 'Projects that secure funding',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-background to-gray-50 py-16">
        <PageContainer variant="wide" padding="lg">
          <PageHeader variant="centered" className="mb-12">
            <Badge variant="secondary" className="mb-4">
              <CheckCircle className="mr-1 h-3 w-3" />
              Evidence-Based Results
            </Badge>
            <PageTitle className="text-4xl md:text-5xl">
              Real Results from Real Founders
            </PageTitle>
            <PageDescription className="text-xl max-w-3xl mx-auto">
              See how our AI FDE-in-a-box transforms ideas into validated
              business models and production architectures. Every case study
              includes evidence chains, demand scores, and measurable outcomes.
            </PageDescription>
          </PageHeader>
        </PageContainer>
      </section>

      {/* Metrics Grid */}
      <section className="container mx-auto px-6 py-16">
        <div className="grid md:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {evidenceMetrics.map((metric, index) => {
            const IconComponent = metric.icon;
            return (
              <Card
                key={index}
                className="text-center hover:scale-105 transition-all duration-300"
              >
                <CardHeader className="pb-2">
                  <div className="flex justify-center mb-2">
                    <div className="p-3 rounded-lg bg-primary/10">
                      <IconComponent className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                  <CardTitle className="text-2xl font-bold text-gradient">
                    {metric.value}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="font-semibold mb-1">{metric.title}</p>
                  <p className="text-sm text-muted-foreground">
                    {metric.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Case Studies Grid */}
      <section className="py-16">
        <PageContainer variant="wide" padding="lg">
          <div className="space-y-12">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Success Stories
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Every strategy we generate is backed by real market data and
                evidence. Here's how founders and agencies are using AI FDE to
                win.
              </p>
            </div>

            <div className="space-y-8 max-w-5xl mx-auto">
              {caseStudies.map((study, index) => (
                <Card
                  key={index}
                  className="overflow-hidden hover:shadow-lg transition-all duration-300"
                >
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <Badge variant="outline">{study.category}</Badge>
                        <Badge variant="secondary">
                          <TrendingUp className="mr-1 h-3 w-3" />
                          {study.badge}
                        </Badge>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground">
                          Completed in
                        </p>
                        <p className="font-bold text-primary">
                          {study.timeline}
                        </p>
                      </div>
                    </div>
                    <CardTitle className="text-2xl">{study.title}</CardTitle>
                    <CardDescription className="text-base mt-2">
                      {study.description}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="space-y-6">
                    {/* Challenge */}
                    <div>
                      <h4 className="font-semibold mb-2 flex items-center gap-2">
                        <Target className="h-4 w-4 text-primary" />
                        Challenge
                      </h4>
                      <p className="text-muted-foreground">{study.challenge}</p>
                    </div>

                    {/* Solution */}
                    <div>
                      <h4 className="font-semibold mb-2 flex items-center gap-2">
                        <Zap className="h-4 w-4 text-primary" />
                        Solution
                      </h4>
                      <p className="text-muted-foreground">{study.solution}</p>
                    </div>

                    {/* Results */}
                    <div>
                      <h4 className="font-semibold mb-3 flex items-center gap-2">
                        <BarChart3 className="h-4 w-4 text-primary" />
                        Results
                      </h4>
                      <ul className="space-y-2">
                        {study.results.map((result, resultIndex) => (
                          <li
                            key={resultIndex}
                            className="flex items-start gap-2"
                          >
                            <CheckCircle className="h-4 w-4 text-green-500 mt-1 flex-shrink-0" />
                            <span className="text-sm">{result}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Metrics Bar */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t">
                      {Object.entries(study.metrics).map(([key, value]) => (
                        <div key={key} className="text-center">
                          <p className="text-sm text-muted-foreground capitalize">
                            {key.replace(/([A-Z])/g, ' $1').trim()}
                          </p>
                          <p className="font-bold text-primary">{value}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </PageContainer>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <PageContainer variant="wide" padding="lg">
          <PageHeader variant="centered" className="mb-8">
            <PageTitle className="text-primary-foreground">
              Ready to Transform Your Idea?
            </PageTitle>
            <PageDescription className="text-primary-foreground opacity-90">
              Join forward-thinking founders who validate first, build second
            </PageDescription>
          </PageHeader>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <Button
              variant="outline"
              size="lg"
              className="hover:scale-105 transition-all duration-300"
              asChild
            >
              <Link href="/ai-strategy">
                See How It Works
                <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </Button>
          </div>
        </PageContainer>
      </section>
    </div>
  );
}
