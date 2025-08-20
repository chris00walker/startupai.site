import { Metadata } from 'next';
import { ContactForm } from '@/components/sections/ContactForm';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { PageContainer } from '@/components/ui/layout/page-container';
import { PageHeader, PageTitle, PageDescription } from '@/components/ui/layout/page-header';
import { Mail } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Contact | Chris Walker Consulting',
  description: 'Get in touch with Chris Walker for eCommerce strategy and development consulting services.',
};

export default function ContactPage() {
  return (
    <div className="min-h-screen">
      <section className="py-16 bg-gray-50">
        <PageContainer variant="wide" padding="lg">
          <div className="max-w-4xl mx-auto">
            <PageHeader variant="centered" className="mb-12">
              <PageTitle>Contact</PageTitle>
              <PageDescription className="text-xl">
                Ready to discuss your eCommerce project? Let's start a conversation about how I can help your business succeed.
              </PageDescription>
            </PageHeader>
            
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-2xl">Get in Touch</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ContactForm />
                  </CardContent>
                </Card>
              </div>
              
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-2xl">Let's Connect</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-gray-600">
                      I'm always interested in discussing new opportunities and challenges in eCommerce.
                    </p>
                    
                    <Separator />
                    
                    <div className="flex items-center space-x-3">
                      <Mail className="w-5 h-5 text-primary" />
                      <span className="text-gray-600">hello@chriswalker.consulting</span>
                    </div>
                    
                    <Separator />
                    
                    <div className="space-y-2">
                      <h3 className="font-semibold text-gray-900">Typical Engagement</h3>
                      <p className="text-sm text-gray-600">
                        Projects typically start at $10K and are tailored to your specific needs and goals.
                      </p>
                    </div>
                    
                    <div className="space-y-2">
                      <h3 className="font-semibold text-gray-900">Response Time</h3>
                      <p className="text-sm text-gray-600">
                        I respond to all inquiries within 24 hours during business days.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </PageContainer>
      </section>
    </div>
  );
}
