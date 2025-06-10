import { MemberItem } from "@/components/pages";
import { ApiAnimalType } from "@/types/animal";
import { useParams } from "react-router-dom";

export default function FollowingPage() {
  const { userId } = useParams();
  return (
    <div className="flex flex-col gap-2 mt-2 mx-2">
      {/* TODO: 팔로잉 조회 추가 */}
      <MemberItem
        userInfo={{
          userId: Number(userId),
          nickname: "test",
          animalType: ApiAnimalType.CAT,
          profileImageUrl: "https://picsum.photos/200/300",
        }}
      />
    </div>
  );
}
