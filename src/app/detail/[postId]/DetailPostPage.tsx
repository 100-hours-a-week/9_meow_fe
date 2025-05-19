import { postQueries } from "@/api/queries/postQueries";
import { PostCard } from "@/components/common";
import { ImageCarousel } from "@/components/pages";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

function DetailPostPage() {
  const { postId } = useParams();
  const { data, isLoading, error } = useQuery({
    ...postQueries.detail(Number(postId)),
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
    <div className="flex flex-col gap-4 items-center pt-2 pb-16 px-3">
      {data && (
        <>
          <PostCard.Header
            userInfo={{
              userId: data.userId,
              nickname: data.nickname,
              profileImageUrl: data.profileImageUrl,
              animalType: data.postType,
            }}
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
            />
          )}
          <PostCard.Content
            postId={Number(postId)}
            thumbnailUrl={null}
            content={data.transformedContent}
            animalType={data.postType}
            timestamp={new Date(data.createdAt)}
            emotion={data.emotion}
          />
          {data.imageUrls.length === 0 && (
            <PostCard.Footer
              postId={Number(postId)}
              didLike={data.liked}
              likeCount={data.likeCount}
              commentCount={data.commentCount}
            />
          )}
        </>
      )}
    </div>
  );
}

export default DetailPostPage;
