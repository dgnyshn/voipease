import { useEffect } from 'react';
import useForwardingStore from '../store/useForwardingStore';

export function useForwardedCalls() {
  const { 
    forwardedCalls, 
    fetchForwardedCalls, 
    isLoading, 
    error 
  } = useForwardingStore();

  useEffect(() => {
    fetchForwardedCalls();
  }, [fetchForwardedCalls]);

  return { forwardedCalls, isLoading, error };
}