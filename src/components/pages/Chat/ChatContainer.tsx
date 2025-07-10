import { ApiAnimalType } from "@/types/animal";
import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";
import { useWebSocket } from "@/hooks/common/useWebSocket";
import useTokenStore from "@/store/useTokenStore";
import { IChatMessage } from "@/api/types/chat";
import { useState, useCallback } from "react";

interface IChatContainer {
  chatroomId: number;
}

export default function ChatContainer({ chatroomId }: IChatContainer) {
  const [messages, setMessages] = useState<IChatMessage[]>([]);
  const [selectedAnimal, setSelectedAnimal] = useState<ApiAnimalType>(
    ApiAnimalType.CAT,
  );

  const { token } = useTokenStore();

  // 메시지 수신 콜백을 useCallback으로 메모이제이션
  const handleMessageReceived = useCallback((message: IChatMessage) => {
    console.log("수신 메시지 : ", message);
    setMessages((prevMessages) => [...prevMessages, message]);
  }, []);

  // WebSocket 연결
  const { isConnected, error, reconnect, sendMessage } = useWebSocket({
    chatroomId,
    token: token ?? "",
    onMessageReceived: handleMessageReceived,
  });

  // 메시지 전송 함수
  const handleSendMessage = (message: string) => {
    if (message.trim() && isConnected) {
      sendMessage(message, selectedAnimal);
    }
  };

  // 연결 상태 표시
  const renderConnectionStatus = () => {
    if (error) {
      return (
        <div className="p-3 bg-red-100 border border-red-300 rounded-lg mb-3">
          <div className="flex justify-between items-center">
            <span className="text-red-700 text-sm">{error}</span>
            <button
              onClick={reconnect}
              className="px-3 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600"
            >
              재연결
            </button>
          </div>
        </div>
      );
    }

    return (
      <div className="flex items-center justify-between p-3 bg-gray-100 rounded-lg mb-3">
        <div className="flex items-center space-x-2">
          <div
            className={`w-2 h-2 rounded-full ${
              isConnected ? "bg-green-500" : "bg-red-500"
            }`}
          />
          <span className="text-sm text-gray-600">
            {isConnected ? "연결됨" : "연결 중..."}
          </span>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full h-full bg-foreground/10 rounded-xl gap-3 p-3 overflow-y-auto">
      {renderConnectionStatus()}

      <div className="w-full h-full flex flex-col-reverse items-center justify-start pb-25">
        {/* TODO: 메시지 불러오는 로직 추가 */}
        {messages.map((message, index) => (
          <ChatMessage
            key={`${message.senderId}-${index}`}
            userId={message.senderId}
            profileImageUrl="/logo.svg"
            nickname="미야옹"
            align={message.senderId === 5 ? "right" : "left"}
            message={message.message}
            animalType={ApiAnimalType.CAT}
            createdAt={message.timestamp}
          />
        ))}
      </div>
      <ChatInput
        onSend={handleSendMessage}
        selectedAnimal={selectedAnimal}
        setSelectedAnimal={setSelectedAnimal}
      />
    </div>
  );
}
