import getSession from "@/app/actions/authActions";
import { getAllCategories, newCategory } from "@/app/actions/categoryActions";
import { NextResponse } from "next/server";

async function GET() {
  const { session } = await getSession();

  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  return NextResponse.json(await getAllCategories());
}

async function POST(req: Request) {
  const body = await req.json();

  if (!body) return NextResponse.json({ message: "No body" }, { status: 400 });

  const data = await newCategory(body);

  return NextResponse.json(
    {
      message: "Coolio dudre",
      data,
    },
    { status: 200 }
  );
}

async function OPTIONS(req: Request) {
  return NextResponse.json({}, { status: 200 });
}

export { GET, POST, OPTIONS };
