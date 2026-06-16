# 📓 Build Log — Kiranawala

> A daily journal of decisions, challenges, and learnings.

---

## Day 1 — Foundation + First End-to-End Connection

### ✅ Completed
- Initialized monorepo with pnpm workspaces
- Created complete folder structure (backend, frontend, docs, .github)
- Backend skeleton: Express + TypeScript + Prisma + Zod + Pino
- Frontend skeleton: Next.js 14 App Router + Tailwind + design system
- Designed Prisma schema for User, Shop, Product, Order, OrderItem, Review
- Built `/api/health` endpoint with DB connectivity check
- Built branded landing page (not default Next.js template)
- Frontend successfully calls backend → renders DB status
- ESLint, Prettier, EditorConfig configured project-wide
- Conventional commits + feature branch workflow established

### 📚 Learned
- **Monorepo with pnpm workspaces** — single repo, atomic FE+BE commits
- **Twelve-Factor App principles** — config in environment, dev/prod parity
- **Layered architecture** — routes → controller → service → DB
- **Prisma migrations** — schema-as-code, version-controlled DB changes
- **CUID vs auto-increment** — security + scalability for distributed systems
- **Decimal for money** — never use Float for currency
- **Snapshot pattern** — OrderItem stores name/price at order time, not live reference

### 🤔 Decisions
- pnpm over npm/yarn — speed + monorepo support
- Feature-based modules over type-based folders — scales with codebase
- CUID over UUID/auto-increment — opaque, collision-resistant
- Pino over Winston — faster, JSON-structured for production log pipelines

### ⏭️ Next
- Day 2: Authentication system (register, login, JWT, role middleware)

---

## Day 0 — Environment Setup

- Installed Node v20, pnpm v9, PostgreSQL 16, VS Code
- Configured Git (autocrlf, default branch main)
- Created `kiranawala_dev` database with dedicated user
- Configured VS Code (extensions, format-on-save, design font)
- Created public GitHub repo with topics
- Created private repo as of myself 
