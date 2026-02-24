import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  CartesianGrid,
  LabelList,
} from "recharts";

const stats = [
  { name: "Districts", value: 5 },
  { name: "Schools", value: 400 },
  { name: "Teachers", value: 200 },
  { name: "Students", value: 1200 },
  { name: "Projects", value: 200 },
  { name: "Events", value: 10 },
];

const COLORS = [
  "#2563eb",
  "#16a34a",
  "#f59e0b",
  "#dc2626",
  "#9333ea",
  "#0d9488",
];

const StatisticsSection = () => {
  return (
    <section className="bg-white py-14">
      <div className="max-w-7xl mx-auto px-6">

        {/* TITLE */}
        <h2 className="text-3xl font-bold text-center text-blue-600 mb-10">
          ScienceTech Academy – Impact Overview
        </h2>

        {/* NUMBER CARDS */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-14">
          {stats.map((item, index) => (
            <div
              key={index}
              className="bg-blue-50 border border-blue-100 rounded-xl
                         text-center py-6 shadow-sm
                         transition transform duration-300
                         hover:-translate-y-1 hover:shadow-md"
            >
              <h3 className="text-3xl font-bold text-blue-700">
                {item.value}+
              </h3>
              <p className="mt-2 text-gray-600 font-medium">
                {item.name}
              </p>
            </div>
          ))}
        </div>

        {/* CHARTS */}
        <div className="grid md:grid-cols-2 gap-10">

          {/* ✅ UPDATED BAR GRAPH */}
          <div className="bg-gray-50 p-6 rounded-xl shadow">
            <h3 className="text-xl font-semibold text-center mb-4">
              Growth Scale
            </h3>

            <ResponsiveContainer width="100%" height={320}>
              <BarChart
                data={stats}
                margin={{ top: 20, right: 20, left: 0, bottom: 10 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip
                  cursor={{ fill: "rgba(37,99,235,0.1)" }}
                  formatter={(value) => `${value}+`}
                />

                <Bar
                  dataKey="value"
                  fill="#2563eb"
                  radius={[8, 8, 0, 0]}
                  isAnimationActive
                  animationBegin={200}
                  animationDuration={1200}
                  animationEasing="ease-out"
                >
                  {/* VALUE ON TOP */}
                  <LabelList
                    dataKey="value"
                    position="top"
                    formatter={(value) => `${value}+`}
                    fill="#1e40af"
                    fontSize={12}
                    fontWeight={600}
                  />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* PIE CHART (UNCHANGED & CLEAN) */}
          <div className="bg-gray-50 p-6 rounded-xl shadow">
            <h3 className="text-xl font-semibold text-center mb-4">
              Contribution Distribution
            </h3>

            <div className="flex flex-col md:flex-row items-center gap-8">
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={stats}
                    dataKey="value"
                    nameKey="name"
                    outerRadius={110}
                    innerRadius={60}
                    isAnimationActive
                    animationBegin={200}
                    animationDuration={1200}
                    animationEasing="ease-out"
                  >
                    {stats.map((_, index) => (
                      <Cell
                        key={index}
                        fill={COLORS[index]}
                        stroke="#fff"
                        strokeWidth={2}
                      />
                    ))}
                  </Pie>

                  <text
                    x="50%"
                    y="50%"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className="text-lg font-semibold fill-gray-700"
                  >
                    Total Impact
                  </text>

                  <Tooltip
                    formatter={(value, name) => [`${value}+`, name]}
                  />
                </PieChart>
              </ResponsiveContainer>

              {/* LEGEND */}
              <div className="space-y-3 text-sm">
                {stats.map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <span
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: COLORS[index] }}
                    ></span>
                    <span className="font-medium">{item.name}</span>
                    <span className="ml-auto font-semibold text-gray-600">
                      {item.value}+
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default StatisticsSection;