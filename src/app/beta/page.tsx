/**
 * Beta Application Page
 *
 * @story US-MF10
 */

'use client';

import * as React from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
} from '@/components/ui/card';
import { PageContainer } from '@/components/ui/layout/page-container';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import {
  ArrowRight,
  CheckCircle2Icon,
  AlertCircleIcon,
  Users,
} from 'lucide-react';
import { FormProgress } from '@/components/ui/FormProgress';

const formSchema = z.object({
  name: z.string().min(2, {
    message: 'Name must be at least 2 characters.',
  }),
  email: z.string().email({
    message: 'Please enter a valid email address.',
  }),
  startupIdea: z.string().min(10, {
    message:
      'Please provide at least 10 characters describing your startup idea.',
  }),
  industry: z.string().min(1, 'Please select an industry.'),
  timeline: z.string().min(1, 'Please select your preferred timeline.'),
  budgetConfirmation: z.boolean().refine((value) => value === true, {
    message: 'You must confirm you can invest $1,500 for the beta.',
  }),
  referralSource: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export default function BetaPage() {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [submitStatus, setSubmitStatus] = React.useState<
    'success' | 'error' | null
  >(null);
  const [spotsRemaining] = React.useState(200);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      startupIdea: '',
      industry: '',
      timeline: '',
      budgetConfirmation: false,
      referralSource: '',
    },
  });

  async function onSubmit(values: FormValues) {
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const timelineMap: Record<string, string> = {
        asap: '0-3 months',
        phase2: '3-6 months',
        phase3: '6-12 months',
        phase4: '12+ months',
        flexible: '0-3 months',
      };

      const response = await fetch('/.netlify/functions/beta-application', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: values.name,
          email: values.email,
          startupIdea: values.startupIdea,
          industry: values.industry,
          timeline: timelineMap[values.timeline] || values.timeline,
          referralSource: values.referralSource,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.ok) {
        throw new Error(data.error || 'Failed to submit application');
      }

      setSubmitStatus('success');
      form.reset();

      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb Navigation */}
      <PageContainer variant="wide" padding="none" className="pt-6 bg-white">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/">Home</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Beta Application</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </PageContainer>

      {/* Page Header */}
      <section className="bg-white py-8 border-b">
        <PageContainer variant="narrow">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-3">
              Apply for Beta Access
            </h1>
            <p className="text-lg text-muted-foreground mb-4">
              Join the first 200 and secure your lifetime deal
            </p>
            <div className="inline-flex items-center gap-2 text-sm">
              <Users className="h-4 w-4 text-primary" />
              <span>
                <span className="font-semibold text-primary">{spotsRemaining}</span> spots remaining
              </span>
            </div>
          </div>
        </PageContainer>
      </section>

      {/* Success/Error Alerts */}
      {submitStatus && (
        <PageContainer variant="narrow" padding="sm" className="pt-6">
          {submitStatus === 'success' && (
            <Alert className="bg-green-50 border-green-200">
              <CheckCircle2Icon className="h-4 w-4 text-green-600" />
              <AlertTitle className="text-green-600">
                Application Submitted Successfully!
              </AlertTitle>
              <AlertDescription className="text-green-700">
                Thank you for applying to the StartupAI Private Beta. We'll
                review your application and get back to you within 48 hours.
                Check your email for confirmation.
              </AlertDescription>
            </Alert>
          )}

          {submitStatus === 'error' && (
            <Alert variant="destructive">
              <AlertCircleIcon className="h-4 w-4" />
              <AlertTitle>Error Submitting Application</AlertTitle>
              <AlertDescription>
                There was a problem submitting your application. Please try
                again or contact us directly at beta@startupai.site.
              </AlertDescription>
            </Alert>
          )}
        </PageContainer>
      )}

      {/* Application Form */}
      <section className="py-12">
        <PageContainer variant="narrow">
          <Card className="business-card">
            <CardContent className="pt-6">
              {/* Progress Indicator */}
              <FormProgress
                steps={[
                  { label: 'Name', completed: !!form.watch('name') && form.watch('name').length >= 2 },
                  { label: 'Email', completed: !!form.watch('email') && form.watch('email').includes('@') },
                  { label: 'Idea', completed: !!form.watch('startupIdea') && form.watch('startupIdea').length >= 10 },
                  { label: 'Industry', completed: !!form.watch('industry') },
                  { label: 'Timeline', completed: !!form.watch('timeline') },
                  { label: 'Confirm', completed: form.watch('budgetConfirmation') === true },
                ]}
                className="mb-8"
              />

              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-6"
                >
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input placeholder="John Doe" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email Address</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="john@example.com"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="startupIdea"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Startup Idea (1-2 sentences)</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Describe your startup idea, target audience, and the problem you're solving..."
                            className="min-h-[100px]"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Give us a brief overview of what you want to build
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="industry"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Industry/Category</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select your industry" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="ecommerce">
                              E-Commerce / Retail
                            </SelectItem>
                            <SelectItem value="saas">
                              SaaS / Software
                            </SelectItem>
                            <SelectItem value="healthcare">
                              Healthcare / Medical
                            </SelectItem>
                            <SelectItem value="fintech">
                              FinTech / Finance
                            </SelectItem>
                            <SelectItem value="education">
                              Education / EdTech
                            </SelectItem>
                            <SelectItem value="foodbev">
                              Food & Beverage
                            </SelectItem>
                            <SelectItem value="realestate">
                              Real Estate
                            </SelectItem>
                            <SelectItem value="marketing">
                              Marketing / Agency
                            </SelectItem>
                            <SelectItem value="consulting">
                              Consulting / Professional Services
                            </SelectItem>
                            <SelectItem value="ai">
                              AI / Machine Learning
                            </SelectItem>
                            <SelectItem value="marketplace">
                              Marketplace / Platform
                            </SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="timeline"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>When do you want to start?</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select your preferred timeline" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="asap">
                              As soon as possible (Phase 1 - Jan 2026)
                            </SelectItem>
                            <SelectItem value="phase2">
                              Phase 2 (Feb 2026)
                            </SelectItem>
                            <SelectItem value="phase3">
                              Phase 3 (Mar 2026)
                            </SelectItem>
                            <SelectItem value="phase4">
                              Phase 4 (Apr 2026)
                            </SelectItem>
                            <SelectItem value="flexible">
                              Flexible - any phase
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        <FormDescription>
                          Beta launches Q1 2026 in rolling phases of 50
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="referralSource"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          How did you hear about us? (Optional)
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="e.g., Twitter, friend referral, blog post..."
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="budgetConfirmation"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 bg-blue-50/50">
                        <FormControl>
                          <input
                            type="checkbox"
                            checked={field.value}
                            onChange={field.onChange}
                            className="h-4 w-4 mt-1"
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel className="font-semibold">
                            I confirm I can invest $1,500 for the beta program
                          </FormLabel>
                          <FormDescription>
                            This one-time investment includes 3 validation
                            cycles and lifetime platform access (worth $10,440+
                            over 5 years)
                          </FormDescription>
                          <FormMessage />
                        </div>
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting
                      ? 'Submitting Application...'
                      : 'Apply for Beta Access'}
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>

                  <p className="text-xs text-muted-foreground text-center">
                    By submitting this application, you agree to our privacy
                    policy and terms of service. We'll review your application
                    and respond within 48 hours.
                  </p>
                </form>
              </Form>
            </CardContent>
          </Card>
        </PageContainer>
      </section>

      {/* Contact Footer */}
      <section className="bg-white py-8 border-t">
        <PageContainer variant="narrow">
          <div className="text-center text-sm text-muted-foreground">
            Questions? Email us at{' '}
            <a
              href="mailto:beta@startupai.site"
              className="text-primary hover:underline font-medium"
            >
              beta@startupai.site
            </a>
          </div>
        </PageContainer>
      </section>
    </div>
  );
}
