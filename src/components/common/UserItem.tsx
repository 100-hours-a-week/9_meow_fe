import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { ApiAnimalType } from "@/types/animal";
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
      <div
        className={cn(
          "flex flex-col items-center relative",
          size === "default" && "overflow-visible pb-3 pl-0.5",
        )}
      >
        <Avatar
          className={cn(
            "border flex-shrink-0 border-foreground",
            !profileImageUrl && (dark ? "bg-background" : "bg-foreground"),
            size === "sm" && "size-5 border-muted-foreground",
          )}
        >
          <AvatarImage src={profileImageUrl ?? "/logo.svg"} />
          <AvatarFallback>미야옹</AvatarFallback>
        </Avatar>
        {size === "default" && (
          <div
            className={cn(
              "text-xs text-foreground px-1 rounded-sm absolute bottom-0 flex flex-row items-center gap-1 border border-foreground",
              animalType === ApiAnimalType.CAT
                ? "bg-rose-300"
                : "bg-orange-300",
            )}
          >
            {animalType.toLocaleUpperCase()}
          </div>
        )}
      </div>
      <div className="flex flex-col items-start text-sm min-w-0 flex-1">
        <p
          className={cn(
            "text-foreground text-base text-ellipsis overflow-hidden whitespace-nowrap",
            size === "sm" && "text-sm",
            dark ? "text-background" : "text-foreground",
          )}
        >
          {nickname}
        </p>
        {size === "sm" && (
          <div
            className={cn(
              "text-[8px] text-foreground px-1 rounded-sm flex flex-row items-center gap-1 border border-foreground",
              animalType === ApiAnimalType.CAT
                ? "bg-rose-300"
                : "bg-orange-300",
            )}
          >
            {animalType.toLocaleUpperCase()}
          </div>
        )}
      </div>
    </div>
  );
}
