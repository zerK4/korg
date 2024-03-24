"use server";

import { redirect } from "next/navigation";
import getSession from "./authActions";
import { db } from "@/db";
import { recentAdded } from "@/db/schema";
import { and, desc, eq } from "drizzle-orm";

export async function getRecents() {
  try {
    const { user } = await getSession();

    if (!user) {
      redirect("/login");
    }

    const recents = await db.query.recentAdded.findMany({
      where: eq(recentAdded.userId, user.id),
      orderBy: desc(recentAdded.id),
    });

    return recents;
  } catch (error) {
    console.log(error);

    throw error;
  }
}
