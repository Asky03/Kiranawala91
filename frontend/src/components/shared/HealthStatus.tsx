import { apiFetch } from '@/lib/api';
import { cn } from '@/lib/utils';
import { CheckCircle2, XCircle, Activity } from 'lucide-react';

type HealthData = {
  status: string;
  timestamp: string;
  service: string;
  version: string;
  database: string;
  uptime: number;
};

export async function HealthStatus() {
  const result = await apiFetch<HealthData>('/api/health');

  const isHealthy = result.success && result.data.status === 'ok';

  return (
    <div
      className={cn(
        'inline-flex items-center gap-3 rounded-full px-4 py-2 border',
        isHealthy
          ? 'bg-forest-50 border-forest-200 text-forest-700'
          : 'bg-red-50 border-red-200 text-red-700',
      )}
    >
      {isHealthy ? (
        <>
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-forest-400 opacity-75" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-forest-500" />
          </span>
          <span className="text-sm font-medium">
            API live · DB connected · v{result.data.version}
          </span>
        </>
      ) : (
        <>
          <XCircle className="h-4 w-4" />
          <span className="text-sm font-medium">
            API offline
            {!result.success && ` — ${result.error.message}`}
          </span>
        </>
      )}
    </div>
  );
}
