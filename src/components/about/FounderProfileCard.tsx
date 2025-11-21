'use client';

import Image from 'next/image';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import type { AIFounder, AgentActivity } from '@/data/agentActivity';
import { recentActivities } from '@/data/agentActivity';
import { Activity } from 'lucide-react';
import { analytics } from '@/lib/analytics';

interface FounderProfileCardProps {
  founder: AIFounder;
}

const borderColorMap: Record<string, string> = {
  blue: 'border-blue-500/20',
  orange: 'border-orange-500/20',
  green: 'border-green-500/20',
  purple: 'border-purple-500/20',
  silver: 'border-slate-400/30',
  gold: 'border-yellow-500/20',
};

// Filter activities for a specific founder
function getFounderActivities(founderName: string): AgentActivity[] {
  return recentActivities.filter(
    (activity) => activity.agentName === founderName
  );
}

export function FounderProfileCard({ founder }: FounderProfileCardProps) {
  const borderColor = borderColorMap[founder.color] || 'border-gray-500/20';
  const founderActivities = getFounderActivities(founder.name);
  const isGuardian = founder.layer === 'meta';

  const handleDialogOpen = (open: boolean) => {
    if (open) {
      analytics.team.founderProfileViewed(founder.name, founder.role);
    }
  };

  return (
    <Card className={`border-2 ${borderColor} h-full flex flex-col ${isGuardian ? 'shadow-lg bg-gradient-to-b from-slate-50 to-white' : ''}`}>
      <CardHeader className="text-center pb-2 flex-shrink-0">
        <div className="mx-auto h-16 w-16 rounded-full overflow-hidden">
          <Image
            src={founder.avatarUrl}
            alt={`${founder.name} - ${founder.role}`}
            width={64}
            height={64}
            className="object-cover"
          />
        </div>
        <div className="mt-3">
          <h3 className="text-lg font-bold">{founder.name}</h3>
          <p className="text-xs text-muted-foreground">{founder.title}</p>
        </div>
        <Badge variant="outline" className="mt-2 mx-auto text-xs">
          {founder.role}
        </Badge>
      </CardHeader>
      <CardContent className="flex flex-col flex-1 pt-2">
        {/* View Profile Button - Prominent */}
        <div className="mt-auto pt-2">
          <Dialog onOpenChange={handleDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="default" size="sm" className="w-full">
              <Activity className="h-4 w-4 mr-2" />
              View Profile
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-full overflow-hidden">
                  <Image
                    src={founder.avatarUrl}
                    alt={founder.name}
                    width={48}
                    height={48}
                    className="object-cover"
                  />
                </div>
                <div>
                  <DialogTitle>{founder.name}&apos;s Recent Work</DialogTitle>
                  <p className="text-sm text-muted-foreground">{founder.title}</p>
                </div>
              </div>
            </DialogHeader>

            {/* Quote */}
            <blockquote className="mt-4 text-sm italic text-muted-foreground border-l-2 pl-3">
              &ldquo;{founder.quote}&rdquo;
            </blockquote>

            {/* Extended Personality */}
            <div className="mt-4">
              <p className="text-xs font-semibold uppercase text-muted-foreground mb-2">
                Philosophy
              </p>
              <p className="text-sm text-muted-foreground">
                {founder.personality}
              </p>
            </div>

            {/* Governance Role (Guardian only) */}
            {founder.governanceRole && (
              <div className="mt-4">
                <p className="text-xs font-semibold uppercase text-muted-foreground mb-2">
                  Governance Role
                </p>
                <p className="text-sm italic text-slate-600">
                  &ldquo;{founder.governanceRole}&rdquo;
                </p>
              </div>
            )}

            {/* Governance Metrics (Guardian only) */}
            {founder.governanceMetrics && (
              <div className="mt-4 p-3 rounded-lg bg-slate-50 border border-slate-200">
                <p className="text-xs font-semibold uppercase text-muted-foreground mb-2">
                  Governance Metrics
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {founder.governanceMetrics.map((metric) => (
                    <div key={metric.label} className="text-center">
                      <p className="text-lg font-bold text-slate-700">{metric.value}</p>
                      <p className="text-xs text-muted-foreground">{metric.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* All Capabilities */}
            <div className="mt-4">
              <p className="text-xs font-semibold uppercase text-muted-foreground mb-2">
                Full Capabilities
              </p>
              <ul className="text-sm space-y-1">
                {founder.capabilities.map((capability, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-primary mt-1">-</span>
                    <span>{capability}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Recent Activities */}
            <div className="mt-4">
              <p className="text-xs font-semibold uppercase text-muted-foreground mb-2">
                Recent Activity
              </p>
              {founderActivities.length > 0 ? (
                <div className="space-y-3">
                  {founderActivities.map((activity) => (
                    <div
                      key={activity.id}
                      className="p-3 rounded-lg bg-muted/50"
                    >
                      <p className="text-sm">{activity.activity}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs text-muted-foreground">
                          {activity.timestamp}
                        </span>
                        {activity.metric && (
                          <span className="text-xs text-primary">
                            {activity.metric}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">
                  No recent activity to display.
                </p>
              )}
            </div>

            {/* Stats */}
            <div className="mt-4 pt-4 border-t">
              <p className="text-xs font-semibold uppercase text-muted-foreground mb-2">
                Performance
              </p>
              <div className="grid grid-cols-3 gap-2">
                {founder.stats.map((stat) => (
                  <div key={stat.label} className="text-center">
                    <p className="text-lg font-bold">{stat.value}</p>
                    <p className="text-xs text-muted-foreground">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </DialogContent>
          </Dialog>
        </div>
      </CardContent>
    </Card>
  );
}
