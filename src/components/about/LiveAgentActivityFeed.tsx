'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Loader2 } from 'lucide-react';
import { useActivities, type PublicActivity } from '@/lib/api';
import type { AgentActivity } from '@/data/agentActivity';

interface LiveAgentActivityFeedProps {
  /** Fallback activities to show during loading or if API fails */
  fallbackActivities: AgentActivity[];
  /** Maximum items to display */
  maxItems?: number;
  /** Auto-refresh interval in milliseconds (0 = disabled) */
  refreshInterval?: number;
}

const avatarMap: Record<string, string> = {
  Guardian: '/images/founders/guardian.png',
  Sage: '/images/founders/sage.png',
  Forge: '/images/founders/forge.png',
  Pulse: '/images/founders/pulse.png',
  Compass: '/images/founders/compass.png',
  Ledger: '/images/founders/ledger.png',
};

/**
 * LiveAgentActivityFeed - Client component that fetches real activity data
 *
 * Falls back to provided static data during:
 * - Initial server render
 * - Loading state
 * - API errors
 * - When no real data is available
 */
export function LiveAgentActivityFeed({
  fallbackActivities,
  maxItems = 8,
  refreshInterval = 60000, // Refresh every minute by default
}: LiveAgentActivityFeedProps) {
  const { activities, loading, error, refresh } = useActivities({
    limit: maxItems,
    refreshInterval,
  });

  // Use real data if available, otherwise fall back to static data
  const displayActivities: (PublicActivity | AgentActivity)[] =
    activities.length > 0 ? activities : fallbackActivities.slice(0, maxItems);

  // Show subtle loading indicator on refresh (not initial load)
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    if (!loading && isRefreshing) {
      setIsRefreshing(false);
    }
  }, [loading, isRefreshing]);

  const handleRefresh = () => {
    setIsRefreshing(true);
    refresh();
  };

  return (
    <div className="space-y-4">
      {/* Status indicator */}
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <span>
          {activities.length > 0 ? (
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              Live data
            </span>
          ) : (
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 bg-yellow-500 rounded-full" />
              Sample data
            </span>
          )}
        </span>
        {activities.length > 0 && (
          <button
            onClick={handleRefresh}
            className="hover:text-foreground transition-colors flex items-center gap-1"
            disabled={loading}
          >
            {isRefreshing ? (
              <Loader2 className="h-3 w-3 animate-spin" />
            ) : (
              'Refresh'
            )}
          </button>
        )}
      </div>

      {/* Activity items */}
      {displayActivities.map((activity) => {
        const avatarUrl =
          avatarMap[activity.agentName] || '/images/founders/sage.png';

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
              <p className="text-sm text-muted-foreground">{activity.activity}</p>
              {activity.metric && (
                <p className="text-xs text-primary mt-1">{activity.metric}</p>
              )}
            </div>
          </div>
        );
      })}

      {/* Error state (show below feed, don't replace it) */}
      {error && activities.length === 0 && (
        <p className="text-xs text-muted-foreground text-center py-2">
          Using sample data (API unavailable)
        </p>
      )}
    </div>
  );
}
