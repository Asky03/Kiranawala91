# 🗺️ Visual File Map — Exact Locations

This shows your **actual current folder structure** with annotations on every file.
Legend: ✅ keep · ✏️ replace contents · 🆕 create new · 🔴 delete

---

## BACKEND

```
kiranawala/
└── backend/
    ├── node_modules/                              ✅ keep
    ├── prisma/
    │   ├── schema.prisma                          ✅ keep (no change)
    │   └── seed.ts                                🆕 CREATE
    │       └── content: delivery/backend/prisma/seed.ts
    │
    ├── src/
    │   ├── {config,modules}/                      🔴 DELETE this empty leftover folder
    │   │
    │   ├── config/
    │   │   ├── db.ts                              ✅ keep (no change) 
    │   │   └── env.ts                             ✏️ REPLACE contents
    │   │       └── content: delivery/backend/src/config/env.ts
    │   │
    │   ├── middleware/
    │   │   ├── error.middleware.ts                ✅ keep YOURS (no change)
    │   │   ├── auth.middleware.ts                 🆕 CREATE
    │   │   │   └── content: delivery/backend/src/middleware/auth.middleware.ts
    │   │   ├── role.middleware.ts                 🆕 CREATE
    │   │   │   └── content: delivery/backend/src/middleware/role.middleware.ts
    │   │   └── validate.middleware.ts             🆕 CREATE
    │   │       └── content: delivery/backend/src/middleware/validate.middleware.ts
    │   │ 
    │   ├── modules/
    │   │   ├── auth/                              ✅ folder exists (empty)
    │   │   │   ├── auth.schema.ts                 🆕 CREATE
    │   │   │   │   └── content: delivery/backend/src/modules/auth/auth.schema.ts
    │   │   │   ├── auth.service.ts                🆕 CREATE
    │   │   │   │   └── content: delivery/backend/src/modules/auth/auth.service.ts
    │   │   │   ├── auth.controller.ts             🆕 CREATE
    │   │   │   │   └── content: delivery/backend/src/modules/auth/auth.controller.ts
    │   │   │   └── auth.routes.ts                 🆕 CREATE
    │   │   │       └── content: delivery/backend/src/modules/auth/auth.routes.ts
    │   │   │
    │   │   └── health/                            ✅ keep entire folder (no change)
    │   │
    │   ├── utils/
    │   │   ├── ApiError.ts                        ✅ keep YOURS (already exists)
    │   │   ├── ApiResponse.ts                     ✅ keep YOURS (already exists)
    │   │   ├── asyncHandler.ts                    ✅ keep YOURS (already exists)
    │   │   ├── logger.ts                          ✅ keep YOURS (no change)
    │   │   ├── jwt.ts                             🆕 CREATE
    │   │   │   └── content: delivery/backend/src/utils/jwt.ts
    │   │   └── password.ts                        🆕 CREATE
    │   │       └── content: delivery/backend/src/utils/password.ts
    │   │
    │   ├── app.ts                                 ✏️ REPLACE contents
    │   │   └── content: delivery/backend/src/app.ts
    │   │
    │   └── server.ts                              ✅ keep (no change)
    │
    ├── .env                                       ✏️ APPEND 2 lines (JWT_SECRET, JWT_EXPIRES_IN)
    ├── .env.example                               ✏️ APPEND 2 lines (placeholder versions)
    ├── .eslintrc.cjs                              ✅ keep (no change)
    ├── package.json                               ✏️ ADD deps + seed script (via pnpm add commands)
    ├── README.md                                  ✅ keep (no change)
    └── tsconfig.json                              ✅ keep (no change)
```

---

## FRONTEND

