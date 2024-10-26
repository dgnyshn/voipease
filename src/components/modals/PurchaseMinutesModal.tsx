import React, { useState } from 'react';
import { X, CreditCard } from 'lucide-react';
import useCallStore from '../../store/useCallStore';

interface PurchaseMinutesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const planPackages = {
  'Freelancer': [
    { minutes: 500, price: 4.99 },
    { minutes: 1000, price: 8.99 },
    { minutes: 1500, price: 12.99 }
  ],
  'Small Business': [
    { minutes: 1000, price: 9.99 },
    { minutes: 2000, price: 14.99 },
    { minutes: 3000, price: 19.99 }
  ],
  'Team': [
    { minutes: 2000, price: 14.99 },
    { minutes: 5000, price: 24.99 },
    { minutes: 10000, price: 39.99 }
  ]
};

export default function PurchaseMinutesModal({ isOpen, onClose }: PurchaseMinutesModalProps) {
  const [selectedPackage, setSelectedPackage] = useState<number | null>(null);
  const { remainingMinutes, addMinutes } = useCallStore();
  
  // Default to Freelancer packages if no plan is specified
  const packages = planPackages['Freelancer'];

  const handlePurchase = () => {
    if (selectedPackage !== null) {
      const package_ = packages[selectedPackage];
      addMinutes(package_.minutes);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-xl p-6 max-w-md w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Purchase Minutes</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="mb-4">
          <p className="text-gray-600">Current Balance: {remainingMinutes} minutes</p>
        </div>

        <div className="space-y-4 mb-6">
          {packages.map((pkg, index) => (
            <div
              key={index}
              onClick={() => setSelectedPackage(index)}
              className={`p-4 rounded-lg border-2 cursor-pointer transition-colors ${
                selectedPackage === index
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-blue-200'
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-lg font-semibold">{pkg.minutes} Minutes</span>
                  <div className="text-sm text-gray-500">
                    ${(pkg.price / pkg.minutes * 100).toFixed(2)}/100 minutes
                  </div>
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
              {remainingMinutes + (selectedPackage !== null ? packages[selectedPackage].minutes : 0)} minutes
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
            onClick={handlePurchase}
            disabled={selectedPackage === null}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${
              selectedPackage !== null
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : 'bg-gray-200 text-gray-500 cursor-not-allowed'
            }`}
          >
            <CreditCard className="h-5 w-5" />
            <span>Purchase Now</span>
          </button>
        </div>
      </div>
    </div>
  );
}