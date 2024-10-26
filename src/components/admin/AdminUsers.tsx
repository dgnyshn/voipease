import React from 'react';
import { Users, Phone, Clock, DollarSign } from 'lucide-react';
import StatCard from '../dashboard/StatCard';

export default function AdminUsers() {
  const stats = [
    {
      title: 'Total Users',
      value: '1,234',
      change: '12%',
      icon: Users,
      trend: 'up'
    },
    {
      title: 'Total Calls',
      value: '5,678',
      change: '8%',
      icon: Phone,
      trend: 'up'
    },
    {
      title: 'Avg. Call Duration',
      value: '4m 32s',
      change: '5%',
      icon: Clock,
      trend: 'down'
    },
    {
      title: 'Monthly Revenue',
      value: '$12,345',
      change: '15%',
      icon: DollarSign,
      trend: 'up'
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
          <h2 className="text-lg font-semibold">User Management</h2>
        </div>
        {/* User list and management UI would go here */}
      </div>
    </div>
  );
}