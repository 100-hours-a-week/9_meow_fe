import { VirtualItem, Virtualizer } from "@tanstack/react-virtual";
import { useEffect } from "react";

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
            scrollOffset >= item.start && scrollOffset <= item.end,
        ) || virtualItems[0];

      // 현재 아이템의 index를 session storage에 저장
      if (currentItem && currentItem.index > 0) {
        sessionStorage.setItem(
          `${key}-scrollIndex`,
          currentItem.index.toString(),
        );
      }
    };

    scrollElement.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      scrollElement.removeEventListener("scroll", handleScroll);
    };
  }, [key, virtualizer, enabled]);

  // 스크롤 위치 복원
  useEffect(() => {
    if (!enabled || allItems.length === 0) {
      return;
    }

    const savedIndex = sessionStorage.getItem(`${key}-scrollIndex`);
    if (savedIndex) {
      virtualizer.scrollToIndex(Number(savedIndex), { align: "start" });
    }
  }, [key, allItems.length, virtualizer, enabled]);

  // 새로고침 시 session storage 초기화
  useEffect(() => {
    if (!enabled) return;

    const cleanup = () => {
      sessionStorage.removeItem(`${key}-scrollIndex`);
    };

    window.addEventListener("pagehide", cleanup);

    return () => {
      window.removeEventListener("pagehide", cleanup);
    };
  }, [key, enabled]);
};
