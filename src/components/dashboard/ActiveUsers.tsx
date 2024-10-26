import React from 'react';

const users = [
  { id: 1, name: 'John Doe', email: 'john@example.com', status: 'online', calls: 45 },
  { id: 2, name: 'Alice Smith', email: 'alice@example.com', status: 'offline', calls: 32 },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', status: 'online', calls: 28 },
  { id: 4, name: 'Emma Wilson', email: 'emma@example.com', status: 'online', calls: 56 },
];

export default function ActiveUsers() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <h3 className="text-lg font-semibold">Active Users</h3>
      </div>
      <div className="divide-y divide-gray-200">
        {users.map((user) => (
          <div key={user.id} className="p-4 hover:bg-gray-50">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                  {user.name.charAt(0)}
                </div>
                <div>
                  <p className="font-medium text-gray-900">{user.name}</p>
                  <p className="text-sm text-gray-500">{user.email}</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  <div className={`w-2 h-2 rounded-full ${user.status === 'online' ? 'bg-green-500' : 'bg-gray-300'}`} />
                  <span className="ml-2 text-sm text-gray-500">{user.status}</span>
                </div>
                <div className="text-sm text-gray-500">
                  {user.calls} calls
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="p-4 border-t border-gray-200">
        <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
          View all users →
        </button>
      </div>
    </div>
  );
}