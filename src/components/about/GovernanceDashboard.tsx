'use client';

import { Card, CardContent } from '@/components/ui/card';
import { TrendingUp, Shield } from 'lucide-react';
import type { DashboardMetric } from '@/data/agentActivity';

interface GovernanceDashboardProps {
  layer1Metrics: DashboardMetric[];
  layer2Metrics: DashboardMetric[];
  securityScore?: number;
}

export function GovernanceDashboard({
  layer1Metrics,
  layer2Metrics,
  securityScore = 99.2,
}: GovernanceDashboardProps) {
  return (
    <div className="space-y-8">
      {/* Security Score - Prominent Display */}
      <div className="bg-gradient-to-r from-slate-50 to-blue-50 rounded-lg p-6 border border-slate-200">
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Shield className="h-5 w-5 text-slate-600" />
            <p className="text-sm text-muted-foreground">System Security Score</p>
          </div>
          <p className="text-5xl font-bold text-slate-800">{securityScore}%</p>
          <div className="flex items-center justify-center gap-2 mt-2">
            <TrendingUp className="h-4 w-4 text-green-500" />
            <span className="text-xs text-green-600">All systems secure</span>
          </div>
        </div>
      </div>

      {/* Two-Layer Metrics */}
      <div className="grid md:grid-cols-2 gap-8">
        {/* Layer 1: Governance Layer */}
        <div>
          <h4 className="text-sm font-semibold text-muted-foreground mb-4 uppercase tracking-wide">
            Layer 1: Governance Rules
          </h4>
          <div className="grid grid-cols-2 gap-3">
            {layer1Metrics.map((metric) => (
              <Card key={metric.id}>
                <CardContent className="pt-4 pb-3">
                  <p className="text-2xl font-bold">{metric.value}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {metric.label}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Layer 2: Guardian */}
        <div>
          <h4 className="text-sm font-semibold text-muted-foreground mb-4 uppercase tracking-wide">
            Layer 2: Guardian Intelligence
          </h4>
          <div className="grid grid-cols-2 gap-3">
            {layer2Metrics.map((metric) => (
              <Card key={metric.id} className="border-slate-300 bg-slate-50">
                <CardContent className="pt-4 pb-3">
                  <p className="text-2xl font-bold text-slate-700">{metric.value}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {metric.label}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Explanation */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-sm text-blue-900">
          <strong>Two-Layer Defense:</strong> Our governance layer catches known threats with deterministic rules. Guardian catches emerging threats by monitoring governance patterns in real-time.
        </p>
      </div>
    </div>
  );
}
