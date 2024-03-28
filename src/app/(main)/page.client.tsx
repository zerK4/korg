"use client";

import {
  BudgetType,
  ExpenseType,
  IncomeType,
  RecentAddedType,
} from "@/db/schema";
import { useFinancial } from "@/store/useFinancial";
import { useNav } from "@/store/useNav";
import React, { useEffect } from "react";

function ClientPage({
  data: { budgetTypes, recents, currentExpenses, currentIncomes },
}: {
  data: {
    budgetTypes: BudgetType[] | undefined;
    recents: RecentAddedType[] | undefined;
    currentExpenses: ExpenseType[] | undefined;
    currentIncomes: IncomeType[] | undefined;
  };
}) {
  const { goTo } = useNav();
  useEffect(() => {
    useFinancial.setState({
      budgets: budgetTypes,
      recentAdded: recents,
      currentExpenses: currentExpenses,
      currentIncomes: currentIncomes,
    });
  }, [budgetTypes, recents, currentIncomes, currentExpenses]);

  useEffect(() => {
    document.addEventListener("gesturestart", function (e) {
      e.preventDefault();
      (document.body.style as any).zoom = 0.99;
    });

    document.addEventListener("gesturechange", function (e) {
      e.preventDefault();

      (document.body.style as any).zoom = 0.99;
    });
    document.addEventListener("gestureend", function (e) {
      e.preventDefault();
      (document.body.style as any).zoom = 1;
    });
  });

  return (
    <div
      className={`anime-page-switcher fixed bottom-0 left-0 z-[999] grid h-0 w-screen place-content-center bg-black text-2xl md:text-5xl`}
    >
      <span>{goTo}</span>
    </div>
  );
}

export default ClientPage;
