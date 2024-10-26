import React, { useState, useEffect } from 'react';
import { Clock, Phone, TrendingUp, History } from 'lucide-react';
import StatCard from '../components/dashboard/StatCard';
import CallsChart from '../components/dashboard/CallsChart';
import CallHistory from '../components/CallHistory';
import useCallStore from '../store/useCallStore';
import PurchaseMinutesModal from '../components/modals/PurchaseMinutesModal';
import { useAdminDashboard } from '../hooks/useAdminDashboard';
import MinutesStatus from '../components/MinutesStatus';

export default function Dashboard() {
  const [showPurchaseModal, setShowPurchaseModal] = useState(false);
  const { remainingMinutes, callHistory } = useCallStore();
  const { 
    data: dashboardData, 
    loading,
    error 
  } = useAdminDashboard();

  const adminStats = [
    {
      title: 'Available Minutes',
      value: `${remainingMinutes} min`,
      icon: Clock,
      warning: remainingMinutes < 60,
      warningText: remainingMinutes < 60 ? 'Low balance - Add minutes now' : undefined,
      actionButton: remainingMinutes < 60 ? (
        <button
          onClick={() => setShowPurchaseModal(true)}
          className="text-sm bg-blue-600 text-white px-3 py-1 rounded-lg hover:bg-blue-700"
        >
          Add Minutes
        </button>
      ) : undefined
    },
    {
      title: 'Call Success Rate',
      value: loading ? 'Loading...' : `${dashboardData?.callSuccessRate}%`,
      icon: Phone,
      subText: 'Last 30 days'
    },
    {
      title: 'Average Call Duration',
      value: loading ? 'Loading...' : `${Math.floor(dashboardData?.avgCallDuration || 0)}m`,
      icon: TrendingUp,
      subText: 'Per call'
    },
    {
      title: 'Recent Activity',
      value: loading ? 'Loading...' : `${callHistory.length} calls`,
      icon: History,
      subText: 'Last 7 days'
    }
  ];

  useEffect(() => {
    if (remainingMinutes < 60) {
      const lowMinutesWarning = setTimeout(() => {
        setShowPurchaseModal(true);
      }, 1000);
      return () => clearTimeout(lowMinutesWarning);
    }
  }, [remainingMinutes]);

  if (error) {
    return (
      <div className="p-4 text-red-600">
        Error loading dashboard data. Please try again later.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <MinutesStatus
        remainingMinutes={remainingMinutes}
        totalMinutes={750} // Default to Freelancer plan quota
        onAddMinutes={() => setShowPurchaseModal(true)}
      />

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {adminStats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      {/* Charts and History */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold mb-4">Call Analytics</h3>
          <CallsChart />
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold mb-4">Recent Calls</h3>
          <CallHistory limit={5} />
        </div>
      </div>

      {/* Purchase Minutes Modal */}
      {showPurchaseModal && (
        <PurchaseMinutesModal
          isOpen={showPurchaseModal}
          onClose={() => setShowPurchaseModal(false)}
        />
      )}
    </div>
  );
}