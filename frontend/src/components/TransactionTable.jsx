const TransactionTable = () => {
  const transactions = [
    {
      title: "Fiverr Payment",
      amount: 50000,
      type: "Income",
    },
    {
      title: "Internet Bill",
      amount: 5000,
      type: "Expense",
    },
  ];

  return (
    <div className="table-box">
      <h3>Recent Transactions</h3>

      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Amount</th>
            <th>Type</th>
          </tr>
        </thead>

        <tbody>
          {transactions.map((item, index) => (
            <tr key={index}>
              <td>{item.title}</td>
              <td>{item.amount}</td>
              <td>{item.type}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionTable;