'use client';

import { useEffect, useState } from 'react';
import { api } from '@/lib/api';

interface HealthData {
  status: string;
  database?: string;
  uptime?: number;
  timestamp?: string;
}

// Defining the state shape as a named type — keeps useState<HealthState>
// on a single line so the generic angle brackets can't get mangled by paste.
type HealthState =
  | { kind: 'loading' }
  | { kind: 'ok'; data: HealthData }
  | { kind: 'error'; message: string };

export function HealthStatus() {
  const [state, setState] = useState<HealthState>({ kind: 'loading' });

  useEffect(() => {
    api.get<HealthData>('/api/health').then((result) => {
      if (result.success) {
        setState({ kind: 'ok', data: result.data });
      } else {
        setState({ kind: 'error', message: result.error.message });
      }
    });
  }, []);

  if (state.kind === 'loading') {
    return (
      <div className="flex items-center gap-2 text-sm text-stone-500">
        <span className="h-2 w-2 animate-pulse rounded-full bg-stone-400" />
        Checking backend…
      </div>
    );
  }

  if (state.kind === 'error') {
    return (
      <div className="flex items-center gap-2 text-sm text-red-600">
        <span className="h-2 w-2 rounded-full bg-red-500" />
        Backend offline: {state.message}
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2 text-sm text-forest-700">
      <span className="h-2 w-2 rounded-full bg-forest-500" />
      Backend connected — DB {state.data.database ?? 'ok'}
    </div>
  );
}