import { create } from 'zustand';

interface AdminStats {
  totalUsers: number;
  activeUsers: number;
  totalCalls: number;
  avgCallDuration: number;
  costSavings: number;
  callQuality: number;
  lowMinutesUsers: number;
}

interface CallTrend {
  date: string;
  local: number;
  international: number;
  total: number;
}

interface AdminState {
  isLoading: boolean;
  stats: AdminStats | null;
  callTrends: CallTrend[];
  fetchAdminStats: () => Promise<void>;
  fetchCallTrends: () => Promise<void>;
}

// Dummy data
const dummyStats: AdminStats = {
  totalUsers: 156,
  activeUsers: 89,
  totalCalls: 1234,
  avgCallDuration: 325, // in seconds
  costSavings: 4567.89,
  callQuality: 98.5,
  lowMinutesUsers: 45
};

const dummyTrends: CallTrend[] = [
  { date: '2024-03-10', local: 245, international: 35, total: 280 },
  { date: '2024-03-11', local: 288, international: 42, total: 330 },
  { date: '2024-03-12', local: 256, international: 38, total: 294 },
  { date: '2024-03-13', local: 302, international: 45, total: 347 },
  { date: '2024-03-14', local: 278, international: 40, total: 318 },
  { date: '2024-03-15', local: 265, international: 36, total: 301 },
  { date: '2024-03-16', local: 298, international: 44, total: 342 }
];

const useAdminStore = create<AdminState>((set) => ({
  isLoading: false,
  stats: null,
  callTrends: [],

  fetchAdminStats: async () => {
    set({ isLoading: true });
    try {
      // Simulate API call with shorter delay (200ms)
      await new Promise(resolve => setTimeout(resolve, 200));
      set({ stats: dummyStats });
    } catch (error) {
      console.error('Error fetching admin stats:', error);
    } finally {
      set({ isLoading: false });
    }
  },

  fetchCallTrends: async () => {
    set({ isLoading: true });
    try {
      // Simulate API call with shorter delay (200ms)
      await new Promise(resolve => setTimeout(resolve, 200));
      set({ callTrends: dummyTrends });
    } catch (error) {
      console.error('Error fetching call trends:', error);
    } finally {
      set({ isLoading: false });
    }
  }
}));

export default useAdminStore;