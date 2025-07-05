# Architecture Overview

This project uses a Next.js 15.3 App Router setup within a Turborepo
workspace. The `apps/web` application contains the storefront and admin
pages. Reusable UI components live in `packages/ui` and shared
configuration is provided from `packages/config`.

## Folder Structure

- `apps/web` – Next.js frontend with server actions and Prisma.
- `packages/ui` – shared React components built with shadcn/ui.
- `packages/config` – ESLint, Prettier, and Tailwind settings.
- `packages/db` – Prisma schema and migration scripts.

## Flow Diagram

```
[Browser] -> [Next.js Server Actions] -> [Prisma] -> [Postgres]
                        |-> [Stripe Invoices]
                        |-> [NextAuth]
```

## Decisions

- **Server Components** keep bundle size small for faster LCP.
- **Tailwind CSS** provides design tokens for light and dark themes.
- **React 19 cache** is used for client data access via TanStack Query.
