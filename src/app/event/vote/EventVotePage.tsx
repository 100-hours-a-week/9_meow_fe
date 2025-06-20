import { eventQueries } from "@/api/queries/eventQueries";
import { EventPostCard, EventTimer, EventTop3 } from "@/components/pages";
import { ApiAnimalType } from "@/types/animal";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function EventVotePage() {
  const navigate = useNavigate();

  const { data: eventPeriod } = useQuery({ ...eventQueries.eventPeriod() });
  const { data: eventPostList, isPending: isEventPostListPending } = useQuery({
    ...eventQueries.eventPostList(),
  });

  useEffect(() => {
    if (eventPeriod?.status === null || eventPeriod?.status === "신청") {
      alert("신청 기간이 아니다냥");
      navigate("/event");
    }
  }, [eventPeriod, navigate]);

  if (isEventPostListPending) {
    return (
      <div className="flex flex-col items-center p-5 text-2xl">
        로딩중이다냥
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5 p-2">
      {eventPeriod?.status === "투표중" && <EventTop3 />}
      {eventPeriod?.status === "투표전" && (
        <div className="flex flex-row items-center justify-center">
          <EventTimer
            title="투표까지 남은 시간"
            endTimestamp={new Date(eventPeriod.time)}
          />
        </div>
      )}
      <div className="flex flex-row flex-wrap gap-3 items-center justify-center">
        {eventPostList &&
          eventPostList.map((post) => (
            <EventPostCard
              key={post.postId}
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
    </div>
  );
}
