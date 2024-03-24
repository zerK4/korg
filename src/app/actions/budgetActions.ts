"use server";

import { db } from "@/db";
import { budget } from "@/db/schema/budget";
import { budgetTypeSchema } from "@/schema/budgetTypeSchema";
import { z } from "zod";
import getSession from "./authActions";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { and, eq } from "drizzle-orm";
import { recentAdded } from "@/db/schema";

export async function createBudgetType(
  values: z.infer<typeof budgetTypeSchema>
) {
  try {
    const { user } = await getSession();

    if (!user) redirect("/login");

    const newBudget = await db
      .insert(budget)
      .values({
        ...values,
        userId: user.id,
      })
      .returning();

    await db.insert(recentAdded).values({
      name: values.name,
      what: "budget",
      userId: user.id,
      date: new Date().toLocaleDateString(),
      thingId: newBudget[0].id,
    });

    revalidatePath("/income");

    return newBudget;
  } catch (error) {
    console.log(error);

    throw error;
  }
}

export async function updateBudget({
  type,
  amount,
  scope,
}: {
  type: string;
  amount: string;
  scope: "increase" | "decrease";
}) {
  try {
    const { user } = await getSession();
    if (!user) redirect("/login");

    const currentBudget = await db.query.budget.findFirst({
      where: and(eq(budget.name, type), eq(budget.userId, user.id)),
    });

    const amountNumber = Number(amount);

    const updated = await db
      .update(budget)
      .set({
        amount:
          scope === "increase"
            ? String(Number(currentBudget?.amount) + amountNumber)
            : String(Number(currentBudget?.amount) - amountNumber),
      })
      .where(and(eq(budget.name, type), eq(budget.userId, user.id)))
      .returning();

    console.log(updated, "asdasda");

    revalidatePath("/income");
    return updated;
  } catch (error) {
    console.log(error);

    throw error;
  }
}
