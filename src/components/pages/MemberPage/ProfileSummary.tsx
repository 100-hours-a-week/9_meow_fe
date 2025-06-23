import { Button } from "@/components/ui/button";
import MemberInfoSummary from "./ProfileSummary/MemberInfoSummary";
import { ApiAnimalType } from "@/types/animal";
import ProfileInfo from "./ProfileSummary/ProfileInfo";
import { useLocation, useNavigate } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { userQueries } from "@/api/queries/userQueries";
import useTokenStore from "@/store/useTokenStore";
import LogoutIcon from "@/assets/icon/logout.svg?react";

interface IProfileSummary {
  userId: number;
}

export default function ProfileSummary({ userId }: IProfileSummary) {
  const navigate = useNavigate();
  const location = useLocation();
  const queryClient = useQueryClient();
  const { clearToken } = useTokenStore();

  const { data: profileInfo } = useQuery({
    ...userQueries.profileInfo({ userId }),
  });
  const { mutate: follow } = useMutation({
    ...userQueries.follow({
      userId,
      queryClient,
      navigate,
      currentPath: location.pathname + location.search,
    }),
  });
  const { mutate: unfollow } = useMutation({
    ...userQueries.unfollow({
      userId,
      queryClient,
      navigate,
      currentPath: location.pathname + location.search,
    }),
  });

  const handleShareClick = async () => {
    const url = `${window.location.origin}/member/${userId}`;
    try {
      await navigator.clipboard.writeText(url);
      alert("링크를 클립보드에 복사했다냥.");
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      alert("링크 복사에 실패했다옹...");
    }
  };

  const handleLogout = () => {
    if (confirm("로그아웃 하시겠습니까?")) {
      clearToken();
      navigate("/login");
    }
  };

  return (
    <div className="relative w-full flex flex-col gap-4 items-center">
      <MemberInfoSummary
        profileImageUrl={profileInfo?.profileImageUrl}
        nickname={profileInfo?.nickname ?? ""}
        animalType={profileInfo?.animalType ?? ApiAnimalType.CAT}
      />
      {profileInfo?.currentUser && (
        <Button
          variant="ghost"
          size="icon"
          onClick={handleLogout}
          className="absolute top-3 right-3"
        >
          <LogoutIcon className="size-5 fill-foreground" />
        </Button>
      )}
      <div className="w-full flex flex-row gap-5 justify-center">
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
        <Button
          variant="primarySolid"
          className="w-36 text-lg"
          onClick={handleShareClick}
        >
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
