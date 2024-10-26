import React, { useState } from 'react';
import { Clock, CreditCard } from 'lucide-react';

interface PurchaseMinutesModalProps {
  remainingMinutes: number;
  onClose: () => void;
  onPurchase: (minutes: number) => void;
}

export default function PurchaseMinutesModal({
  remainingMinutes,
  onClose,
  onPurchase
}: PurchaseMinutesModalProps) {
  const [selectedPackage, setSelectedPackage] = useState(100);

  const packages = [
    { minutes: 100, price: 10, savings: '10%' },
    { minutes: 500, price: 45, savings: '15%' },
    { minutes: 1000, price: 80, savings: '20%' }
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-[480px] max-w-full mx-4">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold">Purchase Minutes</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            ×
          </button>
        </div>

        <div className="space-y-4 mb-6">
          {packages.map((pkg) => (
            <div
              key={pkg.minutes}
              onClick={() => setSelectedPackage(pkg.minutes)}
              className={`p-4 rounded-lg border-2 cursor-pointer transition-colors ${
                selectedPackage === pkg.minutes
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-blue-200'
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-lg font-semibold">{pkg.minutes} Minutes</span>
                  <div className="text-sm text-gray-500">Save {pkg.savings}</div>
                </div>
                <div className="text-xl font-bold">${pkg.price}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-gray-50 p-4 rounded-lg mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-600">Current Balance:</span>
            <span className="font-semibold">{remainingMinutes} minutes</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-600">After Purchase:</span>
            <span className="font-semibold text-green-600">
              {remainingMinutes + selectedPackage} minutes
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
            onClick={() => onPurchase(selectedPackage)}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <CreditCard className="h-5 w-5" />
            <span>Purchase Now</span>
          </button>
        </div>
      </div>
    </div>
  );
}