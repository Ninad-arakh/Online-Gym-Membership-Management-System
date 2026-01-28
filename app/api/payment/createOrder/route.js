import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Membership from "@/models/Membership";
import Plan from "@/models/Plan";
import Payment from "@/models/Payment";
import { getUserFromCookies } from "@/lib/auth";

export async function POST(req) {
  const user = getUserFromCookies();
  if (!user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { planId } = await req.json();
  await connectDB();

  const plan = await Plan.findById(planId);
  if (!plan) {
    return NextResponse.json({ message: "Plan not found" }, { status: 404 });
  }

  const startDate = new Date();
  const endDate = new Date(startDate);
  endDate.setDate(endDate.getDate() + plan.durationInDays);

  // Create membership with SNAPSHOT data
  const membership = await Membership.create({
    userId: user.id,
    planId: plan._id,
    planSlug: plan.slug,
    planTitle: plan.title,
    pricePaid: plan.price,
    billingCycle: plan.billingCycle,
    startDate,
    endDate,
    status: plan.price === 0 ? "trial" : "active",
    isTrial: plan.price === 0,
  });

  // Create payment record only for paid plans
  if (plan.price > 0) {
    await Payment.create({
      userId: user.id,
      planId: plan._id,
      membershipId: membership._id,
      amount: plan.price,
      currency: "INR",
      status: "success",
      provider: "manual", // later: razorpay
    });
  }

  return NextResponse.json(membership, { status: 201 });
}


