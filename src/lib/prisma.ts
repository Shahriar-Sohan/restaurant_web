import { PrismaClient } from "@/generated/prisma";

// Use globalThis to avoid type conflicts in Node.js
const globalForPrisma = globalThis as unknown as {
  prisma?: PrismaClient;
};

// Create a single Prisma Client instance and reuse it in dev
const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: ["query", "error", "warn"], // Enterprise: Enable logging for monitoring
  });

// In development, store the client in global to prevent re-creation on hot reload
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export default prisma;