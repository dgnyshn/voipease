import { useEffect } from 'react';
import useProfileStore from '../store/useProfileStore';

export function useProfile() {
  const { 
    profile, 
    fetchProfile, 
    updateProfile,
    isLoading, 
    error 
  } = useProfileStore();

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  return { 
    profile, 
    updateProfile, 
    isLoading, 
    error 
  };
}