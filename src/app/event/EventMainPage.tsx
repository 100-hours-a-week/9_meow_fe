import { eventQueries } from "@/api/queries/eventQueries";
import { IEventPeriodResponse } from "@/api/types/event";
import { EventHistoryCard, EventTimer } from "@/components/pages";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";

function renderBanner({ data }: { data: IEventPeriodResponse }) {
  switch (data.status) {
    case "신청":
      return (
        <EventTimer
          title="신청까지 남은 시간"
          endTimestamp={new Date(data.time)}
          button={<Button variant="primarySolid">♤ 신청하러 가기 ♤</Button>}
        />
      );
    case "투표전":
      return (
        <EventTimer
          title="투표까지 남은 시간"
          endTimestamp={new Date(data.time)}
          button={
            <Button variant="secondarySolid">♧ 신청한 사진 보러 가기 ♧</Button>
          }
        />
      );
    case "투표중":
      return (
        <EventTimer
          title="투표 마감까지 남은 시간"
          endTimestamp={new Date(data.time)}
          button={<Button variant="secondarySolid">♧ 투표하러 가기 ♧</Button>}
        />
      );
    default:
      return "평소 모먼트";
  }
}

export default function EventMainPage() {
  const { data: eventPeriod } = useQuery({ ...eventQueries.eventPeriod() });

  // TODO: 데이터 연결
  return (
    <div className="p-5 flex flex-col gap-5">
      {eventPeriod && renderBanner({ data: eventPeriod })}
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
