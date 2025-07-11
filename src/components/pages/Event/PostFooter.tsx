import React from "react";
import { UserItem } from "@/components/common";
import { IUserItem } from "@/components/common/UserItem";
import { Button } from "@/components/ui/button";
import PawIcon from "@/assets/icon/paw.svg?react";
import { cn } from "@/lib/utils";
import { eventQueries } from "@/api/queries/eventQueries";
import { useMutation } from "@tanstack/react-query";

interface IEventPostFooter {
  postId: number;
  userInfo: IUserItem;
  likeCount: number;
  dark?: boolean;
  isVoteTime?: boolean;
}

function EventPostFooter({
  postId,
  userInfo,
  likeCount,
  dark = false,
  isVoteTime = false,
}: IEventPostFooter) {
  const { mutate: vote } = useMutation({
    ...eventQueries.vote(),
  });

  return (
    <div className="flex flex-row justify-between px-1 items-center">
      <UserItem {...userInfo} size="sm" dark={dark} disabled={isVoteTime} />
      <Button
        variant="ghost"
        size="sm"
        className="flex flex-row gap-1 items-center"
        disabled={!isVoteTime}
        onClick={() => {
          vote(postId);
        }}
        aria-label={`투표하기 (현재 ${likeCount}표)`}
      >
        <PawIcon className={cn(dark ? "fill-background" : "fill-foreground")} />
        <p
          className={cn(
            "text-xs",
            dark ? "text-background" : "text-foreground",
          )}
        >
          {likeCount}
        </p>
      </Button>
    </div>
  );
}

export default React.memo(EventPostFooter);
