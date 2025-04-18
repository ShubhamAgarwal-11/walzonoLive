import React, { useState } from 'react';
import Sidebar from './Sidebar';
import { Menu, X } from 'lucide-react';
import Dashboard from './Dashboard';
import OrderHistory from './OrderHistory';
import PaymentHistory from './PaymentHistory';
import ServiceManagement from './ServiceManagement';
import Profile from './Profile';

function AppDashBoard() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const renderContent = () => {
    switch(activeTab) {
      case 'dashboard': return <Dashboard />;
      case 'orders': return <OrderHistory />;
      case 'payments': return <PaymentHistory />;
      case 'services': return <ServiceManagement />;
      case 'profile': return <Profile />;
      default: return <Dashboard />;
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
      {/* Fixed Sidebar */}
      <div className="fixed md:relative z-50 md:z-auto w-64">
        <Sidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          isMobileOpen={isMobileMenuOpen}
          setMobileOpen={setIsMobileMenuOpen}
        />
      </div>

      {/* Main Content Area */}
      <main className="flex-1 min-h-screen md:overflow-y-auto md:ml-64">
        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden p-4 fixed top-0 right-0 z-40"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? (
            <X size={24} className="text-gray-800" />
          ) : (
            <Menu size={24} className="text-gray-800" />
          )}
        </button>

        {/* Content Container */}
        <div className="p-4 md:p-8 pt-16 md:pt-8">
          {renderContent()}
        </div>
      </main>
    </div>
  );
}

export default AppDashBoard;