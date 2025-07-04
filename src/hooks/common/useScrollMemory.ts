import { VirtualItem, Virtualizer } from "@tanstack/react-virtual";
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
  const { setScrollPosition, getScrollPosition } = useScrollMemoryStore();

  useEffect(() => {
    if (!enabled || !virtualizer) return;

    const scrollElement = virtualizer.options.getScrollElement();
    if (!scrollElement) return;

    const handleScroll = () => {
      // 스크롤 위치 찾기
      const scrollOffset = virtualizer.scrollOffset;
      if (scrollOffset === null || scrollOffset === undefined) return;

      // 현재 스크롤 위치에 가장 가까운 아이템 찾기
      const virtualItems = virtualizer.getVirtualItems();
      if (virtualItems.length === 0) return;
      const currentItem =
        virtualItems.find(
          (item: VirtualItem) =>
            scrollOffset >= item.start && scrollOffset < item.end,
        ) || virtualItems[0];

      // 현재 아이템의 index를 Zustand 스토어에 저장
      if (currentItem && currentItem.index > 0) {
        setScrollPosition(key, currentItem.index);
      }
    };

    scrollElement.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      scrollElement.removeEventListener("scroll", handleScroll);
    };
  }, [key, virtualizer, enabled, setScrollPosition]);

  // 스크롤 위치 복원
  useEffect(() => {
    if (!enabled || allItems.length === 0) {
      return;
    }

    const savedIndex = getScrollPosition(key);
    if (savedIndex !== null) {
      virtualizer.scrollToIndex(savedIndex, { align: "start" });
    }
  }, [key, allItems.length, virtualizer, enabled, getScrollPosition]);
};
