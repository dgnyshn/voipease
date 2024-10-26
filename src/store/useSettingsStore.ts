import { create } from 'zustand';

interface NotificationSettings {
  email: boolean;
  desktop: boolean;
  sms: boolean;
}

interface Settings {
  timezone: string;
  language: string;
  notifications: NotificationSettings;
}

interface SettingsState {
  settings: Settings | null;
  isLoading: boolean;
  error: string | null;
  fetchSettings: () => Promise<void>;
  updateSettings: (settings: Partial<Settings>) => Promise<void>;
}

// Mock initial settings
const mockSettings: Settings = {
  timezone: 'America/Chicago',
  language: 'en',
  notifications: {
    email: true,
    desktop: true,
    sms: false
  }
};

const useSettingsStore = create<SettingsState>((set) => ({
  settings: null,
  isLoading: false,
  error: null,

  fetchSettings: async () => {
    set({ isLoading: true, error: null });
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      set({ settings: mockSettings });
    } catch (error) {
      set({ error: 'Failed to fetch settings' });
    } finally {
      set({ isLoading: false });
    }
  },

  updateSettings: async (newSettings: Partial<Settings>) => {
    set({ isLoading: true, error: null });
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      set((state) => ({
        settings: state.settings ? { ...state.settings, ...newSettings } : null
      }));
    } catch (error) {
      set({ error: 'Failed to update settings' });
    } finally {
      set({ isLoading: false });
    }
  }
}));

export default useSettingsStore;