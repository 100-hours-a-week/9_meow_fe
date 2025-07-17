import { create } from "zustand";

interface IScrollMemoryStore {
  scrollPositions: Map<string, number>;
  setScrollPosition: (key: string, index: number) => void;
  getScrollPosition: (key: string) => number | null;
  clearScrollPosition: (key: string) => void;
  clearAllScrollPositions: () => void;
}

const useScrollMemoryStore = create<IScrollMemoryStore>((set, get) => ({
  scrollPositions: new Map(),

  setScrollPosition: (key: string, index: number) => {
    set((state) => {
      const newScrollPositions = new Map(state.scrollPositions);
      newScrollPositions.set(key, index);
      return { scrollPositions: newScrollPositions };
    });
  },

  getScrollPosition: (key: string) => get().scrollPositions.get(key) ?? null,

  clearScrollPosition: (key: string) => {
    set((state) => {
      const newScrollPositions = new Map(state.scrollPositions);
      newScrollPositions.delete(key);
      return { scrollPositions: newScrollPositions };
    });
  },

  clearAllScrollPositions: () => {
    set({ scrollPositions: new Map() });
  },
}));

export default useScrollMemoryStore;
