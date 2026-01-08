'use client';

import { useMetrics, type DashboardMetric } from '@/lib/api';
import { ArrowUpRight, ArrowDownRight, Minus, Loader2 } from 'lucide-react';

interface LiveMetricsDashboardProps {
  /** Fallback metrics for initial render / errors */
  fallbackMetrics?: DashboardMetric[];
  /** Auto-refresh interval in ms (0 = disabled) */
  refreshInterval?: number;
}

/**
 * LiveMetricsDashboard - Displays real-time aggregate metrics
 */
export function LiveMetricsDashboard({
  fallbackMetrics = [],
  refreshInterval = 300000, // 5 minutes default
}: LiveMetricsDashboardProps) {
  const { metrics, loading, error, summary } = useMetrics({ refreshInterval });

  // Use real metrics if available
  const displayMetrics = metrics.length > 0 ? metrics : fallbackMetrics;

  const getTrendIcon = (changeType?: string) => {
    switch (changeType) {
      case 'positive':
        return <ArrowUpRight className="h-3 w-3 text-green-500" />;
      case 'negative':
        return <ArrowDownRight className="h-3 w-3 text-red-500" />;
      default:
        return <Minus className="h-3 w-3 text-muted-foreground" />;
    }
  };

  return (
    <div className="space-y-4">
      {/* Status bar */}
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <span className="flex items-center gap-1">
          {metrics.length > 0 ? (
            <>
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              Live metrics
            </>
          ) : loading ? (
            <>
              <Loader2 className="h-3 w-3 animate-spin" />
              Loading...
            </>
          ) : (
            <>
              <span className="w-2 h-2 bg-yellow-500 rounded-full" />
              Sample data
            </>
          )}
        </span>
        {summary && (
          <span>
            {summary.totalValidations} total validations
          </span>
        )}
      </div>

      {/* Metrics grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {displayMetrics.map((metric) => (
          <div
            key={metric.id}
            className="bg-muted/50 rounded-lg p-4 hover:bg-muted transition-colors"
          >
            <p className="text-2xl font-bold">{metric.value}</p>
            <p className="text-sm text-muted-foreground">{metric.label}</p>
            {metric.change && (
              <div className="flex items-center gap-1 mt-1 text-xs">
                {getTrendIcon(metric.changeType)}
                <span
                  className={
                    metric.changeType === 'positive'
                      ? 'text-green-600'
                      : metric.changeType === 'negative'
                        ? 'text-red-600'
                        : 'text-muted-foreground'
                  }
                >
                  {metric.change}
                </span>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Error state */}
      {error && metrics.length === 0 && (
        <p className="text-xs text-muted-foreground text-center">
          Using sample data (metrics API unavailable)
        </p>
      )}
    </div>
  );
}
