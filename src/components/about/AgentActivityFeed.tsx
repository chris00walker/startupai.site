import Image from 'next/image';
import type { AgentActivity } from '@/data/agentActivity';

interface AgentActivityFeedProps {
  activities: AgentActivity[];
  maxItems?: number;
}

const avatarMap: Record<string, string> = {
  Sage: '/images/founders/sage.png',
  Forge: '/images/founders/forge.png',
  Pulse: '/images/founders/pulse.png',
  Compass: '/images/founders/compass.png',
};

export function AgentActivityFeed({
  activities,
  maxItems = 8,
}: AgentActivityFeedProps) {
  const displayActivities = activities.slice(0, maxItems);

  return (
    <div className="space-y-4">
      {displayActivities.map((activity) => {
        const avatarUrl = avatarMap[activity.agentName] || '/images/founders/sage.png';

        return (
          <div
            key={activity.id}
            className="flex items-start gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
          >
            <div className="flex-shrink-0 w-8 h-8 rounded-full overflow-hidden">
              <Image
                src={avatarUrl}
                alt={activity.agentName}
                width={32}
                height={32}
                className="object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-semibold text-sm">
                  {activity.agentName}
                </span>
                <span className="text-xs text-muted-foreground">
                  {activity.timestamp}
                </span>
              </div>
              <p className="text-sm text-muted-foreground">
                {activity.activity}
              </p>
              {activity.metric && (
                <p className="text-xs text-primary mt-1">{activity.metric}</p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
