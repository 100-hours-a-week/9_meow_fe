import { Button } from "@/components/ui/button";
import MemberInfoSummary from "./ProfileSummary/MemberInfoSummary";
import { ApiAnimalType } from "@/types/animal";
import ProfileInfo from "./ProfileSummary/ProfileInfo";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { userQueries } from "@/api/queries/userQueries";

interface IProfileSummary {
  userId: number;
}

export default function ProfileSummary({ userId }: IProfileSummary) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: profileInfo } = useQuery({
    ...userQueries.profileInfo({ userId }),
  });
  const { mutate: follow } = useMutation({
    ...userQueries.follow({ userId, queryClient }),
  });
  const { mutate: unfollow } = useMutation({
    ...userQueries.unfollow({ userId, queryClient }),
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
          <Button
            variant={profileInfo?.following ? "primarySolid" : "primaryOutline"}
            className="w-36 text-lg"
            onClick={() => {
              if (profileInfo?.following) {
                unfollow();
              } else {
                follow();
              }
            }}
          >
            {profileInfo?.following ? "팔로잉" : "팔로우"}
          </Button>
        )}
        <Button variant="primarySolid" className="w-36 text-lg">
          프로필 공유
        </Button>
      </div>
      <ProfileInfo
        userId={userId}
        postCount={profileInfo?.postCount ?? 0}
        followerCount={profileInfo?.followerCount ?? 0}
        followingCount={profileInfo?.followingCount ?? 0}
      />
      {/* TODO: 이벤트 추가되면 주석 풀기 */}
      {/* <ProfileTab /> */}
    </div>
  );
}
