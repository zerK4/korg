import { CommandDialogComp } from "@/components/command";
import { Sidebar } from "@/components/navigation/sidebar";
import Topbar from "@/components/navigation/topbar";
import React from "react";
import getSession from "../actions/authActions";
import { redirect } from "next/navigation";
import { Toaster } from "@/components/ui/sonner";
import ClientPage from "./page.client";
import { db } from "@/db";
import { budget } from "@/db/schema";
import { eq } from "drizzle-orm";
import { getRecents } from "../actions/recentsActions";
import NewIncome from "@/components/forms/newIncome";
import NewExpense from "@/components/forms/newExpense";
import NewBudgetType from "@/components/forms/newIncomeType";
import NewCategory from "@/components/forms/newCategory";

async function layout({ children }: Readonly<{ children: React.ReactNode }>) {
  const { user } = await getSession();

  if (!user) redirect("/login");

  const budgetTypes = await db.query.budget.findMany({
    where: eq(budget.userId, user?.id),
    with: {
      user: true,
    },
  });
  const recents = await getRecents();

  return (
    <div className='flex'>
      <Sidebar />
      <CommandDialogComp />
      <div className='ml-20 relative w-full'>
        <Topbar />
        <NewIncome />
        <NewExpense />
        <NewBudgetType />
        <NewCategory />
        <ClientPage budgetTypes={budgetTypes} recents={recents} />
        {children}
        <Toaster closeButton position='top-center' richColors />
      </div>
    </div>
  );
}

export default layout;
