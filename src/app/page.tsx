/**
 * Landing Page
 *
 * @story US-MF01
 */

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
    'Transform startup ideas into evidence-backed business models with real user validation in 2 weeks. Build, test, and pivot with AI-powered startup validation.',
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
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8">
              <Button size="lg" className="bg-white text-primary hover:bg-white/90" asChild>
                <Link href="/beta">
                  Apply for Beta Access
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="bg-white text-primary hover:bg-white/90" asChild>
                <Link href="/product">
                  Learn More
                </Link>
              </Button>
            </div>
          </div>
        </PageContainer>
      </section>
    </div>
  );
}
