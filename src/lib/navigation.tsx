import { BarChart, Coins, Grid, Home } from "lucide-react";

export const navMenu = [
  {
    name: "Dashboard",
    icon: <Home size={20} />,
    href: "/",
  },
  {
    name: "Expenses",
    icon: <Coins size={20} />,
    href: "/expenses",
  },
  {
    name: "Incomes",
    icon: <BarChart size={20} />,
    href: "/incomes",
  },
  {
    name: "Categories",
    icon: <Grid size={20} />,
    href: "/categories",
  },
];
