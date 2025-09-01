import {create} from 'zustand';
import {persist, createJSONStorage} from 'zustand/middleware';
import * as SecureStore from 'expo-secure-store';


const secureStorage = {
    getItem: async (name: string) => {
        try {
            const result = await SecureStore.getItemAsync(name);
            console.log(`SecureStore getItem ${name}:`, !!result);
            return result ?? null;
        } catch (error) {
            console.error(`SecureStore getItem error for ${name}:`, error);
            return null;
        }
    },
    setItem: async (name: string, value: string) => {
        try {
            await SecureStore.setItemAsync(name, value);
            console.log(`SecureStore setItem ${name}: success`);
        } catch (error) {
            console.error(`SecureStore setItem error for ${name}:`, error);
            throw error;
        }
    },
    removeItem: async (name: string) => {
        try {
            await SecureStore.deleteItemAsync(name);
            console.log(`SecureStore removeItem ${name}: success`);
        } catch (error) {
            console.error(`SecureStore removeItem error for ${name}:`, error);
            throw error;
        }
    }
};

type User = {
    id: string,
    username: string,
    email: string,
    avatarUrl: string,
    wallet: number

    pubgId: string,
    pubgRegion: string,
    verifiedProfile:  boolean,

    bio: string,

    scrimsPlayed: number,
    scrimsWon: number
}
type AuthState = {
    user: User | null,
    token: string | null,
    setAuth: (payload: {user: User, token: string | null}) => void
    clearAuth: () => void
}
export const useAuth = create<AuthState>()(
    persist(
        (set) => ({
            user: null,
            token: null,
            setAuth: ({user, token}) => set({user, token}),
            clearAuth: () => set({user: null, token: null})
        }),
        {
            name: 'hotdrop-auth',
            storage: createJSONStorage(() => secureStorage),
            partialize: (s) => ({user: s.user, token: s.token}),
            onRehydrateStorage: () => {
                console.log('Starting auth rehydration...');
                return (state, error) => {
                    if (error) {
                        console.error('Auth rehydration failed:', error);
                    } else {
                        console.log('Auth rehydration complete:', {
                            hasUser: !!state?.user,
                            hasToken: !!state?.token
                        });
                    }
                };
            },
            // Versión para manejar migraciones si es necesario
            version: 1,
        }
    )
);