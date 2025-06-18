import { postQueries } from "@/api/queries/postQueries";
import { Button } from "@/components/ui/button";
import { ApiEmotion } from "@/types/Emotion";
import { convertEmotionTypeToDisplay } from "@/utils/convertEmotion";
import { convertTimestamp } from "@/utils/convertTimestamp";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import CatOutlinedIcon from "@/assets/icon/cat-outlined.svg?react";
import CatFilledIcon from "@/assets/icon/cat-filled.svg?react";
import CommentIcon from "@/assets/icon/comment.svg?react";
import ShareIcon from "@/assets/icon/share.svg?react";

export interface IPostFooter {
  postId: number;
  didLike: boolean;
  likeCount: number;
  commentCount: number;
  timestamp: Date;
  emotion: ApiEmotion;
}

export default function PostFooter({
  postId,
  didLike,
  likeCount,
  commentCount,
  timestamp,
  emotion,
}: IPostFooter) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: likePost, isPending } = useMutation({
    ...postQueries.like({
      onLikeSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [...postQueries.all(), "detail", postId],
        });
        queryClient.invalidateQueries({
          queryKey: [...postQueries.all(), "list"],
        });
      },
      navigate,
    }),
  });

  const handleLikeClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isPending) return; // 이미 요청 중이면 중복 요청 방지
    likePost({ postId, isLiked: didLike });
  };

  const handleShareClick = async (e: React.MouseEvent) => {
    e.stopPropagation();
    const url = `${window.location.origin}/detail/${postId}`;

    try {
      await navigator.clipboard.writeText(url);
      alert("링크를 클립보드에 복사했다냥.");
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      alert("링크 복사에 실패했다옹...");
    }
  };

  return (
    <div className="flex flex-row justify-between items-center text-xs w-full">
      <div className="flex flex-row items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={handleLikeClick}
          disabled={isPending}
          className="size-6 p-1"
        >
          {didLike ? (
            <CatFilledIcon className="fill-foreground" />
          ) : (
            <CatOutlinedIcon className="fill-foreground" />
          )}
        </Button>
        <p>{likeCount}</p>
        <Button variant="ghost" size="icon" className="size-6 p-1">
          <CommentIcon className="stroke-foreground" />
        </Button>
        <p>{commentCount}</p>
        <Button
          variant="ghost"
          size="icon"
          onClick={handleShareClick}
          className="size-6 p-1"
        >
          <ShareIcon className="stroke-foreground" />
        </Button>
      </div>
      <div className="flex flex-row items-center gap-2 text-muted-foreground text-xs">
        <p>{convertTimestamp(timestamp)}</p>
        {emotion !== ApiEmotion.NORMAL && (
          <p> / {convertEmotionTypeToDisplay(emotion)}</p>
        )}
      </div>
    </div>
  );
}
