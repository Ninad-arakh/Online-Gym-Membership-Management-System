"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

const MembershipPlans = ({ user }) => {
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
          const paymentResponse = await axios.post(
            "/api/payment/verify",
            response,
          );
          window.location.href = "/getPersonalTrainer";
        } catch (err) {
          console.log(err);
          toast.error("Payment verification failed");
        }
      },

      theme: {
        color: "#0f172a",
      },
    };

    if (typeof window === "undefined" || !window.Razorpay) {
      toast.error("Payment system loading, please try again.");
      return;
    }

    const rzp = new window.Razorpay(options);
    rzp.open();
  }

  const handlePayment = async (planId) => {
    try {
      const res = await axios.post("/api/payment", { planId });

      const { key, orderId, amount, currency } = res.data;

      openRazorpayCheckout({ key, orderId, amount, currency });
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Payment failed");
    }
  };

  const getDetails = async () => {
    try {
      const response = await axios.get("/api/plans", {
        withCredentials: true,
      });
      // assuming API returns { plans: [...] }
      if (response.status === 200) {
        setMembershipDetails(response.data);
      }
    } catch (err) {
      console.log("Error fetching plans:", err);
    }
  };
  useEffect(() => {
    if (membershipDetails.length === 0) getDetails();
  }, []);

  if (membershipDetails.length === 0) {
    return null;
  }

  return (
    <div className="w-full grid md:grid-cols-2 lg:grid-cols-3 grid-cols-1 px-8 md:px-18 lg:px-28 gap-10 items-center overflow-y-scroll no-scrollbar h-full ">
      {membershipDetails.map((plan) => {
        return (
          <div
            key={plan._id}
            className=" text-white rounded-xl h-[60vh] max-h-screen flex flex-col justify-between gap-3 p-6 md:p-10 backdrop-blur-sm shadow-[0_16px_12px_8px_rgba(0,0,0,0.3)] bg-linear-to-br bg-[#002455]/70  duration-300 hover:backdrop-blur-xl overflow-scroll no-scrollbar"
          >
            <div className="flex flex-col justify-between gap-3">
              <div>
                <h2 className="text-2xl uppercase">{plan.title}</h2>
                <h2 className="text-neutral-200">Membership</h2>
              </div>
              <h1 className="text-4xl">₹ {plan.price} </h1>
              <h2>Duration : {plan.durationInDays} Days</h2>

              <div className="w-full h-0.5 bg-linear-to-r from-gray-400/2 via-gray-400/30 to-gray-400/2mt-5"></div>

              <div className="flex flex-col gap-3">
                <p>{plan.description}</p>
                {plan.features.length > 0 && (
                  <div>
                    <h2 className="text-2xl">Features:</h2>
                    <div className=" px-4">
                      {plan.features.map((feature, indx) => (
                        <li key={indx}>{feature}</li>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="flex gap-2 justify-around">
              {user.role === "admin" ? (
                <button className="relative inline-flex items-center justify-center px-10 py-4 overflow-hidden font-mono font-medium tracking-tighter text-white bg-green-400/60 rounded-lg group cursor-pointer ">
                  <span className="absolute w-0 h-0 transition-all duration-400 ease-out bg-[#F5C542]/90 rounded-full group-hover:w-full group-hover:h-56"></span>
                  <span className="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-linear-to-b from-transparent via-transparent to-gray-700"></span>
                  <span className="relative">Edit</span>
                </button>
              ) : (
                <button
                  onClick={() => handlePayment(plan._id)}
                  className="relative inline-flex items-center justify-center px-10 py-4 overflow-hidden font-mono font-medium tracking-tighter text-white bg-green-500/60 rounded-lg group cursor-pointer "
                >
                  <span className="absolute w-0 h-0 transition-all duration-400 ease-out bg-[#F5C542]/90 rounded-full group-hover:w-full group-hover:h-56"></span>
                  <span className="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-linear-to-b from-transparent via-transparent to-gray-700"></span>
                  <span className="relative">Buy Now</span>
                </button>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MembershipPlans;
