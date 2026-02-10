"use client";
import { SidebarDemo } from "@/components/Sidebar-Demo";
import UpdateModal from "@/components/UpdateModal";
import axios from "axios";
import Link from "next/link";
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
    } catch {
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
    } catch {
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

      if (res.status === 200) toast.success("Trainer status updated");

      setTrainers((prev) =>
        prev.map((t) =>
          t._id === id ? { ...t, isActive: !currentStatus } : t,
        ),
      );
    } catch {
      toast.error("Failed to update trainer");
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
      <div className="min-h-full p-4 sm:p-6 space-y-8 rounded-tl-2xl bg-gradient-to-br from-slate-50 via-indigo-50 to-purple-50">
        <UpdateModal />
        {/* Header */}
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-800">
              Manage Trainers
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              Enable or disable trainers available for members
            </p>
          </div>

          <Link
            href="/admin/trainers/new"
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md hover:shadow-lg hover:brightness-110 active:scale-[0.97] transition-all"
          >
            + Add Trainer
          </Link>
        </div>

        {/* Content */}
        {loading ? (
          <div className="text-center py-16 text-slate-500">
            Loading trainers…
          </div>
        ) : trainers.length === 0 ? (
          <div className="text-center py-16 text-slate-400">
            No trainers found
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {trainers.map((trainer) => (
              <div
                key={trainer._id}
                className="group relative rounded-2xl border border-slate-200 bg-linear-to-br from-[#faf8fc] via-[#f6f3fb] to-[#cab5ff] backdrop-blur-xl p-5 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all"
              >
                {/* Top */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold capitalize text-slate-800">
                      {trainer.name}
                    </h2>

                    <span
                      className={`text-xs font-semibold px-3 py-1 rounded-full border ${
                        trainer.isActive
                          ? "bg-emerald-50 text-emerald-600 border-emerald-200"
                          : "bg-rose-50 text-rose-600 border-rose-200"
                      }`}
                    >
                      {trainer.isActive ? "Active" : "Inactive"}
                    </span>
                  </div>

                  <p className="text-sm text-slate-500 capitalize">
                    Gender: {trainer.gender}
                  </p>

                  {typeof trainer.age === "number" && (
                    <p className="text-sm text-slate-500">
                      Age:{" "}
                      <span className="font-medium text-slate-800">
                        {trainer.age} years
                      </span>
                    </p>
                  )}

                  <p className="text-sm text-slate-500">
                    Experience:{" "}
                    <span className="font-medium text-slate-800">
                      {trainer.experienceYears} years
                    </span>
                  </p>

                  {/* Specializations */}
                  <div className="flex flex-wrap gap-2 pt-1">
                    {trainer.specialization.map((spec) => (
                      <span
                        key={spec}
                        className="text-xs px-3 py-1 rounded-full bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-100 text-indigo-700"
                      >
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Divider */}
                <div className="my-5 h-px bg-slate-200" />

                {/* Actions */}
                <button
                  onClick={() =>
                    toggleTrainerStatus(trainer._id, trainer.isActive)
                  }
                  className={`w-full rounded-xl px-4 py-2 text-sm font-medium transition-all ${
                    trainer.isActive
                      ? "border border-rose-300 text-rose-600 hover:bg-rose-600 hover:text-white"
                      : "border border-emerald-300 text-emerald-600 hover:bg-emerald-600 hover:text-white"
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
