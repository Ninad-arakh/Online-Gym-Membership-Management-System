import React from "react";

const MemberDashboard = ({ user }) => {
  return (
    <div className="w-full flex flex-col pt-18 md:gap-8 gap-4 overflow-y-scroll no-scrollbar">
      <div className="sm:w-7/12  mx-auto flex flex-col gap-4">
        <h1 className="md:text-5xl text-3xl font-semibold text-center text-slate-200">
          Welcome Back, {user?.name}
        </h1>
        <h3 className="text-gray-300 text-center">
          Membership{" "}
          <span className="bg-green-500 px-3 py-1 rounded-xl text-black font-semibold">
            Active - Pro plan
          </span>{" "}
          • Renews in 12 days
        </h3>
      </div>

      <div className="sm:w-10/12 mx-2 backdrop-blur-md flex flex-col gap-2 bg-linear-to-br from-red-600 via-gray-700/20 to-red-600/40 sm:mx-auto rounded-xl shadow-[0_20px_40px_4px_rgba(0,0,0,0.4)] text-white px-12 pt-8 pb-4">
        <div className="flex justify-between">
          <div>
            <h2 className="text-3xl mb-2">Pro Membership</h2>
            <h4>Access : Gym and Class</h4>
            <h4>Renews on : March 28 2026</h4>
          </div>

          <div className="flex gap-5">
            <div className="w-0.5 h-full bg-gray-500/20"></div>
            <div>
              {" "}
              <h2 className="text-3xl mb-2">Active</h2>
              <h4>12 days left</h4>
            </div>
          </div>
        </div>
        <div className="h-0.5 w-full bg-gray-500/20"></div>
        <div className="w-full flex justify-center items-center">
          <button className="bg-red-500 px-8 py-2 rounded-sm shadow-[0_7px_10px_2px_rgba(0,0,0,0.4)]">
            Manage Plan &gt;
          </button>
        </div>
      </div>

      <div>
        {/* Today & Progress */}
        <div className="sm:w-10/12 mx-2 sm:mx-auto grid md:grid-cols-3 gap-6 text-white">
          {/* Today's Schedule */}
          <div className="md:col-span-2 backdrop-blur-px bg-red-500/30 to-red-500 rounded-xl p-6 shadow-[0_15px_30px_rgba(0,0,0,0.45)]">
            <h3 className="text-xl font-semibold mb-4 text-slate-200">
              Today’s Schedule
            </h3>

            <div className="flex items-center gap-4 p-4 rounded-lg bg-white/5 hover:bg-white/10 transition">
              <div className="text-red-400 text-2xl">🏋️</div>
              <div className="flex-1">
                <p className="font-medium">Full Body Workout</p>
                <p className="text-sm text-gray-400">
                  5:30 PM · Personal Training with Jake
                </p>
              </div>
            </div>
          </div>

          {/* Progress Cards */}
          <div className="grid sm:grid-cols-3 grid-cols-1 gap-4">
            {/* Streak */}
            <div className="backdrop-blur-px bg-red-500/30 rounded-xl p-4 shadow-[0_12px_25px_rgba(0,0,0,0.45)]">
              <p className="text-sm text-gray-400">Current Streak</p>
              <p className="text-2xl font-semibold mt-1 flex items-center gap-2">
                🔥 7 Days
              </p>
            </div>

            {/* Last Workout */}
            <div className="backdrop-blur-px bg-red-500/30 rounded-xl p-4 shadow-[0_12px_25px_rgba(0,0,0,0.45)]">
              <p className="text-sm text-gray-400">Last Workout</p>
              <p className="text-lg font-medium mt-1">Leg Day</p>
            </div>

            {/* Weight */}
            <div className="backdrop-blur-px bg-red-500/30 rounded-xl p-4 shadow-[0_12px_25px_rgba(0,0,0,0.45)]">
              <p className="text-sm text-gray-400">Weight</p>
              <p className="text-lg font-medium mt-1">72 kg</p>
            </div>
          </div>
        </div>
      </div>

      {/* Reminder */}
      <div className="sm:w-10/12 mx-2 sm:mx-auto mt-6 backdrop-blur-sm bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-4 flex items-center gap-3 shadow-[0_10px_25px_rgba(0,0,0,0.4)]">
        <span className="text-yellow-400 text-xl">⚠️</span>
        <p className="text-sm text-yellow-200">
          Reminder: Membership renews soon. Don’t forget to update your payment
          info.
        </p>
      </div>
    </div>
  );
};

export default MemberDashboard;
