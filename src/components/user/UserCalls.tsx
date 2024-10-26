import React, { useState } from 'react';
import { PhoneIncoming, PhoneOutgoing, PhoneMissed, Search } from 'lucide-react';

interface Call {
  id: number;
  number: string;
  name: string;
  type: string;
  duration: string;
  date: string;
  time: string;
  cost: number;
}

interface UserCallsProps {
  calls?: Call[];
  limit?: number;
}

export default function UserCalls({ calls = [], limit }: UserCallsProps) {
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredCalls = calls.filter(call => 
    call.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    call.number.toLowerCase().includes(searchTerm.toLowerCase())
  ).slice(0, limit);

  const getCallIcon = (type: string) => {
    switch (type) {
      case 'incoming':
        return <PhoneIncoming className="h-5 w-5 text-green-500" />;
      case 'outgoing':
        return <PhoneOutgoing className="h-5 w-5 text-blue-500" />;
      case 'missed':
        return <PhoneMissed className="h-5 w-5 text-red-500" />;
      default:
        return null;
    }
  };

  return (
    <div>
      <div className="p-4 border-b border-gray-200">
        <div className="relative">
          <input
            type="text"
            placeholder="Search by name or number..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Search className="h-5 w-5 text-gray-400 absolute left-3 top-2.5" />
        </div>
      </div>

      <div className="divide-y divide-gray-200">
        {filteredCalls.length === 0 ? (
          <div className="p-4 text-center text-gray-500">
            No calls found
          </div>
        ) : (
          filteredCalls.map((call) => (
            <div key={call.id} className="p-4 hover:bg-gray-50">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="p-2 bg-gray-50 rounded-lg">
                    {getCallIcon(call.type)}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{call.name}</p>
                    <p className="text-sm text-gray-500">{call.number}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">{call.duration}</p>
                  <p className="text-sm text-gray-500">{call.time}</p>
                  {call.cost > 0 && (
                    <p className="text-sm font-medium text-blue-600">
                      ${call.cost.toFixed(2)}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {limit && calls.length > limit && (
        <div className="p-4 border-t border-gray-200">
          <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
            View all calls →
          </button>
        </div>
      )}
    </div>
  );
}