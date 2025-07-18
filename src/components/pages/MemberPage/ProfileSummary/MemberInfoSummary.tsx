import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/utils/lib/utils";
import { ApiAnimalType } from "@/types/animal";
import { convertAnimalTypeToDisplay } from "@/utils/convertAnimal";

interface IMemberInfoSummary {
  profileImageUrl?: string;
  nickname: string;
  animalType: ApiAnimalType;
}

export default function MemberInfoSummary({
  profileImageUrl,
  nickname,
  animalType,
}: IMemberInfoSummary) {
  return (
    <div className="flex flex-col items-center gap-2 mt-10">
      <Avatar
        className={cn(
          "size-20 border border-muted-foreground",
          profileImageUrl ?? "bg-foreground",
        )}
      >
        <AvatarImage src={profileImageUrl ?? "/logo.svg"} />
        <AvatarFallback>미야옹</AvatarFallback>
      </Avatar>
      <div className="flex flex-col items-center gap-0">
        <div className="text-2xl font-bold">{nickname}</div>
        <div className="text-xl text-orange-950/50">
          {convertAnimalTypeToDisplay(animalType)}
        </div>
      </div>
    </div>
  );
}
