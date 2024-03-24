"use client";

import {
  BudgetType,
  ExpenseType,
  IncomeType,
  RecentAddedType,
} from "@/db/schema";
import { useFinancial } from "@/store/useFinancial";
import anime from "animejs";
import React, { useEffect, useState } from "react";

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
  useEffect(() => {
    useFinancial.setState({
      budgets: budgetTypes,
      recentAdded: recents,
      currentExpenses: currentExpenses,
      currentIncomes: currentIncomes,
    });
  }, [budgetTypes, recents]);

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

  return null;
}

export default ClientPage;
