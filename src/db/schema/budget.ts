import { InferSelectModel, relations } from "drizzle-orm";
import { sqliteTable, text } from "drizzle-orm/sqlite-core";
import { v4 } from "uuid";
import { users } from ".";

export const budget = sqliteTable("budget", {
  id: text("id")
    .primaryKey()
    .unique()
    .$defaultFn(() => v4()),
  name: text("name").notNull(),
  details: text("details"),
  userId: text("user_id").notNull(),
  amount: text("amount"),
  created_at: text("created_at").notNull().default("CURRENT_TIMESTAMP"),
  updated_at: text("updated_at").notNull().default("CURRENT_TIMESTAMP"),
});

export const budgetRelations = relations(budget, ({ many, one }) => ({
  user: one(users, {
    references: [users.id],
    fields: [budget.userId],
    relationName: "budget_user_relation",
  }),
}));

export type BudgetType = InferSelectModel<typeof budget>;
