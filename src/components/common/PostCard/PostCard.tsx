import { IUserItem } from "../UserItem";
import PostContent from "./PostContent";
import PostFooter, { IPostFooter } from "./PostFooter";
import PostHeader from "./PostHeader";

interface IPostCard {
  userInfo: IUserItem;
  postInfo: IPostFooter;
}
export default function PostCard({ userInfo, postInfo }: IPostCard) {
  return (
    <div>
      <PostHeader userInfo={userInfo} />
      <PostContent />
      <PostFooter {...postInfo} />
    </div>
  );
}
