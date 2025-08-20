'use client';

import * as React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { PageContainer } from '@/components/ui/layout/page-container';
import { PageHeader, PageTitle, PageDescription } from '@/components/ui/layout/page-header';
import Link from 'next/link';
import { 
  Brain, 
  Shield, 
  Zap, 
  Target,
  TrendingUp,
  CheckCircle,
  Users,
  Lightbulb,
  Code,
  ArrowRight,
  Rocket,
  Clock,
  AlertTriangle,
  Sparkles
} from 'lucide-react';


export default function AdvisoryPage() {
  const [hoveredCard, setHoveredCard] = React.useState<number | null>(null);

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
              <BreadcrumbPage>Advisory</BreadcrumbPage>
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
          <div className="text-center max-w-5xl mx-auto">
            <Badge className="mb-4 glow-effect" variant="secondary">
              <Sparkles className="w-3 h-3 mr-1" />
              AI Strategy Sprint
            </Badge>
            <PageHeader variant="centered">
              <PageTitle className="business-title text-4xl md:text-6xl mb-6">
                AI-Powered Advisory Services
              </PageTitle>
              <PageDescription className="business-subtitle text-xl max-w-3xl mx-auto">
                Transform your startup with evidence-based AI strategy sprints. Get from idea to validated business model in days, not months—with comprehensive market validation and technical architecture.
              </PageDescription>
            </PageHeader>
          </div>
        </PageContainer>
      </section>

      {/* Main Content */}
      <section className="bg-gray-50">
        <PageContainer variant="narrow" padding="lg">

          {/* Value Comparison Card */}
          <Card className="mb-8">
              <CardHeader>
                <CardTitle>The AI Strategy Sprint Advantage</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="space-y-4 mb-6">
                    <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-900/50 flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Traditional Strategy Sprint</p>
                        <p className="text-xs text-muted-foreground">4-6 weeks delivery</p>
                      </div>
                      <p className="text-2xl font-bold text-orange-600">$4,500-7,500</p>
                    </div>
                    <div className="p-4 rounded-lg bg-primary/10 border-2 border-primary flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium">AI Strategy Sprint</p>
                        <p className="text-xs font-medium">1 week, evidence-backed</p>
                      </div>
                      <p className="text-2xl font-bold text-primary">$1,500</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="p-4 rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800">
                      <p className="text-sm font-medium flex items-center gap-2">
                        <Lightbulb className="w-4 h-4 text-green-600" />
                        Why we're 80% cheaper: Multi-agent AI orchestration automates research & validation
                      </p>
                    </div>
                    <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800">
                      <p className="text-sm font-medium flex items-center gap-2">
                        <Shield className="w-4 h-4 text-blue-600" />
                        Evidence-based outputs: Every recommendation backed by real market data & sources
                      </p>
                    </div>
                    <div className="p-4 rounded-lg bg-purple-50 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-800">
                      <p className="text-sm font-medium flex items-center gap-2">
                        <Code className="w-4 h-4 text-purple-600" />
                        Production-ready architecture: Domain models & APIs generated alongside strategy
                      </p>
                    </div>
                    <div className="p-4 rounded-lg bg-orange-50 dark:bg-orange-950/20 border border-orange-200 dark:border-orange-800">
                      <p className="text-sm font-medium flex items-center gap-2">
                        <Target className="w-4 h-4 text-orange-600" />
                        Validated demand scoring: 82.6% accuracy using weighted criteria & real user feedback
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
          </Card>

          {/* How It Works */}
          <Card 
              onMouseEnter={() => setHoveredCard(2)}
              onMouseLeave={() => setHoveredCard(null)}
              className={`business-card mb-8 glow-effect transition-all duration-500 ${
                hoveredCard === 2 
                  ? 'scale-105 shadow-2xl ring-2 ring-primary/20' 
                  : hoveredCard !== null 
                    ? 'scale-95 opacity-75' 
                    : 'scale-100'
              }`}
            >
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="w-5 h-5 text-primary" />
                  How AI Strategy Sprints Work
                </CardTitle>
                <CardDescription>
                  Forward Deployed Engineer model meets AI orchestration
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-sm font-bold text-primary">1</div>
                    <div>
                      <p className="font-medium">Share Your Idea (Private & Secure)</p>
                      <p className="text-sm text-muted-foreground">Your IP is protected with enterprise-grade privacy controls</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-sm font-bold text-primary">2</div>
                    <div>
                      <p className="font-medium">AI Agents Research & Validate</p>
                      <p className="text-sm text-muted-foreground">Multi-agent orchestration finds real market data & evidence</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-sm font-bold text-primary">3</div>
                    <div>
                      <p className="font-medium">Generate Strategy & Architecture</p>
                      <p className="text-sm text-muted-foreground">Get BMC, Value Proposition, and DDD technical design</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-sm font-bold text-primary">4</div>
                    <div>
                      <p className="font-medium">Iterate with Your AI Co-Pilot</p>
                      <p className="text-sm text-muted-foreground">Ongoing refinement based on feedback and market changes</p>
                    </div>
                  </div>
                </div>
              </CardContent>
          </Card>

          {/* Capability Highlights */}
          <div className="grid md:grid-cols-3 gap-4 mb-8">
              {[
                { icon: Brain, value: "AI-Powered", label: "Strategy Generation", index: 3 },
                { icon: Code, value: "DDD Ready", label: "Technical Architecture", index: 4 },
                { icon: Target, value: "Evidence-Based", label: "Market Validation", index: 5 }
              ].map((stat) => {
                const IconComponent = stat.icon;
                const isHovered = hoveredCard === stat.index;
                const isOtherHovered = hoveredCard !== null && hoveredCard !== stat.index;
                
                return (
                  <Card 
                    key={stat.index}
                    onMouseEnter={() => setHoveredCard(stat.index)}
                    onMouseLeave={() => setHoveredCard(null)}
                    className={`text-center p-4 transition-all duration-500 cursor-pointer ${
                      isHovered 
                        ? 'scale-110 shadow-2xl ring-2 ring-primary/20' 
                        : isOtherHovered 
                          ? 'scale-95 opacity-75' 
                          : 'scale-100'
                    }`}
                  >
                    <IconComponent className={`w-8 h-8 text-primary mx-auto mb-2 transition-all duration-300 ${
                      isHovered ? 'glow-effect scale-125' : ''
                    }`} />
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                  </Card>
                );
              })}
          </div>

          {/* CTA Section */}
          <div className="text-center">
              <div className="mb-4">
                <p className="text-sm text-muted-foreground mb-2">Limited spots available for Q4 2025</p>
                <p className="text-lg font-semibold">Transform your idea into a validated strategy in 1 week</p>
              </div>
              <Button asChild size="lg" className="glow-effect hover:scale-105 transition-all duration-300">
                <Link href="/product#waitlist">
                  <span className="flex items-center gap-2">
                    <Rocket className="w-5 h-5" />
                    Join the Waitlist
                  </span>
                </Link>
              </Button>
              <p className="text-xs text-muted-foreground mt-3">
                <Shield className="w-3 h-3 inline mr-1" />
                100% Private • Evidence-Based • Production-Ready
              </p>
          </div>
        </PageContainer>
      </section>
    </div>
  );
}
