import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const blockLayoutVariants = cva(
  "w-full",
  {
    variants: {
      variant: {
        default: "bg-background",
        transparent: "bg-transparent",
        bordered: "border rounded-lg",
        elevated: "bg-card rounded-lg shadow-sm",
        muted: "bg-muted/50 rounded-lg",
      },
      padding: {
        none: "p-0",
        sm: "p-4",
        default: "p-6",
        lg: "p-8",
        xl: "p-10",
      },
      spacing: {
        none: "",
        sm: "space-y-2",
        default: "space-y-4",
        lg: "space-y-6",
        xl: "space-y-8",
      },
    },
    defaultVariants: {
      variant: "default",
      padding: "default",
      spacing: "default",
    },
  }
)

export interface BlockLayoutProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof blockLayoutVariants> {}

const BlockLayout = React.forwardRef<HTMLDivElement, BlockLayoutProps>(
  ({ className, variant, padding, spacing, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(blockLayoutVariants({ variant, padding, spacing }), className)}
        {...props}
      />
    )
  }
)
BlockLayout.displayName = "BlockLayout"

const BlockHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center justify-between", className)}
    {...props}
  />
))
BlockHeader.displayName = "BlockHeader"

const BlockTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn("text-lg font-semibold", className)}
    {...props}
  />
))
BlockTitle.displayName = "BlockTitle"

const BlockDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
BlockDescription.displayName = "BlockDescription"

const BlockContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("", className)}
    {...props}
  />
))
BlockContent.displayName = "BlockContent"

const BlockFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center justify-between pt-4", className)}
    {...props}
  />
))
BlockFooter.displayName = "BlockFooter"

export {
  BlockLayout,
  BlockHeader,
  BlockTitle,
  BlockDescription,
  BlockContent,
  BlockFooter,
  blockLayoutVariants,
}
