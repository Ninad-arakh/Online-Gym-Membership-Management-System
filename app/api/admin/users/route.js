import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "@/models/User";
import Membership from "@/models/Membership";
import Plan from "@/models/Plan"; // ✅ IMPORTANT
import Trainer from "@/models/Trainer"; // ✅ IMPORTANT

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
        (m) => m.userId.toString() === user._id.toString(),
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
      { status: 500 },
    );
  }
}

export async function POST(req) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    return NextResponse.json({ message: "Invalid token" }, { status: 401 });
  }

  if (decoded.role !== "admin") {
    return NextResponse.json({ message: "Forbidden" }, { status: 403 });
  }

  const { name, email, password } = await req.json();

  if (!name || !email || !password) {
    return NextResponse.json(
      { message: "All fields are required" },
      { status: 400 },
    );
  }

  await connectDB();

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return NextResponse.json(
      { message: "Admin with this email already exists" },
      { status: 409 },
    );
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const admin = await User.create({
    name,
    email,
    password: hashedPassword,
    role: "admin",
  });

  return NextResponse.json(
    {
      message: "Admin created successfully",
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
      },
    },
    { status: 201 },
  );
}
