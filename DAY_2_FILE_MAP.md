# 🗂️ Day 2 — File Checklist

> **Read this first.** It tells you exactly which files to create, update, or verify.
> Status legend: 🆕 **CREATE** · ✏️ **UPDATE** · 🔍 **VERIFY** (might exist from Day 1)

---

## Part 1 — Backend

### 🆕 CREATE (15 new files)

These don't exist in your repo yet. Copy the content from the matching file in this delivery.

| # | Status | Path in your repo | Source file in delivery |
|---|---|---|---|
| 1 | 🆕 | `backend/src/utils/jwt.ts` | `backend/src/utils/jwt.ts` |
| 2 | 🆕 | `backend/src/utils/password.ts` | `backend/src/utils/password.ts` |
| 3 | 🆕 | `backend/src/middleware/auth.middleware.ts` | `backend/src/middleware/auth.middleware.ts` |
| 4 | 🆕 | `backend/src/middleware/role.middleware.ts` | `backend/src/middleware/role.middleware.ts` |
| 5 | 🆕 | `backend/src/modules/auth/auth.schema.ts` | `backend/src/modules/auth/auth.schema.ts` |
| 6 | 🆕 | `backend/src/modules/auth/auth.service.ts` | `backend/src/modules/auth/auth.service.ts` |
| 7 | 🆕 | `backend/src/modules/auth/auth.controller.ts` | `backend/src/modules/auth/auth.controller.ts` |
| 8 | 🆕 | `backend/src/modules/auth/auth.routes.ts` | `backend/src/modules/auth/auth.routes.ts` |
| 9 | 🆕 | `backend/prisma/seed.ts` | `backend/prisma/seed.ts` |

### ✏️ UPDATE (4 files)

You already have these. Replace contents with the new version (or apply the diff shown below).

| # | Status | Path in your repo | What to do |
|---|---|---|---|
| 10 | ✏️ | `backend/src/app.ts` | Replace with `backend/src/app.ts` from delivery — adds `cookieParser()` + auth routes. **CORS multi-origin pattern preserved.** |
| 11 | ✏️ | `backend/src/config/env.ts` | Replace with `backend/src/config/env.ts` from delivery — adds `JWT_SECRET` + `JWT_EXPIRES_IN` to the Zod schema |
| 12 | ✏️ | `backend/.env` | Add 2 lines (see Part 4 below) |
| 13 | ✏️ | `backend/.env.example` | Add 2 lines (see Part 4 below) |
| 14 | ✏️ | `backend/package.json` | Add deps + script (see Part 4 below) |

### 🔍 VERIFY (might already exist from Day 1)

Open each file in your repo. **If it exists** → diff against the delivery version and keep yours (or merge if mine is better). **If it doesn't exist** → create it from the delivery version.

| # | Status | Path in your repo | If missing, source |
|---|---|---|---|
| 15 | 🔍 | `backend/src/utils/ApiError.ts` | `backend/src/utils/ApiError.ts` |
| 16 | 🔍 | `backend/src/utils/ApiResponse.ts` | `backend/src/utils/ApiResponse.ts` |
| 17 | 🔍 | `backend/src/utils/asyncHandler.ts` | `backend/src/utils/asyncHandler.ts` |
| 18 | 🔍 | `backend/src/middleware/validate.middleware.ts` | `backend/src/middleware/validate.middleware.ts` |
| 19 | 🔍 | `backend/src/middleware/error.middleware.ts` | **Keep yours** — Day 1 imports it from app.ts. Only adopt mine if you want Zod + Prisma error mapping included. |

### 🚫 DO NOT CHANGE

These are Day 1 files. Don't touch them.

- `backend/src/server.ts`
- `backend/src/config/db.ts`
- `backend/src/utils/logger.ts`
- `backend/src/modules/health/health.routes.ts`
- `backend/src/modules/health/*` (anything inside)
- `backend/prisma/schema.prisma`
- `backend/tsconfig.json`

---

## Part 2 — Frontend

### 🆕 CREATE (17 new files)

