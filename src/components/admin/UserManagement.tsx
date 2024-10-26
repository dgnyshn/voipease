import React, { useState, useEffect } from 'react';
import { Search, Plus, X, AlertTriangle, Clock } from 'lucide-react';
import useUserManagementStore from '../../store/useUserManagementStore';
import usePlanStore from '../../store/usePlanStore';
import PurchaseMinutesModal from '../modals/PurchaseMinutesModal';
import LoadingSpinner from '../LoadingSpinner';

const canModifyUser = (user: any) => {
  return user.role !== 'admin';
};

const validateEmail = (email: string) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

export default function UserManagement() {
  const { 
    users, 
    addUser, 
    updateUserStatus, 
    deleteUser,
    checkLowMinutesUsers,
    fetchUsers,
    isLoading,
    error: storeError
  } = useUserManagementStore();

  const { getUserLimit } = usePlanStore();

  const [showAddUser, setShowAddUser] = useState(false);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [showPurchaseModal, setShowPurchaseModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [newUser, setNewUser] = useState({ name: '', email: '', role: 'user' as const });
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  const userLimit = getUserLimit();
  const currentUserCount = users.filter(user => user.role !== 'admin').length;
  const lowMinutesUsers = checkLowMinutesUsers();

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleShowAddUser = () => {
    if (currentUserCount >= userLimit) {
      setShowUpgradeModal(true);
    } else {
      setShowAddUser(true);
    }
  };

  const handleAddUser = async () => {
    const errors: Record<string, string> = {};
    
    if (!newUser.name.trim()) {
      errors.name = 'Name is required';
    }
    
    if (!newUser.email.trim()) {
      errors.email = 'Email is required';
    } else if (!validateEmail(newUser.email)) {
      errors.email = 'Invalid email format';
    } else if (users.some(u => u.email === newUser.email)) {
      errors.email = 'Email already exists';
    }

    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }

    if (currentUserCount >= userLimit) {
      setShowUpgradeModal(true);
      return;
    }

    try {
      await addUser(newUser);
      setShowAddUser(false);
      setNewUser({ name: '', email: '', role: 'user' });
      setValidationErrors({});
    } catch (error) {
      if (error instanceof Error && error.message === 'USER_LIMIT_REACHED') {
        setShowUpgradeModal(true);
      } else {
        setValidationErrors({
          general: 'Failed to add user. Please try again.'
        });
      }
    }
  };

  const handleAddMinutes = (user: any) => {
    setSelectedUser(user);
    setShowPurchaseModal(true);
  };

  const getMinutesStatus = (remaining: number, total: number) => {
    const percentage = (remaining / total) * 100;
    if (percentage <= 10) return 'critical';
    if (percentage <= 20) return 'low';
    return 'good';
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
    return matchesSearch && matchesRole && matchesStatus;
  });

  if (isLoading && !users.length) {
    return <LoadingSpinner />;
  }

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
                {lowMinutesUsers.length} user{lowMinutesUsers.length > 1 ? 's have' : ' has'} less than 60 minutes remaining
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
        <div className="flex space-x-2">
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="border border-gray-200 rounded-lg px-3 py-2"
          >
            <option value="all">All Roles</option>
            <option value="admin">Admin</option>
            <option value="user">User</option>
          </select>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border border-gray-200 rounded-lg px-3 py-2"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
          <button
            onClick={handleShowAddUser}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            Add User
          </button>
        </div>
      </div>

      {storeError && (
        <div className="bg-red-50 border border-red-200 p-4 rounded-lg text-red-600">
          {storeError}
        </div>
      )}

      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Minutes
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredUsers.map((user) => {
                const minutesStatus = getMinutesStatus(user.remainingMinutes, user.totalMinutes);
                return (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="font-medium text-gray-900">{user.name}</div>
                        <div className="text-sm text-gray-500">{user.email}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        user.role === 'admin' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'
                      }`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        user.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                      }`}>
                        {user.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className={`text-sm font-medium ${
                          minutesStatus === 'critical' ? 'text-red-600' :
                          minutesStatus === 'low' ? 'text-yellow-600' :
                          'text-green-600'
                        }`}>
                          {user.remainingMinutes} / {user.totalMinutes} minutes
                        </div>
                        {user.remainingMinutes < 60 && (
                          <button
                            onClick={() => handleAddMinutes(user)}
                            className="text-sm text-blue-600 hover:text-blue-700 flex items-center mt-1"
                          >
                            <Clock className="h-4 w-4 mr-1" />
                            Add Minutes
                          </button>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <div className="flex space-x-2">
                        {canModifyUser(user) ? (
                          <>
                            <button
                              onClick={() => updateUserStatus(user.id, user.status === 'active' ? 'inactive' : 'active')}
                              className="text-blue-600 hover:text-blue-900 font-medium"
                            >
                              {user.status === 'active' ? 'Deactivate' : 'Activate'}
                            </button>
                            <button
                              onClick={() => deleteUser(user.id)}
                              className="text-red-600 hover:text-red-900 font-medium"
                            >
                              Delete
                            </button>
                          </>
                        ) : (
                          <span className="text-gray-500 italic">Admin user - protected</span>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add User Modal */}
      {showAddUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-[480px] max-w-full mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Add New User</h3>
              <button
                onClick={() => setShowAddUser(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  value={newUser.name}
                  onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {validationErrors.name && (
                  <p className="mt-1 text-sm text-red-600">{validationErrors.name}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={newUser.email}
                  onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {validationErrors.email && (
                  <p className="mt-1 text-sm text-red-600">{validationErrors.email}</p>
                )}
              </div>

              {validationErrors.general && (
                <p className="text-sm text-red-600">{validationErrors.general}</p>
              )}
            </div>

            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={() => {
                  setShowAddUser(false);
                  setNewUser({ name: '', email: '', role: 'user' });
                  setValidationErrors({});
                }}
                className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleAddUser}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Add User
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Upgrade Plan Modal */}
      {showUpgradeModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-[480px] max-w-full mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">User Limit Reached</h3>
              <button
                onClick={() => setShowUpgradeModal(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="mb-6">
              <p className="text-gray-600 mb-4">
                You've reached the maximum number of users for your current plan.
                Choose an option below to continue:
              </p>

              <div className="space-y-4">
                <button
                  onClick={() => {
                    setShowUpgradeModal(false);
                    window.location.href = '/dashboard/billing';
                  }}
                  className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Upgrade Plan
                </button>

                <button
                  onClick={() => {
                    setShowUpgradeModal(false);
                    window.location.href = '/dashboard/billing';
                  }}
                  className="w-full px-4 py-3 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50"
                >
                  Purchase Additional License ($15/month)
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Purchase Minutes Modal */}
      {showPurchaseModal && selectedUser && (
        <PurchaseMinutesModal
          isOpen={showPurchaseModal}
          onClose={() => {
            setShowPurchaseModal(false);
            setSelectedUser(null);
          }}
          user={selectedUser}
        />
      )}
    </div>
  );
}