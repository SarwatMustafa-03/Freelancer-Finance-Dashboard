import Navbar from "../public/components/Navbar";
import SummaryCard from "../public/components/SummaryCard";
import ExpenseChart from "../public/components/ExpenseChart";
import IncomeChart from "../public/components/IncomeChart";
import TransactionTable from "../public/components/TransactionTable";

const Dashboard = () => {
  return (
    <div>
      <Navbar />

      <div className="summary-grid">
        <SummaryCard title="Total Income" amount="250000" />

        <SummaryCard title="Expenses" amount="70000" />

        <SummaryCard title="Balance" amount="180000" />

        <SummaryCard title="Estimated Tax" amount="12000" />
      </div>

      <div className="charts-grid">
        <IncomeChart />

        <ExpenseChart />
      </div>

      <TransactionTable />
    </div>
  );
};

export default Dashboard;