import { Button } from "@/components/ui/button";
import MemberInfoSummary from "./ProfileSummary/MemberInfoSummary";
import { ApiAnimalType } from "@/types/animal";
import ProfileInfo from "./ProfileSummary/ProfileInfo";

export default function MyProfileSummary() {
  // TODO: 내 정보 조회 (지금은 dummy data)
  const memberInfo = {
    profileImageUrl: "/logo.svg",
    nickname: "미야옹",
    animalType: ApiAnimalType.CAT,
  };
  return (
    <div className="w-full flex flex-col gap-4 items-center">
      <MemberInfoSummary {...memberInfo} />
      <div className="flex flex-row gap-5">
        <Button variant="primarySolid" className="w-36 text-lg">
          프로필 편집
        </Button>
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
