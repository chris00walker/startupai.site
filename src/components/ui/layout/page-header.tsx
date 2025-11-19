import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const pageHeaderVariants = cva('flex flex-col', {
  variants: {
    variant: {
      default: 'space-y-1.5',
      centered: 'items-center text-center space-y-2',
      withActions:
        'sm:flex-row sm:items-center sm:justify-between sm:space-y-0 space-y-4',
    },
    spacing: {
      none: 'mb-0',
      sm: 'mb-4',
      default: 'mb-8',
      lg: 'mb-12',
    },
  },
  defaultVariants: {
    variant: 'default',
    spacing: 'default',
  },
});

export interface PageHeaderProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof pageHeaderVariants> {}

const PageHeader = React.forwardRef<HTMLDivElement, PageHeaderProps>(
  ({ className, variant, spacing, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(pageHeaderVariants({ variant, spacing }), className)}
        {...props}
      />
    );
  }
);
PageHeader.displayName = 'PageHeader';

const PageTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h1
    ref={ref}
    className={cn('text-3xl font-bold tracking-tight sm:text-4xl', className)}
    {...props}
  />
));
PageTitle.displayName = 'PageTitle';

const PageDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn('text-lg text-muted-foreground', className)}
    {...props}
  />
));
PageDescription.displayName = 'PageDescription';

const PageActions = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex flex-col gap-2 sm:flex-row sm:gap-3', className)}
    {...props}
  />
));
PageActions.displayName = 'PageActions';

export {
  PageHeader,
  PageTitle,
  PageDescription,
  PageActions,
  pageHeaderVariants,
};
