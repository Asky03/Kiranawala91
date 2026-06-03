/* ══════════════════════════════════════════════════════════════════════
 *  📁  DESTINATION:
 *      frontend/src/components/ui/Button.tsx
 *
 *  🆕 CREATE NEW
 *
 *  📝  Button UI primitive with variants: primary (saffron), secondary (forest), ghost, danger, admin (graphite)
 *
 *  👉  Copy this entire file (including this header) to the destination above.
 *      You can delete this comment block after pasting — it's just a marker.
 * ══════════════════════════════════════════════════════════════════════ */

import { forwardRef, type ButtonHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

type Variant = 'primary' | 'secondary' | 'ghost' | 'danger' | 'admin';
type Size = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
}

const variantClasses: Record<Variant, string> = {
  primary:
    'bg-saffron-600 text-white hover:bg-saffron-700 focus-visible:ring-saffron-500 disabled:bg-saffron-300',
  secondary:
    'bg-forest-600 text-white hover:bg-forest-700 focus-visible:ring-forest-500 disabled:bg-forest-300',
  ghost:
    'bg-transparent text-stone-700 hover:bg-stone-100 focus-visible:ring-stone-400',
  danger:
    'bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-500 disabled:bg-red-300',
  // Distinct color for admin context — graphite, not brand
  admin:
    'bg-stone-900 text-white hover:bg-stone-800 focus-visible:ring-stone-700 disabled:bg-stone-400',
};

const sizeClasses: Record<Size, string> = {
  sm: 'h-9 px-3 text-sm',
  md: 'h-11 px-4 text-base',
  lg: 'h-12 px-6 text-base',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', loading, className, children, disabled, ...rest }, ref) => (
    <button
      ref={ref}
      disabled={disabled || loading}
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-lg font-medium',
        'transition-colors duration-150',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
        'disabled:cursor-not-allowed disabled:opacity-70',
        variantClasses[variant],
        sizeClasses[size],
        className,
      )}
      {...rest}
    >
      {loading && (
        <span
          className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"
          aria-hidden
        />
      )}
      {children}
    </button>
  ),
);
Button.displayName = 'Button';