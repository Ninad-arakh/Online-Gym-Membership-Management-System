"use client";
import { SidebarDemo } from "@/components/Sidebar-Demo";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useLayoutEffect, useEffect, useState } from "react";

const ManageTrainers = () => {
  const [user, setUser] = useState(null);
  const [trainers, setTrainers] = useState([]);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  // 🔐 Admin check
  const getUser = async () => {
    try {
      const res = await axios.get("/api/auth/me", {
        withCredentials: true,
      });

      if (res.data.user.role === "user") {
        router.replace("/unauthorized");
        return;
      }

      setUser(res.data.user);
    } catch (err) {
      router.replace("/login");
    }
  };

  // 📦 Fetch trainers
  const getAllTrainers = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/api/admin/trainers", {
        withCredentials: true,
      });
      console.log("all trainers : ", res)
      setTrainers(res.data || []);
    } catch (err) {
      console.error("Failed to fetch trainers");
    } finally {
      setLoading(false);
    }
  };

  // 🔁 Toggle Active Status
  const toggleTrainerStatus = async (id, currentStatus) => {
    try {
      await axios.patch(
        `/api/admin/trainers/${id}`,
        { isActive: !currentStatus },
        { withCredentials: true }
      );

      setTrainers((prev) =>
        prev.map((t) =>
          t._id === id ? { ...t, isActive: !currentStatus } : t
        )
      );
    } catch (err) {
      console.error("Failed to update trainer");
    }
  };

  useLayoutEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    if (user) getAllTrainers();
  }, [user]);

  if (!user) return null;

  return (
    <SidebarDemo>
      <div className="p-4 sm:p-6">
        <h1 className="text-2xl font-semibold mb-6">Manage Trainers</h1>

        {loading ? (
          <p>Loading trainers...</p>
        ) : trainers.length === 0 ? (
          <p className="text-gray-500">No trainers found</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {trainers.map((trainer) => (
              <div
                key={trainer._id}
                className="rounded-xl border bg-white dark:bg-zinc-900 p-5 shadow-sm flex flex-col justify-between"
              >
                {/* Info */}
                <div className="space-y-2">
                  <h2 className="text-lg font-semibold">
                    {trainer.name}
                  </h2>

                  <p className="text-sm text-gray-500 capitalize">
                    Gender: {trainer.gender}
                  </p>

                  <p className="text-sm">
                    Experience:{" "}
                    <span className="font-medium">
                      {trainer.experienceYears} yrs
                    </span>
                  </p>

                  <div className="flex flex-wrap gap-2 mt-2">
                    {trainer.specialization.map((spec) => (
                      <span
                        key={spec}
                        className="text-xs px-2 py-1 rounded-full bg-gray-100 dark:bg-zinc-800"
                      >
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between mt-5">
                  <span
                    className={`text-xs font-medium px-3 py-1 rounded-full ${
                      trainer.isActive
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {trainer.isActive ? "Active" : "Inactive"}
                  </span>

                  <button
                    onClick={() =>
                      toggleTrainerStatus(trainer._id, trainer.isActive)
                    }
                    className="text-sm px-4 py-2 rounded-lg border hover:bg-black hover:text-white transition"
                  >
                    {trainer.isActive ? "Disable" : "Enable"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </SidebarDemo>
  );
};

export default ManageTrainers;
