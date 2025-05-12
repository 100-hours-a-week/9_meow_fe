import { postQueries } from "@/api/queries/postQueries";
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
    ...postQueries.like({ queryClient }),
  });

  const handleLikeClick = () => {
    if (isPending) return; // 이미 요청 중이면 중복 요청 방지
    likePost({ postId });
  };

  return (
    <div className="flex flex-row items-center gap-2 w-full">
      <img
        src={didLike ? "/icon/cat-filled.svg" : "/icon/cat-outlined.svg"}
        alt="좋아요 후"
        onClick={handleLikeClick}
      />
      <p>{likeCount}</p>
      <img
        src="/icon/comment.svg"
        alt="댓글"
        onClick={() => navigate(`/detail/${postId}`)}
      />
      <p>{commentCount}</p>
      <img src="/icon/share.svg" alt="공유" />
    </div>
  );
}
