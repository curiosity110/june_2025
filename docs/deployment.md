# Deployment Guide

The project is optimised for Vercel. After creating a new project in
Vercel, set the following environment variables:

| Name | Description |
|------|-------------|
| `DATABASE_URL` | Postgres connection string |
| `NEXTAUTH_SECRET` | Session encryption key |
| `NEXTAUTH_URL` | Base URL of deployment |
| `STRIPE_SECRET_KEY` | Stripe API key |
| `STRIPE_WEBHOOK_SECRET` | Stripe webhook secret |
| `ADMIN_SECRET` | Token for admin routes |

## Steps

1. Install dependencies with `pnpm install`.
2. Run migrations: `pnpm --filter=apps/web prisma migrate deploy`.
3. Push to `main` and Vercel will build and deploy using GitHub Actions.
4. Preview URLs are generated for every PR.
