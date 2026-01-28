import { instance } from "@/utils/razorpay";
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
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

  // FREE PLAN → no Razorpay
  if (plan.price === 0) {
    return NextResponse.json(
      { message: "Free plan does not require payment" },
      { status: 400 },
    );
  }

  const order = await instance.orders.create({
    amount: plan.price * 100, // paise
    currency: "INR",
    receipt: `rcpt_${Date.now()}`,
    notes: {
      userId: user.id,
      planId: plan._id.toString(),
    },
  });

  // 🔐 Store order internally
  await Payment.create({
    userId: user.id,
    planId: plan._id,
    amount: plan.price,
    currency: "INR",
    provider: "razorpay",
    status: "created",
    razorpayOrderId: order.id,
  });

  return NextResponse.json(
    {
      key: process.env.RAZORPAY_KEY_ID,
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
    },
    { status: 201 },
  );
}
