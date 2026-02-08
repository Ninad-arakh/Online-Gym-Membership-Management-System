import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import Membership from "@/models/Membership";
import Trainer from "@/models/Trainer";
import { NextResponse } from "next/server";

export async function POST(req) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  if (!token)
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const { trainerId, weightKg } = await req.json();

  const membership = await Membership.findOne({
    userId: decoded.id,
    status: "active",
  });

  if (!membership) {
    return NextResponse.json(
      { message: "No active membership" },
      { status: 400 },
    );
  }

  if (!weightKg || typeof weightKg !== "number" || weightKg <= 0) {
    return NextResponse.json(
      { message: "Valid weight is required" },
      { status: 400 },
    );
  }

  // if (!["pro", "elite"].includes(membership.planSlug)) {
  //   return NextResponse.json(
  //     { message: "Plan does not allow trainer" },
  //     { status: 403 },
  //   );
  // }

  const trainer = await Trainer.findById(trainerId);
  if (!trainer || !trainer.isActive) {
    return NextResponse.json(
      { message: "Trainer unavailable" },
      { status: 400 },
    );
  }

  membership.trainerId = trainer._id;
  membership.weightKg = weightKg;
  await membership.save();

  return NextResponse.json({ message: "Trainer assigned successfully" });
}
