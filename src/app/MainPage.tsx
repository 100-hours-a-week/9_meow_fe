import { useRef, useEffect } from "react";
import { PostCard } from "@/components/common";
import { IPostContent } from "@/components/common/PostCard/PostContent";
import { IUserItem } from "@/components/common/UserItem";
import { IPostFooter } from "@/components/common/PostCard/PostFooter";
import { useInfiniteQuery } from "@tanstack/react-query";
import { postQueries } from "@/api/queries/postQueries";
import { useVirtualizer } from "@tanstack/react-virtual";
import { useObserver } from "@/hooks/common/useObserver";

interface IMainPage {
  scrollContainerRef: React.RefObject<HTMLDivElement | null>;
}

export default function MainPage({ scrollContainerRef }: IMainPage) {
  const { data, fetchNextPage, hasNextPage, isPending, error } =
    useInfiniteQuery({
      ...postQueries.list(),
    });

  const lastElementRef = useRef<HTMLDivElement | null>(null);
  useObserver({
    target: lastElementRef as React.RefObject<HTMLElement>,
    onIntersect: ([entry]) => {
      if (entry.isIntersecting && hasNextPage && !isPending) {
        fetchNextPage();
      }
    },
  });

  const allPosts = data ? data.pages.flatMap((page) => page.content) : [];

  const rowVirtualizer = useVirtualizer({
    count: allPosts.length,
    getScrollElement: () => scrollContainerRef.current,
    estimateSize: () => 310, // PostCard 높이(300) + gap(10) = 310
    overscan: 5,
    getItemKey: (index) => {
      const post = allPosts[index];
      return post ? `post-${post.id}` : `loading-${index}`;
    },
    onChange: (instance) => {
      // 현재 스크롤 위치
      const scrollOffset = instance.scrollOffset;
      if (scrollOffset === null || scrollOffset === undefined) return;

      // 현재 스크롤 위치에 가장 가까운 아이템 찾기
      const virtualItems = instance.getVirtualItems();
      if (virtualItems.length === 0) return;
      const currentItem =
        virtualItems.find(
          (item) => scrollOffset >= item.start && scrollOffset <= item.end,
        ) || virtualItems[0];

      // 현재 아이템의 index를 session storage에 저장
      if (currentItem && currentItem.index > 0) {
        sessionStorage.setItem("scrollIndex", currentItem.index.toString());
      }
    },
  });

  // 스크롤 위치 복원
  useEffect(() => {
    if (!data || allPosts.length === 0) {
      return;
    }

    const savedIndex = sessionStorage.getItem("scrollIndex");
    if (savedIndex) {
      rowVirtualizer.scrollToIndex(Number(savedIndex), { align: "start" });
    }
  }, [data, allPosts.length, rowVirtualizer]);

  useEffect(() => {
    // 새로고침 시 세션 스토리지에 기록된 페이지 스크롤 위치 삭제
    window.addEventListener("pagehide", () => {
      sessionStorage.removeItem("scrollIndex");
    });
    return () =>
      window.removeEventListener("pagehide", () => {
        sessionStorage.removeItem("scrollIndex");
      });
  }, []);

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
