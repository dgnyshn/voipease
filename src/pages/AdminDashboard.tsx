import React from 'react';
import { Users, PhoneCall, Clock, DollarSign } from 'lucide-react';
import Sidebar from '../components/dashboard/Sidebar';
import Header from '../components/dashboard/Header';
import StatCard from '../components/dashboard/StatCard';
import CallsChart from '../components/dashboard/CallsChart';
import RecentCalls from '../components/dashboard/RecentCalls';
import ActiveUsers from '../components/dashboard/ActiveUsers';

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      <Header />
      
      <main className="ml-64 pt-16 p-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
          <p className="text-gray-500">Welcome back, Admin User</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Users"
            value="1,234"
            change="12%"
            icon={Users}
            trend="up"
          />
          <StatCard
            title="Total Calls"
            value="5,678"
            change="8%"
            icon={PhoneCall}
            trend="up"
          />
          <StatCard
            title="Avg. Call Duration"
            value="4m 32s"
            change="5%"
            icon={Clock}
            trend="down"
          />
          <StatCard
            title="Monthly Revenue"
            value="$12,345"
            change="15%"
            icon={DollarSign}
            trend="up"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <CallsChart />
          <RecentCalls />
        </div>

        <div className="grid grid-cols-1 gap-6">
          <ActiveUsers />
        </div>
      </main>
    </div>
  );
}