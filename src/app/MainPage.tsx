import { useRef } from "react";
import { PostCard } from "@/components/common";
import { IPostContent } from "@/components/common/PostCard/PostContent";
import { IUserItem } from "@/components/common/UserItem";
import { IPostFooter } from "@/components/common/PostCard/PostFooter";
import { useInfiniteQuery } from "@tanstack/react-query";
import { postQueries } from "@/api/queries/postQueries";
import { useVirtualizer } from "@tanstack/react-virtual";
import { useObserver } from "@/hooks/common/useObserver";
import { useScrollMemory } from "@/hooks/common/useScrollMemory";
import { IPostSummaryData } from "@/api/types/post";
import useScrollMemoryStore from "@/store/useScrollMemoryStore";

interface IMainPage {
  scrollContainerRef: React.RefObject<HTMLDivElement | null>;
}

export default function MainPage({ scrollContainerRef }: IMainPage) {
  const { setScrollPosition } = useScrollMemoryStore();

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isPending,
    isFetchingNextPage,
    error,
  } = useInfiniteQuery({
    ...postQueries.list(),
  });

  const lastElementRef = useRef<HTMLDivElement | null>(null);
  useObserver({
    target: lastElementRef as React.RefObject<HTMLElement>,
    onIntersect: ([entry]) => {
      if (
        entry.isIntersecting &&
        hasNextPage &&
        !isPending &&
        !isFetchingNextPage
      ) {
        fetchNextPage();
      }
    },
  });

  const allPosts = data ? data.pages.flatMap((page) => page.content) : [];

  const rowVirtualizer = useVirtualizer({
    count: hasNextPage ? allPosts.length + 1 : allPosts.length,
    getScrollElement: () => scrollContainerRef.current,
    estimateSize: (index) => {
      if (hasNextPage && index === allPosts.length) return 40;
      return 310; // PostCard 높이(300) + gap(10) = 310
    },
    overscan: 5,
    getItemKey: (index) => {
      const post = allPosts[index];
      return post ? `post-${post.id}` : `loading-${index}`;
    },
  });

  useScrollMemory<IPostSummaryData>({
    key: "main-page",
    virtualizer: rowVirtualizer,
    allItems: allPosts,
    enabled: !isPending && !!data,
  });

  // TODO: 로딩 스켈레톤 추가
  if (isPending) {
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
    <div className="pt-2 px-2">
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
                ref={lastElementRef}
                className="absolute top-0 left-0 w-full h-[40px]"
                style={{ transform: `translateY(${virtualRow.start}px)` }}
              >
                <div
                  data-index={virtualRow.index}
                  ref={rowVirtualizer.measureElement}
                  className="flex items-center justify-center"
                >
                  <div className="animate-spin h-4 w-4 border-foreground border-b-2 rounded-full mr-2"></div>
                  <span className="text-foreground">로딩중이다옹</span>
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
            animalType: post.postType,
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
                <PostCard
                  postId={post.id}
                  onClick={() => {
                    setScrollPosition("main-page", virtualRow.index);
                  }}
                >
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
    </div>
  );
}
