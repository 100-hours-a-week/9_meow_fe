import { eventQueries } from "@/api/queries/eventQueries";
import { IEventPeriodResponse } from "@/api/types/event";
import { EventHistoryCard, EventTimer, RecentPodium } from "@/components/pages";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { NavigateFunction, useNavigate } from "react-router-dom";

function renderBanner({
  data,
  navigate,
}: {
  data: IEventPeriodResponse;
  navigate: NavigateFunction;
}) {
  switch (data.status) {
    case "신청":
      return (
        <EventTimer
          title="신청까지 남은 시간"
          endTimestamp={new Date(data.time)}
          button={
            <Button
              variant="primarySolid"
              onClick={() => navigate(`/event/submit/${data.week}`)}
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
          endTimestamp={new Date(data.time)}
          button={
            <Button
              variant="secondarySolid"
              onClick={() => {
                navigate(`/event/vote/${data.week}`);
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
          endTimestamp={new Date(data.time)}
          button={
            <Button
              variant="secondarySolid"
              onClick={() => navigate(`/event/vote/${data.week}`)}
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
  const { data: eventPeriod } = useQuery({ ...eventQueries.period() });
  const { data: topicData } = useQuery({
    ...eventQueries.topic({ week: eventPeriod?.week || 0 }),
    enabled: !!eventPeriod?.week,
  });
  const { data: historySummary } = useQuery({
    ...eventQueries.historySummary(),
  });

  return (
    <div className="p-5 flex flex-col gap-5">
      <div className="flex flex-col gap-2 items-center">
        <h1 className="text-4xl font-bold">
          {eventPeriod && eventPeriod?.status === null
            ? "¢ 미스코리냥 ♧"
            : `¢ 제 ${eventPeriod?.week}회 미스코리냥 ♧`}
        </h1>
        {eventPeriod?.status !== null && (
          <p className="text-2xl">주제: {topicData?.topic}</p>
        )}
      </div>
      {eventPeriod && eventPeriod.status === null ? (
        historySummary &&
        historySummary.length > 0 && (
          <>
            {/* 가장 최근 history를 크게 보여줌 */}

            <RecentPodium
              title={`제 ${historySummary[0].week}회 미스코리냥`}
              subject={historySummary[0].topic}
              eventWeek={historySummary[0].week}
              timestamp={new Date(historySummary[0].endAt)}
              imageUrls={historySummary[0].imageUrl}
            />

            {/* 나머지 history를 아래에 나열 */}
            <div className="flex flex-col gap-2 mt-4">
              {historySummary.slice(1).map((summary) => (
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
          {eventPeriod && renderBanner({ data: eventPeriod, navigate })}
          {historySummary &&
            historySummary.map((summary) => (
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
