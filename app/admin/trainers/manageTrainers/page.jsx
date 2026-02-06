"use client";
import { SidebarDemo } from "@/components/Sidebar-Demo";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useLayoutEffect, useEffect, useState } from "react";
import { toast } from "sonner";

const ManageTrainers = () => {
  const [user, setUser] = useState(null);
  const [trainers, setTrainers] = useState([]);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

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

  const getAllTrainers = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/api/admin/trainers", {
        withCredentials: true,
      });
      setTrainers(res.data || []);
    } catch (err) {
      console.error("Failed to fetch trainers");
    } finally {
      setLoading(false);
    }
  };

  const toggleTrainerStatus = async (id, currentStatus) => {
    try {
      const res = await axios.patch(
        `/api/admin/trainers/${id}`,
        { isActive: !currentStatus },
        { withCredentials: true },
      );

      console.log("res : ", res);
      if (res.status === 200) {
        toast.success("Success.");
      }

      setTrainers((prev) =>
        prev.map((t) =>
          t._id === id ? { ...t, isActive: !currentStatus } : t,
        ),
      );
    } catch (err) {
      toast.error("Failed to update trainer");
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
    <SidebarDemo user={user}>
      <div className="min-h-full p-4 sm:p-6 space-y-8 rounded-tl-2xl bg-linear-to-br from-black via-red-600/70 to-black">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white">
            Manage Trainers
          </h1>
          <p className="text-sm text-gray-300 mt-1">
            Enable or disable trainers available for members
          </p>
        </div>

        {/* Content */}
        {loading ? (
          <div className="text-center py-16 text-gray-300">
            Loading trainers…
          </div>
        ) : trainers.length === 0 ? (
          <div className="text-center py-16 text-gray-400">
            No trainers found
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {trainers.map((trainer) => (
              <div
                key={trainer._id}
                className="group relative rounded-2xl border border-white/10 bg-black/60 backdrop-blur-xl p-5 shadow-md hover:shadow-xl transition-all"
              >
                {/* Top */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold capitalize text-white">
                      {trainer.name}
                    </h2>

                    <span
                      className={`text-xs font-semibold px-3 py-1 rounded-full border ${
                        trainer.isActive
                          ? "bg-green-900/20 text-green-400 border-green-900/40"
                          : "bg-red-900/20 text-red-400 border-red-900/40"
                      }`}
                    >
                      {trainer.isActive ? "Active" : "Inactive"}
                    </span>
                  </div>

                  <p className="text-sm text-gray-400 capitalize">
                    Gender: {trainer.gender}
                  </p>

                  {/* Age */}
                  {typeof trainer.age === "number" && (
                    <p className="text-sm text-gray-400">
                      Age:{" "}
                      <span className="font-medium text-white">
                        {trainer.age} years
                      </span>
                    </p>
                  )}

                  <p className="text-sm text-gray-300">
                    Experience:{" "}
                    <span className="font-medium text-white">
                      {trainer.experienceYears} years
                    </span>
                  </p>

                  {/* Specializations */}
                  <div className="flex flex-wrap gap-2 pt-1">
                    {trainer.specialization.map((spec) => (
                      <span
                        key={spec}
                        className="text-xs px-3 py-1 rounded-full bg-white/5 border border-white/10 text-gray-300"
                      >
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Divider */}
                <div className="my-5 h-px bg-white/10" />

                {/* Actions */}
                <button
                  onClick={() =>
                    toggleTrainerStatus(trainer._id, trainer.isActive)
                  }
                  className={`w-full rounded-xl px-4 py-2 text-sm font-medium transition-all ${
                    trainer.isActive
                      ? "border border-red-900/50 text-red-400 hover:bg-red-900 hover:text-white"
                      : "border border-green-700/40 text-green-400 hover:bg-green-700 hover:text-white"
                  }`}
                >
                  {trainer.isActive ? "Disable Trainer" : "Enable Trainer"}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </SidebarDemo>
  );
};

export default ManageTrainers;
