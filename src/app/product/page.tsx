'use client';

import * as React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AIStrategySection } from '@/components/sections/AIStrategy';
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
      title: "Strategyzer AI Platform",
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
    { label: "AI Solutions Deployed", value: "25+", icon: Brain },
    { label: "Startup Success Rate", value: "92%", icon: CheckCircle },
    { label: "Avg. Time to Market", value: "60%", icon: TrendingUp },
    { label: "Multi-Agent Systems", value: "15+", icon: Zap }
  ];


  return (
    <div className="min-h-screen business-gradient">
      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 border border-primary/20 rounded-lg floating-element opacity-30 pointer-events-none"></div>
      <div className="absolute top-40 right-20 w-16 h-16 border border-secondary/20 rounded-full floating-element opacity-20 pointer-events-none" style={{animationDelay: '1s'}}></div>
      <div className="absolute bottom-40 left-20 w-12 h-12 border border-accent/20 rounded-lg floating-element opacity-25 pointer-events-none" style={{animationDelay: '2s'}}></div>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-20">
        <div className="text-center space-y-6 max-w-4xl mx-auto">
          <h1 className="business-title text-4xl md:text-6xl mb-6">
            Innovative AI-driven Solutions for{" "}
            <span className="text-gradient">Digital Business</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            From Ai-powered strategy development to digital platform optimization, 
            discover the cutting-edge multi-agent Ai workflows we've built to drive your startup' success.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <Button size="lg" className="w-full sm:w-auto glow-effect hover:scale-105 transition-all duration-300" asChild>
              <Link href="/contact">
                <Brain className="h-4 w-4 mr-2" />
                Discuss Your Project
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="w-full sm:w-auto hover:scale-105 transition-all duration-300" asChild>
              <Link href="/process">
                View My Process
                <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <Card key={index} className="business-card text-center hover:scale-105 transition-all duration-300">
                <CardContent className="pt-6">
                  <div className="flex justify-center mb-2">
                    <div className="p-2 rounded-lg bg-primary/10 glow-effect">
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
      </section>

      {/* AI Strategy Assistant Section */}
      <AIStrategySection />

      {/* Featured Products Section */}
      <section className="container mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="business-title text-3xl md:text-4xl mb-4">Featured Products & Solutions</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Innovative products that combine cutting-edge technology with proven business methodologies 
            to deliver exceptional results for clients.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <Card key={index} className="business-card h-full hover:scale-105 transition-all duration-500 group cursor-pointer">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-3 rounded-lg bg-primary/10 glow-effect group-hover:bg-primary/20 transition-colors">
                      <IconComponent className="h-6 w-6 text-primary" />
                    </div>
                    <Badge variant="outline" className="text-xs glow-effect">
                      {feature.badge}
                    </Badge>
                  </div>
                  <CardTitle className="text-xl business-title">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col justify-between">
                  <CardDescription className="text-base leading-relaxed mb-4">
                    {feature.description}
                  </CardDescription>
                  <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-white transition-all duration-300" asChild>
                    <Link href={feature.href}>
                      {feature.cta}
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>


      {/* Client Testimonials */}
      <section className="container mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="business-title text-3xl md:text-4xl mb-4">What Clients Say</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Real results from startups and businesses that have transformed their operations with our AI solutions.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="business-card">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                  <Users className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-semibold">Sarah Chen</p>
                  <p className="text-sm text-muted-foreground">CEO, TechStart</p>
                </div>
              </div>
              <p className="text-muted-foreground italic">
                "The AI workflow automation reduced our strategy development time by 70%. 
                What used to take weeks now happens in days."
              </p>
            </CardContent>
          </Card>
          <Card className="business-card">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                  <Users className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-semibold">Marcus Rodriguez</p>
                  <p className="text-sm text-muted-foreground">Founder, DataFlow</p>
                </div>
              </div>
              <p className="text-muted-foreground italic">
                "The Strategyzer AI Platform helped us validate our business model 
                and secure Series A funding within 6 months."
              </p>
            </CardContent>
          </Card>
          <Card className="business-card">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                  <Users className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-semibold">Emily Watson</p>
                  <p className="text-sm text-muted-foreground">CTO, GrowthLab</p>
                </div>
              </div>
              <p className="text-muted-foreground italic">
                "Multi-agent AI systems transformed our customer analytics. 
                We now predict market trends with 85% accuracy."
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Strategyzer AI Spotlight with Lead Capture */}
      <section className="container mx-auto px-6 py-16">
        <Card className="business-card bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20 overflow-hidden relative">
          <div className="absolute top-4 right-4 w-32 h-32 border border-primary/10 rounded-full floating-element opacity-20"></div>
          <CardContent className="py-12 relative z-10">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <Badge className="mb-4 glow-effect">
                  <Brain className="h-3 w-3 mr-1" />
                  Featured Product
                </Badge>
                <h3 className="business-title text-2xl md:text-3xl mb-4">Strategyzer AI Platform</h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  A revolutionary multi-agent AI system that generates professional business canvases, 
                  validates strategic ideas, and accelerates consulting workflows. Built with cutting-edge 
                  AI technology and proven Strategyzer methodology.
                </p>
                <div className="bg-primary/10 p-6 rounded-lg mb-6 border border-primary/30 backdrop-blur-sm">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                      <Target className="h-4 w-4 text-primary" />
                    </div>
                    <p className="text-base font-bold text-white">Free Demo Access</p>
                  </div>
                  <p className="text-sm text-gray-200 leading-relaxed">
                    Get instant access to our live AI demo and see how multi-agent systems 
                    can transform your business strategy development.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button className="glow-effect hover:scale-105 transition-all duration-300" asChild>
                    <a href="http://127.0.0.1:45687/dashboard/?demo=true" target="_blank" rel="noopener noreferrer">
                      <Brain className="h-4 w-4 mr-2" />
                      Try Free Demo
                    </a>
                  </Button>
                  <Button variant="outline" className="hover:scale-105 transition-all duration-300" asChild>
                    <Link href="/contact">
                      <Target className="h-4 w-4 mr-2" />
                      Schedule Consultation
                    </Link>
                  </Button>
                </div>
              </div>
              <div className="relative">
                <div className="aspect-video bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg border border-primary/20 flex items-center justify-center">
                  <div className="text-center">
                    <Brain className="h-16 w-16 text-primary mx-auto mb-4 glow-effect" />
                    <p className="text-sm text-muted-foreground">Multi-Agent AI Collaboration</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* CTA Section - Consolidated with Clear Hierarchy */}
      <section className="container mx-auto px-6 py-20">
        <Card className="business-card bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20">
          <CardContent className="text-center py-12">
            <h2 className="business-title text-3xl md:text-4xl mb-4">Transform Your Startup with AI</h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join 25+ successful startups that have accelerated their growth with our 
              multi-agent AI solutions. Start with a free consultation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="glow-effect hover:scale-105 transition-all duration-300" asChild>
                <Link href="/contact">
                  <Brain className="h-4 w-4 mr-2" />
                  Get Free Consultation
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="hover:scale-105 transition-all duration-300" asChild>
                <a href="http://127.0.0.1:45687/dashboard/?demo=true" target="_blank" rel="noopener noreferrer">
                  <Target className="h-4 w-4 mr-2" />
                  Try AI Demo First
                </a>
              </Button>
            </div>
            <p className="text-sm text-muted-foreground mt-4">
              ✓ No commitment required • ✓ 30-minute strategy session • ✓ Custom AI roadmap
            </p>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
