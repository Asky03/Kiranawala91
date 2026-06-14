import { cn } from '@/lib/utils';
import type { ShopStatus } from '@/types/shop';

const styles: Record<ShopStatus, string> = {
  PENDING: 'bg-amber-50 text-amber-800 border-amber-200',
  APPROVED: 'bg-forest-50 text-forest-800 border-forest-200',
  REJECTED: 'bg-red-50 text-red-700 border-red-200',
  SUSPENDED: 'bg-stone-100 text-stone-700 border-stone-300',
};

const labels: Record<ShopStatus, string> = {
  PENDING: 'Pending approval',
  APPROVED: 'Approved',
  REJECTED: 'Rejected',
  SUSPENDED: 'Suspended',
};

interface ShopStatusBadgeProps {
  status: ShopStatus;
  className?: string;
}

export function ShopStatusBadge({ status, className }: ShopStatusBadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium',
        styles[status],
        className,
      )}
    >
      {labels[status]}
    </span>
  );
}