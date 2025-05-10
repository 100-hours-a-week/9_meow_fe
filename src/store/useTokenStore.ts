import { create } from "zustand";

interface ITokenState {
  token: string | null;
  setToken: (token: string) => void;
  clearToken: () => void;
}

const TOKEN_KEY = "auth_token";

const useTokenStore = create<ITokenState>((set) => ({
  token: localStorage.getItem(TOKEN_KEY),
  setToken: (token: string) => {
    localStorage.setItem(TOKEN_KEY, token);
    set({ token });
  },
  clearToken: () => {
    localStorage.removeItem(TOKEN_KEY);
    set({ token: null });
  },
}));

export default useTokenStore;
