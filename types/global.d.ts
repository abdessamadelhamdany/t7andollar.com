import { PrismaClient } from '@prisma/client';

declare global {
  var prisma: PrismaClient | undefined;

  namespace NodeJS {
    interface ProcessEnv {
      JWT_SECRET: string;
      DATABASE_URL: string;
    }
  }
}
