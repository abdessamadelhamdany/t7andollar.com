import { HLJSApi } from 'highlight.js';
import { PrismaClient } from '@prisma/client';

declare global {
  var prisma: PrismaClient | undefined;

  interface Window {
    hljs: HLJSApi;
  }

  namespace NodeJS {
    interface ProcessEnv {
      APP_URL: string;
      JWT_SECRET: string;
      DATABASE_URL: string;
      ADMIN_PASSWORD: string;
    }
  }
}
