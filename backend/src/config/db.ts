import { PrismaClient } from '@prisma/client';
import { isDev } from './env';

/**
 * Prisma client singleton.
 * In dev with hot-reload, we attach to globalThis to avoid creating
 * multiple connections that exhaust the DB connection pool.
 */
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: isDev ? ['query', 'error', 'warn'] : ['error'],
  });

if (isDev) globalForPrisma.prisma = prisma;
