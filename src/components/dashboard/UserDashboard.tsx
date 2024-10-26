import React from 'react';
import { Phone, Clock, PhoneIncoming, PhoneOutgoing } from 'lucide-react';
import Sidebar from './Sidebar';
import Header from './Header';
import StatCard from './StatCard';
import UserCalls from '../user/UserCalls';
import Dialer from '../Dialer';

const UserDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      <Header />
      
      <main className="ml-64 pt-16 p-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">User Dashboard</h1>
          <p className="text-gray-500">Welcome back</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Available Minutes"
            value="120"
            icon={Clock}
          />
          <StatCard
            title="Total Calls"
            value="45"
            icon={Phone}
          />
          <StatCard
            title="Incoming Calls"
            value="28"
            icon={PhoneIncoming}
          />
          <StatCard
            title="Outgoing Calls"
            value="17"
            icon={PhoneOutgoing}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Dialer />
          <UserCalls limit={5} />
        </div>
      </main>
    </div>
  );
};

export default UserDashboard;