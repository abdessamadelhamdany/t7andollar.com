import { PrismaClient } from '@prisma/client';

declare global {
  var prisma: PrismaClient | undefined;

  namespace NodeJS {
    interface ProcessEnv {
      APP_URL: string;
      JWT_SECRET: string;
      DATABASE_URL: string;
    }
  }
}