| # | Status | Path in your repo | Source file in delivery |
|---|---|---|---|
| 20 | 🆕 | `frontend/middleware.ts` ⚠️ root, NOT inside `src/` | `frontend/middleware.ts` |
| 21 | 🆕 | `frontend/src/types/user.ts` | `frontend/src/types/user.ts` |
| 22 | 🆕 | `frontend/src/lib/api.ts` | `frontend/src/lib/api.ts` |
| 23 | 🆕 | `frontend/src/lib/auth.ts` | `frontend/src/lib/auth.ts` |
| 24 | 🆕 | `frontend/src/lib/utils.ts` | `frontend/src/lib/utils.ts` *(verify — might exist)* |
| 25 | 🆕 | `frontend/src/store/auth.store.ts` | `frontend/src/store/auth.store.ts` |
| 26 | 🆕 | `frontend/src/components/AuthBootstrap.tsx` | `frontend/src/components/AuthBootstrap.tsx` |
| 27 | 🆕 | `frontend/src/components/ui/Button.tsx` | `frontend/src/components/ui/Button.tsx` |
| 28 | 🆕 | `frontend/src/components/ui/Input.tsx` | `frontend/src/components/ui/Input.tsx` |
| 29 | 🆕 | `frontend/src/components/ui/Label.tsx` | `frontend/src/components/ui/Label.tsx` |
| 30 | 🆕 | `frontend/src/app/(auth)/layout.tsx` | `frontend/src/app/(auth)/layout.tsx` |
| 31 | 🆕 | `frontend/src/app/(auth)/login/page.tsx` | `frontend/src/app/(auth)/login/page.tsx` |
| 32 | 🆕 | `frontend/src/app/(auth)/signup/page.tsx` | `frontend/src/app/(auth)/signup/page.tsx` |
| 33 | 🆕 | `frontend/src/app/admin/login/page.tsx` | `frontend/src/app/admin/login/page.tsx` |
| 34 | 🆕 | `frontend/src/app/admin/page.tsx` | `frontend/src/app/admin/page.tsx` |
| 35 | 🆕 | `frontend/src/app/(shopkeeper)/dashboard/page.tsx` | `frontend/src/app/(shopkeeper)/dashboard/page.tsx` |
| 36 | 🆕 | `frontend/.env.local` | Copy from `frontend/.env.local.example` in delivery, fill in real values |

### ✏️ UPDATE (2 files)

| # | Status | Path in your repo | What to do |
|---|---|---|---|
| 37 | ✏️ | `frontend/src/app/layout.tsx` | Add **one line** (`<AuthBootstrap />`) — see `frontend/LAYOUT_PATCH.md` in delivery |
| 38 | ✏️ | `frontend/package.json` | Add 4 dependencies (see Part 4 below) |

### 🚫 DO NOT CHANGE

- `frontend/src/app/page.tsx` (your landing page)
- `frontend/src/app/globals.css`
- `frontend/tailwind.config.ts`
- `frontend/next.config.mjs`
- `frontend/tsconfig.json`

---

## Part 3 — Root files

| Status | Path | What to do |
|---|---|---|
| 🚫 | `package.json` | No change |
| 🚫 | `pnpm-workspace.yaml` | No change |
| ✏️ | `PROGRESS.md` | Add Day 2 entry once you're done (you can write this yourself based on what you learned) |

---

## Part 4 — Exact edits for the in-place updates

### 4.1 — `backend/.env`

Open it and add these two lines at the bottom:

```env
# JWT (Day 2)
JWT_SECRET=<paste output of: openssl rand -base64 64>
JWT_EXPIRES_IN=7d
```

> Mac/Linux/Git Bash: `openssl rand -base64 64`
> Windows PowerShell: `[Convert]::ToBase64String((1..64 | % { Get-Random -Max 256 }))`

If you have `CORS_ORIGIN=*` (wildcard), change it to `CORS_ORIGIN=http://localhost:3000` — wildcards break cookie-based auth.

### 4.2 — `backend/.env.example`

Add the same JWT lines but with the placeholder, so contributors know they need to set them:

```env
JWT_SECRET=CHANGE_ME_use_openssl_rand_base64_64_to_generate
JWT_EXPIRES_IN=7d
```

### 4.3 — `backend/package.json`

```bash
cd backend
pnpm add bcryptjs jsonwebtoken cookie-parser
pnpm add -D @types/bcryptjs @types/jsonwebtoken @types/cookie-parser tsx
```

Then open `backend/package.json` and add inside `"scripts"`:

```jsonc
"prisma:seed": "tsx prisma/seed.ts"
```

And add a top-level `"prisma"` section (sibling of `"scripts"`):

```jsonc
"prisma": {
  "seed": "tsx prisma/seed.ts"
}
```

### 4.4 — `frontend/package.json`

