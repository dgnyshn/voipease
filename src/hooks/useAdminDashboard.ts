import { useState, useEffect } from 'react';
import useCallStore from '../store/useCallStore';
import { getCallQuality } from '../utils/callUtils';

interface DashboardData {
  callSuccessRate: number;
  avgCallDuration: number;
  recentCalls: number;
}

export function useAdminDashboard() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const { callHistory } = useCallStore();

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        // Simulate API call with shorter delay
        await new Promise(resolve => setTimeout(resolve, 200));
        
        // Calculate metrics from call history
        const successfulCalls = callHistory.filter(call => call.quality && call.quality >= 80).length;
        const totalDuration = callHistory.reduce((sum, call) => sum + call.duration, 0);
        
        setData({
          callSuccessRate: (successfulCalls / callHistory.length) * 100 || 0,
          avgCallDuration: totalDuration / callHistory.length || 0,
          recentCalls: callHistory.length
        });
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();

    // Polling every 30 seconds
    const interval = setInterval(fetchDashboardData, 30000);
    return () => clearInterval(interval);
  }, [callHistory]);

  return { data, loading, error };
}