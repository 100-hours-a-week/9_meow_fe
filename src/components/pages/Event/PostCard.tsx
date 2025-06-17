import { IUserItem } from "@/components/common/UserItem";
import EventPostFooter from "./PostFooter";
import ImageBox from "./ImageBox";

type TRank = "1st" | "2nd" | "3rd" | "none";

interface IEventPostCard {
  postId: number;
  postImageUrl: string;
  userInfo: IUserItem;
  likeCount: number;
  rank?: TRank;
}

export default function EventPostCard({
  postId,
  postImageUrl,
  userInfo,
  likeCount,
  rank = "none",
}: IEventPostCard) {
  return (
    <div className="relative w-[100px] flex flex-col gap-1">
      <ImageBox src={postImageUrl} rank={rank} />
      <EventPostFooter
        postId={postId}
        userInfo={userInfo}
        likeCount={likeCount}
      />
    </div>
  );
}
