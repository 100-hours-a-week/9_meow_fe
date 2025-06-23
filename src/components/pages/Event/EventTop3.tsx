import EventPostCard from "@/components/pages/Event/PostCard";
import { Button } from "@/components/ui/button";
import {
  IEventTop3DataItem,
  useEventTop3SSE,
} from "@/hooks/event/useEventTop3SSE";
import { RefreshCw, WifiOff } from "lucide-react";

const convertToEventPostCard = (
  data: IEventTop3DataItem,
  rank: "1st" | "2nd" | "3rd",
) => ({
  postId: data.postId,
  postImageUrl: data.imageUrl,
  userInfo: {
    userId: data.userId,
    nickname: data.nickname,
    animalType: data.animalType,
    profileImageUrl: data.profileImageUrl,
  },
  likeCount: data.likeCount,
  rank,
  dark: true,
});

export default function EventTop3() {
  const { top3Data, error, reconnect } = useEventTop3SSE();

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center bg-foreground text-background p-5 rounded-2xl gap-3">
        <WifiOff className="w-8 h-8" />
        <div className="text-center">
          <div className="font-bold mb-2">실시간 연결 실패</div>
          <div className="text-sm opacity-80">{error}</div>
        </div>
        <Button
          onClick={reconnect}
          variant="secondaryOutline"
          size="sm"
          className="text-background border-background hover:bg-background hover:text-foreground"
        >
          <RefreshCw className="w-4 h-4 mr-2" />
          재연결
        </Button>
      </div>
    );
  }

  if (!top3Data || top3Data.length === 0) {
    return (
      <div className="flex items-center justify-center bg-foreground text-background p-5 rounded-2xl gap-2">
        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-background"></div>
        <span>실시간 데이터 로딩 중...</span>
      </div>
    );
  }

  return (
    <div className="flex flex-row justify-between bg-foreground rounded-2xl p-2">
      <EventPostCard {...convertToEventPostCard(top3Data[0], "1st")} dark />
      {top3Data[1] && (
        <EventPostCard {...convertToEventPostCard(top3Data[1], "2nd")} dark />
      )}
      {top3Data[2] && (
        <EventPostCard {...convertToEventPostCard(top3Data[2], "3rd")} dark />
      )}
    </div>
  );
}
