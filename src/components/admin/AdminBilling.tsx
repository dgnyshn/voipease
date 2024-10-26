import React from 'react';
import { CreditCard, DollarSign, TrendingUp, Users } from 'lucide-react';
import StatCard from '../dashboard/StatCard';

export default function AdminBilling() {
  const stats = [
    {
      title: 'Total Revenue',
      value: '$45,678',
      change: '15%',
      icon: DollarSign,
      trend: 'up'
    },
    {
      title: 'Active Subscriptions',
      value: '892',
      change: '5%',
      icon: Users,
      trend: 'up'
    },
    {
      title: 'Avg. Revenue/User',
      value: '$51.20',
      change: '8%',
      icon: TrendingUp,
      trend: 'up'
    },
    {
      title: 'Pending Invoices',
      value: '23',
      icon: CreditCard,
      warning: true,
      warningText: 'Requires attention'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <StatCard key={stat.title} {...stat} />
        ))}
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold">Billing Overview</h2>
        </div>
        {/* Billing details and management UI would go here */}
      </div>
    </div>
  );
}