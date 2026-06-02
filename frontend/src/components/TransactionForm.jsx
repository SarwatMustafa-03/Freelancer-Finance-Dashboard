import { useState } from "react";
import API from "../api/axios";

const TransactionForm = ({ onRefresh }) => {
  const [form, setForm] = useState({ amount: "", type: "expense", category: "", description: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await API.post("/transactions", form);
    setForm({ amount: "", type: "expense", category: "", description: "" });
    onRefresh(); // Data refresh karne ke liye callback
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-sm mb-8 grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
      <div>
        <label className="block text-xs font-bold text-gray-500 mb-1">AMOUNT</label>
        <input type="number" value={form.amount} className="w-full p-2 border rounded" placeholder="0.00" onChange={(e)=>setForm({...form, amount: e.target.value})} required/>
      </div>
      <div>
        <label className="block text-xs font-bold text-gray-500 mb-1">TYPE</label>
        <select value={form.type} className="w-full p-2 border rounded" onChange={(e)=>setForm({...form, type: e.target.value})}>
          <option value="expense">Expense</option>
          <option value="income">Income</option>
        </select>
      </div>
      <div>
        <label className="block text-xs font-bold text-gray-500 mb-1">CATEGORY</label>
        <input type="text" value={form.category} className="w-full p-2 border rounded" placeholder="Food, Salary..." onChange={(e)=>setForm({...form, category: e.target.value})} required/>
      </div>
      <div>
        <label className="block text-xs font-bold text-gray-500 mb-1">DESCRIPTION</label>
        <input type="text" value={form.description} className="w-full p-2 border rounded" placeholder="Details..." onChange={(e)=>setForm({...form, description: e.target.value})}/>
      </div>
      <button className="bg-indigo-600 text-white p-2 rounded hover:bg-indigo-700 font-bold">ADD</button>
    </form>
  );
};
export default TransactionForm;