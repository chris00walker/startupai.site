import * as React from 'react';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge, type BadgeProps } from '@/components/ui/base/badge';

export interface TagProps extends BadgeProps {
  onRemove?: () => void;
  removable?: boolean;
}

const Tag = React.forwardRef<HTMLDivElement, TagProps>(
  ({ className, children, onRemove, removable = false, ...props }, ref) => {
    return (
      <Badge
        ref={ref}
        className={cn(
          'inline-flex items-center gap-1',
          removable && 'pr-1',
          className
        )}
        {...props}
      >
        {children}
        {removable && (
          <button
            type="button"
            onClick={onRemove}
            className="ml-1 rounded-full outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2"
          >
            <X className="h-3 w-3" />
            <span className="sr-only">Remove</span>
          </button>
        )}
      </Badge>
    );
  }
);
Tag.displayName = 'Tag';

export interface TagListProps extends React.HTMLAttributes<HTMLDivElement> {
  tags: Array<{ id: string; label: string; variant?: BadgeProps['variant'] }>;
  onRemove?: (id: string) => void;
  removable?: boolean;
}

const TagList = React.forwardRef<HTMLDivElement, TagListProps>(
  ({ className, tags, onRemove, removable = false, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('flex flex-wrap gap-2', className)}
        {...props}
      >
        {tags.map((tag) => (
          <Tag
            key={tag.id}
            variant={tag.variant}
            removable={removable}
            onRemove={() => onRemove?.(tag.id)}
          >
            {tag.label}
          </Tag>
        ))}
      </div>
    );
  }
);
TagList.displayName = 'TagList';

export { Tag, TagList };
