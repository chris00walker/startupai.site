import { Metadata } from 'next';
import Link from 'next/link';
import { Hero } from '@/components/sections/Hero';
import { ServiceCard } from '@/components/sections/ServiceCard';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

export const metadata: Metadata = {
  title: 'Chris Walker | eCommerce Strategy & Development',
  description: 'Expert eCommerce strategy and development services for early-stage startups. Validate, build, and scale your custom platform with data-driven approaches.',
};

const services = [
  {
    title: 'Discovery',
    description: 'Validate your business idea and identify market opportunities with comprehensive research and analysis.',
    features: [
      'Market research and competitive analysis',
      'Customer persona development',
      'Opportunity assessment',
      'Technical feasibility study'
    ],
    href: '/services/discovery',
    badge: 'Popular'
  },
  {
    title: 'Validation',
    description: 'Test your concepts with real customers and refine your approach based on data-driven insights.',
    features: [
      'MVP development and testing',
      'Customer feedback collection',
      'A/B testing implementation',
      'Product-market fit validation'
    ],
    href: '/services/validation'
  },
  {
    title: 'Scaling',
    description: 'Build robust systems and processes that support sustainable growth and operational excellence.',
    features: [
      'Infrastructure optimization',
      'Process automation',
      'Performance monitoring',
      'Growth strategy development'
    ],
    href: '/services/scaling'
  },
  {
    title: 'Optimization',
    description: 'Continuously improve performance and efficiency through data-driven insights and strategic refinements.',
    features: [
      'Performance analytics',
      'Conversion optimization',
      'Cost reduction strategies',
      'Strategic refinements'
    ],
    href: '/services/optimization'
  }
];

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Hero />

      {/* Services Preview */}
      <section className="bg-gray-50 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <ServiceCard
                key={index}
                title={service.title}
                description={service.description}
                features={service.features}
                href={service.href}
                badge={service.badge}
              />
            ))}
          </div>

        </div>
      </section>

      <Separator />

      {/* CTA Section */}
      <section className="bg-primary py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Transform Your Startup
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Let's discuss how CWC can help you achieve your startup' goals.
            </p>
            <Button asChild size="lg" className="bg-white text-primary hover:bg-gray-100">
              <Link href="/contact">
                Schedule a Consultation
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
