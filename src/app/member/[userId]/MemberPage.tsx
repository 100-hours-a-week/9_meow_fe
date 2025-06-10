import { PostCard } from "@/components/common";
import { ApiAnimalType } from "@/types/animal";
import { ProfileSummary } from "@/components/pages";
import { ApiEmotion } from "@/types/Emotion";
import { useParams } from "react-router-dom";

export default function MemberPage() {
  const { userId } = useParams();

  return (
    <div className="flex flex-col gap-4 items-center">
      <ProfileSummary userId={Number(userId)} />
      <div className="pt-2 flex flex-col gap-2.5 px-2 w-full">
        {/* TODO: 게시글 조회 추가 */}
        <PostCard key={`post-1`} postId={1}>
          <PostCard.Header
            userInfo={{
              userId: 1,
              nickname: "test",
              animalType: ApiAnimalType.CAT,
              profileImageUrl: "https://picsum.photos/200/300",
            }}
            isMyPost={false}
            postId={1}
          />
          <PostCard.Content
            thumbnailUrl="https://picsum.photos/200/300"
            content="test"
          />
          <PostCard.Footer
            postId={1}
            didLike={false}
            likeCount={0}
            commentCount={0}
            timestamp={new Date()}
            emotion={ApiEmotion.HAPPY}
          />
        </PostCard>
      </div>
    </div>
  );
}
