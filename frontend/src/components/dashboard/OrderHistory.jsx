import React from 'react';

const OrderHistory = () => {
  const orders = [
    {
      id: '1',
      customerName: 'John Doe',
      service: 'Website Development',
      amount: 1200,
      status: 'completed',
      date: '2024-03-15',
    },
    // Add more sample orders
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
      <h2 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6">Order History</h2>
      
      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {['Order ID', 'Customer', 'Service', 'Amount', 'Status', 'Date'].map((header) => (
                <th
                  key={header}
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {orders.map((order) => (
              <tr key={order.id}>
                <td className="px-4 py-4 text-sm text-gray-900">#{order.id}</td>
                <td className="px-4 py-4 text-sm text-gray-900">{order.customerName}</td>
                <td className="px-4 py-4 text-sm text-gray-900">{order.service}</td>
                <td className="px-4 py-4 text-sm text-gray-900">${order.amount}</td>
                <td className="px-4 py-4">
                  <StatusBadge status={order.status} />
                </td>
                <td className="px-4 py-4 text-sm text-gray-900">{order.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-4">
        {orders.map((order) => (
          <div key={order.id} className="bg-gray-50 rounded-lg p-4 shadow-sm">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="font-medium">Order ID:</div>
              <div>#{order.id}</div>
              
              <div className="font-medium">Customer:</div>
              <div>{order.customerName}</div>
              
              <div className="font-medium">Service:</div>
              <div>{order.service}</div>
              
              <div className="font-medium">Amount:</div>
              <div>${order.amount}</div>
              
              <div className="font-medium">Status:</div>
              <div><StatusBadge status={order.status} /></div>
              
              <div className="font-medium">Date:</div>
              <div>{order.date}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const StatusBadge = ({ status }) => (
  <span
    className={`px-2.5 py-1 inline-flex text-xs leading-4 font-medium rounded-full ${
      status === 'completed' ? 'bg-green-100 text-green-800' :
      status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
      'bg-red-100 text-red-800'
    }`}
  >
    {status}
  </span>
);

export default OrderHistory;