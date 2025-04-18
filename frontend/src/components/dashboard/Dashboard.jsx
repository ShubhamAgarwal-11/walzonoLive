import React from 'react';
import { IndianRupee, ShoppingBag, Users, Clock, Activity, ArrowUp, ArrowDown } from 'lucide-react';

const Dashboard = () => {
  // Stats configuration
  const stats = [
    {
      title: 'Total Revenue',
      value: '₹45,230',
      icon: IndianRupee,
      change: '12.5',
      trend: 'up',
      color: 'from-blue-100 to-blue-50',
      textColor: 'text-blue-600'
    },
    {
      title: 'Total Orders',
      value: '1,234',
      icon: ShoppingBag,
      change: '8.2',
      trend: 'up',
      color: 'from-green-100 to-green-50',
      textColor: 'text-green-600'
    },
    {
      title: 'Active Customers',
      value: '324',
      icon: Users,
      change: '3.1',
      trend: 'up',
      color: 'from-purple-100 to-purple-50',
      textColor: 'text-purple-600'
    },
    {
      title: 'Avg. Duration',
      value: '38m',
      icon: Clock,
      change: '1.2',
      trend: 'down',
      color: 'from-orange-100 to-orange-50',
      textColor: 'text-orange-600'
    }
  ];

  // Recent orders data
  const recentOrders = [
    { id: '#1234', customer: 'Sarah Johnson', service: 'Hair Spa', amount: '₹1,500', status: 'completed' },
    { id: '#1235', customer: 'Mike Chen', service: 'Beard Trim', amount: '₹800', status: 'pending' },
    { id: '#1236', customer: 'Emma Wilson', service: 'Facial', amount: '₹2,300', status: 'completed' }
  ];

  // Recent payments data
  const recentPayments = [
    { id: '#PAY789', amount: '₹1,500', method: 'UPI', status: 'success' },
    { id: '#PAY790', amount: '₹800', method: 'Credit Card', status: 'pending' },
    { id: '#PAY791', amount: '₹2,300', method: 'Net Banking', status: 'success' }
  ];

  // Status badge component with aria labels
  const StatusBadge = ({ status }) => (
    <span 
      className={`px-3 py-1.5 rounded-full text-xs font-medium ${
        status === 'completed' || status === 'success' 
          ? 'bg-green-100 text-green-800' 
          : 'bg-yellow-100 text-yellow-800'
      }`}
      role="status"
      aria-live="polite"
    >
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 bg-gray-50 min-h-screen">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 sm:gap-6">
        {stats.map((stat) => (
          <div 
            key={stat.title}
            className={`bg-gradient-to-br ${stat.color} rounded-xl p-4 sm:p-6 shadow-sm hover:shadow-md transition-shadow`}
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">{stat.title}</p>
                <h3 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                  {stat.value}
                </h3>
              </div>
              <div className={`p-2 rounded-lg ${stat.textColor}`}>
                <stat.icon className="w-5 h-5 sm:w-6 sm:h-6" aria-hidden="true" />
              </div>
            </div>
            <div className="mt-4 flex items-center">
              {stat.trend === 'up' ? (
                <ArrowUp className="w-4 h-4 text-green-500" aria-hidden="true" />
              ) : (
                <ArrowDown className="w-4 h-4 text-red-500" aria-hidden="true" />
              )}
              <span className={`ml-2 text-sm ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                {stat.change}% from last month
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity Section */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 sm:gap-6">
        {[recentOrders, recentPayments].map((data, index) => (
          <div 
            key={index} 
            className="bg-white rounded-xl shadow-sm p-4 sm:p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">
                {index === 0 ? 'Recent Orders' : 'Recent Payments'}
              </h2>
              <button 
                className="text-sm text-blue-600 hover:text-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label={`View all ${index === 0 ? 'orders' : 'payments'}`}
              >
                View All
              </button>
            </div>
            <div className="space-y-3">
              {data.map((item) => (
                <div 
                  key={item.id}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {index === 0 ? item.service : item.method}
                    </p>
                    <p className="text-xs text-gray-500 truncate">
                      {index === 0 ? item.customer : item.id}
                    </p>
                  </div>
                  <div className="ml-4 text-right">
                    <p className="text-sm font-medium text-gray-900">
                      {item.amount}
                    </p>
                    <StatusBadge status={item.status} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      {/* <div className="grid grid-cols-1 gap-4 md:grid-cols-2 sm:gap-6">
        {['Performance Overview', 'Service Distribution'].map((title, index) => (
          <div 
            key={title}
            className="bg-white rounded-xl shadow-sm p-4 sm:p-6"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
            <div className="relative pt-[75%] sm:pt-[60%] lg:pt-[45%]">
              <div className="absolute inset-0 bg-gray-50 rounded-lg flex items-center justify-center text-gray-400">
                <Activity className="w-8 h-8 mr-2" aria-hidden="true" />
                {title.replace(' ', '')} Chart
              </div>
            </div>
          </div>
        ))}
      </div> */}
    </div>
  );
};

export default Dashboard;