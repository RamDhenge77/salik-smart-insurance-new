import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { EcoData } from "@/data/eco-data";

interface EcoLineChartProps {
  data: EcoData[];
  dataKey: "CO2Saved" | "TreesSaved";
  title: string;
  unit: string;
}

const EcoLineChart = ({ data, dataKey, title, unit }: EcoLineChartProps) => {
  const chartData = data.map((item) => ({
    name: item.month,
    user: dataKey === "CO2Saved" ? item.userCO2Saved : item.userTreesSaved,
    average: dataKey === "CO2Saved" ? item.avgCO2Saved : item.avgTreesSaved,
    top: dataKey === "CO2Saved" ? item.topCO2Saved : item.topTreesSaved,
  }));

  return (
    <div className="eco-card mb-6">
      <h3 className="text-xl font-semibold mb-4">{title}</h3>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={chartData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <XAxis dataKey="name" stroke="#9ca3af" />
            <CartesianGrid strokeDasharray="3 3" stroke="#e4e7eb" />
            <YAxis stroke="#9ca3af" />
            <Tooltip
              contentStyle={{
                backgroundColor: "white",
                borderRadius: "8px",
                border: "1px solid #e4e7eb",
                boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
              }}
              formatter={(value: number) => [`${value} ${unit}`, ""]}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="user"
              name="Your Savings"
              stroke="#10b981"
              strokeWidth={3}
              dot={{ r: 6, fill: "#10b981", strokeWidth: 2 }}
              activeDot={{ r: 8, fill: "#4ade80" }}
            />
            <Line
              type="monotone"
              dataKey="average"
              name="Average Warriors"
              stroke="#9ca3af"
              strokeWidth={2}
              dot={{ r: 4, fill: "#9ca3af" }}
            />
            <Line
              type="monotone"
              dataKey="top"
              name="Top Warrior"
              stroke="#3b82f6"
              strokeWidth={2}
              dot={{ r: 4, fill: "#3b82f6" }}
              strokeDasharray="5 5"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default EcoLineChart;
