import getSession from "@/app/actions/authActions";
import { createBudgetType } from "@/app/actions/budgetActions";
import { budgetTypeSchema } from "@/schema/budgetTypeSchema";
import { NextResponse } from "next/server";
import { z } from "zod";

async function GET(req: Request) {
  const { session, user } = await getSession();
  console.log(req.headers, "headers", session, user);
  return NextResponse.json({
    message: "some data",
  });
}

async function POST(req: Request) {
  const { session } = await getSession();
  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const body: z.infer<typeof budgetTypeSchema> = await req.json();

  console.log(body, "body");

  return NextResponse.json(await createBudgetType(body));
}

export { GET, POST };
