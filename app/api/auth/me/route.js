import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import User from "@/models/User";
import { connectDB } from "@/lib/db";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;


    if (!token) {
      return Response.json({ user: null }, { status: 401 });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    await connectDB();
    const user = await User.findById(decoded.id).select("_id name email role");

    if (!user) {
      return Response.json({ user: null }, { status: 401 });
    }

    return Response.json({ user }, { status: 200 });
  } catch (err) {
    return Response.json({ user: null }, { status: 401 });
  }
}
