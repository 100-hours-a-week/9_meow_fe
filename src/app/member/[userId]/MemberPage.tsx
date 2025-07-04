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

interface IMemberPage {
  scrollContainerRef: React.RefObject<HTMLDivElement | null>;
}

export default function MemberPage({ scrollContainerRef }: IMemberPage) {
  const { userId } = useParams();

  const {
    data: postList,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    ...postQueries.userPostList({ userId: Number(userId) }),
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

  const allPosts = postList
    ? postList.pages.flatMap((page) => page.content)
    : [];

  const rowVirtualizer = useVirtualizer({
    count: allPosts.length,
    getScrollElement: () => scrollContainerRef.current,
    estimateSize: () => 310,
    overscan: 5,
    getItemKey: (index) => {
      const post = allPosts[index];
      return post ? `post-${post.id}` : `loading-${index}`;
    },
  });

  return (
    <div className="flex flex-col gap-4 items-center">
      <ProfileSummary userId={Number(userId)} />
      <div className="px-2 w-full">
        <div
          className="relative w-full"
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
                  <PostCard key={`post-${post.id}`} postId={post.id}>
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
    </div>
  );
}
