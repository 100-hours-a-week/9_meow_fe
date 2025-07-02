import { useRef } from "react";
import { PostCard } from "@/components/common";
import { IPostContent } from "@/components/common/PostCard/PostContent";
import { IUserItem } from "@/components/common/UserItem";
import { IPostFooter } from "@/components/common/PostCard/PostFooter";
import { useInfiniteQuery } from "@tanstack/react-query";
import { postQueries } from "@/api/queries/postQueries";
import { useVirtualizer } from "@tanstack/react-virtual";
import { useObserver } from "@/hooks/common/useObserver";

export default function MainPage() {
  const parentRef = useRef(null);

  const { data, fetchNextPage, hasNextPage, isLoading, error } =
    useInfiniteQuery({
      ...postQueries.list(),
    });

  const lastElementRef = useRef<HTMLDivElement | null>(null);
  useObserver({
    target: lastElementRef as React.RefObject<HTMLElement>,
    onIntersect: ([entry]) => {
      if (entry.isIntersecting && hasNextPage && !isLoading) {
        fetchNextPage();
      }
    },
  });

  const allPosts = data ? data.pages.flatMap((page) => page.content) : [];

  const rowVirtualizer = useVirtualizer({
    count: allPosts.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 310, // PostCard 높이(300) + gap(10) = 310
    overscan: 5,
    getItemKey: (index) => {
      const post = allPosts[index];
      return post ? `post-${post.id}` : `loading-${index}`;
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
    <div className="pt-2 px-2 h-screen overflow-auto" ref={parentRef}>
      <div
        className="w-full relative"
        style={{ height: `${rowVirtualizer.getTotalSize()}px` }}
      >
        {rowVirtualizer.getVirtualItems().map((virtualRow) => {
          const post = allPosts[virtualRow.index];

          if (!post) {
            return (
              <div
                key={`loading-${virtualRow.index}`}
                className="absolute top-0 left-0 w-full"
                style={{
                  height: `${virtualRow.size}px`,
                  transform: `translateY(${virtualRow.start}px)`,
                }}
              >
                <div className="flex items-center justify-center h-full">
                  <div>Loading...</div>
                </div>
              </div>
            );
          }

          const userInfo: IUserItem = {
            userId: post.userId,
            nickname: post.nickname,
            animalType: post.postType,
            profileImageUrl: post.profileImageUrl ?? undefined,
          };
          const postContent: IPostContent = {
            thumbnailUrl: post.thumbnailUrl,
            content: post.transformedContent,
          };
          const postInfo: IPostFooter = {
            postId: post.id,
            didLike: post.liked,
            likeCount: post.likeCount,
            commentCount: post.commentCount,
            timestamp: new Date(post.createdAt),
            emotion: post.emotion,
          };

          return (
            <div
              key={`post-${post.id}`}
              data-index={virtualRow.index}
              ref={rowVirtualizer.measureElement}
              className="absolute top-0 left-0 w-full"
              style={{ transform: `translateY(${virtualRow.start}px)` }}
            >
              <div className="pb-2.5">
                <PostCard postId={post.id}>
                  <PostCard.Header
                    userInfo={userInfo}
                    isMyPost={post.myPost}
                    postId={post.id}
                  />
                  <PostCard.Content {...postContent} />
                  <PostCard.Footer {...postInfo} />
                </PostCard>
              </div>
            </div>
          );
        })}
      </div>
      <div ref={lastElementRef} />
    </div>
  );
}
