/* ══════════════════════════════════════════════════════════════════════
 *  📁  DESTINATION:
 *      frontend/src/components/ui/Input.tsx
 *
 *  🆕 CREATE NEW
 *
 *  📝  Text input UI primitive (h-11, rounded, focus rings using saffron color)
 *
 *  👉  Copy this entire file (including this header) to the destination above.
 *      You can delete this comment block after pasting — it's just a marker.
 * ══════════════════════════════════════════════════════════════════════ */

import { forwardRef, type InputHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ error, className, ...rest }, ref) => (
    <input
      ref={ref}
      className={cn(
        'h-11 w-full rounded-lg border bg-white px-3 text-base text-stone-900 placeholder:text-stone-400',
        'transition-colors duration-150',
        'focus:outline-none focus:ring-2 focus:ring-offset-1',
        error
          ? 'border-red-400 focus:border-red-500 focus:ring-red-400'
          : 'border-stone-300 focus:border-saffron-500 focus:ring-saffron-500',
        'disabled:cursor-not-allowed disabled:bg-stone-50 disabled:text-stone-500',
        className,
      )}
      {...rest}
    />
  ),
);
Input.displayName = 'Input';