import { PostCard } from "@/components/common";
import { IPostContent } from "@/components/common/PostCard/PostContent";
import { IUserItem } from "@/components/common/UserItem";
import { IPostSummaryData } from "@/types/PostSummaryData";
import { IPostFooter } from "@/components/common/PostCard/PostFooter";
import { usePostListInfiniteQuery } from "@/hooks/queries/usePostListInfiniteQuery";
import { useRef } from "react";
import { useObserver } from "@/hooks/common/useObserver";

export default function MainPage() {
  const { data, fetchNextPage, hasNextPage, isLoading, error } =
    usePostListInfiniteQuery();

  const lastElementRef = useRef<HTMLDivElement | null>(null);
  useObserver({
    target: lastElementRef as React.RefObject<HTMLElement>,
    onIntersect: ([entry]) => {
      if (entry.isIntersecting && hasNextPage) {
        fetchNextPage();
      }
    },
  });

  // TODO: 로딩 스켈레톤 추가
  if (isLoading) {
    return <div>Loading...</div>;
  }

  // TODO: 데이터 없음 처리
  if (!data) {
    return <div>No data available</div>;
  }

  // TODO: 에러 처리
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="pt-2 pb-16 flex flex-col gap-2.5 px-2">
      {data.pages.map((page) =>
        page.content.map((post: IPostSummaryData) => {
          const userInfo: IUserItem = {
            userId: post.userId,
            nickname: post.nickname,
            animalType: post.postType,
            profileImageUrl: post.profileImageUrl,
          };
          const postContent: IPostContent = {
            postId: post.id,
            thumbnailUrl: post.thumbnailUrl,
            content: post.transformedContent,
            animalType: post.postType,
            timestamp: new Date(post.createdAt),
            emotion: post.emotion,
          };
          const postInfo: IPostFooter = {
            postId: post.id,
            didLike: post.liked,
            likeCount: post.likeCount,
            commentCount: post.commentCount,
          };
          return (
            <PostCard key={`post-${post.id}`}>
              <PostCard.Header userInfo={userInfo} />
              <PostCard.Content {...postContent} />
              <PostCard.Footer {...postInfo} />
            </PostCard>
          );
        }),
      )}
      <div ref={lastElementRef} />
    </div>
  );
}
