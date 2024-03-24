import { text, integer, sqliteTable } from "drizzle-orm/sqlite-core";
import { users } from ".";
import { relations } from "drizzle-orm";

export const session = sqliteTable("session", {
  id: text("id").notNull().primaryKey(),
  userId: text("user_id").notNull(),
  expiresAt: integer("expires_at").notNull(),
});

export const sessionRelations = relations(session, ({ one }) => ({
  user: one(users, {
    fields: [session.userId],
    references: [users.id],
    relationName: "user_relation",
  }),
}));
