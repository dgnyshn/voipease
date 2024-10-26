import React, { useState } from 'react';
import { Save, Loader2 } from 'lucide-react';
import { useForwardingSettings } from '../../hooks/useForwardingSettings';

export default function ForwardingSettings() {
  const { settings, updateSettings, isLoading, error } = useForwardingSettings();
  const [formData, setFormData] = useState(settings);
  const [isSaving, setIsSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await updateSettings(formData);
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-6 w-6 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={formData.isEnabled}
            onChange={(e) => setFormData({ ...formData, isEnabled: e.target.checked })}
            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <span>Enable Call Forwarding</span>
        </label>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Forward to Number
        </label>
        <input
          type="tel"
          value={formData.forwardToNumber}
          onChange={(e) => setFormData({ ...formData, forwardToNumber: e.target.value })}
          placeholder="+1 (234) 567-8900"
          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Forwarding Rule
        </label>
        <select
          value={formData.rule}
          onChange={(e) => setFormData({ ...formData, rule: e.target.value as any })}
          className="w-full border border-gray-200 rounded-lg px-3 py-2"
        >
          <option value="always">Always forward</option>
          <option value="busy">Forward when busy</option>
          <option value="unanswered">Forward when unanswered</option>
          <option value="offline">Forward when offline</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Ring Duration (seconds)
        </label>
        <input
          type="number"
          min="5"
          max="60"
          value={formData.ringDuration}
          onChange={(e) => setFormData({ ...formData, ringDuration: parseInt(e.target.value) })}
          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {error && (
        <div className="text-red-600 text-sm">
          {error}
        </div>
      )}

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isSaving}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-blue-300"
        >
          {isSaving ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Save className="h-4 w-4" />
          )}
          <span>{isSaving ? 'Saving...' : 'Save Changes'}</span>
        </button>
      </div>
    </form>
  );
}