import { postQueries } from "@/api/queries/postQueries";
import { Button } from "@/components/ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export interface IPostFooter {
  postId: number;
  didLike: boolean;
  likeCount: number;
  commentCount: number;
}

export default function PostFooter({
  postId,
  didLike,
  likeCount,
  commentCount,
}: IPostFooter) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

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
    }),
  });

  const handleLikeClick = () => {
    if (isPending) return; // 이미 요청 중이면 중복 요청 방지
    likePost({ postId, isLiked: didLike });
  };

  const handleShareClick = async () => {
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
    <div className="flex flex-row items-center gap-2 w-full text-xs">
      <Button
        variant="ghost"
        size="icon"
        onClick={handleLikeClick}
        disabled={isPending}
        className="size-6 p-1"
      >
        <img
          src={didLike ? "/icon/cat-filled.svg" : "/icon/cat-outlined.svg"}
          alt="좋아요"
        />
      </Button>
      <p>{likeCount}</p>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => navigate(`/detail/${postId}`)}
        className="size-6 p-1"
      >
        <img src="/icon/comment.svg" alt="댓글" />
      </Button>
      <p>{commentCount}</p>
      <Button
        variant="ghost"
        size="icon"
        onClick={handleShareClick}
        className="size-6 p-1"
      >
        <img src="/icon/share.svg" alt="공유" />
      </Button>
    </div>
  );
}
