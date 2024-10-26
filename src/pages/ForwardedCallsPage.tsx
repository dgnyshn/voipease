import React, { useState } from 'react';
import { Search } from 'lucide-react';
import UserForwardedCalls from '../components/user/UserForwardedCalls';
import useCallStore from '../store/useCallStore';

export default function ForwardedCallsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const { forwardedCalls = [] } = useCallStore();

  const filteredCalls = forwardedCalls.filter(call => 
    call.fromNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    call.toNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-8 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Forwarded Calls</h1>
        <div className="relative">
          <input
            type="text"
            placeholder="Search by number..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-64 pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Search className="h-5 w-5 text-gray-400 absolute left-3 top-2.5" />
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-6">
        <h2 className="text-lg font-semibold mb-4">Call Forwarding Settings</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Forward to Number
            </label>
            <div className="flex space-x-2">
              <input
                type="tel"
                placeholder="+1 (234) 567-8900"
                className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                Save
              </button>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Forwarding Rules
            </label>
            <select className="w-full border border-gray-200 rounded-lg px-3 py-2">
              <option>Always forward</option>
              <option>Forward when busy</option>
              <option>Forward when unanswered</option>
              <option>Forward when offline</option>
            </select>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <UserForwardedCalls calls={filteredCalls} />
      </div>
    </div>
  );
}