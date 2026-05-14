import pino from 'pino';
import { env, isDev } from '../config/env';

/**
 * Structured JSON logger. In dev, pretty-printed to console.
 * In production, raw JSON for log aggregators (Datadog, CloudWatch, etc.)
 */
export const logger = pino({
  level: env.LOG_LEVEL,
  transport: isDev
    ? {
        target: 'pino-pretty',
        options: {
          colorize: true,
          translateTime: 'HH:MM:ss.l',
          ignore: 'pid,hostname',
        },
      }
    : undefined,
});
