import { NextResponse } from "next/server";

export async function GET() {
  const data = { message: "Hello World" };

  return NextResponse.json({ data });
}
