import { eventQueries } from "@/api/queries/eventQueries";
import { IEventPeriodResponse } from "@/api/types/event";
import { EventHistoryCard, EventTimer, RecentPodium } from "@/components/pages";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { NavigateFunction, useNavigate } from "react-router-dom";

function renderBanner({
  eventPeriodData,
  navigate,
}: {
  eventPeriodData: IEventPeriodResponse;
  navigate: NavigateFunction;
}) {
  switch (eventPeriodData.status) {
    case "신청":
      return (
        <EventTimer
          title="신청까지 남은 시간"
          endTimestamp={new Date(eventPeriodData.time)}
          button={
            <Button
              variant="primarySolid"
              onClick={() => navigate(`/event/submit/${eventPeriodData.week}`)}
            >
              ♤ 신청하러 가기 ♤
            </Button>
          }
        />
      );
    case "투표전":
      return (
        <EventTimer
          title="투표까지 남은 시간"
          endTimestamp={new Date(eventPeriodData.time)}
          button={
            <Button
              variant="secondarySolid"
              onClick={() => {
                navigate(`/event/vote/${eventPeriodData.week}`);
              }}
            >
              ♧ 신청한 사진 보러 가기 ♧
            </Button>
          }
        />
      );
    case "투표중":
      return (
        <EventTimer
          title="투표 마감까지 남은 시간"
          endTimestamp={new Date(eventPeriodData.time)}
          button={
            <Button
              variant="secondarySolid"
              onClick={() => navigate(`/event/vote/${eventPeriodData.week}`)}
            >
              ♧ 투표하러 가기 ♧
            </Button>
          }
        />
      );
    default:
      return null;
  }
}

export default function EventMainPage() {
  const navigate = useNavigate();
  const { data: eventPeriodData } = useQuery({ ...eventQueries.period() });
  const { data: topicData } = useQuery({
    ...eventQueries.topic({ week: eventPeriodData?.week || 0 }),
    enabled: !!eventPeriodData?.week,
  });
  const { data: historySummaryData } = useQuery({
    ...eventQueries.historySummary(),
  });
  const { data: recentPostData } = useQuery({
    ...eventQueries.recentPost(),
  });

  return (
    <div className="p-5 flex flex-col gap-5">
      <div className="flex flex-col gap-2 items-center">
        <h1 className="text-4xl font-bold">
          {eventPeriodData && eventPeriodData?.status === null
            ? "¢ 미스코리냥 ♧"
            : `¢ 제 ${eventPeriodData?.week}회 미스코리냥 ♧`}
        </h1>
        {eventPeriodData?.status !== null && (
          <p className="text-2xl">주제: {topicData?.topic}</p>
        )}
      </div>
      {eventPeriodData && eventPeriodData.status === "신청" && (
        <div className="flex flex-col gap-2">
          <h3 className="text-base font-bold text-center">
            사용자들이 방금 신청한 사진이다냥 ♤
          </h3>
          <div className="flex flex-row gap-5 justify-center">
            {recentPostData?.map((image, index) => (
              <div key={index} className="flex flex-row gap-2 ">
                <img
                  src={image}
                  alt="recent post"
                  className="w-24 h-24 object-cover rounded-lg border border-muted-foreground"
                />
              </div>
            ))}
          </div>
        </div>
      )}
      {eventPeriodData && renderBanner({ eventPeriodData, navigate })}
      {eventPeriodData && eventPeriodData.status === null ? (
        historySummaryData &&
        historySummaryData.length > 0 && (
          <>
            {/* 가장 최근 history를 크게 보여줌 */}

            <RecentPodium
              title={`제 ${historySummaryData[0].week}회 미스코리냥`}
              subject={historySummaryData[0].topic}
              eventWeek={historySummaryData[0].week}
              timestamp={new Date(historySummaryData[0].endAt)}
              imageUrls={historySummaryData[0].imageUrl}
            />

            {/* 나머지 history를 아래에 나열 */}
            <div className="flex flex-col gap-2 mt-4">
              {historySummaryData.slice(1).map((summary) => (
                <EventHistoryCard
                  key={summary.week}
                  title={`제 ${summary.week}회 미스코리냥`}
                  subject={summary.topic}
                  eventWeek={summary.week}
                  timestamp={new Date(summary.endAt)}
                  imageUrls={summary.imageUrl}
                />
              ))}
            </div>
          </>
        )
      ) : (
        <>
          {historySummaryData &&
            historySummaryData.map((summary) => (
              <EventHistoryCard
                key={summary.week}
                title={`제 ${summary.week}회 미스코리냥`}
                subject={summary.topic}
                eventWeek={summary.week}
                timestamp={new Date(summary.endAt)}
                imageUrls={summary.imageUrl}
              />
            ))}
        </>
      )}
    </div>
  );
}
