import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

let prismaInstance: PrismaClient;
try {
  prismaInstance =
    globalForPrisma.prisma ?? new PrismaClient().$extends({});
  if (process.env.NODE_ENV !== "production") {
    globalForPrisma.prisma = prismaInstance;
  }
} catch {
  // Fallback to an empty object during build when Prisma isn't generated.
  prismaInstance = {} as any;
}

export const prisma = prismaInstance;
