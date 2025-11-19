import { Metadata } from 'next';
import { ContactForm } from '@/components/sections/ContactForm';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PageContainer } from '@/components/ui/layout/page-container';
import {
  PageHeader,
  PageTitle,
  PageDescription,
} from '@/components/ui/layout/page-header';

export const metadata: Metadata = {
  title: 'Contact | StartupAI',
  description:
    "Get in touch with StartupAI. Questions about our beta program or validation services? We're here to help.",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen">
      <section className="py-16 bg-gray-50">
        <PageContainer variant="wide" padding="lg">
          <div className="max-w-4xl mx-auto">
            <PageHeader variant="centered" className="mb-12">
              <PageTitle>Contact</PageTitle>
              <PageDescription className="text-xl max-w-2xl mx-auto">
                Questions about our beta program or validation services? Get in
                touch and we'll get back to you within 24 hours.
              </PageDescription>
            </PageHeader>

            <div className="max-w-2xl mx-auto">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">Get in Touch</CardTitle>
                </CardHeader>
                <CardContent>
                  <ContactForm />
                </CardContent>
              </Card>
            </div>
          </div>
        </PageContainer>
      </section>
    </div>
  );
}
