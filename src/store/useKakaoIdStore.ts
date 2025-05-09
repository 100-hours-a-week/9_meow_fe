import { create } from "zustand";

interface KakaoIdState {
  kakaoId: number | null;
  setKakaoId: (kakaoId: number) => void;
  clearKakaoId: () => void;
}

const useKakaoIdStore = create<KakaoIdState>((set) => ({
  kakaoId: null,
  setKakaoId: (kakaoId: number) => set({ kakaoId }),
  clearKakaoId: () => set({ kakaoId: null }),
}));

export default useKakaoIdStore;
