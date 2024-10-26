import React, { useState } from 'react';
import { PhoneForwarded, Search } from 'lucide-react';

interface ForwardedCall {
  id: string;
  fromNumber: string;
  toNumber: string;
  timestamp: string;
  status: 'active' | 'completed';
}

const dummyForwardedCalls: ForwardedCall[] = [
  {
    id: '1',
    fromNumber: '+1 (234) 567-8901',
    toNumber: '+1 (345) 678-9012',
    timestamp: '2024-03-15T14:30:00',
    status: 'completed'
  },
  {
    id: '2',
    fromNumber: '+1 (456) 789-0123',
    toNumber: '+1 (567) 890-1234',
    timestamp: '2024-03-15T13:15:00',
    status: 'active'
  },
  {
    id: '3',
    fromNumber: '+1 (678) 901-2345',
    toNumber: '+1 (789) 012-3456',
    timestamp: '2024-03-15T11:45:00',
    status: 'completed'
  }
];

export default function UserForwardedCalls() {
  const [forwardedCalls, setForwardedCalls] = useState<ForwardedCall[]>(dummyForwardedCalls);
  const [searchTerm, setSearchTerm] = useState('');

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const filteredCalls = forwardedCalls.filter(call =>
    call.fromNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    call.toNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">Forwarded Calls</h2>
          <div className="relative w-64">
            <input
              type="text"
              placeholder="Search forwarded calls..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <Search className="h-5 w-5 text-gray-400 absolute left-3 top-2.5" />
          </div>
        </div>
      </div>

      <div className="divide-y divide-gray-200">
        {filteredCalls.length === 0 ? (
          <div className="p-6 text-center text-gray-500">
            No forwarded calls found
          </div>
        ) : (
          filteredCalls.map((call) => (
            <div key={call.id} className="p-4 hover:bg-gray-50">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="p-2 bg-gray-50 rounded-lg">
                    <PhoneForwarded className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">From: {call.fromNumber}</p>
                    <p className="text-sm text-gray-500">To: {call.toNumber}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">
                    {call.status === 'active' ? (
                      <span className="text-green-600">Active</span>
                    ) : (
                      <span className="text-gray-600">Completed</span>
                    )}
                  </p>
                  <p className="text-sm text-gray-500">{formatDate(call.timestamp)}</p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}