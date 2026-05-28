<div align="center">

# 🛒 Kiranawala

**A cloud-based platform connecting local Kirana stores with nearby customers.**

_An alternative to high-commission dark store quick-commerce._

[![Next.js](https://img.shields.io/badge/Next.js-14-black?logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://www.typescriptlang.org)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-blue?logo=postgresql)](https://www.postgresql.org)
[![Prisma](https://img.shields.io/badge/Prisma-5-2D3748?logo=prisma)](https://www.prisma.io)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

</div>

---

## 🚧 Status

Under active development. See [PROGRESS.md](./PROGRESS.md) for daily build log.

## 💡 The Problem

Local Kirana stores power Indian neighbourhoods but stay invisible online. Existing quick-commerce platforms charge 25-30% commission and don't represent these small shops. Kiranawala gives Kirana shopkeepers a direct digital channel — zero commission, full ownership of customer relationships.

## 🏗️ Architecture

```
Customer / Shopkeeper / Admin
        ↓
   Next.js (Vercel)
        ↓ HTTPS + JWT
   Express API (Render)
        ↓ Prisma
   PostgreSQL (Neon)
```

## 🚀 Tech Stack

| Layer        | Technology                                   |
| ------------ | -------------------------------------------- |
| Frontend     | Next.js 14, TypeScript, Tailwind, shadcn/ui  |
| Backend      | Node.js, Express.js, TypeScript              |
| Database     | PostgreSQL 16 + Prisma ORM                   |
| Auth         | JWT + bcrypt, role-based access control      |
| Validation   | Zod                                          |
| Logging      | Pino                                         |
| Testing      | Vitest, Supertest                            |
| Deployment   | Vercel (FE), Render (BE), Neon (DB)          |

## 👥 Roles

- **Customer** — discover shops, browse products, place pickup/delivery orders
- **Shopkeeper** — manage shop, products, inventory, incoming orders
- **Admin** — approve shops, monitor platform activity

## 📋 Prerequisites

- Node.js v20+
- pnpm v9+
- PostgreSQL 16+
- Git
- VS Code



---

## 🛠️ Quick Start

```bash
# Clone
git clone https://github.com/YOUR-USERNAME/kiranawala.git
cd kiranawala

# Install all workspaces
pnpm install

# Setup env files
cp backend/.env.example backend/.env
cp frontend/.env.local.example frontend/.env.local
# Edit backend/.env with your DATABASE_URL

# Run migrations
pnpm --filter backend prisma:migrate

# Run dev servers (separate terminals)
pnpm dev:backend   # → http://localhost:4000
pnpm dev:frontend  # → http://localhost:3000
```

## 📁 Project Structure

```
kiranawala/
├── backend/      # Express API + Prisma
├── frontend/     # Next.js 14 App Router
├── docs/         # Architecture, API, DB docs
└── .github/      # CI/CD workflows
```

## 📜 License

MIT — see [LICENSE](./LICENSE)
