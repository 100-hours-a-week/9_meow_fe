import { ApiAnimalType } from "@/types/animal";
import ChatUserItem from "./ChatUserItem";
import { cn } from "@/utils/lib/utils";
import { convertChatAnimalTypeToShortDisplay } from "@/utils/convertAnimal";
import { convertTimestamp } from "@/utils/convertTimestamp";

interface IChatMessage {
  userId: number;
  profileImageUrl?: string;
  nickname: string;
  isMyMessage: boolean;
  message: string;
  animalType: ApiAnimalType;
  createdAt: string;
}

export default function ChatMessage({
  userId,
  profileImageUrl,
  nickname,
  isMyMessage = false,
  message,
  animalType,
  createdAt,
}: IChatMessage) {
  return (
    <div
      className={cn(
        "w-full flex flex-col gap-0",
        isMyMessage ? "items-end" : "items-start",
      )}
    >
      <ChatUserItem
        userId={userId}
        profileImageUrl={profileImageUrl}
        nickname={nickname}
        align={isMyMessage ? "right" : "left"}
      />
      <div
        className={cn(
          "flex items-end gap-2",
          isMyMessage ? "flex-row-reverse pr-5" : "flex-row pl-5",
        )}
      >
        <div
          className={cn(
            "rounded-sm p-1 max-w-[180px]",
            isMyMessage
              ? "bg-foreground text-background"
              : "bg-background text-foreground",
          )}
        >
          <p className="text-sm">{message}</p>
        </div>
        <div
          className={cn(
            "flex flex-row gap-1",
            isMyMessage ? "items-end" : "items-start",
          )}
        >
          {isMyMessage ? (
            <div className="flex flex-row gap-1">
              <p className="text-xs text-muted-foreground">
                {convertTimestamp(new Date(createdAt))}
              </p>
              <p className="text-sm">
                {convertChatAnimalTypeToShortDisplay(animalType)}
              </p>
            </div>
          ) : (
            <div className="flex flex-row gap-1">
              <p className="text-sm">
                {convertChatAnimalTypeToShortDisplay(animalType)}
              </p>
              <p className="text-xs text-muted-foreground">
                {convertTimestamp(new Date(createdAt))}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
