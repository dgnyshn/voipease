import usePlanStore from '../store/usePlanStore';

export function usePlanRestrictions() {
  const { 
    currentPlan,
    isFeatureEnabled,
    getFeatureLimit,
    getFeatureTooltip
  } = usePlanStore();

  const checkFeatureAccess = (feature: string) => {
    return {
      isEnabled: isFeatureEnabled(feature as any),
      limit: getFeatureLimit(feature as any),
      tooltip: getFeatureTooltip(feature as any)
    };
  };

  const isFeatureAccessible = (feature: string) => {
    return isFeatureEnabled(feature as any);
  };

  const getFeatureDetails = (feature: string) => {
    return {
      limit: getFeatureLimit(feature as any),
      tooltip: getFeatureTooltip(feature as any)
    };
  };

  return {
    currentPlan,
    checkFeatureAccess,
    isFeatureAccessible,
    getFeatureDetails
  };
}