/**
 * Services Overview Page
 *
 * @story US-MF06
 */

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  Search,
  Target,
  Zap,
  Code,
  Rocket,
  BarChart3,
  CheckIcon,
} from 'lucide-react';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

export default function ServicesPage() {
  const serviceCategories = {
    strategy: [
      {
        name: 'Discovery',
        description:
          'Validate your business idea and identify market opportunities with comprehensive research and analysis.',
        icon: Search,
        duration: '1-2 weeks',
        badge: 'Popular',
        features: [
          'Market research and competitive analysis',
          'Customer persona development',
          'Opportunity assessment',
          'Customer desirability validation',
        ],
        deliverables: [
          'Market Analysis Report',
          'Customer Persona Profiles',
          'Competitive Landscape Assessment',
          'Business Model Validation',
          'Customer Journey Mapping',
          'Risk Assessment & Mitigation',
        ],
        href: '/services/discovery',
      },
      {
        name: 'Validation',
        description:
          'Test your concepts with real customers and refine your approach based on data-driven insights.',
        icon: Target,
        duration: '2-3 weeks',
        badge: undefined,
        features: [
          'MVP development and testing',
          'Customer feedback collection',
          'Market validation experiments',
          'Product-market fit assessment',
        ],
        deliverables: [
          'MVP Prototype',
          'Customer Feedback Analysis',
          'Market Validation Report',
          'Product-Market Fit Score',
          'Iteration Recommendations',
          'Go-to-Market Strategy',
        ],
        href: '/services/validation',
      },
      {
        name: 'Advisory',
        description:
          'Get strategic guidance and expert advice to navigate complex business challenges and opportunities.',
        icon: Zap,
        duration: 'Ongoing',
        badge: 'Premium',
        features: [
          'Strategic planning and roadmapping',
          'Business model optimization',
          'Growth strategy development',
          'Executive coaching and mentoring',
        ],
        deliverables: [
          'Strategic Roadmap',
          'Business Model Canvas',
          'Growth Strategy Plan',
          'Performance Metrics Framework',
          'Monthly Advisory Sessions',
          'Quarterly Business Reviews',
        ],
        href: '/services/advisory',
      },
    ],
    development: [
      {
        name: 'Scaling',
        description:
          'Scale your validated concept into a robust, production-ready solution with advanced architecture.',
        icon: Rocket,
        duration: '4-8 weeks',
        badge: 'Technical',
        features: [
          'Scalable architecture design',
          'Performance optimization',
          'Infrastructure setup',
          'Team scaling guidance',
        ],
        deliverables: [
          'Production Architecture',
          'Scalability Assessment',
          'Performance Optimization Plan',
          'Infrastructure Setup',
          'Team Scaling Strategy',
          'Technical Documentation',
        ],
        href: '/services/scaling',
      },
    ],
    optimization: [
      {
        name: 'Optimization',
        description:
          'Continuously improve and optimize your existing solutions for better performance and results.',
        icon: BarChart3,
        duration: '2-4 weeks',
        badge: undefined,
        features: [
          'Performance analysis and tuning',
          'User experience optimization',
          'Conversion rate improvement',
          'Analytics and monitoring setup',
        ],
        deliverables: [
          'Performance Analysis Report',
          'UX Optimization Plan',
          'Conversion Rate Strategy',
          'Analytics Dashboard',
          'Monitoring Setup',
          'Optimization Roadmap',
        ],
        href: '/services/optimization',
      },
    ],
  };

  return (
    <div className="min-h-screen business-gradient">
      {/* Breadcrumb Navigation */}
      <div className="business-container pt-8">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/">Home</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Services</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <section className="section-padding">
        <div className="business-container">
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-4">
              Complete Service Portfolio
            </Badge>
            <h1 className="business-title text-4xl md:text-5xl mb-6">
              End-to-End Business Solutions
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              From initial discovery to scaled production, we provide
              comprehensive services to transform your ideas into successful
              businesses.
            </p>
          </div>

          <Tabs defaultValue="strategy" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="strategy">Strategy</TabsTrigger>
              <TabsTrigger value="development">Development</TabsTrigger>
              <TabsTrigger value="optimization">Optimization</TabsTrigger>
            </TabsList>

            <TabsContent value="strategy" className="mt-8">
              <div className="grid-professional-1-3 container-professional-lg">
                {serviceCategories.strategy.map((service) => (
                  <Card key={service.name} className="professional-card group">
                    <CardHeader>
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          {service.icon && (
                            <service.icon className="h-5 w-5 text-primary group-hover:scale-110 transition-transform" />
                          )}
                          <CardTitle className="group-hover:text-primary transition-colors">
                            {service.name}
                          </CardTitle>
                        </div>
                        <div className="flex flex-col items-end gap-1">
                          {service.badge && (
                            <Badge variant="secondary" className="text-xs">
                              {service.badge}
                            </Badge>
                          )}
                          <Badge variant="outline">{service.duration}</Badge>
                        </div>
                      </div>
                      <CardDescription>{service.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-1">
                      <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="features">
                          <AccordionTrigger>Key Features</AccordionTrigger>
                          <AccordionContent>
                            <ul className="space-y-2">
                              {service.features.map((feature) => (
                                <li
                                  key={feature}
                                  className="flex items-center text-sm"
                                >
                                  <CheckIcon className="w-4 h-4 text-primary mr-2 flex-shrink-0" />
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
                                <li
                                  key={deliverable}
                                  className="flex items-center text-sm"
                                >
                                  <CheckIcon className="w-4 h-4 text-primary mr-2 flex-shrink-0" />
                                  {deliverable}
                                </li>
                              ))}
                            </ul>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    </CardContent>
                    <CardFooter>
                      <Button
                        asChild
                        className="btn-card group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                      >
                        <Link href={service.href}>Learn More</Link>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="development" className="mt-8">
              <div className="grid-professional-1-2 container-professional-sm">
                {serviceCategories.development.map((service) => (
                  <Card key={service.name} className="professional-card group">
                    <CardHeader>
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          {service.icon && (
                            <service.icon className="h-5 w-5 text-primary group-hover:scale-110 transition-transform" />
                          )}
                          <CardTitle className="group-hover:text-primary transition-colors">
                            {service.name}
                          </CardTitle>
                        </div>
                        <div className="flex flex-col items-end gap-1">
                          {service.badge && (
                            <Badge variant="secondary" className="text-xs">
                              {service.badge}
                            </Badge>
                          )}
                          <Badge variant="outline">{service.duration}</Badge>
                        </div>
                      </div>
                      <CardDescription>{service.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-1">
                      <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="features">
                          <AccordionTrigger>Key Features</AccordionTrigger>
                          <AccordionContent>
                            <ul className="space-y-2">
                              {service.features.map((feature) => (
                                <li
                                  key={feature}
                                  className="flex items-center text-sm"
                                >
                                  <CheckIcon className="w-4 h-4 text-primary mr-2 flex-shrink-0" />
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
                                <li
                                  key={deliverable}
                                  className="flex items-center text-sm"
                                >
                                  <CheckIcon className="w-4 h-4 text-primary mr-2 flex-shrink-0" />
                                  {deliverable}
                                </li>
                              ))}
                            </ul>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    </CardContent>
                    <CardFooter>
                      <Button
                        asChild
                        className="btn-card group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                      >
                        <Link href={service.href}>Learn More</Link>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="optimization" className="mt-8">
              <div className="grid-professional-1-2 container-professional-sm">
                {serviceCategories.optimization.map((service) => (
                  <Card key={service.name} className="professional-card group">
                    <CardHeader>
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          {service.icon && (
                            <service.icon className="h-5 w-5 text-primary group-hover:scale-110 transition-transform" />
                          )}
                          <CardTitle className="group-hover:text-primary transition-colors">
                            {service.name}
                          </CardTitle>
                        </div>
                        <div className="flex flex-col items-end gap-1">
                          {service.badge && (
                            <Badge variant="secondary" className="text-xs">
                              {service.badge}
                            </Badge>
                          )}
                          <Badge variant="outline">{service.duration}</Badge>
                        </div>
                      </div>
                      <CardDescription>{service.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-1">
                      <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="features">
                          <AccordionTrigger>Key Features</AccordionTrigger>
                          <AccordionContent>
                            <ul className="space-y-2">
                              {service.features.map((feature) => (
                                <li
                                  key={feature}
                                  className="flex items-center text-sm"
                                >
                                  <CheckIcon className="w-4 h-4 text-primary mr-2 flex-shrink-0" />
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
                                <li
                                  key={deliverable}
                                  className="flex items-center text-sm"
                                >
                                  <CheckIcon className="w-4 h-4 text-primary mr-2 flex-shrink-0" />
                                  {deliverable}
                                </li>
                              ))}
                            </ul>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    </CardContent>
                    <CardFooter>
                      <Button
                        asChild
                        className="btn-card group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                      >
                        <Link href={service.href}>Learn More</Link>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>

          {/* Bottom CTA */}
          <div className="text-center mt-16">
            <Card className="max-w-2xl mx-auto">
              <CardContent className="pt-6">
                <h3 className="text-2xl font-bold mb-4">
                  Ready to Get Started?
                </h3>
                <p className="text-muted-foreground mb-6">
                  Let's discuss how our services can help transform your
                  business idea into reality.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
