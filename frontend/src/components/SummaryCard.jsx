const SummaryCard= ({ summary }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-green-500">
        <p className="text-gray-500 text-sm font-medium">Income</p>
        <h3 className="text-2xl font-bold text-green-600">Rs. {summary.income}</h3>
      </div>
      <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-red-500">
        <p className="text-gray-500 text-sm font-medium">Expenses</p>
        <h3 className="text-2xl font-bold text-red-600">Rs. {summary.expense}</h3>
      </div>
      <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-indigo-500">
        <p className="text-gray-500 text-sm font-medium">Net Balance</p>
        <h3 className="text-2xl font-bold text-indigo-600">Rs. {summary.balance}</h3>
      </div>
    </div>
  );
};

export default SummaryCard