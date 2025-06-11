import { userQueries } from "@/api/queries/userQueries";
import { MemberItem } from "@/components/pages";
import { useRef } from "react";
import { useObserver } from "@/hooks/common/useObserver";
import { useParams } from "react-router-dom";
import { useInfiniteQuery } from "@tanstack/react-query";

export default function FollowingPage() {
  const { userId } = useParams();

  const {
    data: followingList,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    ...userQueries.followingList({ userId: Number(userId) }),
  });

  const lastElementRef = useRef<HTMLDivElement | null>(null);
  useObserver({
    target: lastElementRef as React.RefObject<HTMLElement>,
    onIntersect: ([entry]) => {
      if (entry.isIntersecting && hasNextPage) {
        fetchNextPage();
      }
    },
  });
  return (
    <div className="flex flex-col gap-2 mt-2 mx-2">
      {followingList?.pages.map((page) =>
        page.content.length === 0 ? (
          <p className="text-sm text-foreground/50">
            아직 아무도 팔로우하고 있지 않다냥...
          </p>
        ) : (
          page.content.map((following) => {
            return (
              <MemberItem
                key={following.userId}
                userInfo={{
                  userId: following.userId,
                  nickname: following.nickname,
                  animalType: following.postType,
                  profileImageUrl: following.profileImageUrl,
                }}
              />
            );
          })
        ),
      )}
      <div ref={lastElementRef} />
    </div>
  );
}
