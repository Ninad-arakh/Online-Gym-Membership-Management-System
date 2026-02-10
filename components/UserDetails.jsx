"use client";
import { motion, AnimatePresence } from "motion/react";
import React, { useState } from "react";
import dayjs from "dayjs";
import UpdateModal from "./UpdateModal";

export default function AdminUsersTable({ users }) {
  const [openId, setOpenId] = useState(null);

  return (
    <div className="overflow-hidden rounded-2xl bg-white/80 backdrop-blur shadow-xl border border-slate-200">
      <UpdateModal />
      <table className="w-full text-left">
        {/* Header */}
        <thead className="bg-linear-to-r from-slate-50 to-slate-100 text-slate-600 text-sm">
          <tr>
            <th className="p-4 font-semibold">Name</th>
            <th className="p-4 hidden md:table-cell font-semibold">
              Email
            </th>
            <th className="p-4 hidden md:table-cell font-semibold">
              Joined
            </th>
            <th className="p-4 font-semibold">Action</th>
          </tr>
        </thead>

        <tbody>
          {users.map((u) => {
            const isOpen = openId === u._id;

            return (
              <React.Fragment key={u._id}>
                {/* Main Row */}
                <motion.tr
                  whileHover={{ scale: 1.005 }}
                  className={`border-t transition-all duration-200 ${
                    isOpen
                      ? "bg-indigo-50/60"
                      : "hover:bg-linear-to-br from-indigo-50 via-indigo-50 to-[#d2f0fc]"
                  }`}
                >
                  <td className="p-4 font-semibold text-slate-800">
                    {u.name}
                  </td>

                  <td className="p-4 hidden md:table-cell text-slate-600">
                    {u.email}
                  </td>

                  <td className="p-4 hidden md:table-cell text-slate-600">
                    {dayjs(u.createdAt).format("DD MMM YYYY")}
                  </td>

                  <td className="p-4">
                    <button
                      onClick={() =>
                        setOpenId(isOpen ? null : u._id)
                      }
                      className={`rounded-lg px-4 py-1.5 text-sm font-medium transition-all duration-200
                        ${
                          isOpen
                            ? "bg-indigo-600 text-white shadow-md hover:bg-indigo-700"
                            : "border border-slate-300 text-slate-700 hover:bg-green-200 bg-green-200"
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
                      className="bg-linear-to-br from-indigo-50 via-white to-[#d2f0fc]"
                    >
                      <td colSpan={4} className="p-6 ">
                        <div className="space-y-6">
                          {/* Memberships */}
                          <div>
                            <p className="text-slate-500 text-xs uppercase tracking-wide mb-3">
                              Memberships
                            </p>

                            {u.memberships.length === 0 && (
                              <p className="text-slate-500 text-sm">
                                No memberships found
                              </p>
                            )}

                            <div className="grid gap-4 md:grid-cols-2">
                              {u.memberships.map((m) => (
                                <div
                                  key={m._id}
                                  className="rounded-xl bg-linear-to-br via-slate-50 from-[#fbecf7] p-4 shadow-sm border border-slate-200"
                                >
                                  <p className="font-semibold text-slate-800">
                                    {m.planTitle}
                                  </p>

                                  <div className="mt-2 text-sm text-slate-600 space-y-1">
                                    <p>Amount: ₹{m.pricePaid}</p>
                                    <p>Billing: {m.billingCycle}</p>
                                    <p>
                                      Status:{" "}
                                      <span
                                        className={`font-medium ${
                                          m.status === "active"
                                            ? "text-green-600"
                                            : "text-yellow-600"
                                        }`}
                                      >
                                        {m.status}
                                      </span>
                                    </p>
                                    <p>
                                      Purchased:{" "}
                                      {dayjs(m.startDate).format(
                                        "DD MMM YYYY"
                                      )}
                                    </p>
                                    <p>
                                      Expires:{" "}
                                      {dayjs(m.endDate).format(
                                        "DD MMM YYYY"
                                      )}
                                    </p>
                                  </div>

                                  {/* Trainer */}
                                  {m.trainerId && (
                                    <div className="mt-3 rounded-lg bg-indigo-50 p-3 text-sm">
                                      <p className="font-semibold text-indigo-700">
                                        Trainer Assigned
                                      </p>
                                      <p>{m.trainerId.name}</p>
                                      <p>
                                        Experience:{" "}
                                        {m.trainerId.experienceYears} yrs
                                      </p>
                                    </div>
                                  )}

                                  {/* Payment */}
                                  {m.payment?.paymentId && (
                                    <div className="mt-3 rounded-lg bg-slate-50 p-3 text-xs text-slate-600">
                                      <p className="font-semibold">
                                        Payment
                                      </p>
                                      <p>
                                        {m.payment.provider} •{" "}
                                        {m.payment.paymentId}
                                      </p>
                                    </div>
                                  )}
                                </div>
                              ))}
                            </div>
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
  );
}
