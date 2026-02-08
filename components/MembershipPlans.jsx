"use client";
import { IconPencil, IconTrash } from "@tabler/icons-react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

const MembershipPlans = ({ user, setEditOpen, setEditingPlan }) => {
  const [membershipDetails, setMembershipDetails] = useState([]);

  function openRazorpayCheckout({ key, orderId, amount, currency }) {
    const options = {
      key,
      amount,
      currency,
      order_id: orderId,
      name: "Online Gym",
      description: "Membership Purchase",
      handler: async function (response) {
        try {
          await axios.post("/api/payment/verify", response);
          window.location.href = "/getPersonalTrainer";
        } catch (err) {
          toast.error("Payment verification failed");
        }
      },
      theme: { color: "#312D3F" },
    };

    if (!window?.Razorpay) {
      toast.error("Payment system loading, please try again.");
      return;
    }

    new window.Razorpay(options).open();
  }

  const handlePayment = async (planId) => {
    try {
      const res = await axios.post("/api/payment", { planId });
      openRazorpayCheckout(res.data);
    } catch (err) {
      toast.error(err.response?.data?.message || "Payment failed");
    }
  };

  const handleDelete = async (planId) => {
    if (!confirm("Are you sure you want to delete this plan?")) return;

    try {
      await axios.delete(`/api/admin/plans/${planId}`, {
        withCredentials: true,
      });
      toast.success("Plan deleted successfully");
      setMembershipDetails((prev) => prev.filter((p) => p._id !== planId));
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to delete plan");
    }
  };

  useEffect(() => {
    if (membershipDetails.length === 0) {
      axios
        .get("/api/plans", { withCredentials: true })
        .then((res) => setMembershipDetails(res.data))
        .catch(() => {});
    }
  }, []);

  if (membershipDetails.length === 0) return null;

  return (
    <div className="w-full min-h-screen grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 px-8 md:px-18 lg:px-28 gap-10 sm:-mt-25  items-center">
      {membershipDetails
        .filter((p) => p.isActive)
        .sort((a, b) => a.price - b.price)
        .map((plan) => (
          <div
            key={plan._id}
            className="
              group relative rounded-2xl h-[60vh] flex flex-col justify-between
              p-6 md:p-10
              bg-linear-to-br from-[#faf8fc] via-[#f6f3fb] to-[#cab5ff]
              border border-black/5
              shadow-[0_10px_30px_rgba(0,0,0,0.08)]
              transition-all duration-500 ease-out
              hover:-translate-y-2 hover:scale-[1.015]
              hover:shadow-[0_25px_60px_rgba(0,0,0,0.12)]
              overflow-hidden
            "
          >
            {/* subtle glow */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-linear-to-br from-[#c3affd]/20 via-transparent to-[#fddade]/30 pointer-events-none" />

            <div className="relative flex flex-col gap-4 overflow-y-auto no-scrollbar">
              <div>
                <h2 className="text-2xl uppercase tracking-wide text-[#312D3F]">
                  {plan.title}
                </h2>
                <p className="text-sm text-[#6B657A]">Membership</p>
              </div>

              <h1 className="text-4xl font-semibold text-[#312D3F]">
                ₹ {plan.price}
              </h1>

              <p className="text-sm text-[#6B657A]">
                Duration: {plan.durationInDays} Days
              </p>

              <div className="w-full h-px bg-linear-to-r from-transparent via-black/20 to-transparent my-2 transition-opacity group-hover:opacity-60" />

              <div className="flex flex-col gap-3 text-[#4A4658]">
                <p>{plan.description}</p>

                {plan.features.length > 0 && (
                  <div>
                    <h3 className="text-lg font-medium text-[#312D3F]">
                      Features
                    </h3>
                    <ul className="pl-4 list-disc space-y-1 text-sm">
                      {plan.features.map((f, i) => (
                        <li key={i}>{f}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            <div className="relative mt-6 flex gap-3 justify-around">
              {user.role === "admin" ? (
                <>
                  <button
                    onClick={() => {
                      setEditingPlan(plan);
                      setEditOpen(true);
                    }}
                    className="
                      px-8 py-3 rounded-lg font-medium
                      bg-linear-to-br from-[#f4ddf6] to-[#e6dcff]
                      text-[#312D3F]
                      transition-all duration-300
                      hover:shadow-lg hover:-translate-y-0.5
                      hover:from-[#d8caff] hover:to-[#faecf6]
                      flex items-center gap-2
                    "
                  >
                    Edit <IconPencil size={18} />
                  </button>

                  <button
                    onClick={() => handleDelete(plan._id)}
                    className="
                      px-8 py-3 rounded-lg font-medium
                      bg-linear-to-br from-[#fddade] to-[#f9c2cb]
                      text-[#312D3F]
                      transition-all duration-300
                      hover:shadow-lg hover:-translate-y-0.5
                      hover:from-[#f9b1bd] hover:to-[#e3627d]
                      flex items-center gap-2
                    "
                  >
                    Delete <IconTrash size={18} />
                  </button>
                </>
              ) : (
                <button
                  onClick={() => handlePayment(plan._id)}
                  className="
                    w-full px-10 py-4 rounded-lg font-semibold
                    bg-linear-to-br from-green-500 to-emerald-600
                    text-white
                    transition-all duration-300
                    hover:shadow-xl hover:-translate-y-0.5
                    hover:from-emerald-500 hover:to-green-600
                  "
                >
                  Buy Now
                </button>
              )}
            </div>
          </div>
        ))}
    </div>
  );
};

export default MembershipPlans;
