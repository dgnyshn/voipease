import { useEffect } from 'react';
import useCallStore from '../store/useCallStore';

export function useCallHistory() {
  const { callHistory, fetchCallHistory, isLoading, error } = useCallStore();

  useEffect(() => {
    fetchCallHistory();
  }, [fetchCallHistory]);

  return { callHistory, isLoading, error };
}