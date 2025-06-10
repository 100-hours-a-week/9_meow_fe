import { MemberItem } from "@/components/pages";
import { ApiAnimalType } from "@/types/animal";
import { useParams } from "react-router-dom";

export default function FollowerPage() {
  const { memberId } = useParams();
  return (
    <div className="flex flex-col gap-2 mt-2 mx-2">
      {/* TODO: 팔로워 조회 추가 */}
      <MemberItem
        userInfo={{
          userId: Number(memberId),
          nickname: "test",
          animalType: ApiAnimalType.CAT,
          profileImageUrl: "https://picsum.photos/200/300",
        }}
      />
    </div>
  );
}
