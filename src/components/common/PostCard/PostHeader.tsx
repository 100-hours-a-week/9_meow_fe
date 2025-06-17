import ContextMenu from "./ContextMenu";
import UserItem, { IUserItem } from "../UserItem";

interface IPostHeader {
  userInfo: IUserItem;
  isMyPost: boolean;
  postId: number;
}

export default function PostHeader({
  userInfo,
  isMyPost,
  postId,
}: IPostHeader) {
  return (
    <div className="flex flex-row items-center justify-between w-full">
      <UserItem {...userInfo} />
      {isMyPost && <ContextMenu postId={postId} />}
    </div>
  );
}
