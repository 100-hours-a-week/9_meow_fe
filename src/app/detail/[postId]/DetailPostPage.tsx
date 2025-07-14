import { commentQueries } from "@/api/queries/commentQueries";
import { postQueries } from "@/api/queries/postQueries";
import { PostCard } from "@/components/common";
import { CommentInput, CommentItem, ImageCarousel } from "@/components/pages";
import { useObserver } from "@/hooks/common/useObserver";
import { useRef } from "react";
import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

function DetailPostPage() {
  const { postId } = useParams();
  const { data, isLoading, error } = useQuery({
    ...postQueries.detail(Number(postId)),
  });

  const {
    data: commentData,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery({
    ...commentQueries.list(Number(postId)),
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

  // TODO: 에러 처리
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="h-full flex flex-col pt-2 px-3 gap-4">
      <div className="w-full flex flex-col gap-4 items-center">
        {data && (
          <>
            <PostCard postId={Number(postId)}>
              <PostCard.Header
                userInfo={{
                  userId: data.userId,
                  nickname: data.nickname,
                  profileImageUrl: data.profileImageUrl,
                  animalType: data.postType,
                }}
                isMyPost={data.myPost}
                postId={Number(postId)}
              />
              {data.imageUrls.length > 0 && (
                <ImageCarousel images={data.imageUrls} />
              )}
              {data.imageUrls.length > 0 && (
                <PostCard.Footer
                  postId={Number(postId)}
                  didLike={data.liked}
                  likeCount={data.likeCount}
                  commentCount={data.commentCount}
                  timestamp={new Date(data.createdAt)}
                  emotion={data.emotion}
                  animalType={data.postType}
                />
              )}
              <PostCard.Content
                thumbnailUrl={null}
                content={data.transformedContent}
              />
              {data.imageUrls.length === 0 && (
                <PostCard.Footer
                  postId={Number(postId)}
                  didLike={data.liked}
                  likeCount={data.likeCount}
                  commentCount={data.commentCount}
                  timestamp={new Date(data.createdAt)}
                  emotion={data.emotion}
                  animalType={data.postType}
                />
              )}
            </PostCard>
          </>
        )}
      </div>
      <div className="w-full flex flex-col gap-4 items-center flex-1 justify-between">
        <div className="w-full flex flex-col gap-4 pb-16">
          {commentData?.pages.map((page) =>
            page.content.map((comment) => (
              <CommentItem
                key={comment.id}
                userInfo={{
                  userId: comment.userId,
                  nickname: comment.nickname,
                  animalType: comment.postType,
                  profileImageUrl: comment.profileImageUrl,
                }}
                timestamp={new Date(comment.createdAt)}
                content={comment.transformedContent}
              />
            )),
          )}
          <div ref={lastElementRef} />
        </div>
        <CommentInput postId={Number(postId)} />
      </div>
    </div>
  );
}

export default DetailPostPage;
