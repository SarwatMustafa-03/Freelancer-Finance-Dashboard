import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

const IncomeChart = ({ transactions }) => {
  // Filter only income and group by category
  const data = transactions
    .filter((t) => t.type === 'income')
    .reduce((acc, curr) => {
      const existing = acc.find((item) => item.name.toLowerCase() === curr.category.toLowerCase());
      if (existing) {
        existing.amount += Number(curr.amount);
      } else {
        acc.push({ name: curr.category, amount: Number(curr.amount) });
      }
      return acc;
    }, []);

  if (data.length === 0) {
    return (
      <div className="h-64 flex items-center justify-center text-sm text-gray-400 border border-dashed rounded-xl bg-white">
        No income data available to display charts
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4">Income Sources</h3>
      <div className="w-full h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" vertical={false} />
            <XAxis dataKey="name" stroke="#9ca3af" fontSize={12} tickLine={false} />
            <YAxis stroke="#9ca3af" fontSize={12} tickLine={false} />
            <Tooltip
              contentStyle={{ backgroundColor: '#fff', borderColor: '#e5e7eb', borderRadius: '8px' }}
              cursor={{ fill: '#f3f4f6' }}
            />
            <Bar dataKey="amount" fill="#10b981" radius={[4, 4, 0, 0]} barSize={30} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default IncomeChart;