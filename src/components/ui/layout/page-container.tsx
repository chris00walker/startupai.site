import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const pageContainerVariants = cva('mx-auto w-full', {
  variants: {
    variant: {
      full: 'px-0',
      centered: 'container px-4 sm:px-6 lg:px-8',
      narrow: 'max-w-4xl px-4 sm:px-6 lg:px-8',
      wide: 'max-w-7xl px-4 sm:px-6 lg:px-8',
    },
    padding: {
      none: 'py-0',
      sm: 'py-4 sm:py-6',
      default: 'py-8 sm:py-12',
      lg: 'py-12 sm:py-16 lg:py-20',
    },
  },
  defaultVariants: {
    variant: 'centered',
    padding: 'default',
  },
});

export interface PageContainerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof pageContainerVariants> {}

const PageContainer = React.forwardRef<HTMLDivElement, PageContainerProps>(
  ({ className, variant, padding, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(pageContainerVariants({ variant, padding }), className)}
        {...props}
      />
    );
  }
);
PageContainer.displayName = 'PageContainer';

export { PageContainer, pageContainerVariants };
