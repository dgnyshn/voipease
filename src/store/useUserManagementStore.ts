import { create } from 'zustand';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
  status: 'active' | 'inactive';
  adminId?: string;
  createdAt: string;
  remainingMinutes: number;
  totalMinutes: number;
}

interface PlanLimits {
  starter: number;
  professional: number;
  enterprise: number;
  extraUserCost: number;
}

interface UserManagementState {
  users: User[];
  currentPlan: 'starter' | 'professional' | 'enterprise';
  planLimits: PlanLimits;
  isLoading: boolean;
  error: string | null;
  fetchUsers: () => Promise<void>;
  addUser: (user: Omit<User, 'id' | 'status' | 'createdAt' | 'remainingMinutes' | 'totalMinutes'>) => Promise<void>;
  updateUserStatus: (userId: string, status: 'active' | 'inactive') => Promise<void>;
  deleteUser: (userId: string) => Promise<void>;
  getUserCount: () => number;
  getRemainingSlots: () => number;
  getAdminUsers: () => User[];
  getUsersByAdminId: (adminId: string) => User[];
  addMinutesToUser: (userId: string, minutes: number) => Promise<void>;
  checkLowMinutesUsers: () => User[];
}

const planLimits: PlanLimits = {
  starter: 5,
  professional: 20,
  enterprise: 50,
  extraUserCost: 15
};

const planMinutes = {
  starter: 750,
  professional: 2500,
  enterprise: 5000
};

// Mock data
const mockUsers: User[] = [
  {
    id: 'admin1',
    name: 'John Admin',
    email: 'admin@voipease.com',
    role: 'admin',
    status: 'active',
    createdAt: '2024-01-15T10:00:00Z',
    remainingMinutes: 2500,
    totalMinutes: 2500
  },
  {
    id: 'user1',
    name: 'Alice Smith',
    email: 'alice@company.com',
    role: 'user',
    status: 'active',
    adminId: 'admin1',
    createdAt: '2024-02-01T14:30:00Z',
    remainingMinutes: 45,
    totalMinutes: 750
  },
  {
    id: 'user2',
    name: 'Bob Johnson',
    email: 'bob@company.com',
    role: 'user',
    status: 'active',
    adminId: 'admin1',
    createdAt: '2024-02-15T09:15:00Z',
    remainingMinutes: 250,
    totalMinutes: 750
  }
];

const useUserManagementStore = create<UserManagementState>((set, get) => ({
  users: [],
  currentPlan: 'professional',
  planLimits,
  isLoading: false,
  error: null,

  fetchUsers: async () => {
    set({ isLoading: true, error: null });
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      set({ users: mockUsers });
    } catch (error) {
      set({ error: 'Failed to fetch users' });
    } finally {
      set({ isLoading: false });
    }
  },

  addUser: async (userData) => {
    set({ isLoading: true, error: null });
    try {
      const currentAdmin = get().users.find(u => u.role === 'admin');
      if (!currentAdmin) throw new Error('Admin not found');

      const userCount = get().getUsersByAdminId(currentAdmin.id).length;
      const limit = planLimits[get().currentPlan];

      if (userCount >= limit) {
        throw new Error('USER_LIMIT_REACHED');
      }

      await new Promise(resolve => setTimeout(resolve, 1000));

      const newUser: User = {
        id: Math.random().toString(36).substr(2, 9),
        ...userData,
        status: 'active',
        adminId: currentAdmin.id,
        createdAt: new Date().toISOString(),
        remainingMinutes: planMinutes[get().currentPlan],
        totalMinutes: planMinutes[get().currentPlan]
      };

      set((state) => ({
        users: [...state.users, newUser]
      }));
    } catch (error) {
      if (error instanceof Error) {
        set({ error: error.message });
      }
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  updateUserStatus: async (userId: string, status: 'active' | 'inactive') => {
    set({ isLoading: true, error: null });
    try {
      const user = get().users.find(u => u.id === userId);
      if (!user) throw new Error('User not found');
      if (user.role === 'admin') throw new Error('Cannot modify admin user');

      await new Promise(resolve => setTimeout(resolve, 1000));
      
      set((state) => ({
        users: state.users.map(user =>
          user.id === userId ? { ...user, status } : user
        )
      }));
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Failed to update user status' });
    } finally {
      set({ isLoading: false });
    }
  },

  deleteUser: async (userId: string) => {
    set({ isLoading: true, error: null });
    try {
      const user = get().users.find(u => u.id === userId);
      if (!user) throw new Error('User not found');
      if (user.role === 'admin') throw new Error('Cannot delete admin user');

      await new Promise(resolve => setTimeout(resolve, 1000));
      
      set((state) => ({
        users: state.users.filter(user => user.id !== userId)
      }));
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Failed to delete user' });
    } finally {
      set({ isLoading: false });
    }
  },

  getUserCount: () => {
    const currentAdmin = get().users.find(u => u.role === 'admin');
    if (!currentAdmin) return 0;
    return get().getUsersByAdminId(currentAdmin.id).length;
  },

  getRemainingSlots: () => {
    const limit = planLimits[get().currentPlan];
    return limit - get().getUserCount();
  },

  getAdminUsers: () => {
    return get().users.filter(user => user.role === 'admin');
  },

  getUsersByAdminId: (adminId: string) => {
    return get().users.filter(user => user.adminId === adminId);
  },

  addMinutesToUser: async (userId: string, minutes: number) => {
    set({ isLoading: true, error: null });
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      set((state) => ({
        users: state.users.map(user =>
          user.id === userId
            ? { ...user, remainingMinutes: user.remainingMinutes + minutes }
            : user
        )
      }));
    } catch (error) {
      set({ error: 'Failed to add minutes to user' });
    } finally {
      set({ isLoading: false });
    }
  },

  checkLowMinutesUsers: () => {
    return get().users.filter(user => {
      if (user.role === 'admin') return false;
      const minutesPercentage = (user.remainingMinutes / user.totalMinutes) * 100;
      return minutesPercentage <= 20;
    });
  }
}));

export default useUserManagementStore;