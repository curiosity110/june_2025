# Database Package

`packages/db` contains the Prisma schema and client. Use these commands during development:

```bash
pnpm db:migrate   # create and apply migrations
pnpm db:generate  # regenerate the Prisma client
```

To roll back a migration, run `prisma migrate reset --schema packages/db/prisma/schema.prisma` and then re-apply with `pnpm db:migrate`.
