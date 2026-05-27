import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { month: "Jan", income: 50000 },
  { month: "Feb", income: 70000 },
  { month: "Mar", income: 90000 },
];

const IncomeChart = () => {
  return (
    <div className="chart-box">
      <h3>Monthly Income</h3>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="income" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default IncomeChart;