import { Button } from "@/components/ui/button";
import MemberInfoSummary from "./ProfileSummary/MemberInfoSummary";
import { ApiAnimalType } from "@/types/animal";
import ProfileInfo from "./ProfileSummary/ProfileInfo";
import ProfileTab from "./ProfileSummary/ProfileTab";

interface IProfileSummary {
  memberId: number;
}

export default function ProfileSummary({ memberId }: IProfileSummary) {
  // TODO: 멤버 정보 조회 (지금은 dummy data)
  console.log(memberId);
  const memberInfo = {
    profileImageUrl: "/logo.svg",
    nickname: "미야옹",
    animalType: ApiAnimalType.CAT,
  };
  return (
    <div className="w-full flex flex-col gap-4 items-center">
      <MemberInfoSummary {...memberInfo} />
      <div className="flex flex-row gap-5">
        <Button variant="primaryOutline" className="w-36 text-lg">
          팔로우
        </Button>
        <Button variant="primarySolid" className="w-36 text-lg">
          프로필 공유
        </Button>
      </div>
      <ProfileInfo postCount={900} followerCount={12} followingCount={130} />
      <ProfileTab />
    </div>
  );
}
