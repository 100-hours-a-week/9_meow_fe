import { PostCard } from "@/components/common";
import { IPostContent } from "@/components/common/PostCard/PostContent";
import { IUserItem } from "@/components/common/UserItem";
import { IPostFooter } from "@/components/common/PostCard/PostFooter";
import React, { useRef } from "react";
import { useObserver } from "@/hooks/common/useObserver";
import { useInfiniteQuery } from "@tanstack/react-query";
import { postQueries } from "@/api/queries/postQueries";
import { IPostSummaryData } from "@/api/types/post";

const PostList = React.memo(function PostList({
  posts,
}: {
  posts: IPostSummaryData[];
}) {
  return (
    <>
      {posts.map((post) => {
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
          <PostCard key={`post-${post.id}`} postId={post.id}>
            <PostCard.Header
              userInfo={userInfo}
              isMyPost={post.myPost}
              postId={post.id}
            />
            <PostCard.Content {...postContent} />
            <PostCard.Footer {...postInfo} />
          </PostCard>
        );
      })}
    </>
  );
});

export default function MainPage() {
  const { data, fetchNextPage, hasNextPage, isLoading, error } =
    useInfiniteQuery({
      ...postQueries.list(),
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
      {data.pages.map((page, pageIndex) => (
        <PostList key={`page-${pageIndex}`} posts={page.content} />
      ))}
      <div ref={lastElementRef} />
    </div>
  );
}
