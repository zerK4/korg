import React from "react";
import getSession from "../actions/authActions";
import { redirect } from "next/navigation";

async function AuthLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const { session } = await getSession();

  if (session) redirect("/");

  return <div>{children}</div>;
}

export default AuthLayout;
