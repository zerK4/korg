import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";
import { migrate } from "drizzle-orm/libsql/migrator";
import * as schema from "@/db/schema";

const client = createClient({
  url: process.env.TURSO_DB_URL!,
  authToken: process.env.TURSO_DB_TOKEN!,
});

export const db = drizzle(client, { schema });

// migrate(db, {
//   migrationsFolder: "./drizzle",
// })
//   .then((res) => {
//     console.log(res, "Migration complete");
//   })
//   .catch((err) => {
//     console.log(err.message, "the error here");
//   })
//   .finally(() => {
//     // client.close();
//   });
