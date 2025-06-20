import { useEffect, useState, useRef } from "react";
import defaultInstance from "@/api/instance/defaultInstance";
import { ApiAnimalType } from "@/types/animal";

export interface IEventTop3DataItem {
  imageUrl: string;
  animalType: ApiAnimalType;
  nickname: string;
  ranking: number;
  likeCount: number;
  postId: number;
  profileImageUrl?: string;
  userId: number;
}

export const useEventTop3SSE = () => {
  const [top3Data, setTop3Data] = useState<IEventTop3DataItem[] | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const eventSourceRef = useRef<EventSource | null>(null);

  useEffect(() => {
    const connectSSE = () => {
      try {
        const eventSource = new EventSource(
          `${defaultInstance.defaults.baseURL}/event-posts/sse/top3`,
        );

        // top3-update 이벤트 리스너 추가
        eventSource.addEventListener("top3-update", (event) => {
          try {
            const data: IEventTop3DataItem[] = JSON.parse(event.data);

            setTop3Data(data);
            setIsConnected(true);
            setError(null);
          } catch (error) {
            console.error("SSE 데이터 파싱 오류:", error);
          }
        });

        eventSourceRef.current = eventSource;

        // 연결 상태 모니터링
        eventSource.addEventListener("open", () => {
          setIsConnected(true);
          setError(null);
        });

        eventSource.addEventListener("error", (event) => {
          setIsConnected(false);
          setError("실시간 순위 불러오기에 실패했다옹");
          console.error("SSE Error:", event);
        });
      } catch (err) {
        console.error("SSE 초기화 오류:", err);
        setError("SSE 연결을 초기화할 수 없습니다.");
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
  }, []);

  const reconnect = () => {
    if (eventSourceRef.current) {
      eventSourceRef.current.close();
    }
    setError(null);
    setIsConnected(false);

    // 잠시 후 재연결 시도
    setTimeout(() => {
      const eventSource = new EventSource(
        `${defaultInstance.defaults.baseURL}/event-posts/sse/top3`,
      );

      eventSource.addEventListener("top3-update", (event) => {
        try {
          const data: IEventTop3DataItem[] = JSON.parse(event.data);

          setTop3Data(data);
          setIsConnected(true);
          setError(null);
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
    top3Data,
    isConnected,
    error,
    reconnect,
    disconnect,
  };
};
