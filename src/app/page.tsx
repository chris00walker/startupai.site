import { Metadata } from 'next';
import Link from 'next/link';
import { Hero } from '@/components/sections/Hero';
import { RoleSelection } from '@/components/sections/RoleSelection';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { PageContainer } from '@/components/ui/layout/page-container';
import {
  PageHeader,
  PageTitle,
  PageDescription,
} from '@/components/ui/layout/page-header';

export const metadata: Metadata = {
  title: 'StartupAI - AI Co-Founder for Non-Technical Founders',
  description:
    'Transform startup ideas into evidence-backed business models and production-ready architectures in hours, not months. Your AI FDE-in-a-box for rapid validation and execution.',
};

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Hero />

      {/* Role Selection - Two Clear Paths */}
      <RoleSelection />

      <Separator />

      {/* CTA Section */}
      <section className="bg-primary">
        <PageContainer variant="wide" padding="lg">
          <div className="text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Transform Your Startup
            </h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Let's discuss how StartupAI can help you achieve your startup's
              goals.
            </p>
          </div>
        </PageContainer>
      </section>
    </div>
  );
}
