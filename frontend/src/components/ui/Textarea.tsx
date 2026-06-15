import { forwardRef, type TextareaHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ error, className, rows = 4, ...rest }, ref) => (
    <textarea
      ref={ref}
      rows={rows}
      className={cn(
        'w-full rounded-lg border bg-white px-3 py-2 text-base text-stone-900 placeholder:text-stone-400',
        'transition-colors duration-150',
        'focus:outline-none focus:ring-2 focus:ring-offset-1',
        error
          ? 'border-red-400 focus:border-red-500 focus:ring-red-400'
          : 'border-stone-300 focus:border-saffron-500 focus:ring-saffron-500',
        'disabled:cursor-not-allowed disabled:bg-stone-50 disabled:text-stone-500',
        'resize-y',
        className,
      )}
      {...rest}
    />
  ),
);
Textarea.displayName = 'Textarea';