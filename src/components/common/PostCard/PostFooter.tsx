import { loginQueries } from "@/api/queries/loginQueries";
import { postQueries } from "@/api/queries/postQueries";
import useTokenStore from "@/store/useTokenStore";
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
  const { setToken } = useTokenStore();

  const { mutate: refresh } = useMutation({
    ...loginQueries.refresh({ setToken }),
  });
  const { mutate: likePost, isPending } = useMutation({
    ...postQueries.like({ queryClient, refresh }),
  });

  const handleLikeClick = () => {
    if (isPending) return; // 이미 요청 중이면 중복 요청 방지
    likePost({ postId, isLiked: !didLike });
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
      <img src="/icon/share.svg" alt="공유" onClick={handleShareClick} />
    </div>
  );
}
