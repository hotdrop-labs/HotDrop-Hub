import {create} from 'zustand';
import {persist, createJSONStorage} from 'zustand/middleware';
import * as SecureStore from 'expo-secure-store';


const secureStorage = {
    getItem: async(name:string) => (await SecureStore.getItemAsync(name)) ?? null,
    setItem: async(name: string, value: string) => {await SecureStore.setItemAsync(name, value)},
    removeItem: async(name: string) => {await SecureStore.deleteItemAsync(name)}
}

type User = {
    id: string,
    username: string,
    email: string,
    avatarUrl: string,

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
            partialize: (s) => ({user: s.user, token: s.token})
        }
    )

);