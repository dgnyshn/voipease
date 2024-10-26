import React, { useState } from 'react';
import { Users, PhoneCall, Clock, DollarSign } from 'lucide-react';
import StatCard from '../dashboard/StatCard';
import CallsChart from './CallsChart';
import UserMinutesTable from './UserMinutesTable';
import PurchaseMinutesModal from '../modals/PurchaseMinutesModal';
import usePlanStore from '../../store/usePlanStore';

export default function AdminDashboard() {
  const [showPurchaseModal, setShowPurchaseModal] = useState(false);
  const { currentPlan } = usePlanStore();

  const planQuotas = {
    'Freelancer': 750,
    'Small Business': 2500,
    'Team': 1500
  };

  const stats = [
    {
      title: 'Total Users',
      value: '156',
      icon: Users,
      subText: '12 new this week'
    },
    {
      title: 'Total Calls Today',
      value: '1,234',
      icon: PhoneCall,
      subText: '↑ 8% from yesterday'
    },
    {
      title: 'Users Low on Minutes',
      value: '45',
      icon: Clock,
      warning: true,
      warningText: 'Below 60 minutes',
      actionButton: (
        <button 
          onClick={() => setShowPurchaseModal(true)}
          className="text-sm bg-blue-600 text-white px-3 py-1 rounded-lg hover:bg-blue-700"
        >
          Add Minutes
        </button>
      )
    },
    {
      title: 'Monthly Revenue',
      value: '$12,345',
      icon: DollarSign,
      subText: '↑ 15% this month'
    }
  ];

  return (
    <div className="space-y-6 p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-500">Manage your organization's VoIP services</p>
        </div>
        <button
          onClick={() => setShowPurchaseModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Purchase Minutes
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <StatCard key={stat.title} {...stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold">Call Analytics</h2>
          </div>
          <div className="p-6">
            <CallsChart />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold">Minutes Pool Status</h2>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 gap-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600">Total Plan Minutes</p>
                <p className="text-2xl font-bold">{planQuotas[currentPlan]}</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600">Available to Assign</p>
                <p className="text-2xl font-bold">1,250</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600">Total Remaining</p>
                <p className="text-2xl font-bold">850</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold">User Minutes Management</h2>
        </div>
        <div className="p-6">
          <UserMinutesTable />
        </div>
      </div>

      {showPurchaseModal && (
        <PurchaseMinutesModal
          isOpen={showPurchaseModal}
          onClose={() => setShowPurchaseModal(false)}
        />
      )}
    </div>
  );
}