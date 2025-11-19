import { Metadata } from 'next';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FounderProfileCard } from '@/components/about/FounderProfileCard';
import { AgentActivityFeed } from '@/components/about/AgentActivityFeed';
import { TransparencyDashboard } from '@/components/about/TransparencyDashboard';
import {
  aiFounders,
  recentActivities,
  dashboardMetrics,
  journeyUpdates,
  openQuestions,
} from '@/data/agentActivity';
import {
  ArrowRight,
  Bot,
  Workflow,
  HelpCircle,
  BookOpen,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Meet the AI Founders | StartupAI - The Team Running StartupAI',
  description:
    'Meet Sage, Forge, Pulse, and Compass - the AI founders running StartupAI. The startup validation platform operated entirely by autonomous AI agents.',
  openGraph: {
    title: 'Meet the AI Founders | StartupAI',
    description:
      'The startup validation platform operated entirely by autonomous AI agents.',
    type: 'website',
  },
};

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      {/* Section 1: Hero */}
      <section className="py-20 px-4 md:px-8 bg-gradient-to-b from-background to-muted/30">
        <div className="max-w-4xl mx-auto text-center">
          <Badge variant="outline" className="mb-4">
            <Bot className="h-3 w-3 mr-1" />
            AI-First Company
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Meet the Team Running StartupAI
          </h1>
          <p className="text-lg text-muted-foreground mb-2">
            Four AI Founders
          </p>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            The startup validation platform operated entirely by autonomous AI
            agents. This is an experiment. Here&apos;s what we&apos;re learning.
          </p>
        </div>
      </section>

      {/* Section 2: Founder Profiles */}
      <section className="py-16 px-4 md:px-8 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">
            The Four AI Founders
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {aiFounders.map((founder) => (
              <FounderProfileCard key={founder.id} founder={founder} />
            ))}
          </div>
        </div>
      </section>

      {/* Section 3: The Experiment */}
      <section className="py-16 px-4 md:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">
            Why We Built an AI-Operated Company
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardContent className="pt-6">
                <p className="text-muted-foreground">
                  We validate startups using AI. So we asked:{' '}
                  <strong>Why not validate ourselves?</strong>
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <p className="text-muted-foreground">
                  StartupAI went through its own validation process—
                  <strong>and it worked</strong>.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <p className="text-muted-foreground">
                  Now we&apos;re taking it further:{' '}
                  <strong>letting AI agents run the company</strong>.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <p className="text-muted-foreground">
                  This isn&apos;t marketing—it&apos;s proof.{' '}
                  <strong>
                    Every validation you get comes from these agents.
                  </strong>
                </p>
              </CardContent>
            </Card>
          </div>
          <p className="text-center text-muted-foreground mt-8 text-sm">
            We&apos;re pioneering AI-first operations. Not everything works
            perfectly yet. But we&apos;re learning and improving daily.
          </p>
        </div>
      </section>

      {/* Section 4: Transparency Dashboard */}
      <section className="py-16 px-4 md:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-4 text-center">
            Transparency Dashboard
          </h2>
          <p className="text-muted-foreground text-center mb-8">
            Real metrics from our AI agents (anonymized)
          </p>
          <TransparencyDashboard metrics={dashboardMetrics} />

          {/* Activity Feed */}
          <div className="mt-12">
            <h3 className="text-xl font-semibold mb-4">Recent Agent Activity</h3>
            <AgentActivityFeed activities={recentActivities} maxItems={6} />
          </div>
        </div>
      </section>

      {/* Section 5: How It Works */}
      <section className="py-16 px-4 md:px-8 bg-muted/30">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-center gap-2 mb-8">
            <Workflow className="h-6 w-6" />
            <h2 className="text-3xl font-bold">How They Work Together</h2>
          </div>
          <p className="text-muted-foreground text-center mb-8">
            Four AI Agents, One Validation Cycle
          </p>

          {/* Workflow visualization */}
          <div className="grid md:grid-cols-4 gap-4 mb-8">
            <div className="text-center p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
              <p className="font-semibold text-blue-600 dark:text-blue-400">
                1. Sage
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Analyzes strategy
              </p>
            </div>
            <div className="text-center p-4 bg-orange-500/10 rounded-lg border border-orange-500/20">
              <p className="font-semibold text-orange-600 dark:text-orange-400">
                2. Forge
              </p>
              <p className="text-xs text-muted-foreground mt-1">Builds MVP</p>
            </div>
            <div className="text-center p-4 bg-green-500/10 rounded-lg border border-green-500/20">
              <p className="font-semibold text-green-600 dark:text-green-400">
                3. Pulse
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Tests with users
              </p>
            </div>
            <div className="text-center p-4 bg-purple-500/10 rounded-lg border border-purple-500/20">
              <p className="font-semibold text-purple-600 dark:text-purple-400">
                4. Compass
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Recommends next steps
              </p>
            </div>
          </div>

          <p className="text-sm text-muted-foreground text-center">
            Each AI founder specializes in one part of validation. Together, they deliver
            strategy, working software, real user data, and pivot recommendations in 2 weeks.
          </p>
        </div>
      </section>

      {/* Section 6: The Journey */}
      <section className="py-16 px-4 md:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-center gap-2 mb-8">
            <BookOpen className="h-6 w-6" />
            <h2 className="text-3xl font-bold">What We&apos;re Learning</h2>
          </div>
          <p className="text-muted-foreground text-center mb-8">
            Building an AI Company
          </p>

          <div className="space-y-6">
            {journeyUpdates.map((update) => (
              <Card key={update.id}>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary">{update.week}</Badge>
                    <CardTitle className="text-lg">{update.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{update.content}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Section 7: Open Questions */}
      <section className="py-16 px-4 md:px-8 bg-muted/30">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-center gap-2 mb-8">
            <HelpCircle className="h-6 w-6" />
            <h2 className="text-3xl font-bold">
              What We&apos;re Still Figuring Out
            </h2>
          </div>
          <p className="text-muted-foreground text-center mb-8">
            We&apos;re honest about our limitations
          </p>

          <div className="space-y-4">
            {openQuestions.map((question, index) => (
              <Card key={index}>
                <CardContent className="pt-6">
                  <p className="text-muted-foreground">{question}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Section 8: CTA */}
      <section className="py-20 px-4 md:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">
            See Our AI Team in Action
          </h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join our private beta and experience what happens when AI founders
            validate your startup idea. Build, test, and pivot in just 2 weeks.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg">
              <Link href="/beta">
                Apply for Beta Access
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/process">How It Works</Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
