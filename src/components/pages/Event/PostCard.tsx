import React from "react";
import { IUserItem } from "@/components/common/UserItem";
import EventPostFooter from "./PostFooter";
import ImageBox from "./ImageBox";
import { cn } from "@/lib/utils";

type TRank = "1st" | "2nd" | "3rd" | "none";

export interface IEventPostCard {
  postId: number;
  postImageUrl: string;
  userInfo: IUserItem;
  likeCount: number;
  rank?: TRank;
  dark?: boolean;
  isVoteTime?: boolean;
}

function EventPostCard({
  postId,
  postImageUrl,
  userInfo,
  likeCount,
  rank = "none",
  dark = false,
  isVoteTime = false,
}: IEventPostCard) {
  return (
    <div
      className={cn(
        `relative w-[100px] md:w-[120px] flex flex-col gap-1`,
        dark && "text-background",
      )}
    >
      <ImageBox src={postImageUrl} rank={rank} />
      <EventPostFooter
        postId={postId}
        userInfo={userInfo}
        likeCount={likeCount}
        dark={dark}
        isVoteTime={isVoteTime}
      />
    </div>
  );
}

export default React.memo(EventPostCard);
