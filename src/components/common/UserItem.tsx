import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { ApiAnimalType } from "@/types/animal";
import { convertAnimalTypeToDisplay } from "@/utils/convertAnimal";
import { useNavigate } from "react-router-dom";

export interface IUserItem {
  userId: number;
  profileImageUrl?: string;
  nickname: string;
  animalType: ApiAnimalType;
  size?: "default" | "sm";
  dark?: boolean;
  disabled?: boolean;
}

export default function UserItem({
  userId,
  profileImageUrl,
  nickname,
  animalType,
  size = "default",
  dark = false,
  disabled = false,
}: IUserItem) {
  const navigate = useNavigate();

  function handleClick(e: React.MouseEvent<HTMLDivElement>) {
    e.stopPropagation();
    navigate(`/member/${userId}`);
  }

  return (
    <div
      className={cn(
        "flex flex-row items-center gap-2 overflow-hidden",
        size === "sm" && "gap-1",
      )}
      onClick={disabled ? undefined : handleClick}
    >
      <Avatar
        className={cn(
          "border border-muted-foreground flex-shrink-0",
          !profileImageUrl && (dark ? "bg-background" : "bg-foreground"),
          size === "sm" && "size-5",
        )}
      >
        <AvatarImage src={profileImageUrl ?? "/logo.svg"} />
        <AvatarFallback>미야옹</AvatarFallback>
      </Avatar>
      <div className="flex flex-col text-sm min-w-0 flex-1">
        <p
          className={cn(
            "text-orange-950 text-sm text-ellipsis overflow-hidden whitespace-nowrap",
            size === "sm" && "text-xs",
            dark ? "text-background" : "text-foreground",
          )}
        >
          {nickname}
        </p>
        <p
          className={cn(
            "text-orange-950/30 text-xs text-ellipsis overflow-hidden whitespace-nowrap",
            size === "sm" && "text-[10px]",
            dark ? "text-background" : "text-muted-foreground",
          )}
        >
          {convertAnimalTypeToDisplay(animalType)}
        </p>
      </div>
    </div>
  );
}
