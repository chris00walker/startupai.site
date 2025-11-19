'use client';

import * as React from 'react';
import Link from 'next/link';
import {
  BarChart3,
  Brain,
  Palette,
  FileText,
  Home,
  LayoutDashboard,
  Lightbulb,
  Settings,
  Users,
  Workflow,
} from 'lucide-react';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';

// Strategyzer AI navigation data
const navigationData = {
  main: [
    {
      title: 'Dashboard',
      url: '/demo/dashboard',
      icon: LayoutDashboard,
    },
    {
      title: 'Client Portfolio',
      url: '/demo/clients',
      icon: Users,
    },
    {
      title: 'Canvas Gallery',
      url: '/demo/canvas',
      icon: Palette,
    },
    {
      title: 'AI Workflows',
      url: '/demo/workflows',
      icon: Workflow,
    },
    {
      title: 'Analytics',
      url: '/demo/analytics',
      icon: BarChart3,
    },
  ],
  canvasTypes: [
    {
      title: 'Value Proposition Canvas',
      url: '/demo/canvas/vpc',
      icon: Lightbulb,
      description: 'Customer Profile + Value Map',
    },
    {
      title: 'Business Model Canvas',
      url: '/demo/canvas/bmc',
      icon: Brain,
      description: '9-block BMC structure',
    },
    {
      title: 'Testing Business Ideas',
      url: '/demo/canvas/tbi',
      icon: FileText,
      description: 'Experiment design framework',
    },
  ],
  settings: [
    {
      title: 'Back to Site',
      url: '/',
      icon: Home,
    },
    {
      title: 'Settings',
      url: '/demo/settings',
      icon: Settings,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <Link href="/product" className="block">
          <div className="flex items-center gap-2 px-2 py-2 hover:bg-accent rounded-lg transition-colors cursor-pointer">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Brain className="h-4 w-4" />
            </div>
            <div className="flex flex-col">
              <span className="text-base font-semibold">Strategyzer AI</span>
              <span className="text-xs text-muted-foreground">Live Demo</span>
            </div>
          </div>
        </Link>
      </SidebarHeader>

      <SidebarContent>
        {/* Main Navigation */}
        <SidebarGroup>
          <SidebarGroupLabel>Platform</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationData.main.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Canvas Types */}
        <SidebarGroup>
          <SidebarGroupLabel>Canvas Generation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationData.canvasTypes.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild tooltip={item.description}>
                    <Link href={item.url}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Settings */}
        <SidebarGroup className="mt-auto">
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationData.settings.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <div className="p-2"></div>
      </SidebarFooter>
    </Sidebar>
  );
}
