# Kiranawala Backend

Express.js + TypeScript + Prisma + PostgreSQL.

## Setup

```bash
# From /backend
pnpm install
cp .env.example .env       # then edit DATABASE_URL
pnpm prisma:generate
pnpm prisma:migrate
pnpm dev                   # → http://localhost:4000
```

## Scripts

| Command                | Purpose                                |
| ---------------------- | -------------------------------------- |
| `pnpm dev`             | Start dev server with hot reload (tsx) |
| `pnpm build`           | Compile TypeScript to `dist/`          |
| `pnpm start`           | Run compiled production build          |
| `pnpm lint`            | Run ESLint                             |
| `pnpm prisma:generate` | Generate Prisma client from schema     |
| `pnpm prisma:migrate`  | Create + apply a migration             |
| `pnpm prisma:studio`   | Open Prisma's DB GUI                   |
| `pnpm prisma:reset`    | Drop DB + reapply migrations (CAREFUL) |

## Structure

```
src/
├── config/        # env loader, prisma client
├── modules/       # feature modules (auth, shop, product, order, admin)
│   └── health/    # /api/health
├── middleware/    # auth, role, error, validation
├── utils/         # ApiError, ApiResponse, asyncHandler, logger
├── app.ts         # Express app composition
└── server.ts      # Bootstrap + graceful shutdown
```

## API Response Shape

**Success:**

```json
{
  "success": true,
  "data": { ... },
  "message": "Optional message"
}
```

**Error:**

```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Human-readable message",
    "details": { ... }
  }
}
```
