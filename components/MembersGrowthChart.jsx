"use client";

// import { data } from "@/utils/constants";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function MembersGrowthChart({data}) {
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-black/80 backdrop-blur-md text-white p-3 rounded-lg shadow-lg text-sm">
          <p className="font-semibold mb-1">{label}</p>
          <p className="text-red-400">Registered: {payload[0].value}</p>
          <p className="text-pink-300">Enrolled: {payload[1].value}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full h-80 bg-linear-to-br from-[#292026] to-[#49213e] rounded-xl p-6 shadow-lg border border-white/5">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-white font-semibold text-lg">Members Growth</h2>

        <div className="flex gap-4 text-sm">
          <span className="flex items-center gap-2 text-red-400">
            <span className="w-2 h-2 rounded-full bg-red-500"></span>
            Registered
          </span>
          <span className="flex items-center gap-2 text-pink-300">
            <span className="w-2 h-2 rounded-full bg-pink-400"></span>
            Enrolled
          </span>
        </div>
      </div>

      {/* Chart */}
      <ResponsiveContainer width="100%" height="85%">
        <LineChart data={data}>
          <XAxis
            dataKey="month"
            stroke="#888"
            tick={{ fill: "#aaa", fontSize: 12 }}
          />
          <YAxis stroke="#888" tick={{ fill: "#aaa", fontSize: 12 }} />
          <Tooltip content={<CustomTooltip />} />

          <Line
            type="monotone"
            dataKey="registered"
            stroke="#ef4444"
            strokeWidth={3}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
          />

          <Line
            type="monotone"
            dataKey="enrolled"
            stroke="#f472b6"
            strokeWidth={3}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
