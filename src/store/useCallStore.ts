import { create } from 'zustand';
import { getCallCost } from '../utils/callUtils';

interface CallRecord {
  id: string;
  number: string;
  duration: number;
  timestamp: number;
  type: 'outgoing' | 'incoming' | 'missed';
  quality?: number;
  cost?: number;
}

interface Voicemail {
  id: string;
  fromNumber: string;
  timestamp: number;
  duration: number;
  isRead: boolean;
  audioUrl?: string;
}

interface CallState {
  isInCall: boolean;
  currentNumber: string;
  callHistory: CallRecord[];
  voicemails: Voicemail[];
  remainingMinutes: number;
  isLoading: boolean;
  error: string | null;
  addToNumber: (digit: string) => void;
  clearNumber: () => void;
  startCall: () => void;
  endCall: () => void;
  addToHistory: (record: CallRecord) => void;
  getRemainingMinutes: () => number;
  deductMinutes: (minutes: number) => void;
  addMinutes: (minutes: number) => void;
  fetchCallHistory: () => Promise<void>;
  fetchVoicemails: () => Promise<void>;
  deleteVoicemail: (id: string) => Promise<void>;
  markVoicemailAsRead: (id: string) => Promise<void>;
  leaveVoicemail: (number: string, duration: number) => Promise<void>;
}

// Mock data
const mockCallHistory: CallRecord[] = Array.from({ length: 20 }, (_, i) => ({
  id: `call-${i}`,
  number: `+1 (${Math.floor(Math.random() * 900) + 100}) ${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 9000) + 1000}`,
  duration: Math.floor(Math.random() * 600),
  timestamp: Date.now() - Math.floor(Math.random() * 7 * 24 * 60 * 60 * 1000),
  type: ['incoming', 'outgoing', 'missed'][Math.floor(Math.random() * 3)] as 'incoming' | 'outgoing' | 'missed',
  quality: Math.floor(Math.random() * 15) + 85
}));

const mockVoicemails: Voicemail[] = Array.from({ length: 10 }, (_, i) => ({
  id: `vm-${i}`,
  fromNumber: `+1 (${Math.floor(Math.random() * 900) + 100}) ${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 9000) + 1000}`,
  timestamp: Date.now() - Math.floor(Math.random() * 7 * 24 * 60 * 60 * 1000),
  duration: Math.floor(Math.random() * 60) + 10,
  isRead: Math.random() > 0.5
}));

const useCallStore = create<CallState>((set, get) => ({
  isInCall: false,
  currentNumber: '',
  callHistory: [],
  voicemails: [],
  remainingMinutes: 45,
  isLoading: false,
  error: null,

  addToNumber: (digit) => set((state) => ({
    currentNumber: state.currentNumber.length < 15 ? state.currentNumber + digit : state.currentNumber
  })),

  clearNumber: () => set({ currentNumber: '' }),

  startCall: () => set({ isInCall: true }),

  endCall: () => {
    const state = get();
    const duration = Math.floor(Math.random() * 300);
    const cost = getCallCost(state.currentNumber) * (duration / 60);
    
    const record: CallRecord = {
      id: Date.now().toString(),
      number: state.currentNumber,
      duration,
      timestamp: Date.now(),
      type: 'outgoing',
      quality: Math.floor(Math.random() * 15) + 85,
      cost
    };
    
    get().addToHistory(record);
    get().deductMinutes(Math.ceil(duration / 60));
    set({ isInCall: false });
  },

  addToHistory: (record) => set((state) => ({
    callHistory: [record, ...state.callHistory]
  })),

  getRemainingMinutes: () => get().remainingMinutes,

  deductMinutes: (minutes) => set((state) => ({
    remainingMinutes: Math.max(0, state.remainingMinutes - minutes)
  })),

  addMinutes: (minutes) => set((state) => ({
    remainingMinutes: state.remainingMinutes + minutes
  })),

  fetchCallHistory: async () => {
    set({ isLoading: true, error: null });
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      set({ callHistory: mockCallHistory });
    } catch (error) {
      set({ error: 'Failed to fetch call history' });
    } finally {
      set({ isLoading: false });
    }
  },

  fetchVoicemails: async () => {
    set({ isLoading: true, error: null });
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      set({ voicemails: mockVoicemails });
    } catch (error) {
      set({ error: 'Failed to fetch voicemails' });
    } finally {
      set({ isLoading: false });
    }
  },

  deleteVoicemail: async (id: string) => {
    set({ isLoading: true, error: null });
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      set((state) => ({
        voicemails: state.voicemails.filter(vm => vm.id !== id)
      }));
    } catch (error) {
      set({ error: 'Failed to delete voicemail' });
    } finally {
      set({ isLoading: false });
    }
  },

  markVoicemailAsRead: async (id: string) => {
    set({ isLoading: true, error: null });
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      set((state) => ({
        voicemails: state.voicemails.map(vm =>
          vm.id === id ? { ...vm, isRead: true } : vm
        )
      }));
    } catch (error) {
      set({ error: 'Failed to mark voicemail as read' });
    } finally {
      set({ isLoading: false });
    }
  },

  leaveVoicemail: async (number: string, duration: number) => {
    set({ isLoading: true, error: null });
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      const newVoicemail: Voicemail = {
        id: `vm-${Date.now()}`,
        fromNumber: number,
        timestamp: Date.now(),
        duration,
        isRead: false
      };
      set((state) => ({
        voicemails: [newVoicemail, ...state.voicemails]
      }));
    } catch (error) {
      set({ error: 'Failed to leave voicemail' });
    } finally {
      set({ isLoading: false });
    }
  }
}));

export default useCallStore;