import { createApp } from './app';
import { env } from './config/env';
import { prisma } from './config/db';
import { logger } from './utils/logger';

async function bootstrap() {
  // Verify DB connection at boot — fail fast if unreachable
  try {
    await prisma.$connect();
    logger.info('✅ Database connected');
  } catch (err) {
    logger.fatal({ err }, '❌ Database connection failed');
    process.exit(1);
  }

  const app = createApp();

  const server = app.listen(env.PORT, () => {
    logger.info(`🚀 Kiranawala API ready on http://localhost:${env.PORT}`);
    logger.info(`   Environment: ${env.NODE_ENV}`);
    logger.info(`   Health: http://localhost:${env.PORT}/api/health`);
  });

  // ─── Graceful shutdown ──────────────────────────────────
  const shutdown = async (signal: string) => {
    logger.info(`${signal} received — shutting down gracefully`);
    server.close(async () => {
      await prisma.$disconnect();
      logger.info('Cleanup complete — exiting');
      process.exit(0);
    });

    // Force exit after 10s if graceful fails
    setTimeout(() => {
      logger.error('Graceful shutdown timed out — force exit');
      process.exit(1);
    }, 10_000);
  };

  process.on('SIGTERM', () => shutdown('SIGTERM'));
  process.on('SIGINT', () => shutdown('SIGINT'));
}

bootstrap().catch((err) => {
  logger.fatal({ err }, 'Fatal bootstrap error');
  process.exit(1);
});
