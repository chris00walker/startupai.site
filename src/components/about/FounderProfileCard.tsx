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

  const handleDialogOpen = (open: boolean) => {
    if (open) {
      analytics.team.founderProfileViewed(founder.name, founder.role);
    }
  };

  return (
    <Card className={`border-2 ${borderColor} h-full flex flex-col`}>
      <CardHeader className="text-center pb-4 flex-shrink-0">
        <div className="mx-auto h-20 w-20 rounded-full overflow-hidden">
          <Image
            src={founder.avatarUrl}
            alt={`${founder.name} - ${founder.role}`}
            width={80}
            height={80}
            className="object-cover"
          />
        </div>
        <div className="mt-4">
          <h3 className="text-xl font-bold">{founder.name}</h3>
          <p className="text-sm text-muted-foreground">{founder.title}</p>
        </div>
        <Badge variant="outline" className="mt-2 mx-auto">
          {founder.role}
        </Badge>
      </CardHeader>
      <CardContent className="flex flex-col flex-1">
        <div className="space-y-4 flex-1">
          {/* Quote */}
          <blockquote className="text-sm italic text-muted-foreground border-l-2 pl-3">
            &ldquo;{founder.quote}&rdquo;
          </blockquote>

          {/* Capabilities */}
          <div>
            <p className="text-xs font-semibold uppercase text-muted-foreground mb-2">
              Capabilities
            </p>
            <ul className="text-sm space-y-1">
              {founder.capabilities.slice(0, 4).map((capability, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-primary mt-1">-</span>
                  <span>{capability}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Current Status */}
          <div className="pt-2 border-t">
            <p className="text-xs font-semibold uppercase text-muted-foreground mb-1">
              Current Status
            </p>
            <p className="text-sm">{founder.currentStatus}</p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-2 pt-2 border-t">
            {founder.stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-lg font-bold">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* View Recent Work Button - Pinned to bottom */}
        <div className="mt-auto pt-4">
          <Dialog onOpenChange={handleDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm" className="w-full">
              <Activity className="h-4 w-4 mr-2" />
              View Recent Work
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

            {/* Extended Personality */}
            <div className="mt-4">
              <p className="text-xs font-semibold uppercase text-muted-foreground mb-2">
                Philosophy
              </p>
              <p className="text-sm text-muted-foreground">
                {founder.personality}
              </p>
            </div>

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
