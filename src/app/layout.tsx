import type { Metadata } from 'next';
import './globals.css';
import { Navigation } from '@/components/ui/Navigation';
import { Footer } from '@/components/ui/Footer';

export const metadata: Metadata = {
  title: 'Chris Walker | eCommerce Strategy & Development',
  description: 'Expert eCommerce strategy and development services for early-stage startups. Validate, build, and scale your custom platform with data-driven approaches.',
  keywords: ['ecommerce', 'consulting', 'development', 'strategy', 'startup'],
  authors: [{ name: 'Chris Walker' }],
  viewport: 'width=device-width, initial-scale=1',
  robots: 'index, follow',
  openGraph: {
    title: 'Chris Walker | eCommerce Strategy & Development',
    description: 'Expert eCommerce strategy and development services for early-stage startups.',
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
