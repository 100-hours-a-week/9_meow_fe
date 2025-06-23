import { eventQueries } from "@/api/queries/eventQueries";
import { EventPostCard, EventTimer, EventTop3 } from "@/components/pages";
import { ApiAnimalType } from "@/types/animal";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useEventVoteCountSSE } from "@/hooks/event/useEventVoteCountSSE";

export default function EventVotePage() {
  const navigate = useNavigate();

  const { data: eventPeriod } = useQuery({ ...eventQueries.eventPeriod() });
  const { data: topicData } = useQuery({ ...eventQueries.topic() });
  const { data: eventPostList, isPending: isEventPostListPending } = useQuery({
    ...eventQueries.eventPostList(),
  });

  // SSE를 통한 실시간 좋아요 수 업데이트
  const { voteCountData } = useEventVoteCountSSE();

  useEffect(() => {
    if (eventPeriod?.status === null || eventPeriod?.status === "신청") {
      alert("신청 기간이 아니다냥");
      navigate("/event");
    }
  }, [eventPeriod, navigate]);

  // 실시간 좋아요 수가 포함된 포스트 리스트 생성
  const updatedEventPostList = useMemo(() => {
    if (!eventPostList) return null;

    return eventPostList.map((post) => {
      const updatedVoteData = voteCountData?.find(
        (voteData) => voteData.postId === post.postId,
      );

      return {
        ...post,
        likeCount: updatedVoteData?.likeCount ?? post.likeCount,
      };
    });
  }, [eventPostList, voteCountData]);

  if (isEventPostListPending) {
    return (
      <div className="flex flex-col items-center p-5 text-2xl">
        로딩중이다냥
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5 p-2">
      <div className="flex flex-col gap-2 items-center">
        <h1 className="text-4xl font-bold">¢ 투표하라냥 ♧</h1>
        {eventPeriod?.status !== null && (
          <p className="text-2xl">주제: {topicData?.topic}</p>
        )}
      </div>
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
        {updatedEventPostList &&
          updatedEventPostList.map((post) => (
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
