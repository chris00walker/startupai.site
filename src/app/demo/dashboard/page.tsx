'use client';

import * as React from 'react';
import { DashboardLayout } from '@/components/demo/DashboardLayout';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  Brain,
  Palette,
  Clock,
  Play,
  Pause,
  CheckCircle,
  AlertCircle,
  Users,
  TrendingUp,
  BarChart3,
  Zap,
} from 'lucide-react';

// Mock data for active workflows
const activeWorkflows = [
  {
    id: '1',
    client: 'TechStart Inc.',
    type: 'Discovery',
    progress: 75,
    status: 'running',
    estimatedCompletion: '2 hours',
    agent: 'Customer Discovery Agent',
  },
  {
    id: '2',
    client: 'CloudCorp',
    type: 'Validation',
    progress: 45,
    status: 'paused',
    estimatedCompletion: '4 hours',
    agent: 'Business Model Agent',
  },
  {
    id: '3',
    client: 'AppVenture',
    type: 'Scale',
    progress: 90,
    status: 'completed',
    estimatedCompletion: 'Completed',
    agent: 'Strategy Optimization Agent',
  },
];

const stats = [
  { label: 'Canvas Generated', value: '2,500+', icon: Palette, change: '+12%' },
  { label: 'Active Clients', value: '48', icon: Users, change: '+8%' },
  { label: 'Success Rate', value: '94%', icon: CheckCircle, change: '+2%' },
  { label: 'Avg. Generation Time', value: '<2s', icon: Zap, change: '-15%' },
];

export default function DemoDashboard() {
  return (
    <DashboardLayout breadcrumbs={[{ title: 'Dashboard' }]}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Welcome back!</h1>
            <p className="text-muted-foreground">
              Here's what's happening with your AI consulting platform today.
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Users className="h-4 w-4 mr-2" />
              Add Client
            </Button>
            <Button>
              <Palette className="h-4 w-4 mr-2" />
              New Canvas
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">
                        {stat.label}
                      </p>
                      <p className="text-2xl font-bold">{stat.value}</p>
                    </div>
                    <div className="flex flex-col items-end">
                      <IconComponent className="h-4 w-4 text-muted-foreground" />
                      <span className="text-xs text-green-600 font-medium">
                        {stat.change}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Active Workflows */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-5 w-5" />
              Active AI Workflows
            </CardTitle>
            <CardDescription>
              Multi-agent AI systems currently generating business insights
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {activeWorkflows.map((workflow) => (
                <div
                  key={workflow.id}
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      {workflow.status === 'running' && (
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                      )}
                      {workflow.status === 'paused' && (
                        <div className="w-2 h-2 bg-yellow-400 rounded-full" />
                      )}
                      {workflow.status === 'completed' && (
                        <div className="w-2 h-2 bg-blue-400 rounded-full" />
                      )}
                      <Badge
                        variant={
                          workflow.status === 'completed'
                            ? 'default'
                            : 'secondary'
                        }
                      >
                        {workflow.type}
                      </Badge>
                    </div>
                    <div>
                      <p className="font-medium">{workflow.client}</p>
                      <p className="text-sm text-muted-foreground">
                        {workflow.agent}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right min-w-[120px]">
                      <div className="flex items-center gap-2 mb-1">
                        <Progress value={workflow.progress} className="w-16" />
                        <span className="text-sm font-medium">
                          {workflow.progress}%
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {workflow.estimatedCompletion}
                      </p>
                    </div>
                    <div className="flex gap-1">
                      {workflow.status === 'running' && (
                        <Button size="sm" variant="outline">
                          <Pause className="h-3 w-3" />
                        </Button>
                      )}
                      {workflow.status === 'paused' && (
                        <Button size="sm" variant="outline">
                          <Play className="h-3 w-3" />
                        </Button>
                      )}
                      {workflow.status === 'completed' && (
                        <Button size="sm" variant="outline">
                          <CheckCircle className="h-3 w-3" />
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="cursor-pointer hover:shadow-md transition-shadow">
            <CardContent className="p-6 text-center">
              <Palette className="h-8 w-8 text-primary mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Value Proposition Canvas</h3>
              <p className="text-sm text-muted-foreground">
                Generate customer-focused value propositions
              </p>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:shadow-md transition-shadow">
            <CardContent className="p-6 text-center">
              <Brain className="h-8 w-8 text-primary mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Business Model Canvas</h3>
              <p className="text-sm text-muted-foreground">
                Create comprehensive business models
              </p>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:shadow-md transition-shadow">
            <CardContent className="p-6 text-center">
              <BarChart3 className="h-8 w-8 text-primary mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Testing Business Ideas</h3>
              <p className="text-sm text-muted-foreground">
                Validate concepts with structured experiments
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
