import React from 'react';
import { PhoneIncoming, PhoneOutgoing, PhoneMissed } from 'lucide-react';

const calls = [
  { id: 1, user: 'John Doe', number: '+1 234 567 8900', duration: '5:23', type: 'incoming', time: '2 mins ago' },
  { id: 2, user: 'Alice Smith', number: '+1 234 567 8901', duration: '3:45', type: 'outgoing', time: '15 mins ago' },
  { id: 3, user: 'Bob Johnson', number: '+1 234 567 8902', duration: '-', type: 'missed', time: '1 hour ago' },
  { id: 4, user: 'Emma Wilson', number: '+1 234 567 8903', duration: '2:12', type: 'incoming', time: '2 hours ago' },
];

export default function RecentCalls() {
  const getCallIcon = (type: string) => {
    switch (type) {
      case 'incoming':
        return <PhoneIncoming className="h-4 w-4 text-green-500" />;
      case 'outgoing':
        return <PhoneOutgoing className="h-4 w-4 text-blue-500" />;
      case 'missed':
        return <PhoneMissed className="h-4 w-4 text-red-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <h3 className="text-lg font-semibold">Recent Calls</h3>
      </div>
      <div className="divide-y divide-gray-200">
        {calls.map((call) => (
          <div key={call.id} className="p-4 hover:bg-gray-50">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="flex-shrink-0">
                  {getCallIcon(call.type)}
                </div>
                <div>
                  <p className="font-medium text-gray-900">{call.user}</p>
                  <p className="text-sm text-gray-500">{call.number}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">{call.duration}</p>
                <p className="text-sm text-gray-500">{call.time}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="p-4 border-t border-gray-200">
        <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
          View all calls →
        </button>
      </div>
    </div>
  );
}