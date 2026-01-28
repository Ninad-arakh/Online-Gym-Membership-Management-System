import { NextResponse } from "next/server";
import Trainer from "@/models/Trainer";
import { connectDB } from "@/lib/db";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const gender = searchParams.get("gender");

  await connectDB();

  const query = { isActive: true };
  if (gender) query.gender = gender;

  const trainers = await Trainer.find(query);
  return NextResponse.json(trainers);
}
