import { chatQueries } from "@/api/queries/chatQueries";
import { ChatContainer } from "@/components/pages";
import { useQuery } from "@tanstack/react-query";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useTokenStore from "@/store/useTokenStore";
import { ALERT_MESSAGES } from "@/api/utils/errorHandler";

export default function ChatPage() {
  const navigate = useNavigate();
  const token = useTokenStore((state) => state.token);
  const [participantCount, setParticipantCount] = useState<number>(0);

  const { data: chatRoom } = useQuery({
    ...chatQueries.chatRoom(),
    enabled: !!token,
  });

  useEffect(() => {
    if (!token) {
      alert(ALERT_MESSAGES.LOGIN_REQUIRED);
      navigate(`/login?redirect=${encodeURIComponent(location.pathname)}`);
      return;
    }
  }, [token, navigate]);

  const handleParticipantCountUpdate = useCallback((count: number) => {
    setParticipantCount(count);
  }, []);

  return (
    <div className="flex flex-col items-center p-2 text-5xl font-bold gap-5 w-full h-full overflow-y-hidden">
      <div className="flex flex-row justify-between items-end w-full">
        <h1 className="text-4xl">♧ {chatRoom?.title}</h1>
        <p className="text-base">현재 {participantCount}마리 참여 중!</p>
      </div>
      <div className="flex-1 w-full overflow-y-hidden">
        <ChatContainer
          chatroomId={chatRoom?.id}
          handleParticipantCountUpdate={handleParticipantCountUpdate}
        />
      </div>
    </div>
  );
}
