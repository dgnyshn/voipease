import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
  trialMinutes?: number;
  trialExpires?: Date;
}

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  setRole: (role: 'admin' | 'user') => void;
}

// Dummy users for demo
const dummyUsers = [
  {
    id: '1',
    name: 'Admin User',
    email: 'admin@voipease.com',
    password: 'admin123', // In a real app, passwords would be hashed
    role: 'admin' as const
  },
  {
    id: '2',
    name: 'Demo User',
    email: 'user@voipease.com',
    password: 'user123',
    role: 'user' as const
  }
];

const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      user: null,

      signup: async (name: string, email: string, password: string) => {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Check if email already exists
        if (dummyUsers.some(user => user.email === email)) {
          throw new Error('Email already exists');
        }

        const trialExpires = new Date();
        trialExpires.setDate(trialExpires.getDate() + 7); // 7-day trial

        const newUser = {
          id: Math.random().toString(36).substr(2, 9),
          name,
          email,
          role: 'user' as const,
          trialMinutes: 5,
          trialExpires
        };

        // In a real app, we would send this to a backend
        // For demo, we'll just log it
        console.log('New user registered:', newUser);

        set({
          isAuthenticated: true,
          user: newUser
        });
      },

      login: async (email: string, password: string) => {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Find user
        const user = dummyUsers.find(u => u.email === email && u.password === password);
        
        if (!user) {
          throw new Error('Invalid credentials');
        }

        const { password: _, ...userWithoutPassword } = user;

        set({
          isAuthenticated: true,
          user: userWithoutPassword
        });
      },

      logout: () => {
        set({ isAuthenticated: false, user: null });
      },

      setRole: (role: 'admin' | 'user') => {
        set((state) => ({
          user: state.user ? { ...state.user, role } : null
        }));
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);

export default useAuthStore;