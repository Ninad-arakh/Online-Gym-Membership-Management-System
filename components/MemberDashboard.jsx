"use client";

import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import Cards from "./Cards";

const MemberDashboard = ({ user }) => {
  const [membership, setMembership] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMembership = async () => {
      try {
        const { data } = await axios.get("/api/membership/me",{withCredentials:true});
        setMembership(data.membership);
      } catch (err) {
        console.error("error : ", err)
        setMembership(null);
      } finally {
        setLoading(false);
      }
    };
    fetchMembership();
  }, []);

  if (loading) return null;

  /* ---------------- NO MEMBERSHIP ---------------- */
  if (!membership) {
    return (
      <div className="flex flex-col items-center justify-center -mt-32 text-center text-white w-full">
        {/* <h1 className="text-4xl font-semibold">Welcome, {user.name}</h1>
        <p className="mt-3 text-gray-400 max-w-md">
          You don’t have an active membership yet. Choose a plan to unlock
          workouts, trainers, and tracking.
        </p>

        <Link href={"/membership/plan"}><button className="mt-8 bg-red-500 hover:bg-red-600 px-10 py-3 rounded-md text-lg">
          View Plans
        </button></Link> */}

        {/* <div className="h-160 rounded-md flex flex-col antialiased bg-slate-800/85 dark:bg-black dark:bg-grid-white/[0.05]  relative overflow-hidden F"> */}
          <Cards />
        {/* </div> */}
      </div>
    );
  }

  /* ---------------- MEMBERSHIP PRESENT ---------------- */
  const endDate = new Date(membership.endDate);
  const daysLeft = Math.ceil((endDate - new Date()) / (1000 * 60 * 60 * 24));

  const isActive = membership.status === "active";
  const isTrial = membership.isTrial;

  return (
    <div className="w-full max-w-5xl mx-auto flex flex-col gap-10 text-white pt-10">
      {/* Greeting */}
      <div className="text-center">
        <h1 className="text-4xl font-semibold">Welcome back, {user.name}</h1>
        <p className="mt-2 text-gray-300">
          Here’s a quick look at your membership
        </p>
      </div>

      {/* Membership Status Card */}
      <div className=" bg-slate-900/90 rounded-2xl p-8 shadow-xl">
        <div className="flex flex-col md:flex-row justify-between gap-6">
          {/* Left */}
          <div>
            <h2 className="text-2xl font-semibold">{membership.planTitle}</h2>

            <p className="mt-1 text-gray-400 capitalize">
              {membership.billingCycle} billing
            </p>

            <p className="mt-3 text-sm text-gray-300">
              Ends on {endDate.toDateString()}
            </p>
          </div>

          {/* Right */}
          <div className="text-right">
            <span
              className={`inline-block px-4 py-1 rounded-full text-sm font-semibold ${
                isActive
                  ? "bg-green-500 text-black"
                  : "bg-yellow-500 text-black"
              }`}
            >
              {isTrial ? "TRIAL" : membership.status.toUpperCase()}
            </span>

            <p className="mt-4 text-2xl font-bold">{daysLeft} days left</p>

            <p className="text-sm text-gray-400">
              ₹{membership.pricePaid} paid
            </p>
          </div>
        </div>

        <div className="mt-8 flex justify-center">
          <button className="bg-red-500 hover:bg-red-600 px-10 py-3 rounded-md cursor-not-allowed">
            Manage Membership
          </button>
        </div>
      </div>

      {/* Trainer Info (only if plan allows) */}
      {["pro", "elite"].includes(membership.planSlug) && (
        <div className="backdrop-blur-md bg-slate-900/90 rounded-2xl p-6">
          <h3 className="text-xl font-semibold mb-3">Personal Trainer</h3>

          {membership.trainerId ? (
            <p className="text-green-400">
              Assigned to {membership.trainerId.name}
            </p>
          ) : (
            <p className="text-yellow-400">No trainer assigned yet</p>
          )}
        </div>
      )}
    </div>
  );
};

export default MemberDashboard;
