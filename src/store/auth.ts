import { create } from "zustand";
import { persist } from "zustand/middleware";

type AuthState = {
    token: string | null;
    userId: string | null;
    hydrated: boolean;
    setAuth: (token: string, userId: string | null) => void;
    clearAuth: () => void;
    setHydrated: (value: boolean) => void;
};

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            token: null,
            userId: null,
            hydrated: false,
            setAuth: (token, userId) => set(() => ({ token, userId })),
            clearAuth: () => set(() => ({ token: null, userId: null })),
            setHydrated: (value) => set(() => ({ hydrated: value })),
        }),
        {
            name: "auth",
            onRehydrateStorage: () => (state) => {
                state?.setHydrated(true);
            },
        }
    )
);
