import ContextMenu from "./ContextMenu";
import UserItem, { IUserItem } from "../UserItem";

interface IPostHeader {
  userInfo: IUserItem;
  isMyPost: boolean;
}

export default function PostHeader({ userInfo, isMyPost }: IPostHeader) {
  return (
    <div className="flex flex-row items-center justify-between w-full">
      <UserItem {...userInfo} />
      {isMyPost && <ContextMenu />}
    </div>
  );
}
