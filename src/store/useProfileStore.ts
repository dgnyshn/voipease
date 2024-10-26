import { create } from 'zustand';

interface Profile {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

interface ProfileState {
  profile: Profile | null;
  isLoading: boolean;
  error: string | null;
  fetchProfile: () => Promise<void>;
  updateProfile: (data: Partial<Profile>) => Promise<void>;
}

const useProfileStore = create<ProfileState>((set) => ({
  profile: null,
  isLoading: false,
  error: null,

  fetchProfile: async () => {
    set({ isLoading: true, error: null });
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Mock data from auth store
      set({
        profile: {
          id: '1',
          name: 'John Doe',
          email: 'john@example.com',
        }
      });
    } catch (error) {
      set({ error: 'Failed to fetch profile' });
    } finally {
      set({ isLoading: false });
    }
  },

  updateProfile: async (data: Partial<Profile>) => {
    set({ isLoading: true, error: null });
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      set((state) => ({
        profile: state.profile ? { ...state.profile, ...data } : null
      }));
    } catch (error) {
      set({ error: 'Failed to update profile' });
    } finally {
      set({ isLoading: false });
    }
  }
}));

export default useProfileStore;