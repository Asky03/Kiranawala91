<div align="center">

# 🛒 Kiranawala

**A cloud-based platform connecting local Kirana stores with nearby customers.**

_A zero-commission alternative to high-commission quick-commerce._

[![Next.js](https://img.shields.io/badge/Next.js-14-black?logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://www.typescriptlang.org)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-blue?logo=postgresql)](https://www.postgresql.org)
[![Prisma](https://img.shields.io/badge/Prisma-5-2D3748?logo=prisma)](https://www.prisma.io)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

</div>

---

## 🚧 Status

**Day 3 of 12 complete.** Auth + shop module live. See [PROGRESS.md](./PROGRESS.md) for the daily build log.

```
[■■■□□□□□□□□□]  Day 3 / 12
```

**What works today:**
- ✅ Landing page with brand identity
- ✅ Signup + login (customer, shopkeeper)
- ✅ JWT authentication with httpOnly cookies
- ✅ Role-based route protection (Next.js edge middleware)
- ✅ Separate admin login at `/admin/login`
- ✅ Shopkeeper: create shop, edit shop, view approval status
- ✅ Admin: review pending shops, approve or reject with reason
- ✅ Rejected shops can be edited and resubmitted

**What's coming:**
- ⏳ Day 4: Product & inventory management
- ⏳ Day 4.5: UI polish pass
- ⏳ Day 5: Customer shop discovery
- ⏳ Day 6+: Orders, checkout, reviews, deployment

---

## 💡 The Problem

Local kirana stores power Indian neighbourhoods but stay invisible online. Existing quick-commerce platforms charge 25-30% commission and don't represent these small shops. Kiranawala gives kirana shopkeepers a direct digital channel — zero commission, full ownership of customer relationships.

---

## 🏗️ Architecture

```
                    Customer / Shopkeeper / Admin
                              │
                        ┌─────┴─────┐
                        │  Next.js  │  (Vercel)
                        │  App Rtr  │
                        └─────┬─────┘
                              │ HTTPS + JWT (httpOnly cookie)
                        ┌─────┴─────┐
                        │  Express  │  (Render)
                        │    API    │
                        └─────┬─────┘
                              │ Prisma
                        ┌─────┴─────┐
                        │ PostgreSQL │  (Neon)
                        └───────────┘
```

**One backend, one frontend, one domain.** Public pages (`/`, future shop browse) are indexed and public. Auth-gated experiences (`/dashboard`, `/admin`) segregate by role via edge middleware. Admin is a separate URL surface (`/admin/*`) with its own login, not linked from public nav.

---

## 🚀 Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | Next.js 14 (App Router), TypeScript, Tailwind CSS, Zustand |
| Backend | Node.js 20, Express, TypeScript, Zod |
| Database | PostgreSQL 16 + Prisma ORM |
| Auth | JWT (httpOnly cookies) + bcrypt (12 rounds) |
| Edge auth | `jose` (Next.js Edge runtime JWT verify) |
| Logging | Pino (structured JSON logs) |
| Testing | Vitest + Supertest (planned Day 8) |
| Deployment | Vercel (FE), Render (BE), Neon (DB) — planned Day 11 |

---

## 👥 Roles

- **Customer** — discover shops, browse products, place pickup/delivery orders
- **Shopkeeper** — create shop, manage inventory, accept incoming orders
- **Admin** — approve shops, moderate content, monitor platform health

Signup is restricted to CUSTOMER and SHOPKEEPER. Admin accounts are seeded (never self-registered) — see [Test credentials](#-test-credentials) below.

---

## 📋 Prerequisites

- Node.js v20+
- pnpm v9+
- PostgreSQL 16 (running as a service or via Docker)
- Git

---

## 🛠️ Quick Start

```bash
# 1. Clone
git clone https://github.com/YOUR-USERNAME/kiranawala.git
cd kiranawala

# 2. Install all workspaces
pnpm install

# 3. Setup env files
cp backend/.env.example backend/.env
cp frontend/.env.local.example frontend/.env.local

# 4. Generate a JWT secret and paste into BOTH env files
#    Windows PowerShell:
#      [Convert]::ToBase64String((1..64 | % { Get-Random -Max 256 }))
#    Mac/Linux/Git Bash:
#      openssl rand -base64 64
#
#    Set the SAME value in:
#      backend/.env       → JWT_SECRET=...
#      frontend/.env.local → JWT_SECRET=...

# 5. Set DATABASE_URL in backend/.env to your local Postgres

# 6. Start Postgres (Windows service example)
#    Start-Service postgresql-x64-16

# 7. Run migrations
pnpm --filter backend prisma migrate dev

# 8. Seed test users
pnpm --filter backend exec tsx prisma/seed.ts

# 9. Run dev servers (two terminals)
pnpm dev:backend    # → http://localhost:4000
pnpm dev:frontend   # → http://localhost:3000
```

---

## 🔑 Test Credentials

Seeded by `prisma/seed.ts`. **Never use in production.**

| Role | Email | Password | Login URL |
|------|-------|----------|-----------|
| Customer | `customer@kiranawala.local` | `Customer@12345` | `/login` |
| Shopkeeper | `shopkeeper@kiranawala.local` | `Shop@12345` | `/login` |
| Admin | `admin@kiranawala.local` | `Admin@12345` | `/admin/login` |

---

## 📡 API Reference

Base URL: `http://localhost:4000`

### Health
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/health` | none | Server + DB connectivity check |

### Auth
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/auth/register` | none | Create customer/shopkeeper account |
| POST | `/api/auth/login` | none | Sign in, sets JWT cookie |
| POST | `/api/auth/login?as=admin` | none | Admin-only login (rejects non-admins) |
| POST | `/api/auth/logout` | none | Clear JWT cookie |
| GET | `/api/auth/me` | any | Get current user |

### Shops
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/shops/me` | Shopkeeper | Create my shop |
| GET | `/api/shops/me` | Shopkeeper | Get my shop |
| PATCH | `/api/shops/me` | Shopkeeper | Edit my shop |
| GET | `/api/shops/pending` | Admin | List pending approvals |
| POST | `/api/shops/:id/approve` | Admin | Approve a shop |
| POST | `/api/shops/:id/reject` | Admin | Reject with a reason |

All authenticated endpoints accept either the httpOnly cookie (browser) or `Authorization: Bearer <token>` header (Postman/curl).

---

## 📁 Project Structure

```
kiranawala/
├── backend/                    # Express + Prisma API
│   ├── prisma/
│   │   ├── schema.prisma       # DB schema (User, Shop, Product, Order…)
│   │   ├── migrations/         # Auto-generated migration history
│   │   └── seed.ts             # Test users
│   └── src/
│       ├── config/             # env validation, Prisma client
│       ├── middleware/         # auth, role, validate, error
│       ├── modules/            # feature-based: auth/, shop/, health/
│       │   └── <feature>/      # schema.ts, service.ts, controller.ts, routes.ts
│       ├── utils/              # ApiError, ApiResponse, JWT, password hashing
│       ├── app.ts              # Express factory
│       └── server.ts           # Bootstrap + graceful shutdown
│
├── frontend/                   # Next.js 14 App Router
│   ├── middleware.ts           # Edge JWT verification + role guards
│   └── src/
│       ├── app/                # File-based routes
│       │   ├── (auth)/         # /login, /signup — route group
│       │   ├── (shopkeeper)/   # /dashboard/* — role-gated
│       │   ├── admin/          # /admin/*  — separate admin surface
│       │   ├── layout.tsx
│       │   └── page.tsx        # Landing page
│       ├── components/
│       │   ├── ui/             # Button, Input, Label, Textarea
│       │   ├── shared/         # AuthBootstrap, ShopStatusBadge
│       │   └── Logo.tsx        # Brand mark
│       ├── lib/                # api.ts, auth.ts, shop.ts, utils.ts
│       ├── store/              # Zustand — auth.store.ts
│       └── types/              # Shared TS types
│
├── docs/                       # Architecture, ADRs, API notes
├── .github/                    # PR template, CI (Day 11)
├── PROGRESS.md                 # Daily build log
└── README.md                   # This file
```

---

## 🗺️ Roadmap

| Day | Focus | Status |
|-----|-------|--------|
| 0 | Environment setup | ✅ Done |
| 1 | Foundation — monorepo, health endpoint, landing page | ✅ Done |
| 2 | Authentication — JWT, role-based routing | ✅ Done |
| **3** | **Shop module — CRUD + admin approval** | **✅ Done** |
| 4 | Products & inventory | ⏳ Next |
| 4.5 | UI polish pass | ⏳ Planned |
| 5 | Customer shop discovery | ⏳ Planned |
| 6 | Orders & checkout | ⏳ Planned |
| 7 | Reviews + admin analytics | ⏳ Planned |
| 8 | Testing (Vitest + Supertest) | ⏳ Planned |
| 9 | Performance + security audit | ⏳ Planned |
| 10 | Docker Compose + CI/CD | ⏳ Planned |
| 11 | Deployment (Vercel + Render + Neon) | ⏳ Planned |
| 12 | Documentation + open-source release | ⏳ Planned |

---

## 🧠 Design Decisions

Documented in [docs/](./docs/) as this grows. Highlights so far:

- **Feature-based backend modules** (`modules/auth`, `modules/shop`) — each feature owns its schema, service, controller, and routes. Scales with codebase.
- **`/me` endpoint pattern** — user identity comes from JWT, never from URL params. Right pattern for any self-scoped resource.
- **httpOnly cookie + Bearer header dual auth** — browsers use secure cookies; Postman/curl use `Authorization` header. Same JWT.
- **Edge middleware for UX, not security** — Next.js `middleware.ts` gives instant redirects for wrong-role access. Real permission enforcement is on the backend.
- **State machine over booleans** — Shop approval uses `PENDING → APPROVED/REJECTED

---

## 📜 License

MIT — see [LICENSE](./LICENSE)
