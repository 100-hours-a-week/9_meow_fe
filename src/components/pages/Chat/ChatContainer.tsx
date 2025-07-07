import { ApiAnimalType } from "@/types/animal";
import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";

export default function ChatContainer() {
  return (
    <div className="w-full h-full bg-foreground/10 rounded-xl gap-3 p-3 overflow-y-auto">
      <div className="w-full h-full flex flex-col-reverse items-center justify-start pb-25">
        {/* TODO: 메시지 불러오는 로직 추가 */}
        <ChatMessage
          userId={1}
          profileImageUrl="/logo.svg"
          nickname="미야옹"
          align="right"
          message="안녕하세요! 미야옹입니다!"
          animalType={ApiAnimalType.CAT}
          createdAt="2025-01-01"
        />
      </div>
      <ChatInput />
    </div>
  );
}
