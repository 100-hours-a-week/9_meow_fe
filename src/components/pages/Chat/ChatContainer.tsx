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
    setMessages((prevMessages) => [...prevMessages, message]);
  }, []);

  // WebSocket 연결
  const { isConnected, sendMessage } = useWebSocket({
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

  return (
    <div className="w-full h-full bg-foreground/10 rounded-xl gap-3 p-3 overflow-y-auto">
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
