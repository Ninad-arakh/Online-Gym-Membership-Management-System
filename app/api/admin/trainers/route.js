import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import Trainer from "@/models/Trainer";
import { connectDB } from "@/lib/db";

export async function POST(req) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  if (!token)
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  if (decoded.role !== "admin")
    return NextResponse.json({ message: "Forbidden" }, { status: 403 });

  const body = await req.json();
  await connectDB();

  const trainer = await Trainer.create(body);

  return NextResponse.json({ message: "Trainer created", trainer });
}

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  if (!token)
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  if (decoded.role !== "admin")
    return NextResponse.json({ message: "Forbidden" }, { status: 403 });

  await connectDB();
  const trainers = await Trainer.find().sort({ createdAt: -1 });

  return NextResponse.json(trainers);
}
