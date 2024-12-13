import dotenv from 'dotenv';
import { defineConfig } from 'drizzle-kit';

dotenv.config({
  path: './environment/.env.development',
});

export default defineConfig({
  dialect: 'mysql',
  schema: './src/**/infrastructure/schemas/*.schema.ts',
  dbCredentials: {
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    port: parseInt(process.env.DATABASE_PORT),
  },
});
