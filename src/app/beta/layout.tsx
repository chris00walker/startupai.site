import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Join the Private Beta - StartupAI',
  description:
    'Limited to 200 spots: Get 3 validation cycles + FREE lifetime Founder Tier access (worth $10,440+). Validate your startup idea in 6 weeks with our AI-powered platform.',
  openGraph: {
    title: 'Join the StartupAI Private Beta',
    description:
      'First 200 get lifetime platform access worth $10,440+. Apply now to validate your startup idea with AI.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Join the StartupAI Private Beta',
    description:
      'First 200 get lifetime platform access worth $10,440+. Apply now to validate your startup idea with AI.',
  },
};

export default function BetaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
