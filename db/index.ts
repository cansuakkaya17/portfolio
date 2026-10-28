import { neon } from '@neondatabase/serverless';

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL ortam değişkeni tanımlanmamış!');
}

export const sql = neon(process.env.DATABASE_URL);