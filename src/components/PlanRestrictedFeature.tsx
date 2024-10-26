import React from 'react';
import { Lock } from 'lucide-react';
import usePlanStore from '../store/usePlanStore';

interface PlanRestrictedFeatureProps {
  feature: string;
  children: React.ReactNode;
  showUpgradeButton?: boolean;
}

export default function PlanRestrictedFeature({
  feature,
  children,
  showUpgradeButton = true
}: PlanRestrictedFeatureProps) {
  const { isFeatureEnabled, getFeatureTooltip } = usePlanStore();
  const isEnabled = isFeatureEnabled(feature as any);
  const tooltip = getFeatureTooltip(feature as any);

  if (!isEnabled) {
    return (
      <div className="relative">
        <div className="absolute inset-0 bg-gray-100 bg-opacity-50 backdrop-blur-sm z-10 flex items-center justify-center">
          <div className="text-center p-4">
            <Lock className="h-6 w-6 text-gray-400 mx-auto mb-2" />
            <p className="text-sm text-gray-600 mb-2">{tooltip || 'This feature is not available in your current plan'}</p>
            {showUpgradeButton && (
              <button
                onClick={() => window.location.href = '/dashboard/billing'}
                className="text-sm bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                Upgrade Plan
              </button>
            )}
          </div>
        </div>
        <div className="opacity-50 pointer-events-none">
          {children}
        </div>
      </div>
    );
  }

  return <>{children}</>;
}