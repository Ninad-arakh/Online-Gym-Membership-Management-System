import { NextResponse } from "next/server";
import {connectDB} from "@/lib/db";

import User from "@/models/User";
import Membership from "@/models/Membership";
import Plan from "@/models/Plan";        // ✅ IMPORTANT
import Trainer from "@/models/Trainer";  // ✅ IMPORTANT

export async function GET() {
  try {
    await connectDB();

    const users = await User.find({ role: "user" })
      .select("name email createdAt")
      .lean();

    const userIds = users.map((u) => u._id);

    const memberships = await Membership.find({
      userId: { $in: userIds },
    })
      .populate("trainerId", "name specialization experienceYears")
      .populate("planId", "title price billingCycle")
      .sort({ createdAt: -1 })
      .lean();

    const usersWithMemberships = users.map((user) => ({
      ...user,
      memberships: memberships.filter(
        (m) => m.userId.toString() === user._id.toString()
      ),
    }));

    return NextResponse.json({
      success: true,
      users: usersWithMemberships,
    });
  } catch (error) {
    console.error("ADMIN USERS API ERROR:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch users" },
      { status: 500 }
    );
  }
}
