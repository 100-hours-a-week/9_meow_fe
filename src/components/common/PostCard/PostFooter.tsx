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

  return (
    <div className="flex flex-row items-center gap-2 w-full">
      <img
        src={didLike ? "/icon/cat-filled.svg" : "/icon/cat-outlined.svg"}
        alt="좋아요 후"
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
