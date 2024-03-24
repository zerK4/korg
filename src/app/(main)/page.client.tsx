"use client";

import { BudgetType, RecentAddedType } from "@/db/schema";
import { useFinancial } from "@/store/useFinancial";
import anime from "animejs";
import React, { useEffect, useState } from "react";

function ClientPage({
  budgetTypes,
  recents,
}: {
  budgetTypes: BudgetType[];
  recents: RecentAddedType[];
}) {
  useEffect(() => {
    useFinancial.setState({
      budgets: budgetTypes,
      recentAdded: recents,
    });
  }, [budgetTypes, recents]);
  return null;
}

export default ClientPage;
