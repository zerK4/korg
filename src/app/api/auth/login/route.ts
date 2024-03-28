import { login } from "@/app/actions/authActions";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const data = await login(body);
    return NextResponse.json(
      {
        message: "Coolio dudre",
        data,
      },
      { status: 200 },
    );
  } catch (error) {
    console.log(error);

    throw error;
  }
}

export async function OPTIONS(req: Request) {
  return NextResponse.json({}, { status: 200 });
}
