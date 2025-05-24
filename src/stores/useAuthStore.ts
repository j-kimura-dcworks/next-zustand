import { create } from 'zustand';

type User = {
  id: string;
  username: string;
  email: string;
};

type AuthState = {
  user: User | null;
  isLoggedIn: boolean;
  // アクション
  login: (userData: User) => void;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
};

// 初期状態
const initialState = {
  user: null,
  isLoggedIn: false,
};

export const useAuthStore = create<AuthState>((set) => ({
  ...initialState,
  login: (userData) =>
    set({
      user: userData,
      isLoggedIn: true,
    }),
  logout: () => set(initialState),
  updateUser: (userData) =>
    set((state) => ({
      user: state.user ? { ...state.user, ...userData } : null,
    })),
}));
