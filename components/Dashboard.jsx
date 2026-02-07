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
    <div className="flex flex-1 bg-[#fdfbfe] overflow-y-scroll no-scrollbar ">
      <div className="flex min-h-full w-full flex-1 flex-col gap-4 rounded-tl-2xl p-2 md:p-10 dark:border-neutral-700 dark:bg-neutral-900 relative mb-8">
        <h2 className="text-4xl text-[##312D3F] font-semibold tracking-tight">Admin Dashboard</h2>
        <div className="w-full flex flex-wrap gap-3 mb-2 justify-end">
          <button
            onClick={() => router.push("/admin/trainers/new")}
            className="px-4 py-2 rounded-lg bg-[#e6607b] hover:bg-[#fd6785] transition-all duration-300 shadow-sm cursor-pointer text-white text-sm font-semibold"
          >
            + Add Trainer
          </button>

          <button
            onClick={() => router.push("/admin/trainers/manageTrainers")}
            className="px-4 py-2 rounded-lg bg-[#f4f2f7] hover:bg-fuchsia-200 transition-all duration-300 shadow-sm cursor-pointer text-[#312D3F] text-sm font-semibold"
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
            className="px-4 py-2 rounded-lg bg-[#f4f2f7] hover:bg-fuchsia-200 transition-all duration-300 shadow-sm cursor-pointer text-[#312D3F] text-sm font-semibold"
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
            className="px-4 py-2 rounded-lg bg-[#f4f2f7] hover:bg-fuchsia-200 transition-all duration-300 shadow-sm cursor-pointer text-[#312D3F] text-sm font-semibold"
          >
            Users
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <div className="py-3 px-3 w-full text rounded-lg bg-linear-to-br from-[#dcedfd] border shadow-lg dark:bg-neutral-800 ">
            <h2 className="font-semibold text-xl  text-center md:text-left">Total members</h2>
            <h1 className="font-bold text-3xl text-center md:text-left">
              {stats.totalUsers}
            </h1>
          </div>

          <div className="py-2 px-3 w-full text rounded-lg bg-linear-to-br from-[#e2dafc] border shadow-lg dark:bg-neutral-800 ">
            <h2 className="font-semibold text-xl  text-center md:text-left">
              Active members
            </h2>
            <h1 className="font-bold text-3xl text-center md:text-left">
              {stats.activeMemberships}
            </h1>
          </div>

          <div className="py-2 px-3 w-full text rounded-lg bg-linear-to-br from-[#e2f1f4] border shadow-lg  dark:bg-neutral-800 ">
            <h2 className="font-semibold text-xl text-center md:text-left ">
              Monthly Revenue
            </h2>
            <h1 className="font-bold text-3xl text-center md:text-left">
              {stats.monthlyRevenue}
            </h1>
          </div>

          <div className="py-2 px-3 w-full text rounded-lg bg-linear-to-br from-[#fee2da] border shadow-lg dark:bg-neutral-800 ">
            <h2 className="font-semibold text-xl  text-center md:text-left">Total admins</h2>
            <h1 className="font-bold text-3xl text-center md:text-left">
              {stats.totalAdmins}
            </h1>
          </div>
        </div>


        <div className="grid grid-cols-1 w-full sm:grid-cols-2 gap-4 ">
          <div className="h-full w-full rounded-lg bg-gray-10 dark:bg-neutral-800  ">
            <MembersGrowthChart data={dashboardData.graphs.userGrowth} />
          </div>

          <div className=" w-full rounded-lg bg-gray-10 dark:bg-neutral-800 h-[70vh] shadow-xl border">
            <div className="flex h-full flex-col rounded-lg bg-[#f9f6fb] dark:bg-neutral-800 p-4 text-[##312D3F  ]">
              <h2 className="mb-3 text-lg font-semibold text-center">
                Recent Purchases
              </h2>

              <div className="flex flex-col gap-3 overflow-y-auto no-scrollbar ">
                {dashboardData.history?.length > 0 ? (
                  dashboardData.history.map((item) => (
                    <div
                      key={item._id}
                      className="flex flex-col border rounded-md bg-[#fdfafd] dark:bg-neutral-700 p-4"
                    >
                      <div className="flex justify-between items-center">
                        <p className="text-md uppercase font-bold">
                          {item.userId?.name || "Unknown User"}
                        </p>
                        <span className="text-xs text-[#312D3F]">
                          {formatTime(item.createdAt)}
                        </span>
                      </div>

                      <p className="text-sm text-[#312D3F] dark:text-gray-300">
                        Purchased{" "}
                        <span className="font-medium text-[#312D3F]">{item.planTitle}</span> (
                        {item.billingCycle})
                      </p>

                      <p className="text-xs text-[#625561] mt-1">
                        Amount: ₹{item.pricePaid} • Status: {item.status}
                      </p>
                    </div>
                  ))
                ) : (
                  <div className="text-center text-sm text-[#625561]">
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
