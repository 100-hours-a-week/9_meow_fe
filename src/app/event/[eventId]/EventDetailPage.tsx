import { eventQueries } from "@/api/queries/eventQueries";
import { EventPostCard } from "@/components/pages";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

export default function EventDetailPage() {
  const { eventId } = useParams();
  const { data: topicData } = useQuery({
    ...eventQueries.topic({ week: Number(eventId) }),
  });
  const { data: historyDetail, isPending } = useQuery({
    ...eventQueries.historyDetail({ rankWeek: Number(eventId) }),
  });

  if (isPending) {
    return <span className="ml-2">데이터 로딩 중...</span>;
  }

  const top3Data = historyDetail?.slice(0, 3);
  const remainingData = historyDetail?.slice(3);

  return (
    <div className="flex flex-col p-5 gap-4">
      <div className="flex flex-col gap-2 items-center">
        <h1 className="text-2xl md:text-4xl font-bold">
          ¢ 제 {eventId}회 미스코리냥 ♧
        </h1>
        <p className="text-2xl">주제: {topicData?.topic}</p>
      </div>
      {top3Data && top3Data.length > 0 && (
        <div className="flex flex-row justify-between bg-foreground rounded-2xl p-2">
          {top3Data.map((detail, index) => {
            const rank = index === 0 ? "1st" : index === 1 ? "2nd" : "3rd";
            return (
              <EventPostCard
                key={detail.postId}
                postId={detail.postId}
                postImageUrl={detail.imageUrl}
                userInfo={{
                  userId: detail.userId,
                  nickname: detail.nickname,
                  animalType: detail.animalType,
                  profileImageUrl: detail.profileImageUrl,
                }}
                likeCount={detail.likeCount}
                rank={rank}
                dark={true}
              />
            );
          })}
        </div>
      )}
      <div className="grid grid-cols-3 gap-y-2 justify-center justify-items-center items-center">
        {remainingData &&
          remainingData.map((detail) => (
            <EventPostCard
              key={detail.postId}
              postId={detail.postId}
              postImageUrl={detail.imageUrl}
              userInfo={{
                userId: detail.userId,
                nickname: detail.nickname,
                animalType: detail.animalType,
                profileImageUrl: detail.profileImageUrl,
              }}
              likeCount={detail.likeCount}
            />
          ))}
      </div>
    </div>
  );
}
