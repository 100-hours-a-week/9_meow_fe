import { useNavigate } from "react-router-dom";

export interface IPostContent {
  postId: number;
  thumbnailUrl: string | null;
  content: string;
}

export default function PostContent({
  postId,
  thumbnailUrl,
  content,
}: IPostContent) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/detail/${postId}`)}
      className="flex flex-col gap-1 w-full"
    >
      <div className="flex flex-row items-start gap-2">
        <p className="text-sm whitespace-pre-wrap flex-1">{content}</p>
        {thumbnailUrl && (
          <img
            src={thumbnailUrl}
            alt="썸네일"
            className="w-[120px] h-[120px] rounded-lg object-cover flex-shrink-0"
          />
        )}
      </div>
    </div>
  );
}
