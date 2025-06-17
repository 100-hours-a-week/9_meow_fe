import { IUserItem } from "@/components/common/UserItem";
import EventPostFooter from "./PostFooter";

interface IEventPostCard {
  postId: number;
  postImageUrl: string;
  userInfo: IUserItem;
  likeCount: number;
  rank?: "1st" | "2nd" | "3rd" | "none";
}
export default function EventPostCard({
  postId,
  postImageUrl,
  userInfo,
  likeCount,
  rank = "none",
}: IEventPostCard) {
  return (
    <div className="w-[100px] flex flex-col gap-1">
      <div className="w-full h-[100px] rounded-lg overflow-hidden border border-muted-foreground">
        <img
          src={postImageUrl}
          alt="postImage"
          className="w-full h-full object-cover"
        />
      </div>
      <EventPostFooter
        postId={postId}
        userInfo={userInfo}
        likeCount={likeCount}
        rank={rank}
      />
    </div>
  );
}
