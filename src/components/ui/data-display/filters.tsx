import * as React from "react"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/base/badge"
import { Button } from "@/components/ui/base/button"
import { X } from "lucide-react"

export interface Filter {
  id: string
  label: string
  value: string
  category?: string
}

export interface FilterBadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  filter: Filter
  onRemove?: (filter: Filter) => void
}

const FilterBadge = React.forwardRef<HTMLDivElement, FilterBadgeProps>(
  ({ className, filter, onRemove, ...props }, ref) => {
    return (
      <Badge
        ref={ref}
        variant="secondary"
        className={cn("inline-flex items-center gap-1 pr-1", className)}
        {...props}
      >
        {filter.category && (
          <span className="text-muted-foreground">{filter.category}:</span>
        )}
        <span>{filter.label}</span>
        {onRemove && (
          <button
            type="button"
            onClick={() => onRemove(filter)}
            className="ml-1 rounded-full outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2"
          >
            <X className="h-3 w-3" />
            <span className="sr-only">Remove filter</span>
          </button>
        )}
      </Badge>
    )
  }
)
FilterBadge.displayName = "FilterBadge"

export interface FilterBarProps extends React.HTMLAttributes<HTMLDivElement> {
  filters: Filter[]
  onRemoveFilter?: (filter: Filter) => void
  onClearAll?: () => void
  showClearAll?: boolean
}

const FilterBar = React.forwardRef<HTMLDivElement, FilterBarProps>(
  ({ className, filters, onRemoveFilter, onClearAll, showClearAll = true, ...props }, ref) => {
    if (filters.length === 0) return null

    return (
      <div
        ref={ref}
        className={cn("flex flex-wrap items-center gap-2", className)}
        {...props}
      >
        <span className="text-sm text-muted-foreground">Active filters:</span>
        {filters.map((filter) => (
          <FilterBadge
            key={filter.id}
            filter={filter}
            onRemove={onRemoveFilter}
          />
        ))}
        {showClearAll && filters.length > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearAll}
            className="h-7 px-2 text-xs"
          >
            Clear all
          </Button>
        )}
      </div>
    )
  }
)
FilterBar.displayName = "FilterBar"

export interface FilterGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  children: React.ReactNode
}

const FilterGroup = React.forwardRef<HTMLDivElement, FilterGroupProps>(
  ({ className, title, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("space-y-2", className)}
        {...props}
      >
        <h4 className="text-sm font-medium">{title}</h4>
        <div className="space-y-1">{children}</div>
      </div>
    )
  }
)
FilterGroup.displayName = "FilterGroup"

export { FilterBadge, FilterBar, FilterGroup }
