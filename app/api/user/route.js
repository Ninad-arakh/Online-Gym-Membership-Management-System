import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import User from "@/models/User";
import { connectDB } from "@/lib/db";

export async function PATCH(req) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return Response.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { name } = await req.json();

    if (!name || name.trim().length < 2) {
      return Response.json(
        { message: "Name must be at least 2 characters" },
        { status: 400 }
      );
    }

    await connectDB();

    const updatedUser = await User.findByIdAndUpdate(
      decoded.id,
      { name: name.trim() },
      { new: true, runValidators: true }
    ).select("_id name email role");

    if (!updatedUser) {
      return Response.json(
        { message: "User not found" },
        { status: 404 }
      );
    }

    return Response.json(
      {
        message: "Username updated successfully",
        user: updatedUser,
      },
      { status: 200 }
    );
  } catch (err) {
    return Response.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}