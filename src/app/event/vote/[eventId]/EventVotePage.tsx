import { eventQueries } from "@/api/queries/eventQueries";
import { EventPostCard, EventTimer, EventTop3 } from "@/components/pages";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useEventVoteCountSSE } from "@/hooks/event/useEventVoteCountSSE";
import { useTimer } from "@/hooks/event/useTimer";

export default function EventVotePage() {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: eventPeriod } = useQuery({ ...eventQueries.period() });
  const { data: topicData } = useQuery({
    ...eventQueries.topic({ week: Number(eventId) }),
  });
  const { data: eventPostList, isPending: isEventPostListPending } = useQuery({
    ...eventQueries.postList(),
  });

  const timeLeft = useTimer({
    endTimestamp: new Date(eventPeriod?.time || ""),
    onTimeUp: () =>
      queryClient.invalidateQueries({
        queryKey: eventQueries.all(),
      }),
  });

  useEffect(() => {
    if (eventPeriod?.status === null || eventPeriod?.status === "신청") {
      alert("투표 기간이 아니다냥");
      navigate("/event");
    }
  }, [eventPeriod, navigate]);

  // SSE를 통한 실시간 좋아요 수 업데이트
  const { voteCountData } = useEventVoteCountSSE(eventPeriod);

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
    <div className="flex flex-col gap-5 p-5">
      <div className="w-full flex flex-col gap-0 items-center">
        <div className="flex flex-col gap-0 items-center">
          <h1 className="text-4xl font-bold">
            {eventPeriod?.status === "투표전"
              ? "투표 직전이다냥! 준비하라냥!"
              : "¢ 투표하라냥 ♧"}
          </h1>
          {eventPeriod?.status === "투표중" && (
            <div className="w-[100px] fixed top-2 z-10 bg-foreground text-background rounded-lg p-2 text-center">
              {timeLeft}
            </div>
          )}
          {eventPeriod?.status !== null && (
            <p className="text-2xl">주제: {topicData?.topic}</p>
          )}
        </div>
        {eventPeriod?.status === "투표중" && <EventTop3 />}
        {eventPeriod?.status === "투표전" && (
          <EventTimer
            title="투표까지 남은 시간"
            endTimestamp={new Date(eventPeriod.time)}
          />
        )}
      </div>
      <div className="w-full grid grid-cols-3 gap-y-2 items-center justify-center justify-items-center">
        {updatedEventPostList &&
          updatedEventPostList.map((post) => (
            <EventPostCard
              key={post.postId}
              postId={post.postId}
              postImageUrl={post.imageUrl}
              userInfo={{
                userId: post.userId,
                profileImageUrl: post.profileImageUrl,
                nickname: post.nickname,
                animalType: post.animalType,
              }}
              likeCount={post.likeCount}
              isVoteTime={eventPeriod?.status === "투표중"}
            />
          ))}
      </div>
    </div>
  );
}
