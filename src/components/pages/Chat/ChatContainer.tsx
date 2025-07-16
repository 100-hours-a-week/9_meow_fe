import { ApiAnimalType } from "@/types/animal";
import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";
import { useWebSocket } from "@/hooks/common/useWebSocket";
import useTokenStore from "@/store/useTokenStore";
import { IReceivedChatMessage } from "@/api/types/chat";
import { useState, useCallback, useEffect } from "react";
import { chatQueries } from "@/api/queries/chatQueries";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { userQueries } from "@/api/queries/userQueries";

interface IChatContainer {
  chatroomId?: number;
}

export default function ChatContainer({ chatroomId }: IChatContainer) {
  const [messages, setMessages] = useState<IReceivedChatMessage[]>([]);
  const [selectedAnimal, setSelectedAnimal] = useState<ApiAnimalType>(
    ApiAnimalType.CAT,
  );

  const { token } = useTokenStore();

  const { data: userIdData } = useQuery({ ...userQueries.userId() });
  const { data: chatMessages } = useInfiniteQuery({
    ...chatQueries.list(chatroomId ?? 0),
    enabled: !!chatroomId,
  });

  // 메시지 수신 콜백을 useCallback으로 메모이제이션
  const handleMessageReceived = useCallback((message: IReceivedChatMessage) => {
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

  useEffect(() => {
    if (chatMessages) {
      setMessages(chatMessages.pages.flatMap((page) => page.content));
    }
  }, [chatMessages]);

  return (
    <div className="w-full h-full bg-foreground/10 rounded-xl gap-3 p-3 overflow-y-auto">
      <div className="w-full h-full flex flex-col-reverse items-center justify-start pb-25">
        {/* TODO: 메시지 불러오는 로직 추가 */}
        {messages.map((message, index) => (
          <ChatMessage
            key={`${message.senderId}-${index}`}
            userId={message.senderId}
            profileImageUrl={message.senderProfileImage}
            nickname={message.senderNickname}
            align={message.senderId === userIdData?.userId ? "right" : "left"}
            message={message.message}
            animalType={message.animalType}
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
