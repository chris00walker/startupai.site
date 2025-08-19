import { Metadata } from 'next';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckIcon, Brain, Sparkles, ShieldCheck, Zap, Target, Rocket } from 'lucide-react';

export const metadata: Metadata = {
  title: 'AI-Powered Services | Chris Walker Consulting',
  description: 'AI FDE-powered strategy development and technical architecture services. From idea validation to production deployment in days, not months.',
};

const serviceCategories = {
  strategy: [
    {
      name: 'AI Discovery Sprint',
      href: '/services/discovery',
      icon: Brain,
      badge: '82.6% Demand Score',
      description: 'AI-powered market validation and strategy development with evidence traceability.',
      features: ['40+ competitor analysis', 'Evidence-backed BMC & VPC', 'Market demand scoring', 'DDD architecture design'],
      duration: '5 days',
      deliverables: ['Business Model Canvas', 'Value Proposition Canvas', 'Demand Validation Report', 'Technical Architecture']
    },
    {
      name: 'AI Advisory Co-Pilot',
      href: '/services/advisory',
      icon: Target,
      badge: 'Always-On Support',
      description: 'Continuous AI-powered strategic guidance with private-by-design architecture.',
      features: ['Real-time strategy iteration', 'Architecture reviews', 'Market trend monitoring', 'Evidence-based pivots'],
      duration: 'Monthly',
      deliverables: ['Weekly Strategy Updates', 'Architecture Evolution', 'Market Intelligence', 'Pivot Recommendations']
    },
  ],
  development: [
    {
      name: 'Evidence-Based Validation',
      href: '/services/validation',
      icon: ShieldCheck,
      badge: '100% Traceable',
      description: 'Test assumptions with AI-analyzed market data before writing code.',
      features: ['Testing Business Ideas framework', 'Automated market monitoring', 'Evidence chain tracking', 'Pivot decision support'],
      duration: '1 week',
      deliverables: ['Validation Report', 'Evidence Database', 'Go/No-Go Recommendation', 'Pivot Options']
    },
    {
      name: 'AI-Powered Scaling',
      href: '/services/scaling',
      icon: Rocket,
      badge: 'Production-Ready',
      description: 'From validated idea to production architecture with AI-generated code scaffolding.',
      features: ['DDD to code generation', 'API contract design', 'Microservices architecture', 'CI/CD pipeline setup'],
      duration: '2 weeks',
      deliverables: ['Production Codebase', 'API Documentation', 'Deployment Pipeline', 'Monitoring Dashboard']
    },
  ],
  optimization: [
    {
      name: 'AI Optimization Engine',
      href: '/services/optimization',
      icon: Zap,
      badge: 'Continuous Improvement',
      description: 'AI-driven optimization of strategy, architecture, and market positioning.',
      features: ['Real-time market analysis', 'Architecture evolution', 'Automated A/B testing', 'Performance monitoring'],
      duration: 'Ongoing',
      deliverables: ['Monthly Optimization Report', 'Updated Canvases', 'Architecture Improvements', 'Growth Recommendations']
    },
  ],
};

