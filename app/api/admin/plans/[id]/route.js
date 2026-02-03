import { connectDB } from "@/lib/db";
import Plan from "@/models/Plan";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function PATCH(req, { params }) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  if (decoded.role !== "admin") {
    return NextResponse.json({ message: "Forbidden" }, { status: 403 });
  }

  const data = await req.json();
  await connectDB();

  const paramsObj = await params;
  const planId = paramsObj.id;

  const updatedPlan = await Plan.findByIdAndUpdate(planId, data, {
    new: true,
    runValidators: true,
  });

  if (!updatedPlan) {
    return NextResponse.json({ message: "Plan not found" }, { status: 404 });
  }

  return NextResponse.json(updatedPlan);
}

export async function DELETE(req, { params }) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  if (decoded.role !== "admin") {
    return NextResponse.json({ message: "Forbidden" }, { status: 403 });
  }

  await connectDB();

  const paramsObj = await params;
  const planId = paramsObj.id;

  const plan = await Plan.findByIdAndUpdate(
    planId,
    { isActive: false },
    { new: true },
  );

  console.log("delete plan : ", plan)

  if (!plan) {
    return NextResponse.json({ message: "Plan not found" }, { status: 404 });
  }

  return NextResponse.json({
    message: "Plan deactivated successfully",
    plan,
  });
}
