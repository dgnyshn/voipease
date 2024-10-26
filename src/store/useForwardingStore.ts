import { create } from 'zustand';

interface ForwardedCall {
  id: string;
  fromNumber: string;
  toNumber: string;
  timestamp: number;
  status: 'active' | 'completed';
  duration?: number;
}

interface ForwardingSettings {
  isEnabled: boolean;
  forwardToNumber: string;
  rule: 'always' | 'busy' | 'unanswered' | 'offline';
  ringDuration: number; // seconds to wait before forwarding
}

interface ForwardingState {
  forwardedCalls: ForwardedCall[];
  settings: ForwardingSettings;
  isLoading: boolean;
  error: string | null;
  fetchForwardedCalls: () => Promise<void>;
  fetchSettings: () => Promise<void>;
  updateSettings: (settings: Partial<ForwardingSettings>) => Promise<void>;
}

// Mock data
const mockForwardedCalls: ForwardedCall[] = Array.from({ length: 10 }, (_, i) => ({
  id: `fwd-${i}`,
  fromNumber: `+1 (${Math.floor(Math.random() * 900) + 100}) ${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 9000) + 1000}`,
  toNumber: `+1 (${Math.floor(Math.random() * 900) + 100}) ${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 9000) + 1000}`,
  timestamp: Date.now() - Math.floor(Math.random() * 7 * 24 * 60 * 60 * 1000),
  status: Math.random() > 0.9 ? 'active' : 'completed',
  duration: Math.floor(Math.random() * 600)
}));

const mockSettings: ForwardingSettings = {
  isEnabled: true,
  forwardToNumber: '+1 (234) 567-8900',
  rule: 'always',
  ringDuration: 30
};

const useForwardingStore = create<ForwardingState>((set) => ({
  forwardedCalls: [],
  settings: mockSettings,
  isLoading: false,
  error: null,

  fetchForwardedCalls: async () => {
    set({ isLoading: true, error: null });
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      set({ forwardedCalls: mockForwardedCalls });
    } catch (error) {
      set({ error: 'Failed to fetch forwarded calls' });
    } finally {
      set({ isLoading: false });
    }
  },

  fetchSettings: async () => {
    set({ isLoading: true, error: null });
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      set({ settings: mockSettings });
    } catch (error) {
      set({ error: 'Failed to fetch forwarding settings' });
    } finally {
      set({ isLoading: false });
    }
  },

  updateSettings: async (newSettings) => {
    set({ isLoading: true, error: null });
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      set((state) => ({
        settings: { ...state.settings, ...newSettings }
      }));
    } catch (error) {
      set({ error: 'Failed to update forwarding settings' });
    } finally {
      set({ isLoading: false });
    }
  }
}));

export default useForwardingStore;