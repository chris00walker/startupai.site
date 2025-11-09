'use client';

import * as React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Lightbulb, Users, CheckCircle2 } from 'lucide-react';

export function RoleSelection() {
  const [hoveredCard, setHoveredCard] = React.useState<'founder' | 'consultant' | null>(null);

  const roles = [
    {
      id: 'founder' as const,
      title: 'For Founders',
      badge: 'Free Trial Available',
      description: 'Independent entrepreneurs validating and building their startup ideas',
      benefits: [
        'Evidence-based validation framework',
        'AI-powered strategy guidance',
        'Testing Business Ideas toolkit',
        'Value Proposition Canvas',
      ],
      icon: Lightbulb,
      href: `/pricing?role=founder`,
      primaryColor: 'from-blue-500 to-indigo-600',
      accentColor: 'border-blue-500/20 hover:border-blue-500/50',
    },
    {
      id: 'consultant' as const,
      title: 'For Consultants',
      badge: 'Free Trial Available',
      description: 'Business consultants and agencies serving multiple clients',
      benefits: [
        'Client portfolio management',
        'White-label AI workflows',
        'Multi-client canvas gallery',
        'Practice analytics dashboard',
      ],
      icon: Users,
      href: `/pricing?role=consultant`,
      primaryColor: 'from-purple-500 to-pink-600',
      accentColor: 'border-purple-500/20 hover:border-purple-500/50',
    },
  ];

  return (
    <section className="py-16 md:py-24 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-white"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Choose Your Path
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Whether you're building your own startup or helping others build theirs,
            we have the tools and workflows designed for your needs.
          </p>
        </div>

        {/* Role Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {roles.map((role) => {
            const IconComponent = role.icon;
            const isHovered = hoveredCard === role.id;
            const isOtherHovered = hoveredCard !== null && hoveredCard !== role.id;

            return (
              <Card
                key={role.id}
                onMouseEnter={() => setHoveredCard(role.id)}
                onMouseLeave={() => setHoveredCard(null)}
                className={`relative transition-all duration-300 ${
                  isHovered
                    ? 'scale-105 shadow-2xl'
                    : isOtherHovered
                    ? 'scale-95 opacity-75'
                    : 'scale-100'
                } ${role.accentColor} border-2`}
              >
                {/* Gradient overlay on hover */}
                {isHovered && (
                  <div className={`absolute inset-0 bg-gradient-to-br ${role.primaryColor} opacity-5 rounded-xl transition-opacity duration-300`}></div>
                )}

                <CardHeader className="relative">
                  <div className="flex items-start justify-between mb-2">
                    <div className={`p-3 rounded-lg bg-gradient-to-br ${role.primaryColor} shadow-lg`}>
                      <IconComponent className="h-6 w-6 text-white" />
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {role.badge}
                    </Badge>
                  </div>
                  <CardTitle className="text-2xl mb-2">{role.title}</CardTitle>
                  <CardDescription className="text-base">
                    {role.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="relative">
                  <ul className="space-y-3">
                    {role.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>

                <CardFooter className="relative">
                  <Link href={role.href} className="w-full">
                    <Button
                      className={`w-full group bg-gradient-to-r ${role.primaryColor} hover:opacity-90 transition-all duration-300`}
                      size="lg"
                    >
                      Get Started
                      <ArrowRight className={`ml-2 h-4 w-4 transition-transform duration-300 ${
                        isHovered ? 'translate-x-1' : ''
                      }`} />
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <p className="text-sm text-muted-foreground">
            Not sure which path is right for you?{' '}
            <Link href="/pricing" className="text-primary hover:underline underline-offset-4 font-medium">
              Pricing
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
