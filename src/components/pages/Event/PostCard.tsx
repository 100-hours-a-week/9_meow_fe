import { IUserItem } from "@/components/common/UserItem";
import EventPostFooter from "./PostFooter";

type TRank = "1st" | "2nd" | "3rd" | "none";

interface IEventPostCard {
  postId: number;
  postImageUrl: string;
  userInfo: IUserItem;
  likeCount: number;
  rank?: TRank;
}

function renderBadge(rank: TRank) {
  switch (rank) {
    case "1st":
      return <img src={"/icon/badge/first-badge.PNG"} alt="badge" />;
    case "2nd":
      return <img src={"/icon/badge/second-badge.PNG"} alt="badge" />;
    case "3rd":
      return <img src={"/icon/badge/third-badge.PNG"} alt="badge" />;
    default:
      return null;
  }
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
      <div className="absolute top-1 left-1 w-[20px]">{renderBadge(rank)}</div>
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
      />
    </div>
  );
}
