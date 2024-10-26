import { useEffect } from 'react';
import useForwardingStore from '../store/useForwardingStore';

export function useForwardingSettings() {
  const { 
    settings, 
    fetchSettings, 
    updateSettings,
    isLoading, 
    error 
  } = useForwardingStore();

  useEffect(() => {
    fetchSettings();
  }, [fetchSettings]);

  return { 
    settings, 
    updateSettings, 
    isLoading, 
    error 
  };
}