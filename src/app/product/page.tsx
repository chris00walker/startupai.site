'use client';

import * as React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AIStrategySection } from '@/components/sections/AIStrategy';
import { PageContainer } from '@/components/ui/layout/page-container';
import { PageHeader, PageTitle, PageDescription } from '@/components/ui/layout/page-header';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { 
  Brain, 
  Code, 
  Users, 
  TrendingUp, 
  Zap,
  ArrowRight,
  CheckCircle,
  Target,
  Layers,
  Sparkles,
  Rocket,
  BarChart3,
  Shield
} from 'lucide-react';

export default function ProductPage() {
  const features = [
    {
      icon: Target,
      title: "StartupAI Platform",
      description: "Multi-agent AI system for generating professional business canvases and strategic frameworks.",
      badge: "AI Innovation",
      href: "/demo",
      cta: "Try Demo"
    },
    {
      icon: Brain,
      title: "AI Workflow Automation",
      description: "Custom multi-agent AI systems that automate complex business processes and decision-making workflows.",
      badge: "AI Automation",
      href: "/services/scaling",
      cta: "Learn More"
    },
    {
      icon: BarChart3,
      title: "Startup Analytics Platform",
      description: "AI-powered analytics that provide real-time insights into startup metrics, growth patterns, and market opportunities.",
      badge: "AI Analytics",
      href: "/services/optimization",
      cta: "Explore"
    },
    {
      icon: Rocket,
      title: "Digital Platform Development",
      description: "End-to-end development of scalable digital platforms optimized for startup growth and market validation.",
      badge: "AI Development",
      href: "/services/scaling",
      cta: "Get Started"
    }
  ];

  const stats = [
    { label: "Clear Strategy Delivery", value: "Minutes", icon: Brain },
    { label: "Setup Time Reduction", value: ">50%", icon: Zap },
    { label: "Specific Output Quality", value: "8/10", icon: Target },
    { label: "Evidence-Based Planning", value: "Validated", icon: CheckCircle }
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
              <BreadcrumbPage>Product</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </PageContainer>

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-background to-gray-50">
        <PageContainer variant="wide" padding="lg">
          <PageHeader variant="centered" className="mb-8">
            <PageTitle className="text-4xl md:text-6xl">
              Innovative AI-driven Solutions for{" "}
              <span className="text-gradient">Digital Business</span>
            </PageTitle>
            <PageDescription className="text-xl max-w-2xl mx-auto">
              From Ai-powered strategy development to digital platform optimization, 
              discover the cutting-edge multi-agent Ai workflows we've built to drive your startup' success.
            </PageDescription>
          </PageHeader>
        </PageContainer>
      </section>

      {/* Stats Section */}
      <section className="bg-gray-50">
        <PageContainer variant="wide" padding="lg">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <Card key={index} className="text-center hover:scale-105 transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex justify-center mb-2">
                      <div className="p-2 rounded-lg bg-primary/10">
                        <IconComponent className="h-6 w-6 text-primary" />
                      </div>
                    </div>
                    <div className="text-2xl font-bold text-gradient">{stat.value}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </PageContainer>
      </section>

      {/* AI Strategy Assistant Section */}
      <AIStrategySection />


      {/* Real User Pain Points */}
      <section className="bg-gray-50">
        <PageContainer variant="wide" padding="lg">
          <PageHeader variant="centered" className="mb-12">
            <PageTitle>What Founders Are Saying</PageTitle>
            <PageDescription className="max-w-2xl mx-auto">
              Real pain points and struggles from entrepreneurs seeking better strategy tools.
            </PageDescription>
          </PageHeader>
        <div className="grid md:grid-cols-3 gap-6">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                  <Brain className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-semibold">Startup Founder</p>
                  <p className="text-sm text-muted-foreground">Reddit Community</p>
                </div>
              </div>
              <p className="text-muted-foreground italic">
                "I'm overwhelmed with startup ideas and unsure how to validate them. 
                I need guided idea validation."
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                  <Target className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-semibold">AI Tool User</p>
                  <p className="text-sm text-muted-foreground">Product Review</p>
                </div>
              </div>
              <p className="text-muted-foreground italic">
                "ChatGPT business plans are too generic - you could swap 'pet portraiture' 
                with half a million other products and it would still sound good."
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                  <Zap className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-semibold">Entrepreneur</p>
                  <p className="text-sm text-muted-foreground">Market Research</p>
                </div>
              </div>
              <p className="text-muted-foreground italic">
                "Market research and experimentation is time-consuming and difficult 
                to do alone. I struggle without guidance."
              </p>
            </CardContent>
          </Card>
        </div>
        </PageContainer>
      </section>

      {/* Strategyzer AI Spotlight with Lead Capture */}
      <section className="bg-background">
        <PageContainer variant="wide" padding="lg">
          <Card className="bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20 overflow-hidden relative">
          <div className="absolute top-4 right-4 w-32 h-32 border border-primary/10 rounded-full opacity-20"></div>
          <CardContent className="py-12 relative z-10">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <Badge className="mb-4">
                  <Brain className="h-3 w-3 mr-1" />
                  Featured Product
                </Badge>
                <h3 className="text-2xl md:text-3xl font-bold mb-4">StartupAI Platform</h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  A revolutionary multi-agent AI system that generates professional business canvases, 
                  validates strategic ideas, and accelerates consulting workflows. Built with cutting-edge 
                  AI technology and proven startup framework methodologies.
                </p>
                <div className="bg-primary/10 p-6 rounded-lg mb-6 border border-primary/30 backdrop-blur-sm">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                      <Target className="h-4 w-4 text-primary" />
                    </div>
                    <p className="text-base font-bold text-foreground">Free Demo Access</p>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Get instant access to our live AI demo and see how multi-agent systems 
                    can transform your business strategy development.
                  </p>
                </div>
                <div className="flex justify-center">
                  <Button className="hover:scale-105 transition-all duration-300" asChild>
                    <Link href="#waitlist">
                      <Target className="h-4 w-4 mr-2" />
                      Join the Waitlist
                    </Link>
                  </Button>
                </div>
              </div>
              <div className="relative">
                <div className="aspect-video bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg border border-primary/20 flex items-center justify-center">
                  <div className="text-center">
                    <Brain className="h-16 w-16 text-primary mx-auto mb-4" />
                    <p className="text-sm text-muted-foreground">Multi-Agent AI Collaboration</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        </PageContainer>
      </section>

      {/* CTA Section - Consolidated with Clear Hierarchy */}
      <section className="bg-primary/5">
        <PageContainer variant="wide" padding="lg">
          <Card className="bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20">
            <CardContent className="text-center py-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Transform Your Startup with AI</h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Join successful startups that have accelerated their growth with our 
                multi-agent AI solutions. Start with a free consultation.
              </p>
              <div className="flex justify-center">
                <Button size="lg" className="hover:scale-105 transition-all duration-300" asChild>
                  <Link href="#waitlist">
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
