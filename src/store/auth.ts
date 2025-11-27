import { create } from "zustand";

type AuthState = {
    token: string | null;
    userId: string | null;
    setAuth: (token: string, userId: string | null) => void;
    clearAuth: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
    token: null,
    userId: null,
    setAuth: (token, userId) => set(() => ({ token, userId })),
    clearAuth: () => set(() => ({ token: null, userId: null })),
}));
