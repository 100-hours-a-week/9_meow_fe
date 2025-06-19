import { eventQueries } from "@/api/queries/eventQueries";
import { IEventPeriodResponse } from "@/api/types/event";
import { EventHistoryCard, EventTimer } from "@/components/pages";
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
              onClick={() => navigate("/event/apply")}
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
                navigate("/event/poll");
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
              onClick={() => navigate("/event/poll")}
            >
              ♧ 투표하러 가기 ♧
            </Button>
          }
        />
      );
    default:
      return "평소 모먼트";
  }
}

export default function EventMainPage() {
  const navigate = useNavigate();
  const { data: eventPeriod } = useQuery({ ...eventQueries.eventPeriod() });

  // TODO: 데이터 연결
  return (
    <div className="p-5 flex flex-col gap-5">
      {eventPeriod && renderBanner({ data: eventPeriod, navigate })}
      <EventHistoryCard
        title="제 5회 미스코리냥"
        subject="꿀잠 모먼트"
        timestamp={new Date()}
        imageUrls={[
          "/icon/badge/first-badge.PNG",
          "/icon/badge/second-badge.PNG",
          "/icon/badge/third-badge.PNG",
        ]}
      />
    </div>
  );
}
