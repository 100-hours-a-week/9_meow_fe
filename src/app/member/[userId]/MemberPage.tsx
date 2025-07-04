import { PostCard } from "@/components/common";
import { ProfileSummary } from "@/components/pages";
import { useParams } from "react-router-dom";
import { postQueries } from "@/api/queries/postQueries";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useObserver } from "@/hooks/common/useObserver";
import { useRef } from "react";
import { IPostFooter } from "@/components/common/PostCard/PostFooter";
import { IUserItem } from "@/components/common/UserItem";
import { IPostContent } from "@/components/common/PostCard/PostContent";
import { useVirtualizer } from "@tanstack/react-virtual";
import { useScrollMemory } from "@/hooks/common/useScrollMemory";
import { IPostSummaryData } from "@/api/types/post";
import useScrollMemoryStore from "@/store/useScrollMemoryStore";

interface IMemberPage {
  scrollContainerRef: React.RefObject<HTMLDivElement | null>;
}

export default function MemberPage({ scrollContainerRef }: IMemberPage) {
  const { userId } = useParams();
  const { setScrollPosition } = useScrollMemoryStore();

  const {
    data: postList,
    fetchNextPage,
    hasNextPage,
    isPending,
  } = useInfiniteQuery({
    ...postQueries.userPostList({ userId: Number(userId) }),
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

  const allPosts = postList
    ? postList.pages.flatMap((page) => page.content)
    : [];

  const rowVirtualizer = useVirtualizer({
    count: allPosts.length + 1, // ProfileSummary + posts
    getScrollElement: () => scrollContainerRef.current,
    estimateSize: (index) => {
      if (index === 0) return 322; // ProfileSummary 높이
      return 310; // PostCard 높이(300) + gap(10) = 310
    },
    overscan: 5,
    getItemKey: (index) => {
      if (index === 0) return "profile-summary";
      const post = allPosts[index - 1];
      return post ? `post-${post.id}` : `loading-${index}`;
    },
  });

  useScrollMemory<IPostSummaryData>({
    key: `member-page-${userId}`,
    virtualizer: rowVirtualizer,
    allItems: allPosts,
    enabled: !isPending && !!postList,
  });

  return (
    <div className="flex flex-col gap-4 items-center">
      <div
        className="relative w-full"
        style={{ height: `${rowVirtualizer.getTotalSize()}px` }}
      >
        {rowVirtualizer.getVirtualItems().map((virtualRow) => {
          if (virtualRow.index === 0) {
            // ProfileSummary 렌더링
            return (
              <div
                key="profile-summary"
                data-index={virtualRow.index}
                ref={rowVirtualizer.measureElement}
                className="absolute top-0 left-0 w-full pb-2"
                style={{ transform: `translateY(${virtualRow.start}px)` }}
              >
                <div className="flex flex-col gap-4 items-center">
                  <ProfileSummary userId={Number(userId)} />
                </div>
              </div>
            );
          }

          // Post 렌더링
          const post = allPosts[virtualRow.index - 1];
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
              <div className="px-2 pb-2.5">
                <PostCard
                  key={`post-${post.id}`}
                  postId={post.id}
                  onClick={() => {
                    setScrollPosition(
                      `member-page-${userId}`,
                      virtualRow.index,
                    );
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
      <div ref={lastElementRef} />
    </div>
  );
}
