import type { Config } from 'drizzle-kit';

export default {
  schema: './src/db/schema',
  driver: 'turso',
  dbCredentials: {
    url: process.env.TURSO_DB_URL!,
    authToken: process.env.TURSO_DB_TOKEN,
  },
  out: './drizzle',
} satisfies Config;
