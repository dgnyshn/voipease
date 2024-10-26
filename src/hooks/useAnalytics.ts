import { useEffect } from 'react';
import useAnalyticsStore from '../store/useAnalyticsStore';
import type { DateRange } from '../store/useAnalyticsStore';

export function useAnalytics() {
  const { 
    data, 
    dateRange,
    fetchAnalytics, 
    isLoading, 
    error 
  } = useAnalyticsStore();

  useEffect(() => {
    fetchAnalytics(dateRange);
  }, [fetchAnalytics, dateRange]);

  const updateDateRange = (range: DateRange) => {
    fetchAnalytics(range);
  };

  return { 
    data, 
    dateRange,
    updateDateRange, 
    isLoading, 
    error 
  };
}