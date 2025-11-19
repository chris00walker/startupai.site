import type { Metadata, Viewport } from 'next';
import './globals.css';
import { Navigation } from '@/components/ui/Navigation';
import { Footer } from '@/components/ui/Footer';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  title: 'StartupAI - AI Co-Founder for Non-Technical Founders',
  description:
    'Validate your startup idea in 2 weeks. We build your MVP, test it with real customers, and tell you if your idea works—or how to pivot. Join our private beta.',
  keywords: ['startup validation', 'AI co-founder', 'MVP testing', 'startup', 'non-technical founders'],
  authors: [{ name: 'StartupAI' }],
  robots: 'index, follow',
  openGraph: {
    title: 'StartupAI - AI Co-Founder for Non-Technical Founders',
    description:
      'Validate your startup idea in 2 weeks. Build, test, and get data-driven pivot recommendations.',
    type: 'website',
    locale: 'en_US',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-gray-50 text-gray-800 font-sans antialiased">
        <Navigation />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
