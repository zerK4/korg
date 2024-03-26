import { InferSelectModel, relations, sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { users } from ".";
import { categories } from "./categories";

export const expenses = sqliteTable("expenses", {
  id: text("id").primaryKey().notNull(),
  name: text("name").notNull(),
  amount: integer("amount").notNull(),
  userId: text("user_id").notNull(),
  date: integer("date"),
  categoryId: text("expense_id").notNull(),
  created_at: integer("created_at").default(sql`CURRENT_TIMESTAMP`),
  updated_at: integer("created_at"),
});

export const expensesRelations = relations(expenses, ({ many, one }) => ({
  user: one(users, {
    references: [users.id],
    fields: [expenses.userId],
    relationName: "expense_user_relation",
  }),
  category: one(categories, {
    fields: [expenses.categoryId],
    references: [categories.id],
    relationName: "expense_category_relation",
  }),
}));

export type ExpenseType = InferSelectModel<typeof expenses>;
