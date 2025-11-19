'use client';

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const sidebarVariants = cva('flex flex-col h-full', {
  variants: {
    variant: {
      default: 'bg-background border-r',
      elevated: 'bg-card shadow-lg',
      transparent: 'bg-transparent',
    },
    size: {
      sm: 'w-48',
      default: 'w-64',
      lg: 'w-80',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
  },
});

export interface SidebarProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof sidebarVariants> {
  collapsible?: boolean;
  collapsed?: boolean;
  onCollapsedChange?: (collapsed: boolean) => void;
}

const Sidebar = React.forwardRef<HTMLDivElement, SidebarProps>(
  (
    {
      className,
      variant,
      size,
      children,
      collapsible,
      collapsed,
      onCollapsedChange,
      ...props
    },
    ref
  ) => {
    return (
      <aside
        ref={ref}
        className={cn(
          sidebarVariants({ variant, size }),
          collapsed && 'w-16',
          'transition-all duration-300',
          className
        )}
        {...props}
      >
        {children}
      </aside>
    );
  }
);
Sidebar.displayName = 'Sidebar';

const SidebarHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex items-center px-4 py-3 border-b', className)}
    {...props}
  />
));
SidebarHeader.displayName = 'SidebarHeader';

const SidebarContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex-1 overflow-y-auto px-3 py-4', className)}
    {...props}
  />
));
SidebarContent.displayName = 'SidebarContent';

const SidebarFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('px-4 py-3 border-t', className)} {...props} />
));
SidebarFooter.displayName = 'SidebarFooter';

const SidebarGroup = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('mb-4', className)} {...props} />
));
SidebarGroup.displayName = 'SidebarGroup';

const SidebarGroupLabel = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn(
      'mb-2 px-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider',
      className
    )}
    {...props}
  />
));
SidebarGroupLabel.displayName = 'SidebarGroupLabel';

const SidebarMenu = React.forwardRef<
  HTMLUListElement,
  React.HTMLAttributes<HTMLUListElement>
>(({ className, ...props }, ref) => (
  <ul ref={ref} className={cn('space-y-1', className)} {...props} />
));
SidebarMenu.displayName = 'SidebarMenu';

const SidebarMenuItem = React.forwardRef<
  HTMLLIElement,
  React.HTMLAttributes<HTMLLIElement>
>(({ className, ...props }, ref) => (
  <li ref={ref} className={cn('', className)} {...props} />
));
SidebarMenuItem.displayName = 'SidebarMenuItem';

const sidebarMenuButtonVariants = cva(
  'flex w-full items-center rounded-md px-2 py-2 text-sm font-medium transition-colors',
  {
    variants: {
      variant: {
        default: 'hover:bg-accent hover:text-accent-foreground',
        active: 'bg-accent text-accent-foreground',
        ghost: 'hover:bg-transparent hover:text-foreground',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface SidebarMenuButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof sidebarMenuButtonVariants> {
  isActive?: boolean;
}

const SidebarMenuButton = React.forwardRef<
  HTMLButtonElement,
  SidebarMenuButtonProps
>(({ className, variant, isActive, ...props }, ref) => (
  <button
    ref={ref}
    className={cn(
      sidebarMenuButtonVariants({ variant: isActive ? 'active' : variant }),
      className
    )}
    {...props}
  />
));
SidebarMenuButton.displayName = 'SidebarMenuButton';

export {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  sidebarVariants,
  sidebarMenuButtonVariants,
};
