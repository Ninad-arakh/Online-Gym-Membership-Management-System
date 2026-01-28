import Trainer from "@/models/Trainer";
import { NextResponse } from "next/server";

export async function PATCH(req, { params }) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  if (!token)
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  if (decoded.role !== "admin")
    return NextResponse.json({ message: "Forbidden" }, { status: 403 });

  const { isActive } = await req.json();
  await connectDB();

  const trainer = await Trainer.findByIdAndUpdate(
    params.id,
    { isActive },
    { new: true },
  );

  return NextResponse.json(trainer);
}
