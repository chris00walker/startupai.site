'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { WaitlistForm } from '@/components/waitlist-form';
import { Brain, Layout, FlaskConical, ShieldCheck } from 'lucide-react';

const features = [
  {
    title: 'Strategy Canvases',
    description: 'Instant Value Proposition & Business Model canvases from your idea and market signals.',
    Icon: Layout,
  },
  {
    title: 'Experiment Design',
    description: 'Frame tests using Testing Business Ideas patterns and generate action-ready experiments.',
    Icon: FlaskConical,
  },
  {
    title: 'AI Strategy Brain',
    description: 'Compose domain models, goals, and roadmaps that stay in sync as your learning evolves.',
    Icon: Brain,
  },
  {
    title: 'Privacy & Control',
    description: 'Your data stays private. Transparent inputs, editable outputs, and export-anywhere control.',
    Icon: ShieldCheck,
  },
] as const;

export function AIStrategySection() {
  return (
    <div>
      {/* Hero + Waitlist */}
      <section id="ai-strategy" className="bg-gray-50 py-16 scroll-mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-gray-900">
                AI Strategy Assistant
              </h2>
              <p className="mt-4 text-lg text-gray-600">
                From canvas to execution: generate strategy canvases, design experiments, and turn
                learning into a concrete plan. Built for founders, indie hackers, and consultants.
              </p>
            </div>

            <Card id="waitlist" className="border-primary/20 shadow-sm scroll-mt-24">
              <CardHeader>
                <CardTitle>Request Early Access</CardTitle>
                <CardDescription>
                  Request early access to our private pilot program.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <WaitlistForm className="mt-2" />
              </CardContent>
              <CardFooter className="text-sm text-muted-foreground">
                No spam. Opt out anytime.
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>

      {/* Feature Cards */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <h3 className="text-2xl md:text-3xl font-semibold tracking-tight">What you can do</h3>
            <p className="mt-2 text-gray-600">
              Practical strategy building blocks that work together and stay aligned as you learn.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {features.map(({ title, description, Icon }) => (
              <Card key={title} className="h-full">
                <CardHeader>
                  <div className="mb-2 inline-flex h-10 w-10 items-center justify-center rounded-md bg-primary/10 text-primary">
                    <Icon className="h-5 w-5" />
                  </div>
                  <CardTitle className="text-xl">{title}</CardTitle>
                  <CardDescription>{description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-sm text-muted-foreground">
                    {/* Room for bullets or screenshots later */}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
