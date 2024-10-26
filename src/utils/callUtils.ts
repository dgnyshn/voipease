export const getCallCost = (number: string): number => {
  const isInternational = number.startsWith('+') || number.startsWith('00');
  const rates = {
    domestic: 0.02,
    international: 0.10
  };
  return isInternational ? rates.international : rates.domestic;
};

export const formatDuration = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
};

export const formatCost = (cost: number): string => {
  return `$${cost.toFixed(2)}`;
};

export const getCallQuality = (callHistory: any[]): number => {
  if (!callHistory.length) return 0;
  
  const totalQuality = callHistory.reduce((sum, call) => sum + (call.quality || 0), 0);
  return Math.round((totalQuality / callHistory.length) * 10) / 10;
};

export const calculateCostSavings = (callHistory: any[]): number => {
  const avgMarketRate = 0.15; // Average market rate per minute
  const totalMinutes = callHistory.reduce((sum, call) => sum + Math.ceil(call.duration / 60), 0);
  const totalCost = callHistory.reduce((sum, call) => sum + (call.cost || 0), 0);
  const marketCost = totalMinutes * avgMarketRate;
  return Math.max(0, marketCost - totalCost);
};