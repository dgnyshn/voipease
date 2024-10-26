import React from 'react';
import UserManagement from '../components/admin/UserManagement';
import useAuthStore from '../store/useAuthStore';
import { Navigate } from 'react-router-dom';

export default function UsersPage() {
  const { user } = useAuthStore();

  // Redirect non-admin users
  if (user?.role !== 'admin') {
    return <Navigate to="/dashboard/overview" />;
  }

  return (
    <div className="p-8 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
        <p className="text-gray-500 mt-1">
          Manage users, roles, and permissions
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <UserManagement />
      </div>
    </div>
  );
}