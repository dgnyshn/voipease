import React from 'react';
import { Clock, AlertTriangle } from 'lucide-react';

interface MinutesWarningModalProps {
  remainingMinutes: number;
  onClose: () => void;
  onAddMinutes: () => void;
}

export default function MinutesWarningModal({ 
  remainingMinutes, 
  onClose, 
  onAddMinutes 
}: MinutesWarningModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-96 max-w-full mx-4">
        <div className="flex items-center space-x-3 text-yellow-600 mb-4">
          <AlertTriangle className="h-6 w-6" />
          <h3 className="text-lg font-semibold">Low Minutes Warning</h3>
        </div>

        <div className="mb-6">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <Clock className="h-8 w-8 text-yellow-600" />
            <span className="text-2xl font-bold">{remainingMinutes} minutes</span>
          </div>
          <p className="text-gray-600 text-center">
            Your remaining minutes are running low. Add more minutes to ensure uninterrupted service.
          </p>
        </div>

        <div className="flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50"
          >
            Remind Me Later
          </button>
          <button
            onClick={onAddMinutes}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Add Minutes Now
          </button>
        </div>
      </div>
    </div>
  );
}