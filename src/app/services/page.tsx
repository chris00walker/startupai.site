import { Metadata } from 'next';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckIcon } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Services | Chris Walker Consulting',
  description: 'Comprehensive eCommerce strategy and development services including discovery, validation, scaling, advisory, and optimization.',
};

const serviceCategories = {
  strategy: [
    {
      name: 'Discovery',
      href: '/services/discovery',
      description: 'Validate your business idea and identify market opportunities with comprehensive research and analysis.',
      features: ['Market Research', 'Competitive Analysis', 'Business Model Validation', 'Technical Feasibility'],
      duration: '2-4 weeks',
      deliverables: ['Market Analysis Report', 'Competitive Landscape', 'Business Model Canvas', 'Technical Roadmap']
    },
    {
      name: 'Advisory',
      href: '/services/advisory',
      description: 'Strategic guidance and ongoing support to help you make informed decisions and avoid common pitfalls.',
      features: ['Strategic Planning', 'Technical Architecture', 'Risk Assessment', 'Growth Strategy'],
      duration: 'Ongoing',
      deliverables: ['Strategic Recommendations', 'Architecture Guidelines', 'Risk Mitigation Plan', 'Growth Roadmap']
    },
  ],
  development: [
    {
      name: 'Validation',
      href: '/services/validation',
      description: 'Test your concepts with real customers and refine your approach based on data-driven insights.',
      features: ['MVP Development', 'User Testing', 'A/B Testing', 'Performance Analytics'],
      duration: '4-8 weeks',
      deliverables: ['MVP Platform', 'User Testing Results', 'Analytics Dashboard', 'Optimization Recommendations']
    },
    {
      name: 'Scaling',
      href: '/services/scaling',
      description: 'Build robust systems and processes that support sustainable growth and operational excellence.',
      features: ['Infrastructure Scaling', 'Process Optimization', 'Team Building', 'Performance Monitoring'],
      duration: '8-12 weeks',
      deliverables: ['Scalable Infrastructure', 'Optimized Processes', 'Team Structure', 'Monitoring Systems']
    },
  ],
  optimization: [
    {
      name: 'Optimization',
      href: '/services/optimization',
      description: 'Improve existing systems and processes to maximize efficiency, performance, and user experience.',
      features: ['Performance Tuning', 'UX Optimization', 'Conversion Rate Optimization', 'Cost Reduction'],
      duration: '6-10 weeks',
      deliverables: ['Performance Report', 'UX Improvements', 'Conversion Analysis', 'Cost Optimization Plan']
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
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              eCommerce Services
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Comprehensive strategy and development services to help your startup succeed in the competitive eCommerce landscape.
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              <Badge variant="secondary">Strategy</Badge>
              <Badge variant="secondary">Development</Badge>
              <Badge variant="secondary">Optimization</Badge>
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
                    <Card key={service.name}>
                      <CardHeader>
                        <CardTitle className="flex items-center justify-between">
                          {service.name}
                          <Badge variant="outline">{service.duration}</Badge>
                        </CardTitle>
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
                    <Card key={service.name}>
                      <CardHeader>
                        <CardTitle className="flex items-center justify-between">
                          {service.name}
                          <Badge variant="outline">{service.duration}</Badge>
                        </CardTitle>
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
                    <Card key={service.name}>
                      <CardHeader>
                        <CardTitle className="flex items-center justify-between">
                          {service.name}
                          <Badge variant="outline">{service.duration}</Badge>
                        </CardTitle>
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
              <Link href="/contact">Contact Me</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
