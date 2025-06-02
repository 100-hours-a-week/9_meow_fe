import { create } from "zustand";

interface ITokenState {
  token: string | null;
  setToken: (token: string) => void;
  clearToken: () => void;
}

const useTokenStore = create<ITokenState>((set) => ({
  token: null,
  setToken: (token: string) => {
    set({ token });
  },
  clearToken: () => {
    set({ token: null });
  },
}));

export default useTokenStore;
