import { useEffect } from 'react';
import useCallStore from '../store/useCallStore';

export function useVoicemails() {
  const { 
    voicemails, 
    fetchVoicemails, 
    deleteVoicemail, 
    markVoicemailAsRead,
    isLoading, 
    error 
  } = useCallStore();

  useEffect(() => {
    fetchVoicemails();
  }, [fetchVoicemails]);

  return { 
    voicemails, 
    deleteVoicemail, 
    markVoicemailAsRead, 
    isLoading, 
    error 
  };
}