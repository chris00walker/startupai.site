'use client';

import * as React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from './dialog';
import { cn } from '@/lib/utils';

export interface ModalProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children?: React.ReactNode;
  className?: string;
}

const Modal = React.forwardRef<HTMLDivElement, ModalProps>(
  ({ open, onOpenChange, children, className }, ref) => {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent ref={ref} className={className}>
          {children}
        </DialogContent>
      </Dialog>
    );
  }
);
Modal.displayName = 'Modal';

const ModalHeader = DialogHeader;
ModalHeader.displayName = 'ModalHeader';

const ModalFooter = DialogFooter;
ModalFooter.displayName = 'ModalFooter';

const ModalTitle = DialogTitle;
ModalTitle.displayName = 'ModalTitle';

const ModalDescription = DialogDescription;
ModalDescription.displayName = 'ModalDescription';

export interface ModalBodyProps extends React.HTMLAttributes<HTMLDivElement> {}

const ModalBody = React.forwardRef<HTMLDivElement, ModalBodyProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('py-4', className)} {...props} />
  )
);
ModalBody.displayName = 'ModalBody';

export {
  Modal,
  ModalHeader,
  ModalFooter,
  ModalTitle,
  ModalDescription,
  ModalBody,
};
