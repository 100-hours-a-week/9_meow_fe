import { ReactNode } from "react";
import PostHeader from "./PostHeader";
import PostContent from "./PostContent";
import PostFooter from "./PostFooter";
import { useNavigate } from "react-router-dom";

interface IPostCard {
  children: ReactNode;
  postId: number;
  onClick?: () => void;
}

function PostCard({ children, postId, onClick }: IPostCard) {
  const navigate = useNavigate();

  return (
    <div
      className="flex flex-col gap-1 rounded-xl bg-background border border-foreground/30 pl-2.5 pr-2 pt-1 pb-1 shadow-sm w-full"
      onClick={() => {
        onClick?.();
        navigate(`/detail/${postId}`);
      }}
    >
      {children}
    </div>
  );
}

PostCard.Header = PostHeader;
PostCard.Content = PostContent;
PostCard.Footer = PostFooter;

export default PostCard;
