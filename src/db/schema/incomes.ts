import { InferSelectModel, relations, sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { users } from ".";

export const incomes = sqliteTable("incomes", {
  id: text("id").primaryKey().notNull(),
  name: text("name").notNull(),
  amount: integer("amount").notNull(),
  details: text("details"),
  type: text("type").notNull(),
  date: text("date"),
  userId: text("user_id").notNull(),
  created_at: integer("created_at").default(sql`CURRENT_TIMESTAMP`),
  updated_at: integer("created_at"),
});

export const incomesRelations = relations(incomes, ({ many, one }) => ({
  user: one(users, {
    references: [users.id],
    fields: [incomes.userId],
    relationName: "income_user_relation",
  }),
}));

export type IncomeType = InferSelectModel<typeof incomes>;
