import React from 'react';

const PaymentHistory = () => {
  const payments = [
    {
      id: '1',
      orderId: '1',
      amount: 1200,
      status: 'success',
      date: '2024-03-15',
      method: 'Credit Card',
    },
    // Add more sample payments
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
      <h2 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6">Payment History</h2>
      
      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {['Payment ID', 'Order ID', 'Amount', 'Method', 'Status', 'Date'].map((header) => (
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
            {payments.map((payment) => (
              <tr key={payment.id}>
                <td className="px-4 py-4 text-sm text-gray-900">#{payment.id}</td>
                <td className="px-4 py-4 text-sm text-gray-900">#{payment.orderId}</td>
                <td className="px-4 py-4 text-sm text-gray-900">${payment.amount}</td>
                <td className="px-4 py-4 text-sm text-gray-900">{payment.method}</td>
                <td className="px-4 py-4"><StatusBadge status={payment.status} /></td>
                <td className="px-4 py-4 text-sm text-gray-900">{payment.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-4">
        {payments.map((payment) => (
          <div key={payment.id} className="bg-gray-50 rounded-lg p-4 shadow-sm">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="font-medium">Payment ID:</div>
              <div>#{payment.id}</div>
              
              <div className="font-medium">Order ID:</div>
              <div>#{payment.orderId}</div>
              
              <div className="font-medium">Amount:</div>
              <div>${payment.amount}</div>
              
              <div className="font-medium">Method:</div>
              <div>{payment.method}</div>
              
              <div className="font-medium">Status:</div>
              <div><StatusBadge status={payment.status} /></div>
              
              <div className="font-medium">Date:</div>
              <div>{payment.date}</div>
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
      status === 'success' ? 'bg-green-100 text-green-800' :
      status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
      'bg-red-100 text-red-800'
    }`}
  >
    {status}
  </span>
);

export default PaymentHistory;