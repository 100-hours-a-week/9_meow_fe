import { useEffect, useRef, useState } from "react";
import { Client, IMessage } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import { IReceivedChatMessage } from "@/api/types/chat";

interface UseWebSocketProps {
  chatroomId?: number;
  token: string;
  onMessageReceived: (message: IReceivedChatMessage) => void;
}

export const useWebSocket = ({
  chatroomId,
  token,
  onMessageReceived,
}: UseWebSocketProps) => {
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const clientRef = useRef<Client | null>(null);

  useEffect(() => {
    if (!chatroomId) return;

    // WebSocket 연결 설정
    const client = new Client({
      // SockJS를 사용한 WebSocket 연결
      webSocketFactory: () => {
        return new SockJS(`${import.meta.env.VITE_API_URL}/ws/chat`);
      },

      // 연결 헤더에 JWT 토큰 포함
      connectHeaders: {
        Authorization: `Bearer ${token}`,
      },

      // 디버그 설정
      debug: (str) => {
        console.log("STOMP Debug: ", str);
      },

      // 재연결 설정
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
    });

    // 연결 성공 시 콜백
    client.onConnect = (frame) => {
      console.log("WebSocket 연결 성공: ", frame);
      setIsConnected(true);
      setError(null);

      // 채팅 메시지 구독
      client.subscribe(`/sub/chatroom.${chatroomId}`, (message: IMessage) => {
        console.log("메시지 수신: ", message);

        try {
          const chatMessage: IReceivedChatMessage = JSON.parse(message.body);
          onMessageReceived(chatMessage);
        } catch (error) {
          console.error("메시지 파싱 오류:", error);
        }
      });

      // TODO: 참여자 수 업데이트 구독
      //   if (onParticipantCountUpdate) {
      //     client.subscribe(
      //       `/sub/chatroom.${chatroomId}.count`,
      //       (message: IMessage) => {
      //         try {
      //           const count = parseInt(message.body);
      //           onParticipantCountUpdate(count);
      //         } catch (error) {
      //           console.error("참여자 수 파싱 오류:", error);
      //         }
      //       },
      //     );
      //   }
    };

    // 연결 실패 시 콜백
    client.onStompError = (frame) => {
      console.error("WebSocket STOMP 오류: ", frame);
      setIsConnected(false);
      setError("WebSocket 연결 오류가 발생했습니다.");
    };

    // 연결 끊김 시 콜백
    client.onWebSocketClose = (event) => {
      console.log("WebSocket 연결 종료: ", event);
      setIsConnected(false);
    };

    // 연결 활성화
    client.activate();
    clientRef.current = client;

    // 컴포넌트 언마운트 시 연결 해제
    return () => {
      if (clientRef.current) {
        clientRef.current.deactivate();
        clientRef.current = null;
      }
    };
  }, [chatroomId, token]);

  // 메시지 전송 함수
  const sendMessage = (message: string, animalType: string) => {
    if (clientRef.current && isConnected) {
      const messagePayload = {
        chatroomId,
        animalType,
        message,
      };

      clientRef.current.publish({
        destination: "/pub/chat.send",
        body: JSON.stringify(messagePayload),
      });
    } else {
      console.error("WebSocket이 연결되지 않았습니다.");
    }
  };

  // 연결 해제 함수
  const disconnect = () => {
    if (clientRef.current) {
      clientRef.current.deactivate();
      setIsConnected(false);
    }
  };

  // 재연결 함수
  const reconnect = () => {
    if (clientRef.current) {
      clientRef.current.activate();
    }
  };

  return {
    isConnected,
    error,
    sendMessage,
    disconnect,
    reconnect,
  };
};
