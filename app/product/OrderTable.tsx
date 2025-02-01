const OrderTable = () => {
  const orders = [
    { id: 1, customer: 'John Doe', total: '$200', status: 'Pending' },
    { id: 2, customer: 'Jane Smith', total: '$350', status: 'Shipped' },
  ];

  return (
    <div className="">
      <table className="min-w-full table-auto">
        <thead className="bg-gray-200">
          <tr>
            <th className="py-2 px-4 text-left text-gray-600">Order ID</th>
            <th className="py-2 px-4 text-left text-gray-600">Customer</th>
            <th className="py-2 px-4 text-left text-gray-600">Total</th>
            <th className="py-2 px-4 text-left text-gray-600">Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order.id} className="border-t">
              <td className="py-2 px-4 text-gray-700">{order.id}</td>
              <td className="py-2 px-4 text-gray-700">{order.customer}</td>
              <td className="py-2 px-4 text-gray-700">{order.total}</td>
              <td className="py-2 px-4 text-gray-700">{order.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderTable;
