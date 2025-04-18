import React from 'react';
import { LayoutDashboard, ShoppingCart, IndianRupee, CircleFadingPlus, CircleUser, X } from 'lucide-react';

const Sidebar = ({ activeTab, setActiveTab, isMobileOpen, setMobileOpen }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'orders', label: 'Orders', icon: ShoppingCart },
    { id: 'payments', label: 'Payments', icon: IndianRupee },
    { id: 'services', label: 'Services', icon: CircleFadingPlus },
    { id: 'profile', label: 'Profile', icon: CircleUser },
  ];

  return (
    <div className={`fixed md:relative z-50 w-64 h-screen bg-gray-900 p-4 transform transition-transform duration-300 ${
      isMobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
    }`}>
      <button 
        className="md:hidden absolute top-4 right-4 text-white"
        onClick={() => setMobileOpen(false)}
      >
        <X size={24} />
      </button>
      
      <div className="text-white text-2xl font-bold mb-8 pl-4">Partner Portal</div>
      <nav>
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                setMobileOpen(false);
              }}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg mb-2 transition-colors ${
                activeTab === item.id
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-300 hover:bg-gray-800'
              }`}
            >
              {Icon && <Icon size={20} />}
              <span className="text-sm md:text-base">{item.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
};

export default Sidebar;