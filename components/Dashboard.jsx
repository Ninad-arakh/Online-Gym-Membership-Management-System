"use client";

// import { dashboardData } from "@/utils/constants";
import axios from "axios";
import React, { useEffect, useState } from "react";
import MembersGrowthChart from "./MembersGrowthChart";
import { useRouter } from "next/navigation";

const formatTime = (date) => {
  return new Date(date).toLocaleString("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  });
};

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [dashboardData, setDashboardData] = useState();

  const router = useRouter();

  const getData = async () => {
    try {
      const response = await axios.get("/api/dashboard");

      if (response.status === 200) {
        setDashboardData(response.data);
        setStats(response.data.stats);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  if (stats === null || dashboardData === null) {
    return null;
  }
  return (
    <div className="flex flex-1 bg-black overflow-y-scroll no-scrollbar">
      <div className="flex h-full w-full flex-1 flex-col gap-4 rounded-tl-2xl  bg-linear-to-br from-black via-red-600/70 to-black p-2 md:p-10 dark:border-neutral-700 dark:bg-neutral-900">
        <div className="w-full flex flex-wrap gap-3 mb-2 justify-end">
          <button
            onClick={() => router.push("/admin/trainers/new")}
            className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 transition text-white text-sm font-semibold"
          >
            + Add Trainer
          </button>

          <button
            onClick={() => router.push("/admin/trainers/manageTrainers")}
            className="px-4 py-2 rounded-lg bg-sky-600 hover:bg-sky-700 transition text-white text-sm font-semibold"
          >
            View Trainers
          </button>

          {/* <button
            onClick={() => router.push("/admin/plans/new")}
            className="px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-700 transition text-white text-sm font-semibold"
          >
            + Create Plan
          </button> */}

          <button
            onClick={() => router.push("/membership/plan")}
            className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 transition text-white text-sm font-semibold"
          >
            Manage Plans
          </button>

          {/* <button
            onClick={() => router.push("/admin/users")}
            className="px-4 py-2 rounded-lg bg-orange-600 hover:bg-orange-700 transition text-white text-sm font-semibold"
          >
            Users
          </button> */}

          <button
            onClick={() => router.push("/admin/manageUsers")}
            className="px-4 py-2 rounded-lg bg-rose-600 hover:bg-rose-700 transition text-white text-sm font-semibold"
          >
            Users
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <div className="py-2 px-3 w-full text rounded-lg bg-neutral-100/90  dark:bg-neutral-800 ">
            <h2 className="font-semibold text-xl text-center">Total members</h2>
            <h1 className="font-bold text-3xl text-center">
              {stats.totalUsers}
            </h1>
          </div>

          <div className="py-2 px-3 w-full text rounded-lg bg-neutral-100/90  dark:bg-neutral-800 ">
            <h2 className="font-semibold text-xl text-center">
              Active members
            </h2>
            <h1 className="font-bold text-3xl text-center">
              {stats.activeMemberships}
            </h1>
          </div>

          <div className="py-2 px-3 w-full text rounded-lg bg-neutral-100/90  dark:bg-neutral-800 ">
            <h2 className="font-semibold text-xl text-center">
              Monthly Revenue
            </h2>
            <h1 className="font-bold text-3xl text-center">
              {stats.monthlyRevenue}
            </h1>
          </div>

          <div className="py-2 px-3 w-full text rounded-lg bg-neutral-100/90  dark:bg-neutral-800 ">
            <h2 className="font-semibold text-xl text-center">Total admins</h2>
            <h1 className="font-bold text-3xl text-center">
              {stats.totalAdmins}
            </h1>
          </div>
        </div>
        <div className="grid grid-cols-1 w-full sm:grid-cols-2 gap-4">
          <div className="h-full w-full rounded-lg bg-gray-10 dark:bg-neutral-800 ">
            <MembersGrowthChart data={dashboardData.graphs.userGrowth} />
          </div>

          <div className=" w-full rounded-lg bg-gray-10 dark:bg-neutral-800 h-[70vh]">
            <div className="flex h-full flex-col rounded-lg bg-linear-to-br from-[#292026] to-[#49213e] dark:bg-neutral-800 p-4 text-gray-200">
              <h2 className="mb-3 text-lg font-semibold text-center">
                Recent Purchases
              </h2>

              <div className="flex flex-col gap-3 overflow-y-auto no-scrollbar">
                {dashboardData.history?.length > 0 ? (
                  dashboardData.history.map((item) => (
                    <div
                      key={item._id}
                      className="flex flex-col rounded-md bg-white/10 dark:bg-neutral-700 p-3"
                    >
                      <div className="flex justify-between items-center">
                        <p className="text-sm font-semibold">
                          {item.userId?.name || "Unknown User"}
                        </p>
                        <span className="text-xs text-gray-300">
                          {formatTime(item.createdAt)}
                        </span>
                      </div>

                      <p className="text-sm text-gray-200 dark:text-gray-300">
                        Purchased{" "}
                        <span className="font-medium">{item.planTitle}</span> (
                        {item.billingCycle})
                      </p>

                      <p className="text-xs text-gray-300 mt-1">
                        Amount: ₹{item.pricePaid} • Status: {item.status}
                      </p>
                    </div>
                  ))
                ) : (
                  <div className="text-center text-sm text-gray-400">
                    No recent purchases
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
