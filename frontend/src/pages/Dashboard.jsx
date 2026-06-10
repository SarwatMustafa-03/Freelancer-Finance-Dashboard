import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";
import SummaryCard from "../components/SummaryCard";
import TransactionForm from "../components/TransactionForm";
import IncomeChart from "../components/IncomeChart";
import ExpenseChart from "../components/ExpenseChart";
import Loader from "../components/Loader";

const Dashboard = () => {
  const navigate = useNavigate();

  const [transactions, setTransactions] = useState([]);
  const [summary, setSummary] = useState({
    income: 0,
    expense: 0,
    balance: 0,
  });
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      setLoading(true);

      const resT = await API.get("/transactions");
      const resS = await API.get("/transactions/summary");

      setTransactions(resT.data);
      setSummary(resS.data);
    } catch (error) {
      console.log(
        "Dashboard Error:",
        error.response?.data || error
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    fetchData();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Delete this transaction?")) {
      try {
        await API.delete(`/transactions/${id}`);
        fetchData();
      } catch (error) {
        console.log(
          "Delete Error:",
          error.response?.data || error
        );
      }
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 tracking-tight">
            FinTrack Dashboard
          </h1>

          <button
            onClick={handleLogout}
            className="text-red-500 font-semibold bg-red-50 px-4 py-2 rounded-lg hover:bg-red-100 transition text-sm"
          >
            Logout
          </button>
        </div>

        <SummaryCard summary={summary} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <IncomeChart transactions={transactions} />
          <ExpenseChart transactions={transactions} />
        </div>

        <TransactionForm onRefresh={fetchData} />

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b border-gray-100 text-gray-600 text-xs font-bold uppercase tracking-wider">
              <tr>
                <th className="p-4">Category</th>
                <th className="p-4">Description</th>
                <th className="p-4">Type</th>
                <th className="p-4">Amount</th>
                <th className="p-4">Action</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100 text-sm text-gray-700">
              {transactions.length === 0 ? (
                <tr>
                  <td
                    colSpan="5"
                    className="text-center py-8 text-gray-400 text-xs font-medium"
                  >
                    No transactions added yet.
                  </td>
                </tr>
              ) : (
                transactions.map((t) => (
                  <tr
                    key={t._id}
                    className="hover:bg-gray-50/50 transition"
                  >
                    <td className="p-4 font-semibold text-gray-900">
                      {t.category}
                    </td>

                    <td className="p-4 text-gray-500">
                      {t.description || "—"}
                    </td>

                    <td className="p-4">
                      <span
                        className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-bold ${
                          t.type === "income"
                            ? "bg-green-50 text-green-600"
                            : "bg-red-50 text-red-600"
                        }`}
                      >
                        {t.type}
                      </span>
                    </td>

                    <td
                      className={`p-4 font-bold ${
                        t.type === "income"
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      Rs. {Number(t.amount).toLocaleString()}
                    </td>

                    <td className="p-4">
                      <button
                        onClick={() => handleDelete(t._id)}
                        className="text-red-500 hover:text-red-700 font-semibold text-xs bg-red-50 hover:bg-red-100 px-2.5 py-1.5 rounded-lg transition"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;