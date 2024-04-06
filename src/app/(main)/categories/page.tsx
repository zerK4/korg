"use client";

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
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import { useState } from "react";
import { access } from "fs";

export default function DemoPage() {
  // const { user } = await getSession();

  // if (!user) redirect("/login");

  // const theCats = await db.query.categories.findMany({
  //   where: eq(categories.userId, user?.id),
  //   with: {
  //     expenses: true,
  //   },
  // });

  const { isPending, error, data } = useQuery({
    queryKey: ["categories"],
    queryFn: () =>
      fetch("http://localhost:3000/api/categories").then(async (res) => {
        const data = await res.json();
        console.log(data);
        return data;
      }),
  });

  // if (isPending) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  return (
    <div className='p-2 w-full'>
      <div className='flex gap-2 w-full'>
        <div className='w-full grid grid-cols-1 h-fit'>
          {isPending ? (
            loadingColumns()
          ) : (
            <DataTable columns={columns} data={data} />
          )}
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

const loadingColumns = () => {
  return (
    <div className='h-[50vh] w-full animate-pulse rounded-lg bg-zinc-900' />
  );
};
