# Workspace

## Overview

pnpm workspace monorepo using TypeScript. Each package manages its own dependencies.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)

## Key Commands

- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- `pnpm --filter @workspace/api-server run dev` — run API server locally

See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details.

## Project: Калькулятор потенциала запуска

Russian-language lead magnet web app for growth marketer Margo (@gottaknow).

### Features
- **Calculator** (`/`) — funnel metrics input (base size, leads, sales, avg check), real-time conversions vs market norms (4% base→leads, 12% leads→sales), lost revenue display, traffic-light diagnostics, CTA section
- **Lead capture modal** — intercepts CTA button, saves name + phone + calc data to DB, then redirects to Telegram @gottaknow
- **Admin panel** (`/admin?`) — password-protected with `ADMIN_KEY` env var (default: `margoAdmin2026`), shows page views / calculator used / CTA clicked / forms submitted / conversion rate, full leads table

### Event Tracking
Events tracked to `events` table: `page_view`, `calc_completed`, `cta_clicked`, `form_submitted`

### Admin Access
Navigate to `/admin`, enter key `margoAdmin2026` (or set `ADMIN_KEY` env var to override)

### Orval Codegen Note
`lib/api-spec/orval.config.ts` uses `mode: "single"` for Zod output (no workspace barrel conflict). The codegen script patches `lib/api-zod/src/index.ts` after orval runs to avoid duplicate exports.
