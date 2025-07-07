import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";

interface IChatUserItem {
  userId: number;
  profileImageUrl?: string;
  nickname: string;
  align?: "left" | "right";
}

export default function ChatUserItem({
  userId,
  profileImageUrl,
  nickname,
  align = "left",
}: IChatUserItem) {
  const navigate = useNavigate();

  function handleClick(e: React.MouseEvent<HTMLDivElement>) {
    e.stopPropagation();
    navigate(`/member/${userId}`);
  }

  return (
    <div
      className={cn(
        "w-full flex flex-row items-center gap-1 overflow-hidden",
        align === "right" && "flex-row-reverse text-right",
      )}
      onClick={handleClick}
    >
      <Avatar
        className={cn(
          "border border-muted-foreground flex-shrink-0 size-5",
          !profileImageUrl && "bg-foreground",
        )}
      >
        <AvatarImage src={profileImageUrl ?? "/logo.svg"} />
        <AvatarFallback>미야옹</AvatarFallback>
      </Avatar>
      <div className="flex flex-col text-sm min-w-0 flex-1">
        <p
          className={cn(
            "text-orange-950 text-xs text-ellipsis overflow-hidden whitespace-nowrap",
            "text-foreground",
          )}
        >
          {nickname}
        </p>
      </div>
    </div>
  );
}
