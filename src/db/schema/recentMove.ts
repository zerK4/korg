import { InferSelectModel } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { v4 } from "uuid";

export const recentAdded = sqliteTable("recent_added", {
  id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  name: text("name"),
  what: text("what"),
  amount: integer("amount"),
  userId: text("user_id").notNull(),
  date: text("date"),
  thingId: text("thing_id").notNull(),
});

export type RecentAddedType = InferSelectModel<typeof recentAdded>;
