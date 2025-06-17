import { EventHistoryCard, EventPostCard } from "@/components/pages";
import { ApiAnimalType } from "@/types/animal";

export default function EventMainPage() {
  // TODO: 데이터 연결
  return (
    <div>
      <EventPostCard
        postId={1}
        postImageUrl="https://demo.sir.kr/gnuboard5/data/file/notice/fd53eeef8281da42f9aabf8edf38990a_hj2Fdo9p_c4043a8ec3ba788e7ad8a3792ff826dc9757aceb.jpg"
        userInfo={{
          userId: 1,
          nickname: "test",
          animalType: ApiAnimalType.CAT,
        }}
        likeCount={100}
        rank="1st"
      />
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
