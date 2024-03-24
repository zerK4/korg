import React from "react";
import { db } from "@/db";
import getSession from "@/app/actions/authActions";
import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";
import { budget, incomes } from "@/db/schema";
import { DataTable } from "@/components/table/dataTable";
import { columns } from "./comp/columns";
import SharedRightSidebar from "@/components/pageComponents/sharedRightSidebar";
import NewIncome from "@/components/forms/newIncome";
import { AddButton } from "@/components/ui/button";

async function page() {
  const { user } = await getSession();

  if (!user) redirect("/login");

  const theIncomes = await db.query.incomes.findMany({
    where: eq(incomes.userId, user?.id),
    with: {
      user: true,
    },
  });

  const totalIncom = theIncomes
    .map((item) => item.amount)
    .reduce((a, b) => a + b, 0);

  const allBudgetTypes = await db.query.budget.findMany({
    where: eq(budget.userId, user?.id),
    with: {
      user: true,
    },
  });

  return (
    <div className='p-2 flex gap-2 w-full'>
      <div className='w-full grid grid-cols-1 h-fit'>
        <DataTable columns={columns} data={theIncomes} />
      </div>
      <div className='w-fit'>
        <SharedRightSidebar>
          <NewIncome>
            <AddButton className='w-full' />
          </NewIncome>
        </SharedRightSidebar>
      </div>
    </div>
  );
}

export default page;
