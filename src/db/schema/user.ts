import { InferSelectModel, relations, sql } from "drizzle-orm";
import { text, integer, sqliteTable } from "drizzle-orm/sqlite-core";
import { session } from "./session";
import { categories } from "./categories";
import { expenses } from "./expenses";
import { incomes } from "./incomes";
import { budget } from ".";

export const users = sqliteTable("user", {
  id: text("id").primaryKey().unique(),
  name: text("name"),
  email: text("email").notNull().unique(),
  image: text("image"),
  token: text("token").unique(),
  sessionId: text("session_id"),
  created_at: integer("created_at").default(sql`CURRENT_TIMESTAMP`),
  updated_at: integer("created_at"),
});

export const usersRelations = relations(users, ({ many, one }) => ({
  session: one(session, {
    fields: [users.sessionId],
    references: [session.id],
    relationName: "session_relation",
  }),
  categories: many(categories),
  expenses: many(expenses),
  incomes: many(incomes),
  budgets: many(budget),
}));

export type UserType = InferSelectModel<typeof users>;
