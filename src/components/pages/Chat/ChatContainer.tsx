import { ApiAnimalType } from "@/types/animal";
import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";
import { useWebSocket } from "@/hooks/common/useWebSocket";
import useTokenStore from "@/store/useTokenStore";
import { IReceivedChatMessage } from "@/api/types/chat";
import { useState, useCallback, useEffect, useRef } from "react";
import { chatQueries } from "@/api/queries/chatQueries";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { userQueries } from "@/api/queries/userQueries";
import { useObserver } from "@/hooks/common/useObserver";

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
  const {
    data: chatMessages,
    hasNextPage,
    isPending,
    isFetchingNextPage,
    fetchNextPage,
  } = useInfiniteQuery({
    ...chatQueries.list(chatroomId ?? 0),
    enabled: !!chatroomId,
  });

  const lastElementRef = useRef<HTMLDivElement | null>(null);
  useObserver({
    target: lastElementRef as React.RefObject<HTMLElement>,
    onIntersect: ([entry]) => {
      if (
        entry.isIntersecting &&
        hasNextPage &&
        !isPending &&
        !isFetchingNextPage
      ) {
        fetchNextPage();
      }
    },
    threshold: 1.0,
  });

  // 메시지 수신 콜백을 useCallback으로 메모이제이션
  const handleMessageReceived = useCallback((message: IReceivedChatMessage) => {
    setMessages((prevMessages) => [message, ...prevMessages]);
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
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const isInitialLoadRef = useRef<boolean>(true);
  const isFetchingPreviousRef = useRef<boolean>(false);

  useEffect(() => {
    if (chatMessages) {
      const newMessages = chatMessages.pages.flatMap((page) => page.content);

      // 초기 로드인 경우
      if (isInitialLoadRef.current) {
        setMessages(newMessages);
        setTimeout(() => {
          if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollTop =
              scrollContainerRef.current.scrollHeight;
          }
        }, 0);
        isInitialLoadRef.current = false;
        return;
      }

      // 이전 페이지를 불러오는 중인지 확인
      if (isFetchingNextPage) {
        isFetchingPreviousRef.current = true;
        const currentScrollTop = scrollContainerRef.current?.scrollTop ?? 0;
        const currentScrollHeight =
          scrollContainerRef.current?.scrollHeight ?? 0;

        setMessages(newMessages);

        setTimeout(() => {
          if (scrollContainerRef.current) {
            const newScrollHeight = scrollContainerRef.current.scrollHeight;
            const heightDifference = newScrollHeight - currentScrollHeight;
            scrollContainerRef.current.scrollTop =
              currentScrollTop + heightDifference;
          }
        }, 0);
      } else {
        // 새로운 메시지가 추가된 경우 또는 이전 페이지 로딩이 완료된 경우
        if (isFetchingPreviousRef.current) {
          // 이전 페이지 로딩이 완료된 경우 스크롤 위치 유지
          isFetchingPreviousRef.current = false;
          const currentScrollTop = scrollContainerRef.current?.scrollTop ?? 0;
          const currentScrollHeight =
            scrollContainerRef.current?.scrollHeight ?? 0;

          setMessages(newMessages);

          setTimeout(() => {
            if (scrollContainerRef.current) {
              const newScrollHeight = scrollContainerRef.current.scrollHeight;
              const heightDifference = newScrollHeight - currentScrollHeight;
              scrollContainerRef.current.scrollTop =
                currentScrollTop + heightDifference;
            }
          }, 0);
        } else {
          // 새로운 메시지가 추가된 경우 스크롤을 맨 아래로
          setMessages(newMessages);
          if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollTop =
              scrollContainerRef.current.scrollHeight;
          }
        }
      }
    }
  }, [chatMessages, isFetchingNextPage]);

  // 메시지가 로드된 후 스크롤을 맨 아래로 설정
  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop =
        scrollContainerRef.current.scrollHeight;
    }
  }, []);

  return (
    <div className="w-full h-full bg-foreground/10 rounded-xl gap-3 p-3 flex flex-col pb-26">
      <div ref={scrollContainerRef} className="flex-1 overflow-y-auto pb-2">
        <div className="w-full h-full flex flex-col-reverse items-center justify-end">
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
          <div ref={lastElementRef} />
        </div>
        <div ref={messagesEndRef} />
      </div>
      <ChatInput
        onSend={handleSendMessage}
        selectedAnimal={selectedAnimal}
        setSelectedAnimal={setSelectedAnimal}
      />
    </div>
  );
}
