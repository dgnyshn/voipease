import React, { useState } from 'react';
import { Save, Loader2, AlertCircle } from 'lucide-react';
import { useSettings } from '../hooks/useSettings';

export default function SettingsPage() {
  const { settings, updateSettings, isLoading, error } = useSettings();
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState(settings);

  // Handle initial data loading
  React.useEffect(() => {
    if (settings) {
      setFormData(settings);
    }
  }, [settings]);

  if (isLoading || !formData) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await updateSettings(formData);
    } finally {
      setIsSaving(false);
    }
  };

  const handleNotificationChange = (key: keyof typeof formData.notifications) => {
    setFormData({
      ...formData,
      notifications: {
        ...formData.notifications,
        [key]: !formData.notifications[key]
      }
    });
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold">General Settings</h2>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Time Zone
            </label>
            <select
              value={formData.timezone}
              onChange={(e) => setFormData({ ...formData, timezone: e.target.value })}
              disabled
              className="w-full max-w-xs border border-gray-200 rounded-lg px-3 py-2 bg-gray-50 cursor-not-allowed"
            >
              <option value="America/Chicago">Central Time (UTC-06:00)</option>
            </select>
            <p className="mt-1 text-sm text-gray-500">
              Time zone is currently locked to Central Time
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Language
            </label>
            <select
              value={formData.language}
              onChange={(e) => setFormData({ ...formData, language: e.target.value })}
              className="w-full max-w-xs border border-gray-200 rounded-lg px-3 py-2"
            >
              <option value="en">English</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Notifications
            </label>
            <div className="space-y-3">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="emailNotif"
                  checked={formData.notifications.email}
                  onChange={() => handleNotificationChange('email')}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <label htmlFor="emailNotif" className="ml-2">
                  Email notifications
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="desktopNotif"
                  checked={formData.notifications.desktop}
                  onChange={() => handleNotificationChange('desktop')}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <label htmlFor="desktopNotif" className="ml-2">
                  Desktop notifications
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="smsNotif"
                  checked={formData.notifications.sms}
                  onChange={() => handleNotificationChange('sms')}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <label htmlFor="smsNotif" className="ml-2">
                  SMS notifications
                </label>
              </div>
            </div>
          </div>

          {error && (
            <div className="flex items-center text-red-600 bg-red-50 p-3 rounded-lg">
              <AlertCircle className="h-5 w-5 mr-2" />
              <span>{error}</span>
            </div>
          )}

          <div className="pt-4">
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
              <span>{isSaving ? 'Saving...' : 'Save Changes'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}