import { connectDB } from "@/lib/db";
import Trainer from "@/models/Trainer";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function PATCH(req, { params }) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  if (!token)
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  if (decoded.role !== "admin")
    return NextResponse.json({ message: "Forbidden" }, { status: 403 });

  const { isActive } = await req.json();
  await connectDB();

  const p = await params
  const paramsID = p.id;

  // console.log("params Id : ", paramsID)

  // console.log("isActive : ", isActive)

  const trainer = await Trainer.findByIdAndUpdate(
    paramsID,
    { isActive },
    { new: true },
  );

  return NextResponse.json(trainer);
}
