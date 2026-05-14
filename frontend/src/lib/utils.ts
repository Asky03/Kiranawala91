import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merge Tailwind classes, resolving conflicts.
 * Usage: cn('p-4', condition && 'p-8') → 'p-8' (later wins for same property)
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
