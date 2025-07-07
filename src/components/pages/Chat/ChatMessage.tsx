import { ApiAnimalType } from "@/types/animal";
import ChatUserItem from "./ChatUserItem";
import { cn } from "@/lib/utils";
import { convertChatAnimalTypeToShortDisplay } from "@/utils/convertAnimal";
import { convertTimestamp } from "@/utils/convertTimestamp";

interface IChatMessage {
  userId: number;
  profileImageUrl?: string;
  nickname: string;
  align?: "left" | "right";
  message: string;
  animalType: ApiAnimalType;
  createdAt: string;
}

export default function ChatMessage({
  userId,
  profileImageUrl,
  nickname,
  align = "left",
  message,
  animalType,
  createdAt,
}: IChatMessage) {
  return (
    <div
      className={cn(
        "w-full flex flex-col gap-0",
        align === "right" ? "items-end" : "items-start",
      )}
    >
      <ChatUserItem
        userId={userId}
        profileImageUrl={profileImageUrl}
        nickname={nickname}
        align={align}
      />
      <div
        className={cn(
          "flex items-end gap-2",
          align === "right" ? "flex-row-reverse pr-5" : "flex-row pl-5",
        )}
      >
        <div className="bg-foreground rounded-sm p-1 max-w-[180px]">
          <p className="text-sm text-background">{message}</p>
        </div>
        <div
          className={cn(
            "flex flex-col gap-0",
            align === "right" ? "items-end" : "items-start",
          )}
        >
          <p className="text-sm">
            {convertChatAnimalTypeToShortDisplay(animalType)}
          </p>
          <p className="text-xs text-muted-foreground">
            {convertTimestamp(new Date(createdAt))}
          </p>
        </div>
      </div>
    </div>
  );
}
