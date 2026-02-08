"use client";
import { motion, AnimatePresence } from "motion/react";
import React, { useState } from "react";
import Link from "next/link";

export default function TrainerTable({ trainers, onAssign, user }) {
  const [openId, setOpenId] = useState(null);

  return (
    <div className="relative rounded-2xl border border-slate-200 bg-gradient-to-br from-[#f8f9ff] via-white to-[#eef6ff] shadow-xl backdrop-blur">
      
      {/* Top Bar */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-slate-200 bg-gradient-to-r from-indigo-50 via-white to-violet-50 rounded-t-2xl">
        <h3 className="text-sm font-semibold text-slate-700">
          Trainers
        </h3>

        {user?.role === "admin" && (
          <Link
            href="/admin/trainers/new"
            className="rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-4 py-2 text-sm font-semibold text-white shadow-md hover:shadow-lg hover:brightness-110 active:scale-[0.97] transition-all"
          >
            + Add Trainer
          </Link>
        )}
      </div>

      {/* Table */}
      <div className="overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gradient-to-r from-slate-50 to-slate-100 text-slate-600 text-sm">
            <tr>
              <th className="p-4 font-semibold">Name</th>
              <th className="p-4 hidden md:table-cell font-semibold">
                Experience
              </th>
              <th className="p-4 hidden md:table-cell font-semibold">
                Gender
              </th>
              <th className="p-4 font-semibold">Action</th>
            </tr>
          </thead>

          <tbody>
            {trainers.map((t) => {
              const isOpen = openId === t._id;

              return (
                <React.Fragment key={t._id}>
                  {/* Main Row */}
                  <motion.tr
                    whileHover={{ scale: 1.005 }}
                    className={`border-t transition-all duration-200 ${
                      isOpen
                        ? "bg-indigo-50/70"
                        : "hover:bg-gradient-to-r from-indigo-50/70 via-white to-cyan-50/70"
                    }`}
                  >
                    <td className="p-4 font-semibold text-slate-800">
                      {t.name}
                    </td>

                    <td className="p-4 hidden md:table-cell text-slate-600">
                      {t.experienceYears} yrs
                    </td>

                    <td className="p-4 hidden md:table-cell capitalize text-slate-600">
                      {t.gender}
                    </td>

                    <td className="p-4">
                      <button
                        onClick={() =>
                          setOpenId(isOpen ? null : t._id)
                        }
                        className={`rounded-lg px-4 py-1.5 text-sm font-medium transition-all duration-200
                          ${
                            isOpen
                              ? "bg-indigo-600 text-white shadow-md hover:bg-indigo-700"
                              : "border border-slate-300 bg-white text-slate-700 hover:bg-emerald-100"
                          }`}
                      >
                        {isOpen ? "Hide" : "View"}
                      </button>
                    </td>
                  </motion.tr>

                  {/* Expanded Row */}
                  <AnimatePresence>
                    {isOpen && (
                      <motion.tr
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25, ease: "easeOut" }}
                        className="bg-gradient-to-br from-indigo-50 via-white to-cyan-50"
                      >
                        <td colSpan={4} className="p-6">
                          <div className="grid gap-6 md:grid-cols-3 text-sm">
                            
                            {/* Age */}
                            <div className="rounded-xl bg-gradient-to-br from-pink-50 via-white to-indigo-50 p-4 shadow-sm border border-slate-200">
                              <p className="text-slate-500 text-xs uppercase tracking-wide">
                                Age
                              </p>
                              <p className="mt-1 text-base font-semibold text-slate-800">
                                {t.age ?? "—"}
                              </p>
                            </div>

                            {/* Skills */}
                            <div className="rounded-xl bg-gradient-to-br from-pink-50 via-white to-indigo-50 p-4 shadow-sm border border-slate-200">
                              <p className="text-slate-500 text-xs uppercase tracking-wide">
                                Specialization
                              </p>
                              <div className="mt-2 flex flex-wrap gap-2">
                                {t.specialization.map((s) => (
                                  <span
                                    key={s}
                                    className="rounded-full bg-gradient-to-r from-indigo-100 to-violet-100 px-3 py-1 text-xs font-medium text-indigo-700 hover:scale-105 transition"
                                  >
                                    {s}
                                  </span>
                                ))}
                              </div>
                            </div>

                            {/* CTA */}
                            <div className="flex items-end">
                              <button
                                onClick={() => onAssign(t._id)}
                                className="w-full rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-4 py-2.5 text-white font-semibold shadow-md hover:shadow-lg hover:brightness-110 active:scale-[0.98] transition-all"
                              >
                                Assign Trainer
                              </button>
                            </div>
                          </div>
                        </td>
                      </motion.tr>
                    )}
                  </AnimatePresence>
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
