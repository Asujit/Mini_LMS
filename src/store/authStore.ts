import { create } from 'zustand';
import { saveToken, getToken, removeToken } from '../storage/secureStore';
import { User } from '../types/auth.types';

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (token: string, user: User) => Promise<void>;
  logout: () => Promise<void>;
  loadToken: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: true,
  login: async (token: string, user: User) => {
    await saveToken(token);
    set({ token, user, isAuthenticated: true });
  },
  logout: async () => {
    await removeToken();
    set({ token: null, user: null, isAuthenticated: false });
  },
  loadToken: async () => {
    set({ isLoading: true });
    const token = await getToken();
    if (token) {
      // Optionally fetch user info from API
      set({ token, isAuthenticated: true, isLoading: false });
    } else {
      set({ isLoading: false });
    }
  },
}));