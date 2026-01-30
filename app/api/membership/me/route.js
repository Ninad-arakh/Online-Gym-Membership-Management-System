// /api/membership/me/route.js
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import "@/models/Trainer";
import Membership from "@/models/Membership";
import { connectDB } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    
    if (!token) return NextResponse.json({ membership: null }, { status: 401 });
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("decoded : ", decoded)
    await connectDB();

    const membership = await Membership.findOne({ userId: decoded.id })
      .populate("trainerId")
      .sort({ createdAt: -1 });

    return NextResponse.json({ membership });
  } catch(err) {
    console.error("error : ", err)
    return NextResponse.json({ membership: null }, { status: 401 });
  }
}
