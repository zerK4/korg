import { login } from "@/app/actions/authActions";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    console.log("asdadasd");
    const body = await req.json();

    console.log(body, "this body");

    const data = await login(body);
    console.log(data, "hitting it adada");

    return NextResponse.json(
      {
        message: "Coolio dudre",
        data,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);

    throw error;
  }
}

export async function OPTIONS(req: Request) {
  return NextResponse.json({}, { status: 200 });
}
