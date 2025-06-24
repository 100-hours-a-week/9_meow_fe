import { useEffect, useState, useRef, useCallback } from "react";
import defaultInstance from "@/api/instance/defaultInstance";

export interface IEventVoteCountDataItem {
  postId: number;
  likeCount: number;
}

export const useEventVoteCountSSE = (eventPeriod?: {
  status: string | null;
}) => {
  const [voteCountData, setVoteCountData] = useState<
    IEventVoteCountDataItem[] | null
  >(null);
  const [isConnected, setIsConnected] = useState(false);
  const eventSourceRef = useRef<EventSource | null>(null);

  // 특정 포스트의 좋아요 수를 업데이트하는 함수
  const updatePostLikeCount = useCallback(
    (postId: number, newLikeCount: number) => {
      setVoteCountData((prevData) => {
        if (!prevData) return [{ postId, likeCount: newLikeCount }];

        const existingIndex = prevData.findIndex(
          (item) => item.postId === postId,
        );
        if (existingIndex >= 0) {
          // 기존 데이터 업데이트
          const newData = [...prevData];
          newData[existingIndex] = { postId, likeCount: newLikeCount };
          return newData;
        } else {
          // 새로운 데이터 추가
          return [...prevData, { postId, likeCount: newLikeCount }];
        }
      });
    },
    [],
  );

  useEffect(() => {
    // 투표 중이 아닐 때는 연결하지 않음
    if (eventPeriod?.status !== "투표중") {
      if (eventSourceRef.current) {
        setIsConnected(false);
        eventSourceRef.current.close();
        eventSourceRef.current = null;
      }
      return;
    }

    const connectSSE = () => {
      try {
        const eventSource = new EventSource(
          `${defaultInstance.defaults.baseURL}/event-posts/sse/summary`,
        );

        // like-update 이벤트 리스너 추가
        eventSource.addEventListener("like-update", (event) => {
          try {
            const data: IEventVoteCountDataItem[] = JSON.parse(event.data);
            console.log("좋아요 업데이트 데이터:", data);

            setVoteCountData(data);
            setIsConnected(true);
          } catch (error) {
            console.error("SSE 데이터 파싱 오류:", error);
          }
        });

        eventSourceRef.current = eventSource;

        // 연결 상태 모니터링
        eventSource.addEventListener("open", () => {
          setIsConnected(true);
        });

        eventSource.addEventListener("error", (event) => {
          setIsConnected(false);
          console.error("SSE Error:", event);
        });
      } catch (err) {
        console.error("SSE 초기화 오류:", err);
      }
    };

    connectSSE();

    // 컴포넌트 언마운트 시 연결 해제
    return () => {
      if (eventSourceRef.current) {
        setIsConnected(false);
        eventSourceRef.current.close();
        eventSourceRef.current = null;
      }
    };
  }, [eventPeriod?.status]); // eventPeriod.status를 의존성으로 추가

  const reconnect = () => {
    if (eventSourceRef.current) {
      eventSourceRef.current.close();
    }
    setIsConnected(false);

    // 잠시 후 재연결 시도
    setTimeout(() => {
      const eventSource = new EventSource(
        `${defaultInstance.defaults.baseURL}/event-posts/sse/summary`,
      );

      eventSource.addEventListener("like-update", (event) => {
        try {
          const data: IEventVoteCountDataItem[] = JSON.parse(event.data);

          setVoteCountData(data);
          setIsConnected(true);
        } catch (error) {
          console.error("SSE 데이터 파싱 오류:", error);
        }
      });

      eventSourceRef.current = eventSource;
    }, 1000);
  };

  const disconnect = () => {
    if (eventSourceRef.current) {
      setIsConnected(false);
      eventSourceRef.current.close();
      eventSourceRef.current = null;
    }
  };

  return {
    voteCountData,
    isConnected,
    updatePostLikeCount,
    reconnect,
    disconnect,
  };
};
