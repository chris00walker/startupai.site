import { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
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
  Sparkles
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Case Studies | Evidence-Based AI Strategy',
  description: 'See how our AI FDE-in-a-box transforms ideas into validated business models and production architectures. Real results from real founders.',
};

export default function CaseStudiesPage() {
  const caseStudies = [
    {
      title: "HealthTech SaaS Validation",
      category: "Healthcare",
      timeline: "5 days",
      savings: "$8,500",
      badge: "82.6% Demand Score",
      description: "From napkin idea to investor-ready strategy with validated market demand",
      challenge: "A solo founder needed to validate a telehealth platform idea before committing resources",
      solution: "Used AI FDE to generate evidence-backed canvases and DDD architecture in 5 days",
      results: [
        "Identified 3 underserved market segments worth $2.3M TAM",
        "Validated demand with 82.6/100 score based on 40+ data points",
        "Generated complete DDD architecture with bounded contexts",
        "Secured angel investment within 2 weeks of presentation"
      ],
      metrics: {
        timeToValidation: "5 days",
        costSaved: "$8,500",
        demandScore: "82.6/100",
        dataPoints: "40+"
      }
    },
    {
      title: "EdTech Platform Architecture",
      category: "Education",
      timeline: "1 week",
      savings: "$12,000",
      badge: "Privacy-First Design",
      description: "Complete strategy and technical architecture for K-12 learning platform",
      challenge: "Agency needed to deliver strategy and architecture for a client's EdTech vision",
      solution: "Leveraged AI FDE to create comprehensive business model with privacy-by-design architecture",
      results: [
        "Business Model Canvas with full evidence traceability",
        "GDPR-compliant architecture from day one",
        "API contracts and microservices design",
        "Client approved proposal without revisions"
      ],
      metrics: {
        timeToValidation: "7 days",
        costSaved: "$12,000",
        privacyCompliance: "100%",
        clientSatisfaction: "5/5"
      }
    },
    {
      title: "Marketplace Pivot Strategy",
      category: "eCommerce",
      timeline: "3 days",
      savings: "$5,200",
      badge: "Evidence-Based Pivot",
      description: "Data-driven pivot from B2C to B2B marketplace model",
      challenge: "Struggling B2C marketplace needed evidence to justify pivot to B2B model",
      solution: "AI FDE analyzed market data and generated pivot strategy with new architecture",
      results: [
        "Discovered B2B segment with 3x higher willingness to pay",
        "New Value Proposition Canvas validated with market data",
        "Migrated architecture design in 3 days",
        "Revenue increased 240% post-pivot"
      ],
      metrics: {
        timeToValidation: "3 days",
        costSaved: "$5,200",
        revenueIncrease: "240%",
        marketFit: "Strong"
      }
    }
  ];

  const evidenceMetrics = [
    {
      icon: Brain,
      title: "AI-Analyzed Data Points",
      value: "15,000+",
      description: "Market signals processed per project"
    },
    {
      icon: Clock,
      title: "Average Time to Strategy",
      value: "5 days",
      description: "From idea to validated model"
    },
    {
      icon: DollarSign,
      title: "Average Savings",
      value: "$8,500",
      description: "Versus traditional consulting"
    },
    {
      icon: CheckCircle,
      title: "Validation Success Rate",
      value: "94%",
      description: "Projects that secure funding"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="container mx-auto px-6 py-20">
        <div className="text-center space-y-6 max-w-4xl mx-auto">
          <Badge variant="secondary" className="mb-4">
            <ShieldCheck className="mr-1 h-3 w-3" />
            Evidence-Based Results
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold">
            Real Founders. Real Results.
            <br />
            <span className="text-gradient">100% Traceable to Data</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            See how our AI FDE-in-a-box transforms startup ideas into validated business models 
            and production-ready architectures—all backed by evidence you can trace.
          </p>
        </div>
      </section>

      {/* Metrics Grid */}
      <section className="container mx-auto px-6 py-16">
        <div className="grid md:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {evidenceMetrics.map((metric, index) => {
            const IconComponent = metric.icon;
            return (
              <Card key={index} className="text-center hover:scale-105 transition-all duration-300">
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
                  <p className="text-sm text-muted-foreground">{metric.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Case Studies */}
      <section className="container mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Success Stories</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Every strategy we generate is backed by real market data and evidence. 
            Here's how founders and agencies are using AI FDE to win.
          </p>
        </div>

        <div className="space-y-8 max-w-5xl mx-auto">
          {caseStudies.map((study, index) => (
            <Card key={index} className="overflow-hidden hover:shadow-lg transition-all duration-300">
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
                    <p className="text-sm text-muted-foreground">Completed in</p>
                    <p className="font-bold text-primary">{study.timeline}</p>
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
                      <li key={resultIndex} className="flex items-start gap-2">
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
      </section>

      {/* Evidence Section */}
      <section className="container mx-auto px-6 py-16">
        <Card className="bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20">
          <CardContent className="p-12">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Every Decision Backed by Evidence
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Unlike generic AI tools or templates, every strategy canvas we generate is 
                backed by real market data you can verify. No hallucinations. No guesswork. 
                Just evidence-based strategy.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mt-12">
              <div className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="p-4 rounded-full bg-primary/20">
                    <ShieldCheck className="h-8 w-8 text-primary" />
                  </div>
                </div>
                <h3 className="font-bold mb-2">100% Traceable</h3>
                <p className="text-sm text-muted-foreground">
                  Every insight links back to its source data. No black box AI.
                </p>
              </div>

              <div className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="p-4 rounded-full bg-primary/20">
                    <Brain className="h-8 w-8 text-primary" />
                  </div>
                </div>
                <h3 className="font-bold mb-2">40+ Data Points</h3>
                <p className="text-sm text-muted-foreground">
                  Each project analyzes competitors, markets, and trends comprehensively.
                </p>
              </div>

              <div className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="p-4 rounded-full bg-primary/20">
                    <Users className="h-8 w-8 text-primary" />
                  </div>
                </div>
                <h3 className="font-bold mb-2">Founder-Validated</h3>
                <p className="text-sm text-muted-foreground">
                  Built on feedback from 100+ founders and operators.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-6 py-20">
        <div className="text-center space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold">
            Ready to Build Your Evidence-Based Strategy?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Join innovative founders and agencies using AI FDE to validate ideas 
            and build production-ready architectures in days, not months.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <Button size="lg" className="hover:scale-105 transition-all duration-300" asChild>
              <Link href="/product#waitlist">
                <Sparkles className="h-4 w-4 mr-2" />
                Join the Waitlist
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="hover:scale-105 transition-all duration-300" asChild>
              <Link href="/ai-strategy">
                See How It Works
                <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
