import { InferSelectModel, relations, sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { users } from ".";
import { expenses } from "./expenses";

export const categories = sqliteTable("categories", {
  id: text("id").primaryKey().notNull(),
  name: text("name").notNull(),
  userId: text("user_id").notNull(),
  created_at: integer("created_at").default(sql`CURRENT_TIMESTAMP`),
  updated_at: integer("created_at"),
});

export const categoriesRelations = relations(categories, ({ many, one }) => ({
  user: one(users, {
    references: [users.id],
    fields: [categories.userId],
    relationName: "user_relation",
  }),
  expenses: many(expenses),
}));

export type CategoryType = InferSelectModel<typeof categories>;
