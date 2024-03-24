"use server";

import { db } from "@/db";
import { v4 } from "uuid";
import { z } from "zod";
import getSession from "./authActions";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { incomeSchema } from "@/schema/incomeSchema";
import { incomes } from "@/db/schema/incomes";
import { and, eq } from "drizzle-orm";
import { updateBudget } from "./budgetActions";
import { recentAdded } from "@/db/schema";

export async function newIncome(values: z.infer<typeof incomeSchema>) {
  try {
    const { user } = await getSession();

    if (!user) {
      redirect("/login");
    }

    const theIncome = await db
      .insert(incomes)
      .values({
        date: values.date,
        name: values.name,
        details: values.details,
        amount: Number(values.value),
        type: values.type,
        id: v4(),
        userId: user.id,
      })
      .returning();

    updateBudget({
      type: values.type,
      amount: values.value,
      scope: "increase",
    });

    await db.insert(recentAdded).values({
      name: values.name,
      what: "income",
      amount: Number(values.value),
      userId: user.id,
      date: new Date().toLocaleDateString(),
      thingId: theIncome[0].id,
    });

    revalidatePath("/incomes");
    return theIncome;
  } catch (error) {
    console.log(error);

    throw error;
  }
}

export async function removeIncome(id: string) {
  try {
    const { user } = await getSession();

    if (!user) {
      redirect("/login");
    }

    const selectedIncome = await db.query.incomes.findFirst({
      where: and(eq(incomes.id, id), eq(incomes.userId, user.id)),
    });

    if (!selectedIncome) return;

    const updated = await updateBudget({
      amount: String(selectedIncome?.amount),
      scope: "decrease",
      type: selectedIncome?.type,
    });

    await db
      .delete(incomes)
      .where(and(eq(incomes.id, id), eq(incomes.userId, user.id)));

    revalidatePath("/incomes");
  } catch (error) {
    console.log(error);

    throw error;
  }
}
