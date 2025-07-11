import { Virtualizer } from "@tanstack/react-virtual";
import { useEffect } from "react";
import useScrollMemoryStore from "@/store/useScrollMemoryStore";

interface UseScrollMemoryOptions<T> {
  key: string;
  virtualizer: Virtualizer<HTMLDivElement, Element>;
  allItems: T[];
  enabled?: boolean;
}

export const useScrollMemory = <T>({
  key,
  virtualizer,
  allItems,
  enabled = true,
}: UseScrollMemoryOptions<T>) => {
  const { getScrollPosition } = useScrollMemoryStore();

  // 스크롤 위치 복원
  useEffect(() => {
    if (!enabled || allItems.length === 0) {
      return;
    }

    const savedIndex = getScrollPosition(key);
    if (savedIndex !== null) {
      // 가상화 초기화를 기다린 후 스크롤
      const timeoutId = setTimeout(() => {
        // 저장된 인덱스가 유효한지 확인
        const maxIndex = virtualizer.options.count;
        const validIndex = Math.min(savedIndex, maxIndex);

        // 인덱스가 유효한 경우에만 스크롤
        if (validIndex >= 0) {
          virtualizer.scrollToIndex(validIndex, {
            align: "start",
            behavior: "auto",
          });
        }
      }, 100); // 100ms 지연

      return () => clearTimeout(timeoutId);
    }
  }, [key, allItems.length, virtualizer, enabled, getScrollPosition]);
};
