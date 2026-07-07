# Kiranawala Frontend

Next.js 14 (App Router) + TypeScript + Tailwind + design system.

## Setup

```bash
# From /frontend
pnpm install
cp .env.local.example .env.local
pnpm dev                   # → http://localhost:3000
```

## Design System

| Token   | Value                                                            |
| ------- | ---------------------------------------------------------------- |
| Primary | `saffron-500` (#E55934) — energetic Indian brand colour          |
| Accent  | `forest-500` (#2D5F3F) — fresh, grocery-coded                    |
| Surface | `cream-50` (#FFFCF7) — warm, paper-like                          |
| Ink     | `ink-900` (#0F172A) → `ink-50` (#F8FAFC) — slate scale           |
| Display | Fraunces (serif, editorial)                                      |
| Body    | Inter (clean sans)                                               |
| Mono    | JetBrains Mono (prices, numbers)                                 |

All tokens live in `tailwind.config.ts`. Use them, don't hardcode colors.

## Structure

```
src/
├── app/                    # App Router pages
│   ├── layout.tsx          # Root layout with fonts
│   ├── page.tsx            # Landing page
│   └── globals.css         # Tailwind + design tokens
├── components/
│   ├── ui/                 # shadcn primitives (added as needed)
│   ├── shared/             # Navbar, Footer, HealthStatus
│   └── features/           # Feature-specific components
├── lib/
│   ├── api.ts              # Typed fetch wrapper
│   └── utils.ts            # cn() helper
└── types/
```

## Scripts

| Command       | Purpose                            |
| ------------- | ---------------------------------- |
| `pnpm dev`    | Next.js dev server (port 3000)     |
| `pnpm build`  | Production build                   |


## API Response Shape

**Success:**

```json
{
  "success": true,
  "data": { ... },
  "message": "Optional message"
}   

