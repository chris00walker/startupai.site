import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pricing | StartupAI - AI Co-Founder for Founders',
  description:
    'Simple, transparent pricing for startup validation. 3 validation cycles for $1,500. Build, test, and pivot with real user data in 2 weeks.',
  openGraph: {
    title: 'Pricing | StartupAI',
    description:
      'Simple, transparent pricing. 3 validation cycles for $1,500. Build, test, and pivot in 2 weeks.',
    type: 'website',
  },
};

export default function PricingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
