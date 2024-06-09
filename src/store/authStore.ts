import { create } from 'zustand';
import { authType, userType } from '../components/Types';

type StoreState = {
  auth: authType | null;
};

type StoreActions = {
  setAuth: (user: userType, accessToken: string, refreshToken: string, roles: number[]) => void;
  logout: () => void;
  resetAuth: () => void;
};

const initialState: StoreState = {
  auth: null,
};

const useAuthStore = create<StoreState & StoreActions>()((set, get) => ({
  ...initialState,

  setAuth: (user: userType, accessToken: string, refreshToken: string, roles: number[]) => {
    set({
      auth: { user, accessToken, refreshToken, roles },
    });
  },

  logout: () => {
    set({ ...initialState });
  },

  resetAuth: () => {
    set({ ...initialState });
  },
}));

export default useAuthStore;
