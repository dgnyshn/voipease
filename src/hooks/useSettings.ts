import { useEffect } from 'react';
import useSettingsStore from '../store/useSettingsStore';

export function useSettings() {
  const { 
    settings, 
    fetchSettings, 
    updateSettings,
    isLoading, 
    error 
  } = useSettingsStore();

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