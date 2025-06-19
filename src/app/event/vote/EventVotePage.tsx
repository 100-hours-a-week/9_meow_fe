import { eventQueries } from "@/api/queries/eventQueries";
import { EventPostCard } from "@/components/pages";
import { ApiAnimalType } from "@/types/animal";
import { useQuery } from "@tanstack/react-query";

export default function EventVotePage() {
  const { data } = useQuery({ ...eventQueries.eventPostList() });
  return (
    <div className="flex flex-row flex-wrap gap-3 p-2">
      {data &&
        data.map((post) => (
          <EventPostCard
            postId={post.postId}
            postImageUrl={post.imageUrl}
            userInfo={{
              userId: 1,
              profileImageUrl: post.profileImageUrl,
              nickname: post.nickname,
              animalType: ApiAnimalType.CAT,
            }}
            likeCount={post.likeCount}
          />
        ))}
    </div>
  );
}
