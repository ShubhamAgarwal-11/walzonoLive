import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { BOOKING_API_END_POINT } from '../../utils/constent';

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`${BOOKING_API_END_POINT}/getAllBookings`, {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        });
        if (response.data.success) {
          setOrders(response.data.bookings);
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };
    fetchOrders();
  }, []);

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
            {orders.flatMap((order) =>
              order.services.map((service, index) => (
                <tr key={`${order._id}-${index}`}>
                  <td className="px-4 py-4 text-sm text-gray-900">#{order._id}</td>
                  <td className="px-4 py-4 text-sm text-gray-900">{order.userInfo.name}</td>
                  <td className="px-4 py-4 text-sm text-gray-900">{service.serviceName}</td>
                  <td className="px-4 py-4 text-sm text-gray-900">${service.price}</td>
                  <td className="px-4 py-4">
                    <StatusBadge status={order.bookingStatus} />
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-900">
                    {service.bookingDate.slice(0, 10)}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-4 text-black">
        {orders.map((order) => (
          <div key={order._id} className="bg-gray-50 rounded-lg p-4 shadow-sm">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="font-medium">Order ID:</div>
              <div>#{order._id}</div>
              <div className="font-medium">Customer:</div>
              <div>{order.userInfo.name}</div>
            </div>
            {order.services.map((service, index) => (
              <div key={index} className="mt-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="font-medium">Service:</div>
                  <div>{service.serviceName}</div>
                  <div className="font-medium">Amount:</div>
                  <div>${service.price}</div>
                  <div className="font-medium">Status:</div>
                  <div>
                    <StatusBadge status={order.bookingStatus} />
                  </div>
                  <div className="font-medium">Date:</div>
                  <div>{service.bookingDate.slice(0, 10)}</div>
                </div>
                {index < order.services.length - 1 && <hr className="my-4" />}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

const StatusBadge = ({ status }) => (
  <span
    className={`px-2.5 py-1 inline-flex text-xs leading-4 font-medium rounded-full ${
      status === 'Completed' ? 'bg-green-100 text-green-800' :
      status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
      'bg-red-100 text-red-800'
    }`}
  >
    {status}
  </span>
);

export default OrderHistory;