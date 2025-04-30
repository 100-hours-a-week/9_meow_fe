import { IUserItem } from "../UserItem";
import PostContent from "./PostContent";
import PostFooter from "./PostFooter";
import PostHeader from "./PostHeader";

interface IPostCard {
  userInfo: IUserItem;
}
export default function PostCard({ userInfo }: IPostCard) {
  return (
    <div>
      <PostHeader userInfo={userInfo} />
      <PostContent />
      <PostFooter />
    </div>
  );
}
