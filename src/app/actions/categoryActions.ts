"use server";

import { db } from "@/db";
import { CategoryType, categories } from "@/db/schema/categories";
import { categorySchema } from "@/schema/categorySchema";
import { v4 } from "uuid";
import { z } from "zod";
import getSession from "./authActions";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { and, eq } from "drizzle-orm";
import {
  ExpenseType,
  ExpenseWithCategories,
  recentAdded,
  users,
} from "@/db/schema";

export async function getAllCategories() {
  try {
    const { user } = await getSession();
    if (!user) redirect("/login");

    return await db.query.categories.findMany({
      where: eq(categories.userId, user.id),
    });
  } catch (error) {
    console.log(error);

    throw error;
  }
}
export async function newCategory(values: z.infer<typeof categorySchema>) {
  try {
    const { user } = await getSession();

    if (!user) {
      redirect("/login");
    }

    const theCategory = await db
      .insert(categories)
      .values({
        ...values,
        id: v4(),
        userId: user!.id,
      })
      .returning()
      .then(async ([res]) => {
        await db.insert(recentAdded).values({
          name: values.name,
          what: "category",
          userId: user!.id,
          date: new Date().toLocaleDateString(),
          thingId: res.id,
        });
      });

    revalidatePath("/categories");
    return theCategory;
  } catch (error) {
    console.log(error);

    throw error;
  }
}

export async function removeCategory(id: string) {
  try {
    const { user } = await getSession();

    if (!user) {
      redirect("/login");
    }

    await db.delete(recentAdded).where(eq(recentAdded.thingId, id));
    await db
      .delete(categories)
      .where(and(eq(categories.id, id), eq(categories.userId, user.id)));

    revalidatePath("/categories");
  } catch (error) {
    console.log(error);

    throw error;
  }
}

export async function getCategoryById(categoryId: string) {
  try {
    return await db.query.categories.findFirst({
      where: eq(categories.id, categoryId),
    });
  } catch (error) {
    console.log(error);

    throw error;
  }
}
