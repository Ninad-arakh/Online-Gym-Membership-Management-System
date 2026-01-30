import crypto from "crypto";
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Membership from "@/models/Membership";
import Payment from "@/models/Payment";
import Plan from "@/models/Plan";
import { getUserFromCookies } from "@/lib/auth";

export async function POST(req) {
  try {
    const user = await getUserFromCookies();
    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      await req.json();

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return NextResponse.json(
        { message: "Invalid signature" },
        { status: 400 },
      );
    }

    await connectDB();

    // 🔒 Source of truth
    const payment = await Payment.findOne({
      razorpayOrderId: razorpay_order_id,
      status: "created",
    });

    if (!payment) {
      return NextResponse.json(
        { message: "Payment record not found" },
        { status: 404 },
      );
    }

    console.log("payment.planId:", payment.planId);

    const plan = await Plan.findById(payment.planId);
    console.log("plan fetched from DB:", plan);
    if (!plan) {
      return NextResponse.json({ message: "Plan not found" }, { status: 404 });
    }
    
    // Ensure planSlug exists
    if (!plan.slug) {
      console.warn(`Plan ${plan._id} missing slug! Defaulting to 'basic'`);
      plan.slug = "basic"; // fallback for testing
    }
    // Create membership AFTER payment success
    const startDate = new Date();
    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + plan.durationInDays);

    const membership = await Membership.create({
      userId: user.id,
      planId: plan._id,
      planSlug: plan.slug,
      planTitle: plan.title,
      pricePaid: plan.price,
      billingCycle: plan.billingCycle,
      startDate,
      endDate,
      status: "active",
      isTrial: false,
    });

    // Update payment
    payment.status = "success";
    payment.membershipId = membership._id;
    payment.razorpayPaymentId = razorpay_payment_id;
    payment.razorpaySignature = razorpay_signature;
    payment.paymentDate = new Date();

    await payment.save();

    return NextResponse.json({ membership }, { status: 201 });
  } catch (err) {
    console.error("error : ", err);
    return NextResponse.json({ membership: null }, { status: 403 });
  }
}
