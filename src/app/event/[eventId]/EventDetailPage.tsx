import { EventTop3 } from "@/components/pages";
import { ApiAnimalType } from "@/types/animal";
import { useParams } from "react-router-dom";

export default function EventDetailPage() {
  const { eventId } = useParams();
  // TODO: 이벤트 상세 페이지 구현
  console.log(eventId);
  return (
    <div className="flex flex-col p-3">
      <EventTop3
        first={{
          postId: 1,
          postImageUrl: "https://picsum.photos/200/300",
          userInfo: {
            userId: 1,
            nickname: "냥졔씨다냥",
            animalType: ApiAnimalType.DOG,
            profileImageUrl: "https://picsum.photos/200/300",
          },
          likeCount: 10,
          rank: "1st",
        }}
        second={{
          postId: 2,
          postImageUrl: "https://picsum.photos/200/300",
          userInfo: {
            userId: 2,
            nickname: "멍졔씨냥냥",
            animalType: ApiAnimalType.DOG,
            profileImageUrl: "https://picsum.photos/200/300",
          },
          likeCount: 10,
          rank: "2nd",
        }}
        third={{
          postId: 3,
          postImageUrl: "https://picsum.photos/200/300",
          userInfo: {
            userId: 3,
            nickname: "멍졔씨냥냥",
            animalType: ApiAnimalType.DOG,
            profileImageUrl: "https://picsum.photos/200/300",
          },
          likeCount: 10,
          rank: "3rd",
        }}
      />
    </div>
  );
}
