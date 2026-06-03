/* ══════════════════════════════════════════════════════════════════════
 *  📁  DESTINATION:
 *      frontend/src/components/ui/Label.tsx
 *
 *  🆕 CREATE NEW
 *
 *  📝  Form label UI primitive (small, medium weight, stone-700)
 *
 *  👉  Copy this entire file (including this header) to the destination above.
 *      You can delete this comment block after pasting — it's just a marker.
 * ══════════════════════════════════════════════════════════════════════ */

import type { LabelHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

export const Label = ({ className, ...rest }: LabelHTMLAttributes<HTMLLabelElement>) => (
  <label className={cn('mb-1.5 block text-sm font-medium text-stone-700', className)} {...rest} />
);