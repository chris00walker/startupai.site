import { Card, CardContent } from '@/components/ui/card';
import type { DashboardMetric } from '@/data/agentActivity';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface TransparencyDashboardProps {
  metrics: DashboardMetric[];
}

export function TransparencyDashboard({
  metrics,
}: TransparencyDashboardProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {metrics.map((metric) => (
        <Card key={metric.id}>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-3xl font-bold">{metric.value}</p>
              <p className="text-sm text-muted-foreground mt-1">
                {metric.label}
              </p>
              {metric.change && (
                <div className="flex items-center justify-center gap-1 mt-2">
                  {metric.changeType === 'positive' && (
                    <TrendingUp className="h-3 w-3 text-green-500" />
                  )}
                  {metric.changeType === 'negative' && (
                    <TrendingDown className="h-3 w-3 text-red-500" />
                  )}
                  {metric.changeType === 'neutral' && (
                    <Minus className="h-3 w-3 text-muted-foreground" />
                  )}
                  <span
                    className={`text-xs ${
                      metric.changeType === 'positive'
                        ? 'text-green-500'
                        : metric.changeType === 'negative'
                          ? 'text-red-500'
                          : 'text-muted-foreground'
                    }`}
                  >
                    {metric.change}
                  </span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
