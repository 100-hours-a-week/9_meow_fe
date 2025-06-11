import { Button } from "@/components/ui/button";
import MemberInfoSummary from "./ProfileSummary/MemberInfoSummary";
import { ApiAnimalType } from "@/types/animal";
import ProfileInfo from "./ProfileSummary/ProfileInfo";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { userQueries } from "@/api/queries/userQueries";

interface IProfileSummary {
  userId: number;
}

export default function ProfileSummary({ userId }: IProfileSummary) {
  const navigate = useNavigate();

  const { data: profileInfo } = useQuery({
    ...userQueries.profileInfo({ userId }),
  });

  return (
    <div className="w-full flex flex-col gap-4 items-center">
      <MemberInfoSummary
        profileImageUrl={profileInfo?.profileImageUrl}
        nickname={profileInfo?.nickname ?? ""}
        animalType={profileInfo?.animalType ?? ApiAnimalType.CAT}
      />
      <div className="flex flex-row gap-5">
        {profileInfo?.currentUser ? (
          <Button
            variant="primarySolid"
            className="w-36 text-lg"
            onClick={() => navigate("/mypage/edit")}
          >
            프로필 편집
          </Button>
        ) : (
          <Button variant="primaryOutline" className="w-36 text-lg">
            팔로우
          </Button>
        )}
        <Button variant="primarySolid" className="w-36 text-lg">
          프로필 공유
        </Button>
      </div>
      <ProfileInfo postCount={900} followerCount={12} followingCount={130} />
      {/* TODO: 이벤트 추가되면 주석 풀기 */}
      {/* <ProfileTab /> */}
    </div>
  );
}
