import React, { useState } from 'react';
import { X } from 'lucide-react';

interface AddMinutesModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: {
    name: string;
    remainingMinutes: number;
    totalMinutes: number;
  };
  availableMinutes: number;
}

export default function AddMinutesModal({ isOpen, onClose, user, availableMinutes }: AddMinutesModalProps) {
  const [minutesToAdd, setMinutesToAdd] = useState(100);

  const handleSubmit = () => {
    // Add minutes to user's allocation
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 max-w-md w-full">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Add Minutes for {user.name}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="mb-6">
          <div className="mb-4">
            <p className="text-gray-600">Current Balance: {user.remainingMinutes} minutes</p>
            <p className="text-gray-600">Available to Assign: {availableMinutes} minutes</p>
          </div>

          <label className="block text-sm font-medium text-gray-700 mb-2">
            Minutes to Add
          </label>
          <input
            type="number"
            value={minutesToAdd}
            onChange={(e) => setMinutesToAdd(Math.min(parseInt(e.target.value), availableMinutes))}
            min="1"
            max={availableMinutes}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="bg-gray-50 p-4 rounded-lg mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-600">Current Balance:</span>
            <span className="font-semibold">{user.remainingMinutes} minutes</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-600">After Adding:</span>
            <span className="font-semibold text-green-600">
              {user.remainingMinutes + minutesToAdd} minutes
            </span>
          </div>
        </div>

        <div className="flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={minutesToAdd <= 0 || minutesToAdd > availableMinutes}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300"
          >
            Add Minutes
          </button>
        </div>
      </div>
    </div>
  );
}