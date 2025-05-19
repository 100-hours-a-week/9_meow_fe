import { ReactNode } from "react";
import PostHeader from "./PostHeader";
import PostContent from "./PostContent";
import PostFooter from "./PostFooter";

interface IPostCard {
  children: ReactNode;
}

function PostCard({ children }: IPostCard) {
  return (
    <div className="flex flex-col gap-2 rounded-2xl bg-background border border-foreground/30 pl-2.5 pr-2 pt-1 pb-1 shadow-sm">
      {children}
    </div>
  );
}

PostCard.Header = PostHeader;
PostCard.Content = PostContent;
PostCard.Footer = PostFooter;

export default PostCard;
