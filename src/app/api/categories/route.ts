import { newCategory } from "@/app/actions/categoryActions";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
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

export async function OPTIONS(req: Request) {
  return NextResponse.json({}, { status: 200 });
}
