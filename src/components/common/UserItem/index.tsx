import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface IUserItem {
  userId: number;
  profileImage?: string;
  nickname: string;
  animalType: "고양이" | "강아지";
}

export default function UserItem({
  userId,
  profileImage,
  nickname,
  animalType,
}: IUserItem) {
  function handleClick() {
    console.log(userId);
  }
  return (
    <div
      className="flex flex-row items-center gap-2"
      onClick={handleClick}
    >
      <Avatar>
        <AvatarImage src={profileImage ?? "/logo.svg"} />
        <AvatarFallback>미야옹</AvatarFallback>
      </Avatar>
      <div className="flex flex-col text-base">
        <p className="text-orange-950">{nickname}</p>
        <p className="text-orange-950/30">{animalType}</p>
      </div>
    </div>
  );
}
