import { connectDB } from "@/lib/db";
import Membership from "@/models/Membership";
import User from "@/models/User";
import Payment from "@/models/Payment";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.role !== "admin") {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    await connectDB();

    /* =======================
       BASIC COUNTS
    ======================= */

    const totalUsers = await User.countDocuments({ role: "user" });
    const totalAdmins = await User.countDocuments({ role: "admin" });

    const activeMemberships = await Membership.countDocuments({
      status: "active",
      endDate: { $gt: new Date() },
    });

    const expiredMemberships = await Membership.countDocuments({
      status: "expired",
    });

    const trialUsers = await Membership.countDocuments({
      isTrial: true,
      status: "trial",
    });

    /* =======================
       REVENUE
    ======================= */

    const totalRevenueAgg = await Membership.aggregate([
      { $match: { status: { $in: ["active", "expired"] } } },
      { $group: { _id: null, total: { $sum: "$pricePaid" } } },
    ]);

    const totalRevenue = totalRevenueAgg[0]?.total || 0;

    const startOfMonth = new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      1,
    );

    const monthlyRevenueAgg = await Membership.aggregate([
      {
        $match: {
          createdAt: { $gte: startOfMonth },
          status: { $in: ["active", "expired"] },
        },
      },
      { $group: { _id: null, total: { $sum: "$pricePaid" } } },
    ]);

    const monthlyRevenue = monthlyRevenueAgg[0]?.total || 0;

    /* =======================
       MOST POPULAR PLAN
    ======================= */

    const popularPlanAgg = await Membership.aggregate([
      {
        $group: {
          _id: "$planSlug",
          count: { $sum: 1 },
        },
      },
      { $sort: { count: -1 } },
      { $limit: 1 },
    ]);

    const mostPopularPlan = popularPlanAgg[0] || null;

    /* =======================
       LATEST PURCHASE HISTORY
    ======================= */

    const history = await Membership.find()
      .populate({
        path: "userId",
        select: "name email",
      })
      .sort({ createdAt: -1 })
      .limit(10)
      .lean();

    /* =======================
      GRAPH DATA (LAST 6 MONTHS)
    ======================= */

    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 5);
    sixMonthsAgo.setDate(1);

    // Registered users per month
    const usersGraph = await User.aggregate([
      {
        $match: {
          role: "user",
          createdAt: { $gte: sixMonthsAgo },
        },
      },
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" },
          },
          count: { $sum: 1 },
        },
      },
      { $sort: { "_id.year": 1, "_id.month": 1 } },
    ]);

    // Enrolled users (memberships) per month
    const enrollmentsGraph = await Membership.aggregate([
      {
        $match: {
          createdAt: { $gte: sixMonthsAgo },
          status: { $in: ["active", "expired", "trial"] },
        },
      },
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" },
          },
          count: { $sum: 1 },
        },
      },
      { $sort: { "_id.year": 1, "_id.month": 1 } },
    ]);

    /* =======================
   RECHARTS FRIENDLY GRAPH DATA
======================= */

    const MONTHS = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    // Create a map for quick lookup
    const graphMap = {};

    // Registered users
    usersGraph.forEach((item) => {
      const monthIndex = item._id.month - 1;
      const month = MONTHS[monthIndex];

      if (!graphMap[month]) {
        graphMap[month] = { month, registered: 0, enrolled: 0 };
      }

      graphMap[month].registered = item.count;
    });

    // Enrolled users
    enrollmentsGraph.forEach((item) => {
      const monthIndex = item._id.month - 1;
      const month = MONTHS[monthIndex];

      if (!graphMap[month]) {
        graphMap[month] = { month, registered: 0, enrolled: 0 };
      }

      graphMap[month].enrolled = item.count;
    });

    // Final array sorted by month order
    const rechartsData = MONTHS.filter((month) => graphMap[month]).map(
      (month) => graphMap[month],
    );

    /* =======================
       RESPONSE
    ======================= */

    return NextResponse.json({
      message: "Admin dashboard data",
      user: decoded,

      stats: {
        totalUsers,
        totalAdmins,
        activeMemberships,
        expiredMemberships,
        trialUsers,
        totalRevenue,
        monthlyRevenue,
        mostPopularPlan,
      },

      graphs: {
        userGrowth: rechartsData,
      },

      history,
    });
  } catch (err) {
    return NextResponse.json({ message: "Invalid token" }, { status: 401 });
  }
}