export default function ServicesPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-100 section-padding">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="secondary" className="mb-4">
              <Sparkles className="mr-1 h-3 w-3" />
              AI-Powered Services
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Your AI FDE at Every Stage
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              From idea validation to production deployment, our AI-powered services deliver 
              evidence-backed strategies and architectures in days, not months.
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              <Badge variant="secondary">Evidence-Based</Badge>
              <Badge variant="secondary">Private-by-Design</Badge>
              <Badge variant="secondary">100% Traceable</Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Services Tabs */}
      <section className="section-padding">
        <div className="container">
          <div className="max-w-6xl mx-auto">
            <Tabs defaultValue="strategy" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="strategy">Strategy</TabsTrigger>
                <TabsTrigger value="development">Development</TabsTrigger>
                <TabsTrigger value="optimization">Optimization</TabsTrigger>
              </TabsList>

              <TabsContent value="strategy" className="mt-8">
                <div className="grid md:grid-cols-2 gap-6">
                  {serviceCategories.strategy.map((service) => (
                    <Card key={service.name} className="hover:shadow-lg transition-all duration-300">
                      <CardHeader>
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center gap-2">
                            {service.icon && <service.icon className="h-5 w-5 text-primary" />}
                            <CardTitle>{service.name}</CardTitle>
                          </div>
                          <div className="flex flex-col items-end gap-1">
                            {service.badge && <Badge variant="secondary" className="text-xs">{service.badge}</Badge>}
                            <Badge variant="outline">{service.duration}</Badge>
                          </div>
                        </div>
                        <CardDescription>{service.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <Accordion type="single" collapsible className="w-full">
                          <AccordionItem value="features">
                            <AccordionTrigger>Key Features</AccordionTrigger>
                            <AccordionContent>
                              <ul className="space-y-2">
                                {service.features.map((feature) => (
                                  <li key={feature} className="flex items-center text-sm">
                                    <CheckIcon className="w-4 h-4 text-primary mr-2" />
                                    {feature}
                                  </li>
                                ))}
                              </ul>
                            </AccordionContent>
                          </AccordionItem>
                          <AccordionItem value="deliverables">
                            <AccordionTrigger>Deliverables</AccordionTrigger>
                            <AccordionContent>
                              <ul className="space-y-2">
                                {service.deliverables.map((deliverable) => (
                                  <li key={deliverable} className="flex items-center text-sm">
                                    <CheckIcon className="w-4 h-4 text-primary mr-2" />
                                    {deliverable}
                                  </li>
                                ))}
                              </ul>
                            </AccordionContent>
                          </AccordionItem>
                        </Accordion>
                        <div className="mt-4">
                          <Button asChild>
                            <Link href={service.href}>Learn More</Link>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="development" className="mt-8">
                <div className="grid md:grid-cols-2 gap-6">
                  {serviceCategories.development.map((service) => (
                    <Card key={service.name} className="hover:shadow-lg transition-all duration-300">
                      <CardHeader>
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center gap-2">
                            {service.icon && <service.icon className="h-5 w-5 text-primary" />}
                            <CardTitle>{service.name}</CardTitle>
                          </div>
                          <div className="flex flex-col items-end gap-1">
                            {service.badge && <Badge variant="secondary" className="text-xs">{service.badge}</Badge>}
                            <Badge variant="outline">{service.duration}</Badge>
                          </div>
                        </div>
                        <CardDescription>{service.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <Accordion type="single" collapsible className="w-full">
                          <AccordionItem value="features">
                            <AccordionTrigger>Key Features</AccordionTrigger>
                            <AccordionContent>
                              <ul className="space-y-2">
                                {service.features.map((feature) => (
                                  <li key={feature} className="flex items-center text-sm">
                                    <CheckIcon className="w-4 h-4 text-primary mr-2" />
                                    {feature}
                                  </li>
                                ))}
                              </ul>
                            </AccordionContent>
                          </AccordionItem>
                          <AccordionItem value="deliverables">
                            <AccordionTrigger>Deliverables</AccordionTrigger>
                            <AccordionContent>
                              <ul className="space-y-2">
                                {service.deliverables.map((deliverable) => (
                                  <li key={deliverable} className="flex items-center text-sm">
                                    <CheckIcon className="w-4 h-4 text-primary mr-2" />
                                    {deliverable}
                                  </li>
                                ))}
                              </ul>
                            </AccordionContent>
                          </AccordionItem>
                        </Accordion>
                        <div className="mt-4">
                          <Button asChild>
                            <Link href={service.href}>Learn More</Link>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="optimization" className="mt-8">
                <div className="grid md:grid-cols-2 gap-6">
                  {serviceCategories.optimization.map((service) => (
                    <Card key={service.name} className="hover:shadow-lg transition-all duration-300">
                      <CardHeader>
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center gap-2">
                            {service.icon && <service.icon className="h-5 w-5 text-primary" />}
                            <CardTitle>{service.name}</CardTitle>
                          </div>
                          <div className="flex flex-col items-end gap-1">
                            {service.badge && <Badge variant="secondary" className="text-xs">{service.badge}</Badge>}
                            <Badge variant="outline">{service.duration}</Badge>
                          </div>
                        </div>
                        <CardDescription>{service.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <Accordion type="single" collapsible className="w-full">
                          <AccordionItem value="features">
                            <AccordionTrigger>Key Features</AccordionTrigger>
                            <AccordionContent>
                              <ul className="space-y-2">
                                {service.features.map((feature) => (
                                  <li key={feature} className="flex items-center text-sm">
                                    <CheckIcon className="w-4 h-4 text-primary mr-2" />
                                    {feature}
                                  </li>
                                ))}
                              </ul>
                            </AccordionContent>
                          </AccordionItem>
                          <AccordionItem value="deliverables">
                            <AccordionTrigger>Deliverables</AccordionTrigger>
                            <AccordionContent>
                              <ul className="space-y-2">
                                {service.deliverables.map((deliverable) => (
                                  <li key={deliverable} className="flex items-center text-sm">
                                    <CheckIcon className="w-4 h-4 text-primary mr-2" />
                                    {deliverable}
                                  </li>
                                ))}
                              </ul>
                            </AccordionContent>
                          </AccordionItem>
                        </Accordion>
                        <div className="mt-4">
                          <Button asChild>
                            <Link href={service.href}>Learn More</Link>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-900 section-padding">
        <div className="container">
          <div className="text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Let's discuss which services are right for your business.
            </p>
            <Button asChild size="lg">
              <Link href="/product#waitlist">Join the Waitlist</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
