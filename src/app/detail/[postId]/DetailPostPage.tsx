import { dummyPostDetail } from "@/assets/dummy-post-detail";
import { PostCard } from "@/components/common";
import { ImageCarousel } from "@/components/pages";
import { useParams } from "react-router-dom";

function DetailPostPage() {
  const { postId } = useParams();

  return (
    <div className="flex flex-col gap-4 items-center pt-2 pb-16 px-3">
      <PostCard.Header
        userInfo={{
          userId: dummyPostDetail.userId,
          nickname: dummyPostDetail.nickname,
          profileImageUrl: dummyPostDetail.profileImageUrl,
          animalType: dummyPostDetail.postType,
        }}
      />
      <ImageCarousel images={dummyPostDetail.imageUrls} />
      <PostCard.Footer
        postId={Number(postId)}
        didLike={dummyPostDetail.didLike}
        likeCount={dummyPostDetail.likeCount}
        commentCount={dummyPostDetail.commentCount}
      />
      <PostCard.Content
        postId={Number(postId)}
        thumbnailUrl={null}
        content={dummyPostDetail.transformedContent}
        animalType={dummyPostDetail.postType}
        timestamp={new Date(dummyPostDetail.createdAt)}
        emotion={dummyPostDetail.emotion}
      />
    </div>
  );
}

export default DetailPostPage;
