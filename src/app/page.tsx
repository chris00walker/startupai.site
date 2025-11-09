import { Metadata } from 'next';
import Link from 'next/link';
import { Hero } from '@/components/sections/Hero';
import { RoleSelection } from '@/components/sections/RoleSelection';
import { ServiceCard } from '@/components/sections/ServiceCard';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { PageContainer } from '@/components/ui/layout/page-container';
import { PageHeader, PageTitle, PageDescription } from '@/components/ui/layout/page-header';

export const metadata: Metadata = {
  title: 'Chris Walker | AI-Powered Forward Deployed Engineer',
  description: 'Transform startup ideas into evidence-backed business models and production-ready architectures in hours, not months. Your AI FDE-in-a-box for rapid validation and execution.',
};

const services = [
  {
    title: 'Discovery',
    description: 'Validate your business idea and identify market opportunities with comprehensive research and analysis.',
    features: [
      'Market research and competitive analysis',
      'Customer persona development',
      'Opportunity assessment',
      'Customer desirability validation'
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

      {/* Role Selection - Two Clear Paths */}
      <RoleSelection />

      {/* Services Preview */}
      <section className="bg-gray-50">
        <PageContainer variant="wide" padding="lg">
          <PageHeader variant="centered" className="mb-12">
            <PageTitle>Services</PageTitle>
            <PageDescription>
              Transform your startup with our comprehensive service offerings
            </PageDescription>
          </PageHeader>
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
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
        </PageContainer>
      </section>

      <Separator />

      {/* CTA Section */}
      <section className="bg-primary">
        <PageContainer variant="wide" padding="lg">
          <div className="text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Transform Your Startup
            </h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Let's discuss how StartupAI can help you achieve your startup's goals.
            </p>
          </div>
        </PageContainer>
      </section>
    </div>
  );
}
