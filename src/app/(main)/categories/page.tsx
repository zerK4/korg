import { DataTable } from "@/components/table/dataTable";
import { columns } from "./comp/columns";
import SharedRightSidebar from "@/components/pageComponents/sharedRightSidebar";
import getSession from "@/app/actions/authActions";
import { redirect } from "next/navigation";
import { db } from "@/db";
import { categories } from "@/db/schema";
import { eq } from "drizzle-orm";
import NewCategory from "@/components/forms/newCategory";
import { AddButton } from "@/components/ui/button";

export default async function DemoPage() {
  const { user } = await getSession();

  if (!user) redirect("/login");

  const theCats = await db.query.categories.findMany({
    where: eq(categories.userId, user?.id),
    with: {
      expenses: true,
    },
  });

  return (
    <div className='p-2 w-full'>
      <div className='flex gap-2 w-full'>
        <div className='w-full grid grid-cols-1 h-fit'>
          <DataTable columns={columns} data={theCats} />
        </div>
        <div className='w-fit'>
          <SharedRightSidebar>
            <NewCategory>
              <AddButton className='w-full' />
            </NewCategory>
          </SharedRightSidebar>
        </div>
      </div>
    </div>
  );
}