```
kiranawala/
└── frontend/
    ├── .next/                                     ✅ keep (build cache)
    ├── node_modules/                              ✅ keep
    ├── public/                                    ✅ keep (no change)
    │
    ├── src/
    │   ├── {app,components}/                      🔴 DELETE this empty leftover folder
    │   │
    │   ├── app/
    │   │   ├── globals.css                        ✅ keep (no change)
    │   │   ├── layout.tsx                         ✏️ ADD <AuthBootstrap /> (see Part 2 below)
    │   │   ├── page.tsx                           ✅ keep your landing page (no change)
    │   │   │
    │   │   ├── (auth)/                            🆕 CREATE folder (with literal parens)
    │   │   │   ├── layout.tsx                     🆕 CREATE
    │   │   │   │   └── content: delivery/frontend/src/app/(auth)/layout.tsx
    │   │   │   ├── login/
    │   │   │   │   └── page.tsx                   🆕 CREATE
    │   │   │   │       └── content: delivery/frontend/src/app/(auth)/login/page.tsx
    │   │   │   └── signup/
    │   │   │       └── page.tsx                   🆕 CREATE
    │   │   │           └── content: delivery/frontend/src/app/(auth)/signup/page.tsx
    │   │   │
    │   │   ├── (shopkeeper)/                      🆕 CREATE folder (with literal parens)
    │   │   │   └── dashboard/
    │   │   │       └── page.tsx                   🆕 CREATE
    │   │   │           └── content: delivery/frontend/src/app/(shopkeeper)/dashboard/page.tsx
    │   │   │
    │   │   └── admin/                             🆕 CREATE folder (NO parens)
    │   │       ├── page.tsx                       🆕 CREATE
    │   │       │   └── content: delivery/frontend/src/app/admin/page.tsx
    │   │       └── login/
    │   │           └── page.tsx                   🆕 CREATE
    │   │               └── content: delivery/frontend/src/app/admin/login/page.tsx
    │   │
    │   ├── components/
    │   │   ├── shared/                            ✅ folder exists
    │   │   │   └── AuthBootstrap.tsx              🆕 CREATE here
    │   │   │       └── content: delivery/frontend/src/components/AuthBootstrap.tsx
    │   │   │
    │   │   └── ui/                                ✅ folder exists
    │   │       ├── Button.tsx                     🆕 CREATE
    │   │       │   └── content: delivery/frontend/src/components/ui/Button.tsx
    │   │       ├── Input.tsx                      🆕 CREATE
    │   │       │   └── content: delivery/frontend/src/components/ui/Input.tsx
    │   │       └── Label.tsx                      🆕 CREATE
    │   │           └── content: delivery/frontend/src/components/ui/Label.tsx
    │   │
    │   ├── lib/
    │   │   ├── api.ts                             ✏️ REPLACE contents (your Day 1 version is simpler)
    │   │   │   └── content: delivery/frontend/src/lib/api.ts
    │   │   ├── utils.ts                           ✅ keep YOURS (already exists, same cn helper)
    │   │   └── auth.ts                            🆕 CREATE
    │   │       └── content: delivery/frontend/src/lib/auth.ts
    │   │
    │   ├── store/                                 🆕 CREATE folder
    │   │   └── auth.store.ts                      🆕 CREATE
    │   │       └── content: delivery/frontend/src/store/auth.store.ts
    │   │
    │   └── types/
    │       ├── .gitkeep                           ✅ keep (or delete once you add user.ts)
    │       └── user.ts                            🆕 CREATE
    │           └── content: delivery/frontend/src/types/user.ts
    │
    ├── middleware.ts                              🆕 CREATE — at frontend/ ROOT, NOT inside src/
    │   └── content: delivery/frontend/middleware.ts
    │
    ├── .env.local                                 ✏️ APPEND 1 line (JWT_SECRET, same as backend)
    ├── .env.local.example                         ✏️ APPEND 1 line (placeholder)
    ├── .eslintrc.json                             ✅ keep (no change)
    ├── next-env.d.ts                              ✅ keep (no change)
    ├── next.config.mjs                            ✅ keep (no change)
    ├── package.json                               ✏️ ADD 4 deps (via pnpm add)
    ├── postcss.config.mjs                         ✅ keep (no change)
    ├── README.md                                  ✅ keep
    ├── tailwind.config.ts                         ✅ keep (no change)
    └── tsconfig.json                              ✅ keep (no change)
```

---

## Part 2 — The single layout.tsx edit

You said `layout.tsx` has an `M` marker (modified). Open it. Find your existing `<body>` tag. Add **two lines**:

```tsx
// Add to your imports at the top:
import { AuthBootstrap } from '@/components/shared/AuthBootstrap';

// Inside <body>, BEFORE {children}:
<AuthBootstrap />
{children}
```

That's it. Don't rewrite the file — just inject those two lines into what you already have.

---

## Part 3 — The .env additions

### `backend/.env` — add at the bottom:
```env
JWT_SECRET=<paste output of: openssl rand -base64 64>
JWT_EXPIRES_IN=7d
```

### `backend/.env.example` — add at the bottom:
```env
JWT_SECRET=CHANGE_ME_use_openssl_rand_base64_64_to_generate
JWT_EXPIRES_IN=7d
```

### `frontend/.env.local` — add at the bottom:
```env
JWT_SECRET=<paste the EXACT SAME secret you used in backend/.env>
```

### `frontend/.env.local.example` — add at the bottom:
```env
JWT_SECRET=CHANGE_ME_must_match_backend_JWT_SECRET_exactly
```

---

## Part 4 — The dependency installs (one-time)

```bash
# Backend deps
cd backend
pnpm add bcryptjs jsonwebtoken cookie-parser
pnpm add -D @types/bcryptjs @types/jsonwebtoken @types/cookie-parser tsx

# Frontend deps
cd ../frontend
pnpm add zustand jose clsx tailwind-merge

# Back to root
cd ..
```

Then open `backend/package.json` manually and add to `"scripts"`:
```jsonc
"prisma:seed": "tsx prisma/seed.ts"
```

And as a top-level sibling to `"scripts"`:
```jsonc
"prisma": {
  "seed": "tsx prisma/seed.ts"
}
```

---

## Final count

- **🆕 Create:** 20 files (8 backend + 12 frontend)
- **✏️ Modify in place:** 7 files (env.ts, app.ts, both .env files, layout.tsx, both package.json files)
- **✏️ Replace contents:** 2 files (frontend/src/lib/api.ts)
- **🔴 Delete:** 2 leftover `{...}` folders
- **✅ Keep as-is:** everything else

---

## When you're done copying, run

```bash
pnpm --filter backend prisma:seed
pnpm dev:backend   # terminal 1
pnpm dev:frontend  # terminal 2
```

Open `http://localhost:3000/login` and try logging in as `customer@kiranawala.local` / `Customer@12345`.