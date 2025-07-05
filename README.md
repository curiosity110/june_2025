# deepdigidive - E-Commerce Starter

This repository contains a turborepo workspace for a digital products
store built with **Next.js 15.3** and **React 19**. Payments are handled
via Stripe invoices and authentication via NextAuth.

## Quick Start

```bash
pnpm install
pnpm dev
```

Environment variables are defined in `.env.example`. See
`docs/deployment.md` for a full list.

## Packages

- `apps/web` – storefront and admin pages
- `packages/ui` – shadcn/ui based components
- `packages/config` – shared ESLint/Prettier/Tailwind config

## Further Documentation

- [Architecture](docs/architecture.md)
- [Deployment](docs/deployment.md)
