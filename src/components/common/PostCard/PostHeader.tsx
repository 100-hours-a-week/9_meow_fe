import ContextMenu from "./ContextMenu";
import UserItem, { IUserItem } from "../UserItem";
import { Button } from "@/components/ui/button";
import { userQueries } from "@/api/queries/userQueries";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postQueries } from "@/api/queries/postQueries";

interface IPostHeader {
  userInfo: IUserItem;
  isMyPost: boolean;
  postId: number;
  isFollowing?: boolean;
}

export default function PostHeader({
  userInfo,
  isMyPost,
  postId,
  isFollowing,
}: IPostHeader) {
  const queryClient = useQueryClient();
  const { mutate: follow } = useMutation({
    ...userQueries.follow({ userId: userInfo.userId, queryClient }),
  });
  const { mutate: unfollow } = useMutation({
    ...userQueries.unfollow({ userId: userInfo.userId, queryClient }),
  });

  const handleFollowClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isFollowing) {
      unfollow();
      queryClient.invalidateQueries({
        queryKey: [...postQueries.all()],
      });
    } else {
      follow();
      queryClient.invalidateQueries({
        queryKey: [...postQueries.all()],
      });
    }
  };

  return (
    <div className="flex flex-row items-center justify-between w-full">
      <div className="flex flex-row items-center gap-3">
        <UserItem {...userInfo} />
      </div>
      {isMyPost ? (
        <ContextMenu postId={postId} />
      ) : (
        isFollowing !== undefined && (
          <Button
            variant={isFollowing ? "primarySolid" : "primaryOutline"}
            size="sm"
            className="border-muted-foreground text-xs p-2 h-5"
            onClick={handleFollowClick}
          >
            {isFollowing ? "팔로잉" : "팔로우"}
          </Button>
        )
      )}
    </div>
  );
}
