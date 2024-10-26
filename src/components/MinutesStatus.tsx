import React from 'react';
import { Clock } from 'lucide-react';

interface MinutesStatusProps {
  remainingMinutes: number;
  totalMinutes: number;
  onAddMinutes: () => void;
}

export default function MinutesStatus({ remainingMinutes, totalMinutes, onAddMinutes }: MinutesStatusProps) {
  const percentage = (remainingMinutes / totalMinutes) * 100;
  const isLow = percentage <= 20;
  const isCritical = percentage <= 10;

  return (
    <div className={`flex items-center justify-between p-4 rounded-lg ${
      isCritical ? 'bg-red-50' : isLow ? 'bg-yellow-50' : 'bg-blue-50'
    }`}>
      <div className="flex items-center space-x-3">
        <Clock className={`h-6 w-6 ${
          isCritical ? 'text-red-600' : isLow ? 'text-yellow-600' : 'text-blue-600'
        }`} />
        <div>
          <div className="font-semibold">
            {remainingMinutes} / {totalMinutes} minutes remaining
          </div>
          {isLow && (
            <div className={`text-sm ${isCritical ? 'text-red-600' : 'text-yellow-600'}`}>
              {isCritical ? 'Critical' : 'Low'} balance warning
            </div>
          )}
        </div>
      </div>
      {isLow && (
        <button
          onClick={onAddMinutes}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Add Minutes
        </button>
      )}
    </div>
  );
}