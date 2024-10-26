import React from 'react';
import { Phone, PhoneIncoming, PhoneOutgoing, Clock, AlertTriangle, DollarSign } from 'lucide-react';
import useCallStore from '../../store/useCallStore';
import useAuthStore from '../../store/useAuthStore';

export default function UserStats() {
  const { callHistory, remainingMinutes } = useCallStore();
  const { user } = useAuthStore();
  const isAdmin = user?.role === 'admin';
  
  // Calculate stats from call history
  const totalCalls = callHistory.length;
  const incomingCalls = callHistory.filter(call => call.type === 'incoming').length;
  const outgoingCalls = callHistory.filter(call => call.type === 'outgoing').length;
  const avgDuration = callHistory.length > 0 
    ? Math.round(callHistory.reduce((acc, call) => acc + call.duration, 0) / callHistory.length)
    : 0;

  const userStats = [
    {
      id: 'total-calls',
      label: 'Total Calls',
      value: totalCalls.toString(),
      icon: Phone,
      trend: 'up',
      change: '12%'
    },
    {
      id: 'incoming',
      label: 'Incoming Calls',
      value: incomingCalls.toString(),
      icon: PhoneIncoming,
      trend: 'up',
      change: '8%'
    },
    {
      id: 'outgoing',
      label: 'Outgoing Calls',
      value: outgoingCalls.toString(),
      icon: PhoneOutgoing,
      trend: 'down',
      change: '3%'
    },
    {
      id: 'remaining-minutes',
      label: 'Remaining Minutes',
      value: remainingMinutes.toString(),
      icon: Clock,
      warning: remainingMinutes < 60,
      warningText: remainingMinutes < 60 ? 'Low balance' : undefined,
      actionButton: remainingMinutes < 60 ? (
        <button className="text-sm bg-blue-600 text-white px-3 py-1 rounded-lg hover:bg-blue-700">
          Add Minutes
        </button>
      ) : undefined
    }
  ];

  const adminStats = [
    {
      id: 'monthly-revenue',
      label: 'Monthly Revenue',
      value: '$45,890',
      icon: DollarSign,
      trend: 'up',
      change: '15%'
    },
    {
      id: 'low-minutes',
      label: 'Low Minutes Alert',
      value: '45',
      icon: AlertTriangle,
      warning: true,
      warningText: 'Users below 10% limit'
    }
  ];

  const stats = isAdmin ? [...userStats, ...adminStats] : userStats;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat) => (
        <div key={stat.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-500 mb-1">{stat.label}</p>
              <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
              {stat.change && (
                <p className={`text-sm ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                  {stat.trend === 'up' ? '↑' : '↓'} {stat.change} from last month
                </p>
              )}
              {stat.warning && stat.warningText && (
                <p className="text-sm text-red-600 mt-1">
                  {stat.warningText}
                </p>
              )}
              {stat.actionButton && (
                <div className="mt-2">
                  {stat.actionButton}
                </div>
              )}
            </div>
            <div className={`p-3 rounded-lg ${stat.warning ? 'bg-red-50' : 'bg-blue-50'}`}>
              <stat.icon className={`h-6 w-6 ${stat.warning ? 'text-red-600' : 'text-blue-600'}`} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}