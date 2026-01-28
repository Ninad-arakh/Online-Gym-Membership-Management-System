import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Plan from "@/models/Plan";
import { getUserFromCookies } from "@/lib/auth";

export async function GET() {
  await connectDB();
  const plans = await Plan.find();
  return NextResponse.json(plans);
}

export async function POST(req) {
  const user = await getUserFromCookies();
  if (!user || user.role !== "admin") {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const data = await req.json();
  await connectDB();

  const plan = await Plan.create(data);
  return NextResponse.json(plan, { status: 201 });
}
