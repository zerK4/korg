import React from "react";
import { db } from "@/db";
import { eq } from "drizzle-orm";
import getSession from "@/app/actions/authActions";
import { expenses } from "@/db/schema";
import { redirect } from "next/navigation";
import { DataTable } from "@/components/table/dataTable";
import { columns } from "./comp/columns";
import SharedRightSidebar from "@/components/pageComponents/sharedRightSidebar";
import NewExpense from "@/components/forms/newExpense";
import { AddButton } from "@/components/ui/button";

async function page() {
  const { user } = await getSession();

  if (!user) redirect("/login");

  const theExpenses = await db.query.expenses.findMany({
    where: eq(expenses.userId, user?.id),
    with: {
      category: true,
      user: true,
    },
  });

  const totalExpenses = theExpenses
    .map((item) => item.amount)
    .reduce((a, b) => a + b, 0);

  return (
    <div className='p-2 w-full'>
      <div className='flex gap-2 w-full'>
        <div className='w-full grid grid-cols-1 h-fit'>
          <DataTable columns={columns} data={theExpenses} />
        </div>
        <div className='w-fit'>
          <SharedRightSidebar>
            <NewExpense>
              <AddButton className='w-full' />
            </NewExpense>
          </SharedRightSidebar>
        </div>
      </div>
    </div>
  );
}

export default page;
