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
    <div className="min-h-screen business-gradient tech-grid">
      {/* Floating geometric elements */}
      <div className="absolute top-40 right-20 w-10 h-10 border border-primary/20 rounded-lg floating-element opacity-20"></div>
      <div className="absolute top-64 left-20 w-16 h-16 bg-primary/5 rounded-full floating-element" style={{animationDelay: '1.8s'}}></div>
      <div className="absolute bottom-52 left-2/3 w-8 h-8 border border-primary/15 rotate-45 floating-element" style={{animationDelay: '3.2s'}}></div>
      
      {/* Breadcrumb Navigation */}
      <div className="container mx-auto px-4 pt-6 relative z-10">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/">Home</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/services">Services</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Advisory</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      
      <section className="section-padding relative z-10">
        <div className="container">
          <div className="max-w-5xl mx-auto">
            {/* Hero Section */}
            <section className="business-gradient text-foreground py-16 md:py-24 relative overflow-hidden">
              {/* Sophisticated background graphics */}
              <div className="absolute inset-0 bg-[url('/graphics/data-flow.svg')] bg-cover bg-center opacity-20"></div>
              <div className="absolute left-0 top-1/4 w-[400px] h-[400px] bg-gradient-to-r from-primary/10 to-transparent rounded-full blur-3xl"></div>
              <div className="text-center mb-12">
                <Badge className="mb-4" variant="secondary">
                  <Sparkles className="w-3 h-3 mr-1" />
                  AI Strategy Sprint
                </Badge>
                <h1 className="business-title text-4xl md:text-5xl mb-6">
                  AI-Powered Advisory Services
                </h1>
                <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
                  Transform your startup with evidence-based AI strategy sprints. Get from idea to validated 
                  business model in days, not months—with 82.6% demand score validation.
                </p>
              </div>
            </section>

            {/* Value Comparison Card */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>The AI Strategy Sprint Advantage</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="space-y-4">
                    <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-900/50">
                      <p className="text-sm text-muted-foreground mb-1">Freelance BMC</p>
                      <p className="text-2xl font-bold text-orange-600">$300-1,000</p>
                      <p className="text-xs text-muted-foreground">No validation included</p>
                    </div>
                    <div className="p-4 rounded-lg bg-primary/10 border-2 border-primary">
                      <p className="text-sm font-medium mb-1">AI Strategy Sprint</p>
                      <p className="text-2xl font-bold text-primary">$1,500</p>
                      <p className="text-xs font-medium">1 week, evidence-backed</p>
                    </div>
                  </div>
                  <div className="p-4 rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800">
                    <p className="text-sm font-medium flex items-center gap-2">
                      <Lightbulb className="w-4 h-4 text-green-600" />
                      Why we're 80% cheaper: Multi-agent AI orchestration automates research & validation
                    </p>
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

            {/* Trust Signals */}
            <div className="grid md:grid-cols-3 gap-4 mb-8">
              {[
                { icon: Users, value: "5,000+", label: "Entrepreneurs Served", index: 3 },
                { icon: Target, value: "82.6%", label: "Demand Score", index: 4 },
                { icon: Clock, value: "7 Days", label: "Average Delivery", index: 5 }
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
                <p className="text-sm text-muted-foreground mb-2">Limited spots available for Q1 2024</p>
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
          </div>
        </div>
      </section>
    </div>
  );
}
