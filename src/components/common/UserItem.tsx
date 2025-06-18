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
}

export default function UserItem({
  userId,
  profileImageUrl,
  nickname,
  animalType,
}: IUserItem) {
  const navigate = useNavigate();

  function handleClick(e: React.MouseEvent<HTMLDivElement>) {
    e.stopPropagation();
    navigate(`/member/${userId}`);
  }

  return (
    <div className="flex flex-row items-center gap-2" onClick={handleClick}>
      <Avatar
        className={cn(
          "border border-muted-foreground",
          profileImageUrl ?? "bg-foreground",
        )}
      >
        <AvatarImage src={profileImageUrl ?? "/logo.svg"} />
        <AvatarFallback>미야옹</AvatarFallback>
      </Avatar>
      <div className="flex flex-col text-sm">
        <p className="text-foreground">{nickname}</p>
        <p className="text-muted-foreground">
          {convertAnimalTypeToDisplay(animalType)}
        </p>
      </div>
    </div>
  );
}
