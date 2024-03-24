"use server";

import { expenseSchema } from "@/schema/expenseSchema";
import getSession from "./authActions";
import { z } from "zod";
import { db } from "@/db";
import { budget, expenses, recentAdded } from "@/db/schema";
import { v4 } from "uuid";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { and, eq } from "drizzle-orm";

export async function newExpense(values: z.infer<typeof expenseSchema>) {
  try {
    const { user } = await getSession();

    if (!user) {
      redirect("/login");
    }

    const theBudget = await db.query.budget.findFirst({
      where: and(eq(budget.userId, user.id), eq(budget.id, values.from)),
    });

    if (!theBudget) {
      throw new Error("No budget found");
    }

    await db
      .update(budget)
      .set({
        amount: String(Number(theBudget.amount) - Number(values.amount)),
      })
      .where(eq(budget.id, values.from));

    const theExpense = await db
      .insert(expenses)
      .values({
        name: values.name,
        categoryId: values.category,
        amount: Number(values.amount),
        date: values.date,
        id: v4(),
        userId: user.id,
      })
      .returning();

    await db.insert(recentAdded).values({
      name: values.name,
      what: "expense",
      amount: Number(values.amount),
      userId: user.id,
      date: new Date().toLocaleDateString(),
      thingId: theExpense[0].id,
    });

    revalidatePath("/expenses");

    return theExpense;
  } catch (error) {
    console.log(error);

    throw error;
  }
}

export async function removeExpense(id: string) {
  try {
    await db.delete(recentAdded).where(eq(recentAdded.thingId, id));
    await db.delete(expenses).where(eq(expenses.id, id));

    revalidatePath("/expenses");
  } catch (error) {
    console.log(error);

    throw error;
  }
}
