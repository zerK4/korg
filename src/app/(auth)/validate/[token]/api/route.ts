import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { name, value, attributes } = await req.json();

  cookies().set(name, value, attributes);

  return NextResponse.json({
    message: "Success",
  });
}
