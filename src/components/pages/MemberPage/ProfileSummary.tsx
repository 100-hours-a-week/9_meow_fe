import MemberInfoSummary from "./ProfileSummary/MemberInfoSummary";
import { ApiAnimalType } from "@/types/animal";

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
    <div>
      <MemberInfoSummary {...memberInfo} />
    </div>
  );
}
