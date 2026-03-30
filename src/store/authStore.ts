import { create } from 'zustand';
import { saveToken, getToken, removeToken } from '../storage/secureStore';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface User {
  id: string;
  username: string;
  email: string;
  avatar?: string;
  role: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (token: string, user: User) => Promise<void>;
  logout: () => Promise<void>;
  loadToken: () => Promise<void>;
  updateAvatar: (avatarUrl: string) => Promise<void>;
}

const USER_STORAGE_KEY = 'user_data';

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: true,
  login: async (token: string, user: User) => {
    await saveToken(token);
    await AsyncStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
    set({ token, user, isAuthenticated: true, isLoading: false });
  },
  logout: async () => {
    await removeToken();
    await AsyncStorage.removeItem(USER_STORAGE_KEY);
    set({ token: null, user: null, isAuthenticated: false, isLoading: false });
  },
  loadToken: async () => {
    set({ isLoading: true });
    const token = await getToken();
    if (token) {
      const userStr = await AsyncStorage.getItem(USER_STORAGE_KEY);
      let user = null;
      if (userStr) {
        try {
          user = JSON.parse(userStr);
        } catch (e) {
          console.error('Failed to parse user', e);
        }
      }
      set({ token, user, isAuthenticated: true, isLoading: false });
    } else {
      set({ isLoading: false });
    }
  },
  updateAvatar: async (avatarUrl: string) => {
    const currentUser = get().user;
    if (currentUser) {
      const updatedUser = { ...currentUser, avatar: avatarUrl };
      await AsyncStorage.setItem(USER_STORAGE_KEY, JSON.stringify(updatedUser));
      set({ user: updatedUser });
    }
  },
}));