import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const ExpenseChart = ({ transactions }) => {
  // Filter only expense and group by category
  const data = transactions
    .filter((t) => t.type === 'expense')
    .reduce((acc, curr) => {
      const existing = acc.find((item) => item.name.toLowerCase() === curr.category.toLowerCase());
      if (existing) {
        existing.amount += Number(curr.amount);
      } else {
        acc.push({ name: curr.category, amount: Number(curr.amount) });
      }
      return acc;
    }, []);

  // Premium tailwind-based soft color palette for categories
  const COLORS = ['#ef4444', '#f97316', '#f59e0b', '#8b5cf6', '#ec4899', '#06b6d4'];

  if (data.length === 0) {
    return (
      <div className="h-64 flex items-center justify-center text-sm text-gray-400 border border-dashed rounded-xl bg-white">
        No expense data available to display charts
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4">Expense Breakdown</h3>
      <div className="w-full h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={85}
              paddingAngle={4}
              dataKey="amount"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip contentStyle={{ backgroundColor: '#fff', borderColor: '#e5e7eb', borderRadius: '8px' }} />
            <Legend iconType="circle" wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ExpenseChart;