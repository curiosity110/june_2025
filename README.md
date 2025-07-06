+4
-1

#   deepdigidive - E-Commerce Starter

## 🧩 Stack
- Next.js 14
- Tailwind CSS
- shadcn/ui
- Stripe for payments
- Resend for email
- MDX for content

## 🛠 Quick Build Steps
1. Clone this repo
2. Install dependencies with `pnpm install`
3. Copy `.env.local.example` to `.env.local` and fill in values (including `ADMIN_SECRET`).
4. Run `npm run dev`
5. Deploy with Vercel

When running in CI or on a new machine, ensure `pnpm install` is executed so the
`postinstall` script generates the Prisma client before running tests or builds.

## 🧱 Pages
- `/` – Landing Page
- `/course` – Course
- `/products` – eBooks
- `/thank-you` – After purchase# june_2025

## Moving files to packages
Run the helper script to keep imports working when moving files:

```bash
pnpm move-to-packages components/ui/button.tsx ui
```