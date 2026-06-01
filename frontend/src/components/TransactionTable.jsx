import { useEffect, useState } from "react";
import API from "../api/axios";
import "../style/TransactionTable.css";

const TransactionTable = ({ setTransactions }) => {
  const [transactions, setLocalTransactions] = useState([]);

  const [formData, setFormData] = useState({
    amount: "",
    type: "income",
    category: "",
    description: "",
  });

  const token = localStorage.getItem("token");

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const fetchTransactions = async () => {
    try {
      const res = await API.get(
        "/transactions",
        config
      );

      setLocalTransactions(res.data);
      setTransactions(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post(
        "/transactions",
        formData,
        config
      );

      setFormData({
        amount: "",
        type: "income",
        category: "",
        description: "",
      });

      fetchTransactions();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await API.delete(
        `/transactions/${id}`,
        config
      );

      fetchTransactions();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <form
        className="transaction-form"
        onSubmit={handleSubmit}
      >
        <input
          type="number"
          placeholder="Amount"
          value={formData.amount}
          onChange={(e) =>
            setFormData({
              ...formData,
              amount: e.target.value,
            })
          }
        />

        <select
          value={formData.type}
          onChange={(e) =>
            setFormData({
              ...formData,
              type: e.target.value,
            })
          }
        >
          <option value="income">
            Income
          </option>

          <option value="expense">
            Expense
          </option>
        </select>

        <input
          type="text"
          placeholder="Category"
          value={formData.category}
          onChange={(e) =>
            setFormData({
              ...formData,
              category: e.target.value,
            })
          }
        />

        <input
          type="text"
          placeholder="Description"
          value={formData.description}
          onChange={(e) =>
            setFormData({
              ...formData,
              description: e.target.value,
            })
          }
        />

        <button type="submit">
          Add Transaction
        </button>
      </form>

      <table className="transaction-table">
        <thead>
          <tr>
            <th>Amount</th>
            <th>Type</th>
            <th>Category</th>
            <th>Description</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {transactions.map((t) => (
            <tr key={t._id}>
              <td>{t.amount}</td>
              <td>{t.type}</td>
              <td>{t.category}</td>
              <td>{t.description}</td>

              <td>
                <button
                  onClick={() =>
                    handleDelete(t._id)
                  }
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default TransactionTable;