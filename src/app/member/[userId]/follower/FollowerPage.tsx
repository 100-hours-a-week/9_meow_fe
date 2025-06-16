import { userQueries } from "@/api/queries/userQueries";
import { MemberItem } from "@/components/pages";
import { useObserver } from "@/hooks/common/useObserver";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useRef } from "react";
import { useParams } from "react-router-dom";

export default function FollowerPage() {
  const { userId } = useParams();

  const {
    data: followerList,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    ...userQueries.followerList({ userId: Number(userId) }),
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
      {followerList?.pages.map((page) =>
        page.content.length === 0 ? (
          <p className="text-sm text-foreground/50">
            아직 아무도 팔로우하고 있지 않다냥...
          </p>
        ) : (
          page.content.map((follower) => {
            return (
              <MemberItem
                key={follower.userId}
                userInfo={{
                  userId: follower.userId,
                  nickname: follower.nickname,
                  animalType: follower.postType,
                  profileImageUrl: follower.profileImageUrl,
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