```bash
cd ../frontend
pnpm add zustand jose clsx tailwind-merge
```

(jose is a JWT library that works in Next.js Edge runtime — required by middleware.ts since Node's `jsonwebtoken` doesn't run on the Edge.)

### 4.5 — `frontend/src/app/layout.tsx`

Just add **two lines** to your existing layout — see `frontend/LAYOUT_PATCH.md` for the exact pattern.

### 4.6 — `frontend/.env.local`

Create it (likely doesn't exist yet) with:

```env
NEXT_PUBLIC_API_URL=http://localhost:4000
JWT_SECRET=<paste the EXACT SAME secret as backend/.env>
```

The frontend middleware verifies JWTs at the Edge using this same secret — they MUST match.

---

## Part 5 — Order of operations (do these in sequence)

```bash
# From kiranawala/ root
git checkout main && git pull
git checkout -b feature/day-02-auth

# 1️⃣ Add backend dependencies
cd backend
pnpm add bcryptjs jsonwebtoken cookie-parser
pnpm add -D @types/bcryptjs @types/jsonwebtoken @types/cookie-parser tsx

# 2️⃣ Add frontend dependencies
cd ../frontend
pnpm add zustand jose clsx tailwind-merge
cd ..

# 3️⃣ Copy all files from the delivery to your repo paths
#     (follow the tables in Parts 1 & 2)

# 4️⃣ Edit backend/.env to add JWT_SECRET (see 4.1)
# 5️⃣ Edit backend/package.json to add the seed script (see 4.3)
# 6️⃣ Create frontend/.env.local with the same JWT_SECRET (see 4.6)
# 7️⃣ Edit frontend/src/app/layout.tsx to add <AuthBootstrap /> (see 4.5)

# 8️⃣ Generate Prisma client (in case it's stale)
pnpm --filter backend prisma:generate

# 9️⃣ Run the seed (creates the 3 test users)
pnpm --filter backend prisma:seed

# 🔟 Start dev servers (two terminals)
pnpm dev:backend
pnpm dev:frontend
```

---

## Part 6 — Manual verification

Once both servers are up:

| # | Test | Expected |
|---|---|---|
| 1 | `curl http://localhost:4000/api/health` | `200`, DB connected |
| 2 | Open `http://localhost:3000/login` | Login page renders |
| 3 | Sign in as `customer@kiranawala.local` / `Customer@12345` | Redirects to `/` |
| 4 | Sign out, sign in as `shopkeeper@kiranawala.local` / `Shop@12345` | Redirects to `/dashboard` |
| 5 | While logged in as customer, manually go to `/admin` in URL bar | Silently redirected to `/` (no error revealed) |
| 6 | Open `/admin/login`, sign in as `admin@kiranawala.local` / `Admin@12345` | Redirects to `/admin` (dark console) |
| 7 | Open browser DevTools → Application → Cookies | See `token` cookie marked `HttpOnly` ✅ |

---

## Part 7 — When you're done

```bash
git add .
git commit -m "feat(auth): Day 2 — JWT auth with role-based routing

Backend:
- POST /api/auth/register, /api/auth/login, /api/auth/logout
- GET  /api/auth/me (returns current user from JWT cookie)
- bcrypt password hashing (12 rounds)
- JWT in httpOnly cookie + Bearer header fallback
- requireAuth + requireRole middleware chain
- Stricter rate limit (10/15min) on auth endpoints
- Prisma seed script: 3 deterministic test users

Frontend:
- /login + /signup (public, customer/shopkeeper)
- /admin/login (dedicated dark UI; backend rejects non-admin creds)
- Edge middleware verifies JWT and enforces role per protected route
- Zustand auth store, persisted user object (not token)
- AuthBootstrap hydrates session on app load via /api/auth/me

Config:
- JWT_SECRET + JWT_EXPIRES_IN added to env schema
- cookie-parser registered in app.ts
- CORS multi-origin support preserved"

git push --set-upstream origin feature/day-02-auth
```

Open the PR. That's Day 2 complete.

---

## Quick reference — total file count

- 🆕 CREATE: 24 files (9 backend + 15 frontend)
- ✏️ UPDATE: 6 files (5 backend + 1 frontend layout patch + frontend package.json)
- 🔍 VERIFY: 5 files (all backend Day 1 utilities)
- 🚫 DO NOT CHANGE: 8+ files

If any path is unclear, search for the file in the delivery folder — the path inside the delivery matches the path in your repo exactly.