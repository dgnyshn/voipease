import React, { useState } from 'react';
import { Camera, Save, Loader2, AlertCircle } from 'lucide-react';
import { useProfile } from '../hooks/useProfile';
import useAuthStore from '../store/useAuthStore';

export default function ProfilePage() {
  const { profile, isLoading, error } = useProfile();
  const { user } = useAuthStore();
  const [isSaving, setIsSaving] = useState(false);
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [passwordError, setPasswordError] = useState('');

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError('');

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setPasswordError('New passwords do not match');
      return;
    }

    if (passwordForm.newPassword.length < 8) {
      setPasswordError('Password must be at least 8 characters long');
      return;
    }

    setIsSaving(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      // Reset form after success
      setPasswordForm({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
    } catch (err) {
      setPasswordError('Failed to update password');
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Profile Settings</h1>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center space-x-6">
            <div className="relative">
              <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 text-2xl font-semibold">
                {user?.name.charAt(0)}
              </div>
              <div className="absolute bottom-0 right-0 p-2 bg-white rounded-full shadow-lg border border-gray-200">
                <Camera className="h-4 w-4 text-gray-400" />
              </div>
            </div>
            <div>
              <h2 className="text-xl font-semibold">{user?.name}</h2>
              <p className="text-gray-500">{user?.email}</p>
            </div>
          </div>
        </div>

        {error && (
          <div className="p-4 bg-red-50 border-b border-red-200">
            <div className="flex items-center text-red-600">
              <AlertCircle className="h-5 w-5 mr-2" />
              <span>{error}</span>
            </div>
          </div>
        )}

        <form onSubmit={handlePasswordSubmit} className="p-6 space-y-6">
          <h3 className="text-lg font-semibold mb-4">Change Password</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Current Password
              </label>
              <input
                type="password"
                value={passwordForm.currentPassword}
                onChange={(e) => setPasswordForm({ 
                  ...passwordForm, 
                  currentPassword: e.target.value 
                })}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                New Password
              </label>
              <input
                type="password"
                value={passwordForm.newPassword}
                onChange={(e) => setPasswordForm({ 
                  ...passwordForm, 
                  newPassword: e.target.value 
                })}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Confirm New Password
              </label>
              <input
                type="password"
                value={passwordForm.confirmPassword}
                onChange={(e) => setPasswordForm({ 
                  ...passwordForm, 
                  confirmPassword: e.target.value 
                })}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {passwordError && (
            <div className="text-sm text-red-600">
              {passwordError}
            </div>
          )}

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isSaving}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-blue-300"
            >
              {isSaving ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <Save className="h-5 w-5" />
              )}
              <span>{isSaving ? 'Saving...' : 'Update Password'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}