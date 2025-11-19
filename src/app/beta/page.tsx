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
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { PageContainer } from '@/components/ui/layout/page-container';
import {
  PageHeader,
  PageTitle,
  PageDescription,
} from '@/components/ui/layout/page-header';
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
  Check,
  ArrowRight,
  Sparkles,
  Zap,
  Target,
  Rocket,
  Calendar,
  DollarSign,
  CheckCircle2Icon,
  AlertCircleIcon,
  Clock,
  TrendingUp,
  Users,
  Crown,
} from 'lucide-react';

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
  const [spotsRemaining] = React.useState(200); // This could be dynamic in the future

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
      // Map timeline values to backend format
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

      // Scroll to success message
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen">
      {/* Breadcrumb Navigation */}
      <PageContainer variant="wide" padding="none" className="pt-6">
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

      {/* Hero Section */}
      <section className="business-gradient relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5"></div>
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="gradient-blob absolute top-20 left-10 w-64 h-64 opacity-30"></div>
          <div
            className="gradient-blob absolute bottom-20 right-10 w-48 h-48 opacity-20"
            style={{ animationDelay: '2s' }}
          ></div>
        </div>
        <PageContainer variant="wide" padding="lg" className="relative z-10">
          <div className="text-center">
            <Badge variant="default" className="mb-4 glow-effect">
              <Sparkles className="mr-1 h-3 w-3" />
              Limited Beta - Rolling in Phases of 50
            </Badge>
            <PageHeader variant="centered">
              <PageTitle className="business-title text-4xl md:text-6xl mb-6">
                Join the StartupAI Private Beta
              </PageTitle>
              <PageDescription className="business-subtitle text-xl max-w-3xl mx-auto">
                Limited Lifetime Deal - Only 200 Spots Total
              </PageDescription>
            </PageHeader>

            {/* Spots Remaining Indicator */}
            <div className="mt-8 inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg px-6 py-3">
              <Users className="h-5 w-5 text-primary" />
              <span className="text-lg font-semibold">
                <span className="text-primary">{spotsRemaining}</span> Spots
                Remaining
              </span>
            </div>
          </div>
        </PageContainer>
      </section>

      {/* Success/Error Alerts */}
      {submitStatus && (
        <PageContainer variant="wide" padding="sm" className="pt-6">
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

      {/* What You Get Section */}
      <section className="bg-gray-50 py-12">
        <PageContainer variant="wide">
          <div className="text-center mb-12">
            <h2 className="business-title text-3xl md:text-4xl mb-4">
              What You Get as a Beta Member
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Join the first 200 and receive our exclusive Lifetime Deal worth
              up to $17,964+ over 3 years
            </p>
          </div>

          {/* LTD Offer Highlight */}
          <div className="max-w-4xl mx-auto mb-12">
            <Card className="business-card bg-gradient-to-r from-green-500/10 to-blue-500/10 border-green-500/30">
              <CardHeader className="text-center">
                <Badge
                  variant="default"
                  className="mb-4 mx-auto w-fit glow-effect"
                >
                  <Crown className="h-3 w-3 mr-1" />
                  Lifetime Deal - First 200 Only
                </Badge>
                <CardTitle className="text-2xl md:text-3xl business-title">
                  FREE Founder Tier Upgrade
                </CardTitle>
                <CardDescription className="text-lg mt-2">
                  Automatic activation after your validation cycles complete
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-3 gap-4 text-center">
                  <div className="p-4 bg-white/50 rounded-lg border border-green-500/20">
                    <DollarSign className="h-6 w-6 text-green-600 mx-auto mb-2" />
                    <p className="font-bold text-2xl text-green-600">$1,500</p>
                    <p className="text-sm text-muted-foreground">
                      One-Time Investment
                    </p>
                  </div>
                  <div className="p-4 bg-white/50 rounded-lg border border-blue-500/20">
                    <TrendingUp className="h-6 w-6 text-blue-600 mx-auto mb-2" />
                    <p className="font-bold text-2xl text-blue-600">$199/mo</p>
                    <p className="text-sm text-muted-foreground">
                      Value - FREE Forever
                    </p>
                  </div>
                  <div className="p-4 bg-white/50 rounded-lg border border-purple-500/20">
                    <Sparkles className="h-6 w-6 text-purple-600 mx-auto mb-2" />
                    <p className="font-bold text-2xl text-purple-600">
                      $10,440
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Saved Over 5 Years
                    </p>
                  </div>
                </div>

                <div className="border-t pt-6">
                  <h3 className="font-semibold text-lg mb-4 text-center">
                    Complete Lifetime Benefits
                  </h3>
                  <div className="grid md:grid-cols-2 gap-3">
                    {[
                      '3 full validation cycles (test 3 ideas OR pivot 3x)',
                      'Real ad spend included (~$450-525 total)',
                      'FREE lifetime Founder Tier access (worth $2,388/year)',
                      'Never pay subscription fees (only inference costs ~$20-50/mo)',
                      'Each cycle: Strategy + Build + Deploy + Test + Pivot',
                      'Deployed MVP at live URL with analytics',
                      'Priority support for beta users',
                      'Beta feedback role (shape product roadmap)',
                    ].map((benefit, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <Check className="h-4 w-4 text-green-600 mt-1 flex-shrink-0" />
                        <span className="text-sm">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Visual Breakdown of 3 Validation Cycles */}
          <div className="max-w-5xl mx-auto">
            <h3 className="text-2xl font-semibold mb-8 text-center">
              Your 3 Validation Cycles
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  title: 'Cycle 1',
                  icon: Target,
                  description: 'Test your initial idea',
                  timeline: '2 weeks',
                  steps: ['Strategy', 'Build', 'Deploy', 'Test', 'Analyze'],
                },
                {
                  title: 'Cycle 2',
                  icon: Zap,
                  description: 'Pivot or test new idea',
                  timeline: '2 weeks',
                  steps: ['Strategy', 'Build', 'Deploy', 'Test', 'Analyze'],
                },
                {
                  title: 'Cycle 3',
                  icon: Rocket,
                  description: 'Final validation → Launch',
                  timeline: '2 weeks',
                  steps: ['Strategy', 'Build', 'Deploy', 'Test', 'Upgrade'],
                },
              ].map((cycle, index) => {
                const IconComponent = cycle.icon;
                return (
                  <Card key={index} className="business-card">
                    <CardHeader className="text-center">
                      <div className="p-3 rounded-lg bg-primary/10 glow-effect w-fit mx-auto mb-3">
                        <IconComponent className="h-6 w-6 text-primary" />
                      </div>
                      <CardTitle className="text-xl">{cycle.title}</CardTitle>
                      <CardDescription>{cycle.description}</CardDescription>
                      <div className="flex items-center justify-center gap-2 mt-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">
                          {cycle.timeline}
                        </span>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {cycle.steps.map((step, stepIndex) => (
                          <li
                            key={stepIndex}
                            className="flex items-center gap-2 text-sm"
                          >
                            <Check className="h-3 w-3 text-primary" />
                            {step}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Upgrade Flow Timeline */}
          <div className="max-w-3xl mx-auto mt-12">
            <Card className="business-card">
              <CardHeader className="text-center">
                <CardTitle className="text-xl">
                  Automatic Upgrade Flow
                </CardTitle>
                <CardDescription>
                  From validation to lifetime platform access
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      step: 'Week 1-2',
                      label: 'Cycle 1: Validate First Idea',
                      color: 'blue',
                    },
                    {
                      step: 'Week 3-4',
                      label: 'Cycle 2: Pivot or Test New Idea',
                      color: 'blue',
                    },
                    {
                      step: 'Week 5-6',
                      label: 'Cycle 3: Final Validation',
                      color: 'blue',
                    },
                    {
                      step: 'Week 7+',
                      label:
                        'FREE Founder Tier Activated → Build & Scale Forever',
                      color: 'green',
                    },
                  ].map((item, index) => (
                    <div key={index} className="flex items-start gap-4">
                      <div
                        className={`flex-shrink-0 w-20 h-20 rounded-lg ${
                          item.color === 'green'
                            ? 'bg-green-500/20 border-green-500/30'
                            : 'bg-blue-500/20 border-blue-500/30'
                        } border flex items-center justify-center`}
                      >
                        <span
                          className={`text-xs font-semibold ${
                            item.color === 'green'
                              ? 'text-green-600'
                              : 'text-blue-600'
                          }`}
                        >
                          {item.step}
                        </span>
                      </div>
                      <div className="flex-1 pt-4">
                        <p className="font-medium">{item.label}</p>
                      </div>
                      {index < 3 && (
                        <div className="absolute left-10 mt-20 h-4 w-0.5 bg-gradient-to-b from-blue-500/50 to-transparent"></div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </PageContainer>
      </section>

      {/* How It Works - Visual Flow */}
      <section className="bg-background py-12">
        <PageContainer variant="wide">
          <div className="text-center mb-12">
            <h2 className="business-title text-3xl md:text-4xl mb-4">
              How It Works
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A proven 2-week cycle repeated 3 times to find your winning idea
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="business-card">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 rounded-lg bg-blue-500/20">
                      <Calendar className="h-5 w-5 text-blue-600" />
                    </div>
                    <CardTitle className="text-xl">
                      Week 1: Build & Deploy
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-start gap-3">
                    <Check className="h-4 w-4 text-primary mt-1" />
                    <div>
                      <p className="font-medium text-sm">AI Strategy Session</p>
                      <p className="text-xs text-muted-foreground">
                        Evidence-backed canvases & architecture
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check className="h-4 w-4 text-primary mt-1" />
                    <div>
                      <p className="font-medium text-sm">MVP Build</p>
                      <p className="text-xs text-muted-foreground">
                        Production-ready code generated
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check className="h-4 w-4 text-primary mt-1" />
                    <div>
                      <p className="font-medium text-sm">Live Deployment</p>
                      <p className="text-xs text-muted-foreground">
                        Real URL with analytics setup
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="business-card">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 rounded-lg bg-green-500/20">
                      <TrendingUp className="h-5 w-5 text-green-600" />
                    </div>
                    <CardTitle className="text-xl">
                      Week 2: Test & Analyze
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-start gap-3">
                    <Check className="h-4 w-4 text-primary mt-1" />
                    <div>
                      <p className="font-medium text-sm">Real User Testing</p>
                      <p className="text-xs text-muted-foreground">
                        Ad campaigns with included budget
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check className="h-4 w-4 text-primary mt-1" />
                    <div>
                      <p className="font-medium text-sm">Data Analysis</p>
                      <p className="text-xs text-muted-foreground">
                        AI-powered insights from real metrics
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check className="h-4 w-4 text-primary mt-1" />
                    <div>
                      <p className="font-medium text-sm">Pivot Decision</p>
                      <p className="text-xs text-muted-foreground">
                        Continue, pivot, or try new idea
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="mt-8 text-center">
              <p className="text-lg font-semibold text-primary">
                Repeat up to 3 times → Find what works
              </p>
            </div>
          </div>
        </PageContainer>
      </section>

      {/* Application Form */}
      <section id="application-form" className="bg-gray-50 py-12">
        <PageContainer variant="narrow">
          <div className="text-center mb-8">
            <h2 className="business-title text-3xl md:text-4xl mb-4">
              Apply for Beta Access
            </h2>
            <p className="text-lg text-muted-foreground">
              Tell us about your startup idea and secure your spot in the first
              200
            </p>
          </div>

          <Card className="business-card">
            <CardContent className="pt-6">
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
                    className="w-full glow-effect"
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

      {/* Social Proof Section */}
      <section className="bg-background py-12">
        <PageContainer variant="wide">
          <div className="text-center mb-12">
            <h2 className="business-title text-3xl md:text-4xl mb-4">
              Join Founders Validating 10x Faster
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Be part of the first 200 to transform how startup validation works
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              {
                quote:
                  'I spent 6 months building the wrong product. With StartupAI, I would have known in 2 weeks.',
                author: 'Sarah M.',
                role: 'SaaS Founder',
                highlight: 'Avoided 6 months of waste',
              },
              {
                quote:
                  "The lifetime deal is incredible. I'm getting $199/mo worth of value for a one-time $1,500 investment.",
                author: 'James K.',
                role: 'E-commerce Entrepreneur',
                highlight: '$10k+ saved over 5 years',
              },
              {
                quote:
                  'Having 3 validation cycles meant I could test different ideas until I found product-market fit.',
                author: 'Maria L.',
                role: 'EdTech Founder',
                highlight: 'Found PMF in 6 weeks',
              },
            ].map((testimonial, index) => (
              <Card key={index} className="business-card">
                <CardContent className="pt-6">
                  <div className="mb-4">
                    <Badge variant="secondary" className="text-xs">
                      {testimonial.highlight}
                    </Badge>
                  </div>
                  <p className="text-sm italic mb-4 text-muted-foreground">
                    "{testimonial.quote}"
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-sm font-semibold text-primary">
                        {testimonial.author.split(' ')[0][0]}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-semibold">
                        {testimonial.author}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </PageContainer>
      </section>

      {/* FAQ Section */}
      <section className="bg-gray-50 py-12">
        <PageContainer variant="narrow">
          <div className="text-center mb-12">
            <h2 className="business-title text-3xl md:text-4xl mb-4">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="max-w-3xl mx-auto space-y-6">
            <Card className="business-card">
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-2">
                  What's a validation cycle?
                </h3>
                <p className="text-muted-foreground">
                  A 2-week validation cycle consists of Week 1 (Strategy + Build
                  + Deploy) and Week 2 (Test + Analyze + Pivot). You get
                  complete evidence on whether your idea works or how to pivot
                  based on real user data.
                </p>
              </CardContent>
            </Card>

            <Card className="business-card">
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-2">
                  Can I test 3 different ideas or pivot 3 times on one idea?
                </h3>
                <p className="text-muted-foreground">
                  Either! Use your 3 cycles to test 3 separate startup ideas OR
                  test one idea with up to 3 pivots based on real user data.
                  Total flexibility to find what works.
                </p>
              </CardContent>
            </Card>

            <Card className="business-card">
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-2">
                  What happens after I use my 3 cycles?
                </h3>
                <p className="text-muted-foreground">
                  You automatically get FREE lifetime Founder Tier platform
                  access. Continue building, testing, and scaling—pay only
                  inference costs (~$20-50/mo), never subscription fees. That's{' '}
                  <strong>$7,164+ saved over 3 years</strong>.
                </p>
              </CardContent>
            </Card>

            <Card className="business-card">
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-2">
                  What are inference costs?
                </h3>
                <p className="text-muted-foreground">
                  Actual cost of AI API calls (Claude, GPT-4, etc.) - typically
                  $20-50/month for active usage. We charge exactly what
                  providers charge us, zero markup. No hidden fees, no
                  surprises.
                </p>
              </CardContent>
            </Card>

            <Card className="business-card">
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-2">
                  Will I ever have to pay monthly fees?
                </h3>
                <p className="text-muted-foreground">
                  Never. Beta customers are grandfathered with FREE Founder Tier
                  for life. You only pay actual AI inference costs. No
                  subscription fees—that's{' '}
                  <strong>$7,164+ saved over 3 years</strong>.
                </p>
              </CardContent>
            </Card>

            <Card className="business-card">
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-2">When does beta start?</h3>
                <p className="text-muted-foreground">
                  Rolling beta starts Q1 2026. First 200 spots total, released
                  in phases of 50. Apply now to secure your spot in the first
                  cohort and lock in lifetime benefits.
                </p>
              </CardContent>
            </Card>

            <Card className="business-card">
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-2">
                  What if I'm not accepted into the beta?
                </h3>
                <p className="text-muted-foreground">
                  We're accepting the first 200 qualified applicants. If you
                  miss this round, you'll be added to our waitlist for future
                  cohorts. However, the lifetime deal is only available for the
                  first 200 beta participants.
                </p>
              </CardContent>
            </Card>

            <Card className="business-card">
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-2">
                  Is the $1,500 refundable?
                </h3>
                <p className="text-muted-foreground">
                  We offer a 30-day money-back guarantee. If you're not
                  satisfied after your first validation cycle, we'll provide a
                  full refund—no questions asked.
                </p>
              </CardContent>
            </Card>
          </div>
        </PageContainer>
      </section>

      {/* Final CTA Section */}
      <section className="bg-background py-12">
        <PageContainer variant="centered">
          <Card className="business-card bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20">
            <CardContent className="text-center py-12">
              <h2 className="business-title text-3xl md:text-4xl mb-4">
                Ready to Join the Beta?
              </h2>
              <p className="text-lg text-muted-foreground mb-4 max-w-2xl mx-auto">
                Only 200 lifetime deal spots available. Join the private beta,
                validate your idea, and get FREE lifetime platform access worth
                $10,440+.
              </p>
              <div className="flex items-center justify-center gap-2 mb-8">
                <Users className="h-5 w-5 text-primary" />
                <span className="text-lg font-semibold">
                  <span className="text-primary">{spotsRemaining}</span> Spots
                  Remaining
                </span>
              </div>
              <Button asChild size="lg" className="glow-effect">
                <a href="#application-form">
                  Apply Now
                  <ArrowRight className="h-4 w-4 ml-2" />
                </a>
              </Button>
              <p className="text-sm text-muted-foreground mt-4">
                Questions? Email us at{' '}
                <a
                  href="mailto:beta@startupai.site"
                  className="text-primary hover:underline"
                >
                  beta@startupai.site
                </a>
              </p>
            </CardContent>
          </Card>
        </PageContainer>
      </section>
    </div>
  );
}
