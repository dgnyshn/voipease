import React, { useState } from 'react';
import { Search, Plus, AlertTriangle } from 'lucide-react';
import AddMinutesModal from '../modals/AddMinutesModal';
import useUserManagementStore from '../../store/useUserManagementStore';
import usePlanStore from '../../store/usePlanStore';

interface User {
  id: number;
  name: string;
  email: string;
  plan: 'Freelancer' | 'Small Business' | 'Team';
  remainingMinutes: number;
  totalMinutes: number;
  lastPurchase: string;
}

const planQuotas = {
  'Freelancer': 750,
  'Small Business': 2500,
  'Team': 1500
};

export default function UserMinutesTable() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showAddMinutesModal, setShowAddMinutesModal] = useState(false);
  const { currentPlan } = usePlanStore();

  const users: User[] = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      remainingMinutes: 45,
      totalMinutes: 750,
      plan: 'Freelancer',
      lastPurchase: '2024-03-15'
    },
    {
      id: 2,
      name: 'Alice Smith',
      email: 'alice@example.com',
      remainingMinutes: 280,
      totalMinutes: 2500,
      plan: 'Small Business',
      lastPurchase: '2024-03-10'
    },
    {
      id: 3,
      name: 'Bob Wilson',
      email: 'bob@example.com',
      remainingMinutes: 15,
      totalMinutes: 1500,
      plan: 'Team',
      lastPurchase: '2024-03-01'
    }
  ];

  const getMinutesStatus = (remaining: number, total: number) => {
    const percentage = (remaining / total) * 100;
    if (percentage <= 10) return 'critical';
    if (percentage <= 20) return 'low';
    return 'good';
  };

  const handleAddMinutes = (user: User) => {
    setSelectedUser(user);
    setShowAddMinutesModal(true);
  };

  const getAvailableMinutes = () => {
    const totalAssigned = users.reduce((sum, user) => sum + user.totalMinutes, 0);
    return planQuotas[currentPlan] - totalAssigned;
  };

  const filteredUsers = users.filter(user => {
    const searchLower = searchTerm.toLowerCase();
    return (
      user.name.toLowerCase().includes(searchLower) ||
      user.email.toLowerCase().includes(searchLower)
    );
  });

  const lowMinutesUsers = users.filter(user => {
    const percentage = (user.remainingMinutes / user.totalMinutes) * 100;
    return percentage <= 20;
  });

  return (
    <div className="space-y-6">
      {lowMinutesUsers.length > 0 && (
        <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
          <div className="flex items-center">
            <AlertTriangle className="h-5 w-5 text-yellow-600 mr-2" />
            <div>
              <h3 className="font-medium text-yellow-800">
                Low Minutes Alert
              </h3>
              <p className="text-sm text-yellow-700">
                {lowMinutesUsers.length} user{lowMinutesUsers.length > 1 ? 's' : ''} below 20% of their minute quota
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-between items-center">
        <div className="relative w-64">
          <input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Search className="h-5 w-5 text-gray-400 absolute left-3 top-2.5" />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                User
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Minutes Usage
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Last Purchase
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredUsers.map((user) => {
              const status = getMinutesStatus(user.remainingMinutes, user.totalMinutes);
              return (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="font-medium text-gray-900">{user.name}</div>
                      <div className="text-sm text-gray-500">{user.email}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className={`text-sm font-medium ${
                        status === 'critical' ? 'text-red-600' :
                        status === 'low' ? 'text-yellow-600' :
                        'text-green-600'
                      }`}>
                        {user.remainingMinutes} / {user.totalMinutes} minutes
                      </div>
                      <div className="w-32 bg-gray-200 rounded-full h-2 mt-1">
                        <div 
                          className={`h-2 rounded-full ${
                            status === 'critical' ? 'bg-red-600' :
                            status === 'low' ? 'bg-yellow-600' :
                            'bg-green-600'
                          }`}
                          style={{ width: `${(user.remainingMinutes / user.totalMinutes) * 100}%` }}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {user.lastPurchase}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <button
                      onClick={() => handleAddMinutes(user)}
                      className="text-blue-600 hover:text-blue-900 font-medium flex items-center"
                    >
                      <Plus className="h-4 w-4 mr-1" />
                      Add Minutes
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {showAddMinutesModal && selectedUser && (
        <AddMinutesModal
          isOpen={showAddMinutesModal}
          onClose={() => setShowAddMinutesModal(false)}
          user={selectedUser}
          availableMinutes={getAvailableMinutes()}
        />
      )}
    </div>
  );
}