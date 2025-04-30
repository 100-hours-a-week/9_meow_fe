import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ApiAnimalType, convertAnimalTypeToDisplay } from "@/types/animal";
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
  function handleClick() {
    console.log(userId);
  }
  return (
    <div className="flex flex-row items-center gap-2" onClick={handleClick}>
      <Avatar>
        <AvatarImage
          src={profileImageUrl === "" ? "/logo.svg" : profileImageUrl}
        />
        <AvatarFallback>미야옹</AvatarFallback>
      </Avatar>
      <div className="flex flex-col text-base">
        <p className="text-orange-950">{nickname}</p>
        <p className="text-orange-950/30">
          {convertAnimalTypeToDisplay(animalType)}
        </p>
      </div>
    </div>
  );
}
